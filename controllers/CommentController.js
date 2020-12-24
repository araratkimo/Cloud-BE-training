const CommentServices = require('../services/CommentService');

class commentController {

    // Create Comment
    async newComment(ctx, next) {

        let data = ctx.request.body;

        if (!data) {
            throw new InvalidQueryError();
        }

        const commentData = {
            //parent_id: null,
            name: data.name,
            content: data.content,
            create_at: Date.now()
        }

        const result = await CommentServices.createComment(commentData);
        ctx.body = result;
    }

    // Reply Comment
    async replyComment(ctx, next) {

        let data = ctx.request.body;

        if (!data) {
            throw new InvalidQueryError();
        }

        const commentData = {
            parent_id: data.parent_id,
            name: data.name,
            content: data.content,
            create_at: Date.now()
        }

        const result = await CommentServices.createComment(commentData);
        ctx.body = result;

    }

    //Delete Comment
    async deleteComment(ctx, next) {
        let id = ctx.request.query;

        if (!id) {
            throw new InvalidQueryError();
        }

        const Comment = await CommentServices.findComment({_id: id});

        if (!Comment) {
            ctx.body = 'Can not find this comment';
        }
        else{
            const deletefilter = 
            {
            $or: [
                {
                  _id: id
                },
                {
                  parent_id: id
                }
              ]
            }
        
            const result = await CommentServices.deleteComment(deletefilter);
            ctx.body = result;
        }
    }

}


module.exports = new commentController();