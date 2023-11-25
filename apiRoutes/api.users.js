var express = require('express');
var router = express.Router();
var apiCtrl_user = require('../apiControllers/ctrl.api.users');
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

router.get('/',apiCtrl_user.list);

router.get('/:id_u',apiCtrl_user.getOne);

router.post('/add',objUpload.single('avatar'),apiCtrl_user.add);
router.patch('/avatar/:id_u',objUpload.single('avatar'),apiCtrl_user.editAvatar);

router.patch('/edit/:id_u',objUpload.single('avatar'),apiCtrl_user.edit);


router.delete('/delete/:id_u',apiCtrl_user.delete);
module.exports = router;