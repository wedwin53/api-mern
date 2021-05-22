import express from 'express';
import cors from 'cors';
import logger from "morgan"
import config from 'config';
import DB_Connection from './repositories/db.js';
import createError from 'http-errors'
import jwtMiddleware from "express-jwt";

let port = config.get('port');
const app = express()
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(logger("dev"));

//Routers For App
import health from './routes/health.route.js';
import users from './routes/user.route.js';
import auth from "./routes/secure.route.js"

//validate and protect routes with JWT
app.use(
  jwtMiddleware({ secret: config.get('jwt_secret'), algorithms: ["HS256"] }).unless({
    path: [
      "/api/v1/secure/auth",
      "/api/v1/health"
    ],
  })
);

//Main endpoint routes
app.use("/api/v1/health", health);
app.use("/api/v1/users", users)
app.use("/api/v1/secure", auth)


//Port where the app is listening
const PORT = port || 3001

//Init the server
const server = app.listen(PORT, () => {
  DB_Connection()
  console.log(`Server running on port ${PORT}`)
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

export default { app, server }