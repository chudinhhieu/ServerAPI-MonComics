const { log } = require("console");
var md = require("../models/user.model");
var fs = require("fs");
const path = require("path");
var mdF = require("../models/favorite.model");
var mdCM = require("../models/comment.model");

exports.list = async (req, res, next) => {
  let list = [
    {
      _id: "",
      fullname: "",
      avatar: "",
      username: "",
      password: "",
      email: "",
    },
  ];
  try {
    list = await md.userModel.find();
  } catch (error) {
    console.log(error);
  }
  res.json(list);
};

exports.getOne = async (req, res, next) => {
  let user = {};
  try {
    const id_u = req.params.id_u;
    user = await md.userModel.findById(id_u);
  } catch (error) {
    console.log(error);
  }
  return res.json(user);
};

exports.add = async (req, res, next) => {
  let user = {};
  try {
    let objU = new md.userModel();
    if (req.file) {
      fs.rename(
        req.file.path,
        "./public/user_avatar/" +
          req.body.username +
          "_" +
          req.file.originalname,
        async (err) => {
          if (err) throw err;
          objU.avatar = req.body.username + "_" + req.file.originalname;
        }
      );
    } else {
      objU.avatar = "avatar_default.png";
    }
    objU.fullname = req.body.fullname;
    objU.password = req.body.password;
    objU.email = req.body.email;
    objU.username = req.body.username;
    user = await objU.save();
  } catch (error) {
    console.log(error);
  }
  return res.json(user);
};

exports.edit = async (req, res, next) => {
  let user = {};
  try {
    const id_u = req.params.id_u;
    const objU = await md.userModel.findById(id_u);
    if (req.file) {
      if (objU.avatar !== "avatar_default.png") {
        const oldAvatarPath = path.join("./public/user_avatar/", objU.avatar);
        fs.unlinkSync(oldAvatarPath);
      }

      const newAvatarPath = path.join(
        "./public/user_avatar/",
        objU.username + "_" + req.file.originalname
      );
      fs.renameSync(req.file.path, newAvatarPath);
      objU.avatar = objU.username + "_" + req.file.originalname;
    }
    if (req.body.fullname) {
      objU.fullname = req.body.fullname;
    }
    if (req.body.avatar) {
      objU.avatar = req.body.avatar;
    }
    if (req.body.password) {
      objU.password = req.body.password;
    }
    if (req.body.email) {
      objU.email = req.body.email;
    }
    user = await objU.save();
  } catch (error) {
    console.log(error);
  }
  return res.json(user);
};
exports.editAvatar = async (req, res, next) => {
  let user = {};
  try {
    const id_u = req.params.id_u;
    const objU = await md.userModel.findById(id_u);
    if (req.file) {
      if (objU.avatar !== "avatar_default.png") {
        const oldAvatarPath = path.join("./public/user_avatar/", objU.avatar);
        fs.unlinkSync(oldAvatarPath);
      }

      // Tiếp tục với việc cập nhật ảnh mới
      const newAvatarPath = path.join(
        "./public/user_avatar/",
        objU.username + "_" + req.file.originalname
      );
      fs.renameSync(req.file.path, newAvatarPath);
      objU.avatar = objU.username + "_" + req.file.originalname;
    }
    user = await objU.save();
  } catch (error) {
    msg = "Lỗi: " + error.message;
    console.log(error);
  }
  return res.json(user);
};

exports.delete = async (req, res, next) => {
  let msg = "";
  let user = {};
  let id = req.params.id_u;

  try {
    user = await md.userModel.findByIdAndDelete(id);
    await mdF.favoriteModel.deleteMany({id_user: user.id });
    await mdCM.commentModel.deleteMany({id_user: user.id});
    if (user.avatar !== "avatar_default.png") {
      const oldAvatarPath = path.join("./public/user_avatar/", user.avatar);
      fs.unlinkSync(oldAvatarPath);
    }
    msg = `Xóa thành công tài khoản ${user.username}`;
  } catch (error) {
    console.log(error);
  }
  return res.json(user);
};
