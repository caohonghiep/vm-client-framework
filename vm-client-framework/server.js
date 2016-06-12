var express = require('express');
var bodyParser = require('body-parser'); 
var assert = require('assert');
var app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var products = require('./services/product/main');
app.get('/products', products.findAll);
app.get('/products/:id', products.findById);
app.post('/products', products.addProduct);
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);
app.get('/categories',products.findAllCategories);
app.get('/categories/:categoryId',products.findProductsInCategory);

var users = require('./services/user/main');
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

app.post('/login',users.login);
app.post('/forgotPassword',users.forgotPassword);

app.listen(3000, function () {
  console.log('Main App running on port: 3000' );
});