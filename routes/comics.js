var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

// Đường dẫn tới comics.controller.js
var comicsCtrl = require('../controllers/comics.controller');


// Vào trang comics theo địa chỉ '/'
router.get('/',comicsCtrl.list);
router.get('/add',comicsCtrl.add);
router.post('/add',objUpload.single('coverImage'),comicsCtrl.addPost);

// Xuất router
module.exports = router;