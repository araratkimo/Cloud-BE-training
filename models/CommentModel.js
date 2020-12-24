const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Schema
const CommentSchema = new Schema({
    //_id: {type: ObjectId},
    parent_id: {type: ObjectId},
    name:{type: String, required:true},
    content:{type: String, required:true},
    create_at:{type: Date, required:true}
    },{
        versionKey: false // You should be aware of the outcome after set to false
    }
)

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;