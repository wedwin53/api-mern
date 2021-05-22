import config from "config";

function healthCheck(req, res) {
  return res.status(200).json({
    server_up: true,
    port: config.get("port"),
    environment: config.get("enviroment"),
  });
}

export default healthCheck;
