const { log } = require("console");
var md = require("../models/comment.model");
var fs = require("fs");

exports.list = async (req, res, next) => {
  let list = [];
  const id_cm = req.params.id_cm;
  try {
    list = await md.commentModel.find({ id_comic: id_cm });
  } catch (error) {
    console.log(error);
  }
  res.json(list);
};

exports.add = async (req, res, next) => {
  if(req.body){
    console.log(req.body);
  }
  let Comment = {};
  const id_user = req.body.id_user;
  const id_comic = req.body.id_comic;
  const noiDung = req.body.noiDung;
  try {
    const newComment = new md.commentModel();
    newComment.id_user = id_user;
    newComment.id_comic = id_comic;
    newComment.noiDung = noiDung;
   Comment = await newComment.save();
  } catch (error) {
    console.log(error);
  }
  res.json(Comment);
};

exports.update = async (req, res, next) => {
  let Comment = {};
  const id_cm = req.params.id_cm;
  try {
  const ObjCM = await md.commentModel.findById(id_cm);
  ObjCM.noiDung = req.body.noiDung;
  Comment = await ObjCM.save();
  } catch (error) {
    console.log(error);
  }
  res.json(Comment);
}
exports.delete = async (req, res, next) => {
  let Comment = {};
  const id_cm = req.params.id_cm;
  try {
    Comment = await md.commentModel.findByIdAndDelete(id_cm);
  } catch (error) {
    console.log(error);
  }
  res.json(Comment);
}
