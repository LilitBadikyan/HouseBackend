const UserRouter = require('./../components/users/api');
const PhotosRouter = require('./../components/photos/api');
const CDNRouter = require('./../components/cdn/api');
const ItemsRouter = require('./../components/items/api');

class ApiV1 {

  initialize(app) {

    app.use('/api/users', UserRouter);
    app.use('/api/photos', PhotosRouter);
    app.use('/cdn/photos', CDNRouter);
    app.use('/api/items', ItemsRouter);

    app.get('/', (req, res) => {
      return res.send('it works!');
    });
  }

}

module.exports = new ApiV1();
