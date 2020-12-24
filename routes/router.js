const Router = require('koa-router');
const AccountCtrl = require('../controllers/AccountController');
const CommentCtrl = require('../controllers/CommentController');
const ImageUploadServices = require('../services/ImageUploadService');


const router = new Router({
    prefix: '/api'
});

router
    .get('/getaccount', AccountCtrl.getAccountData)
    .post('/newaccount', AccountCtrl.newAccountData)
    .put('/updateaccount', AccountCtrl.updateAccountData)
    .post('/uploadavatar', ImageUploadServices.single('pic'), AccountCtrl.uploadAvatar)

    .post('/newcomment', CommentCtrl.newComment)
    .post('/replycomment', CommentCtrl.replyComment)
    .delete('/deletecomment', CommentCtrl.deleteComment)

module.exports = router;