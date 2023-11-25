var express = require('express');
var router = express.Router();
var apiCtrl_genres = require('../apiControllers/ctrl.api.genres');
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

router.get('/',apiCtrl_genres.list);

router.get('/:id_g',apiCtrl_genres.getOne);

router.post('/add',objUpload.single("image"),apiCtrl_genres.add);

router.patch('/edit/:id_g',objUpload.single("image"),apiCtrl_genres.edit);

router.delete('/delete/:id_g',apiCtrl_genres.delete);
module.exports = router;