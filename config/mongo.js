const mongoose = require('mongoose');

const options = {
    //autoReconnect: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const url = 'mongodb://localhost:27017/homework';

class mongo {
    async connect() {
        await mongoose.connect(url,options);
       
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connect fail'));
        db.once('open', ()=>{
            console.log('mongodb connect sucess');
        })
    }
}



module.exports = new mongo();

