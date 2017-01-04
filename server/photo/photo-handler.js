const User = require('../db/users/User.js')
const Friends = require('../db/users/User-Friends.js')
const Photos = require('../db/users/User-Photos.js')
const fs = require('fs');
const path = require('path');
const storageDir = path.resolve(__dirname, '../db/photos');

const user = 'bobby';
/*
* 
*
*
*/
module.exports.addPhoto = (req, res) => {
  if(!req.body.user || !req.files.image) {
    res.sendStatus(403);
  } else {
    const userDir = path.resolve(storageDir, req.body.user);
    const savePhoto = function() {
      fs.writeFile(userDir + '/' + req.files.image.name, req.files.image.data, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(403)
        } else {
         res.sendStatus(201);
        }
      });
    }
    fs.mkdir(userDir, null, function(err) {
      if (err) {
        if (err.code == 'EEXIST') {
          savePhoto(); // ignore the error if the folder already exists
        } else {
          res.sendStatus(403);
        } // something else went wrong
      } else {
        savePhoto()
      }; // successfully created folder
    });
  }
};

module.exports.getPhotos = (req, res) => {
  const friends = req.body.friends;
  const
};


module.exports.deletePhoto = (req, res) => {
  res.send('goodbye cruel world')
};