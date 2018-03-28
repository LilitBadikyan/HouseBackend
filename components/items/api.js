const express = require('express');
const ItemsRouter = express.Router();
const multer  = require('multer');
const upload = multer({
   limits: { fieldSize: 25 * 1024 * 1024 }
});

const ItemsService = require('./service');

ItemsRouter.get('/', (req, res) => {
  ItemsService.getItems({}, req.query.offset, req.query.limit).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
});

//get items only by shop
ItemsRouter.post('/shop/', (req, res) => {
  ItemsService.getItemsbyShop(req.body.shop_name, {offset: req.query.offset, limit: req.query.limit}).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
});

//get items by shop and category
ItemsRouter.post('/category/', (req, res) => {
  ItemsService.getItemsbyCategory(req.body.shop_name, req.body.category, {offset: req.query.offset, limit: req.query.limit}).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err)
  })
});

ItemsRouter.post('/', upload.single('photo'), (req, res) => {
  let category = req.body.category || null;
  let shop_name = req.body.shop_name || null;
  console.log('file========== ', req.file);
  ItemsService.uploadItem(req.file, {category: category, shop_name: shop_name}).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
});

ItemsRouter.delete('/:id', (req, res) => {
  console.log('id----- ', req.params.id);
  ItemsService.deleteItem(req.params.id).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
});

module.exports = ItemsRouter;
