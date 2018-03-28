const express = require('express');
const UsersRouter = express.Router();

const AppConstants = require('./../settings/constants');
const UsersService = require('./service');

UsersRouter.get('/', (req, res) => {
  UsersService.getUsers({}, req.query.offset, req.query.limit).then((data) => {
    return res.send(data);
  }).catch((err) => {
    return res.send(err);
  })
});

UsersRouter.post('/signin/', (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  UsersService.signIn(user).then((data) => {
    return res.send(data);
  }).catch(err => {
    console.log('err', err)
    return res.send(err);
  })
})

UsersRouter.post('/', (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  console.log('user', user);
  UsersService.insertUser(user).then((data) => {
    return res.send(data);
  }).catch(err => {
    console.log('errooooooooooooooooooooooooooooooooor', err);
    return res.send(err)
  })
});

UsersRouter.delete('/:username/', (req,res) => {

  UsersService.getOneUser({username: req.params.username}).then((data) => {
    UsersService.deleteUser(data._id).then((data) => {
      return res.send(data);
    })
  }).catch((err) => {
    return res.send(err);
  })

});

module.exports = UsersRouter;
