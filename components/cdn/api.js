const express = require('express');
const CDNRouter = express.Router();
const PhotoServices = require('./../photos/service');

CDNRouter.get('/:id', (req, res) => {
  PhotoServices.getPhotoById(req.params.id).then(data => {
    res.setHeader('Content-Type', 'image/jpg');
    return res.send(data.image);
  }).catch(err => {
    return res.send(err);
  })
})

module.exports = CDNRouter;
