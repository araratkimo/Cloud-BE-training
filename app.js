const koa = require('koa');
const koaBody = require('koa-body');
const router = require('koa-router')();
const logger = require('koa-logger');

const apiRouter = require('./routes/router');

// Set up DB configs
const mongoConf = require('./config/mongo');

const app = new koa();

mongoConf.connect();

app.use(logger());
app.use(koaBody());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());


const server = app.listen(3200);
module.exports = server;

//console.log("start: http://127.0.0.1:3200"); 