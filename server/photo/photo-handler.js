const fs = require('fs');
const path = require('path');
const dbHandler = require('./photo-db-handler');

const storageDir = path.resolve(__dirname, '../db/photos');
const publicPath = process.env.PORT || 'localhost:8000/photo';
console.log('publicPath', publicPath);
/*
* saves photo a in a folder, creates the folder if it does not exist
*
* inputs: multi-form data request with a user identifier and file attached
* output: success or failure code response
*
* NOTE: checking for folder existence first will cause race conditions,
* refactors should not implement such functionality
*/
const addPhoto = (req, res) => {
  const userDir = path.resolve(storageDir, req.user.id.toString());
  const savePhoto = () => {
    const fileLoc = path.resolve(userDir, req.files.image.name);
    //SQL INJECTION POINT, FIX
    const link = publicPath + '/' + req.user.id + '/' + req.files.image.name;
    dbHandler.addPhoto(req, link)
    .then(() => {
      fs.writeFile(fileLoc, req.files.image.data, (err) => {
        if (err) {
          console.log(err, fileLoc);
          throw new Error(err);
        } else {
          res.sendStatus(201);
        }
      })
    })
    .catch((err)=> {
      console.log(err)
      res.sendStatus(404);
    })
  };

  if (!req.files.image) {
    res.sendStatus(400);
  } else {
    fs.mkdir(userDir, null, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          savePhoto(); // ignore the error if the folder already exists
        } else {
          console.log(err)
          res.sendStatus(500);
        } // something else went wrong
      } else {
        savePhoto();
      } // successfully created folder
    });
  }
};

const getPhoto = (req, res) => {
  const fileLoc = path.resolve(storageDir,req.params.user, req.params.photo);
  fs.stat(fileLoc, (err) => {
    if(err) res.sendStatus(404);
    else res.sendFile(fileLoc);
  })
};


const deletePhoto = (req, res) => {
  const fileLoc = path.resolve(storageDir,req.params.user, req.params.photo);
  const link = path.resolve(publicPath, req,params.user, req.params.user)
  Photo.find({ where : { link } })
  .then((photo) => {
    if(photo) {
      fs.unlink(fileLoc, (err) => {
        if(err) res.sendStatus(404);
        else res.sendStatus(200)
      })       
    } else {
      res.sendStatus(404);
    }
  }).catch((err) => {
    console.log(err);
    res.send(404);
  })
};

const getLinks = (req, res) => {
  dbHandler.findAllPhotos(req)
  .then((photos) => {
    res.send(photos)
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(404)
  })
}

module.exports.addPhoto = addPhoto;

module.exports.getLinks = getLinks;

module.exports.getPhoto = getPhoto;

module.exports.deletePhoto = deletePhoto;

