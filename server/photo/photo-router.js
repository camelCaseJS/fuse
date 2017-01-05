const express = require('express');
const photoRouter = express.Router();
const photoHandler = require('./photo-handler');
const bodyParser = require('body-parser')
const path = require('path')
const multipart = require('connect-multiparty');
const fileUpload = require('express-fileupload');
const multipartMiddleware = multipart();
const uploads = path.resolve(__dirname, '../db/photos');

photoRouter.use(fileUpload());
//needs raw body data
photoRouter.post('/', photoHandler.addPhoto);

photoRouter.use(bodyParser.urlencoded({ extended: true }));
photoRouter.use(bodyParser.json());

photoRouter.get('/:user', photoHandler.getPhotos);


photoRouter.delete('/', photoHandler.deletePhoto);

module.exports = photoRouter;
