const express = require('express');
const photoRouter = express.Router();
const photoHandler = require('./photo-handler');
const bodyParser = require('body-parser')
const path = require('path')
const multipartMiddleware = multipart();

photoRouter.use(fileUpload());
//needs raw body data
photoRouter.post('/', photoHandler.addPhoto);

photoRouter.use(bodyParser.urlencoded({ extended: true }));
photoRouter.use(bodyParser.json());

photoRouter.get('/', photoHandler.getPhotos);


photoRouter.delete('/', photoHandler.deletePhoto);

module.exports = photoRouter;

