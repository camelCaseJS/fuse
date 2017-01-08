const express = require('express');
const photoRouter = express.Router();
const photoHandler = require('./photo-handler');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

photoRouter.use(fileUpload());

photoRouter.use((req, res, next) => {
  req.user = {};
  req.user.id = 1;
  next()
})

photoRouter.post('/', photoHandler.addPhoto);

photoRouter.use(bodyParser.urlencoded({ extended: true }));
photoRouter.use(bodyParser.json());

photoRouter.get('/', photoHandler.getAllLinks);

photoRouter.get('/:user', photoHandler.getUserLinks)

photoRouter.get('/:user/:photo', photoHandler.getPhoto);

photoRouter.delete('/:user/:photo', photoHandler.deletePhoto);

module.exports = photoRouter;
