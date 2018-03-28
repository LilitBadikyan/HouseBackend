
class BaseDAO {
  constructor(collection) {
    this.collection = collection;
  }

  getDataById(id, options) {
    console.log('getDataById');
    options = options || {};
    if(!this.collection) {
      throw 'DAO contract violation';
    }
    return this.collection.findOne({_id: id});
  }

  getOneData(query) {
    console.log('1.1 getOneData == ', query);
    if(!this.collection) {
      throw 'Contract violation';
    }
    query = query || {};
    console.log('1.2 getOneData == ', this.collection.findOne(query));

    return this.collection.findOne(query);
  }

  getData(query, offset, limit) {
    console.log('getData');
    if(!this.collection) {
      throw 'Contract violation';
    }
    query = query || {};
    return this.collection.find(query)
                          .skip(offset)
                          .limit(limit)
                          .exec();
  }

  insertData(query) {
    console.log('insertData');
    if(!this.collection) {
      throw 'Contract violation';
    }
    query = query || {};
    return this.collection.create(query);
  }

  updateData() {

  }

  deleteData(id) {
    console.log('deleteData');
    if(!this.collection) {
      throw 'Contract violation';
    }
    return this.collection.remove({_id: id});
  }

}

module.exports = BaseDAO;
