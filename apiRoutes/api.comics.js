var express = require('express');
var router = express.Router();
var apiCtrl_comics = require('../apiControllers/ctrl.api.comics');
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});
router.get('/:id_c',apiCtrl_comics.list);

router.get('/findOne/:id_c',apiCtrl_comics.getOne);

router.post('/add',objUpload.any(),apiCtrl_comics.addPost);

router.patch('/edit/:id_c',objUpload.any(),apiCtrl_comics.edit);


router.delete('/delete/:id_c',apiCtrl_comics.delete);
module.exports = router;