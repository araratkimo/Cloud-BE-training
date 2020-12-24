const Comment = require('../models/CommentModel');

class commentService {
    async findComment(comment_id){
        let result = '';
        try {
            let doc = await Comment.findOne(comment_id);
            result = doc;
        }
        catch (err) {
            console.error(err);
        }

        return result;
    }

    async createComment (commentData) {
        let result = '';
        try {
            let doc = await Comment.create(commentData);

            //result = 'Create success'
            result = doc;
        }
        catch (err) {
            console.error(err);
            result = 'Create fail, ' + err;
        }

        return result;
    }

    async deleteComment (deletefilter) {
        let result = '';
        try {
            let doc = await Comment.deleteMany(deletefilter);

            result = 'Delete success';
        }
        catch (err) {
            console.error(err);
            result = 'Delete fail, ' + err;
        }

        return result;
    }
}


module.exports = new commentService();