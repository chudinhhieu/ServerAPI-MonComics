var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

// Đường dẫn tới users.controller.js
var usersCtrl = require('../controllers/users.controller');


// Vào trang users theo địa chỉ '/'
router.get('/',usersCtrl.list);


router.get('/add',usersCtrl.add);
router.post('/add',objUpload.single('avatar'),usersCtrl.addPost);

router.get('/edit/:id_u',usersCtrl.edit);
router.post('/edit/:id_u',objUpload.single('avatar'),usersCtrl.editPost);

router.post('/delete/:id_u',usersCtrl.delete);

// Xuất router
module.exports = router;

