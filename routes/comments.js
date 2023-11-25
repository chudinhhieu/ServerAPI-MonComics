var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});
// Đường dẫn tới comments.controller.js
var commentsCtrl = require('../controllers/comments.controller');


// Vào trang comments theo địa chỉ '/'
router.get('/',commentsCtrl.list);
router.post('/add',objUpload.any(),commentsCtrl.add);

// Xuất router
module.exports = router;