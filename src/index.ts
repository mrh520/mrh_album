import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as photoRouter from './routers/photoRouter';
import * as albumRouter from './routers/albumRouter';
import * as path from 'path';
const bodyParser = require('body-parser');
const app = express();
var multipart = require('connect-multiparty');
var multiparty = multipart({ uploadDir: path.join(__dirname, 'public/uploads') });

createConnection().then(async connection => {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json()); // 支持解析 application/json
    app.use(bodyParser.urlencoded({ extended: true })); // 支持解析 application/x-www-form-urlencoded
    app.use('/photo', photoRouter);
    app.use('/album', albumRouter);
    app.post('/upload', multiparty, function (req, res, next) {
        console.log(req.files);
        res.json(req.files);
    });
    app.listen(3000, () => console.log('application listening on port 3000!'));
}).catch(error => console.log(error));
