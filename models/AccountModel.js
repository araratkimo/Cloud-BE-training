const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId

// Schema
const AccountSchema = new Schema({
    //_id: {type: ObjectId},
    mail:{type: String, required:true, unique:true,},
    password:{type: String, required:true, minlength: [6, 'password is too short']},
    name:{type: String},
    nickname:{type: String},
    birthday:{type: String},
    sex:{type: String, enum:['man','woman']},
    avatar:{type: String }
    //avatar:{data: Buffer, contentType: String }
    },{
        versionKey: false // You should be aware of the outcome after set to false
    }
)

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;