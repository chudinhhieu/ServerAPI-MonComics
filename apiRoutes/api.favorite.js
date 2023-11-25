var express = require('express');
var router = express.Router();
var apiCtrl_favorite = require('../apiControllers/ctrl.api.favorites');
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

router.get('/:id_c',apiCtrl_favorite.listFavoriteComic);
router.get('/user/:id_u',apiCtrl_favorite.listFavoriteUser);
router.get('/:id_user/:id_comic',apiCtrl_favorite.check);
router.post('/add',apiCtrl_favorite.add);
router.delete('/delete/:id_f',apiCtrl_favorite.delete);

module.exports = router;
