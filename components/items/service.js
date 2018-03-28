const ItemsDAO = require('./private/dao');
const probe = require('probe-image-size');

class ItemsService {

  getItems(query, offset, limit) {
    return new Promise((resolve, reject) => {
      return ItemsDAO.getData(query).then(data => {
        let result = data.map(data_item => {
          let image_url = data_item.image_url = 'http://127.0.0.1:3003/cdn/photos/' + data_item._id;
          return {
            image_url: image_url,
            width: data_item.width,
            height: data_item.height,
            shop_name: data_item.shop_name,
            category: data_item.category,
            _id: data_item._id,
          }
        })
        return resolve(result);
      }).catch(err => {
        return reject({err: 'error'});
      })
    })
  };

  getItemsbyShop(shop_name, options) {
    return new Promise((resolve, reject) => {
      options = options || {};
      this.getItems({shop_name: shop_name}, options.offset, options.limit).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject(err);
      })
    })
  };

  getItemsbyCategory(shop_name, category, options) {
    return new Promise((resolve, reject) => {
      options = options || {};
      this.getItems({shop_name: shop_name, category: category}, options.offset, options.limit).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject(err);
      })
    })
  };

  uploadItem(file, options) {
    return new Promise((resolve, reject) => {
      options = options || {};
      console.log('aaaaaaaaaaaa', file.buffer);
      if (!file || !file.buffer) {
        return reject({
            more_info: {message: 'Photo not provided.'}
        });
      }
      let image = probe.sync(file.buffer);
      if (!image) {
        return reject({
            more_info: {message:'Image file error'}
        });
      }
      ItemsDAO.insertData({
        image: file.buffer,
        content_type: image.content_type,
        mime: image.mime,
        width: image.width,
        height: image.height,
        size: file.size,
        shop_name: options.shop_name,
        category: options.category,
      }).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject({err: 'error'})
      })
    })
  };

  deleteItem(id, options) {
    return new Promise((resolve, reject) => {
      console.log('eeeeeeeeee');
      ItemsDAO.deleteData(id).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject(err);
      })
    })
  };

}

module.exports = new ItemsService();
