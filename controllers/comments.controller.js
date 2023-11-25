
exports.list = (req,res,next)=>{
    res.render('comments/listComment',{title: "Comments"});
}
exports.add = (req,res,next)=>{
   console.log(req.files);
   console.log(req.files.length);
}
