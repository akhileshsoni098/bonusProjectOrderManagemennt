const express = require('express')


const router = express.Router()

const customerContro = require('../controllers/custmerContro')
const orderContro = require('../controllers/orderContro')

router.post('/customer', customerContro.customerCreation)
router.post('/orders', orderContro.orderCreation)

router.get('/getCustomer/:customerId', customerContro.getCustomer)
router.get('/getOrder/:customerId', orderContro.getOrder)

module.exports = router