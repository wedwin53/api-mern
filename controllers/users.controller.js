import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
        res.status(400).json({message: "User already exists"});
        return
    }
    user = new User({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const userSaved = await user.save();
    console.log(userSaved)
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(payload, config.get('jwt_secret'), {expiresIn: 3600}, (err, token) => {
        if(err) throw err;
        res.status(200).json({
          data: {token},
          msj: 'User Created',
        });  
    });
  } catch (error) {
      console.log(error)
      res.status(500)
  }
}

export { createUser };
