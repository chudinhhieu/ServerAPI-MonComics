var express = require('express');
var router = express.Router();
var apiCtrl_comments= require('../apiControllers/ctrl.api.comments');
router.get('/:id_cm',apiCtrl_comments.list);
router.post('/add',apiCtrl_comments.add);
router.patch('/edit/:id_cm',apiCtrl_comments.update);
router.delete('/delete/:id_cm',apiCtrl_comments.delete);
module.exports = router;