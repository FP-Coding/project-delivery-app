const { Router } = require('express');
const saleController = require('../Controllers/Sale.contoller');
const ValidToken = require('../Middlewares/ValidToken');

const route = Router();

route.get('/sales/:id', ValidToken, saleController.getOrdersByUser);
route.post('/sales', ValidToken, saleController.createSale);

module.exports = route;
