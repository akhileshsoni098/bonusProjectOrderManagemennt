const express = require('express')


const router = express.Router()

const customerContro = require('../controllers/custmerContro')


router.post('/customer', customerContro.customerCreation)

module.exports = router