const PhotosDAO = require('./private/dao');
const UsersService = require('./../users/service');
const probe = require('probe-image-size');
const fs = require('fs');

class PhotosService {

  getPhotos(query, offset, limit) {
    console.log('getPhotos');
    return new Promise((resolve, reject) => {
       PhotosDAO.getData(query, offset, limit).then((data) => {
         let result = data.map(data_item => {
         let image_url = data_item.image_url = 'http://127.0.0.1:3003/cdn/photos/' + data_item._id;
           return {
             image_url: image_url,
             width: data_item.width,
             height: data_item.height,
             user_id: data_item.user_id,
             _id: data_item._id,
           }
         })
        resolve(result);
      }).catch((err) => {
        reject({
          err: 'error'
        });
      })
    })
  }

  getPhotoById(id, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      PhotosDAO.getDataById(id).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject(err);
      })
    })
  }

  getPhotosWithNoUser(options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      PhotosDAO.getData({user_id: undefined}).then(photo => {
        let result = photo.map(photo_item => {
          let image_url = photo_item.image_url = 'http://127.0.0.1:3003/cdn/photos/' + photo_item._id;
          return {
            image_url: image_url,
            width: photo_item.width,
            height: photo_item.height,
          }
        })
        return resolve(result);
      }).catch(err => {
        return reject(err)
      })
    })
  }

  getPhotobyUser(APIKey, options) {
    options = options || {};
    return new Promise((resolve, reject) => {

      UsersService.getOneUser({key: APIKey}).then(data => {
        console.log('steel mtav');
        if (!data) {
          return reject('no such user');
        }
        PhotosDAO.getData({user_id: data._id}).then(photo => {
          let result = photo.map(photo_item => {
            let image_url = photo_item.image_url = 'http://127.0.0.1:3003/cdn/photos/' + photo_item._id;
            return {
              image_url: image_url,
              _id: photo_item._id,
            }
          })
          return resolve(result);
        })
      }).catch(err => {
        return reject(err);
      })
    })
  }


  uploadPhoto(file, options) {
    return new Promise((resolve, reject) => {
      options = options || {};
      if (!file || !file.buffer) {
          return reject({
              more_info: {message: 'Photo not provided.'}
          });
      }
      console.log('file.buffer', file.buffer);
      let image = probe.sync(file.buffer);
      console.log('uploadPhoto, photoService image', image);
      if (!image) {
          return reject({
              more_info: {message:'Image file error'}
          });
      }
      console.log('options', options);
      PhotosDAO.insertData({
        image: file.buffer,
        content_type: image.content_type,
        mime: image.mime,
        width: image.width,
        height: image.height,
        size: file.size,
        user_id: options._id
      }).then((photo) => {
        console.log('photo == ', photo);
        return resolve(photo);
      }).catch((err) => {
        return reject(err);
      })
    })
  }

  deletePhoto(id, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      this.getPhotoById(id).then(data => {
        if (!data) {
          return reject('No such Photo exists');
        }
        PhotosDAO.deleteData(id).then(data => {
          return resolve(data);
        })
      }).catch(err => {
        return reject(err);
      })
    })
  }
}
module.exports = new PhotosService();
