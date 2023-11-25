var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

var genresCtrl = require('../controllers/genres.controller');
//Lấy ra danh sách
router.get('/',genresCtrl.list);
// Thêm mới
router.get('/add',genresCtrl.add);
router.post('/add',objUpload.single('imageGenre'),genresCtrl.addPost);
// Cập nhật
router.get('/edit/:id_g',genresCtrl.edit);
router.post('/edit/:id_g',objUpload.single('imageGenre'),genresCtrl.editPost);
// Xóa
router.post('/delete/:id_g',genresCtrl.delete);

module.exports = router;