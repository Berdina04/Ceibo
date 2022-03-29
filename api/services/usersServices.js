const User = require("../models/User"); // preguntar como se exportan los modelos en mongo
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { verifyHash } = require("../config/passwordHash");

class UsersService {
  static async serviceResgisterUser(req) {
    console.log(req.body);
    try {
      const newUser = await User.create(req.body);
      console.log(newUser);
    } catch (err) {
      console.error("err->", err)
    }
  }

  static async serviceLogin(req) {

    const { email, password } = req.body;
    try {
      if (email && password) {
        let user = await User.findOne({ email });
        if (!user) {
          return { msg: "No such user found", user };
        }

        let verifyUser = await verifyHash(password, user.password, user.salt);

        if (!verifyUser) {
          console.log("LAS CONTRASEÑAS NO COINCIDEN");
          return { msg: "Password is incorrect" };
        } else {
          let payload = { id: user._id };
          let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
          return { msg: "ok", token: token, user: user };
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async serviceLogout(req){
    try {
      //METODO LOGOUT
    } catch (err) {
      console.error(err);
    }
  }


  static async serviceGetMe(req) {
    try {
      const user = await Users.findById(req.user.id);
      // VER NOMBRE DE LOS CAMPOS EN LOS MODELOS
      return {
        name: user.name,
        email: user.email,
        id: user._id,
      }
    } catch (err) {
      console.log(err);
    }
  };

  static async serviceEditUser(req, next) {
    try {
      const { id } = req.params;
      const oldUser = await Users.findByIdAndUpdate(id, req.body);
      // REVISAR QUE DEBERIA DEVOLVER ESTE METODO
      return 1;
    } catch (err) {
      next(err);
    }
  };

  static async serviceGetOneUser(req, next) {
    try {
      const { id } = req.params;
      const user = await Users.findById(id);
      return user;

    } catch (err) {
      next(err);
    }
  }
}

module.exports = UsersService;
