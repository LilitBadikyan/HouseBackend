const express = require('express');
const PhotosRouter = express.Router();
const multer  = require('multer');
const upload = multer({
   limits: { fieldSize: 25 * 1024 * 1024 }
});

const PhotosService = require('./service');
const UsersService = require('./../users/service');
const AppConstants = require('./../settings/constants');

PhotosRouter.get('/', (req, res) => {
  PhotosService.getPhotos({}, req.query.offset, req.query.limit).then((data) => {
    return res.send(data);
  }).catch((err) => {
    return res.send(err);
  })
});

//getting all photos of specified user
PhotosRouter.get('/userphotos/', (req, res) => {
  PhotosService.getPhotobyUser(req.query.user_key).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
})

//getting all inspiration photos
PhotosRouter.get('/inspiration/', (req, res) => {
  console.log('inspiration');
  PhotosService.getPhotosWithNoUser().then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
})

PhotosRouter.post('/:id', upload.single('photo'), (req, res) => {
  let id = req.params.id;
  PhotosService.uploadPhoto(req.file, {_id: id}).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
});

PhotosRouter.delete('/:id', (req, res) => {
  PhotosService.deletePhoto(req.params.id).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
})

module.exports = PhotosRouter;
