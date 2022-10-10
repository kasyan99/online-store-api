const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

//api/brand
router.get('/', brandController.getAll)
router.post('/', brandController.create)

module.exports = router