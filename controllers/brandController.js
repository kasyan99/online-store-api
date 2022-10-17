const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
   async create(req, res) {
      // const { name } = req.body
      // const brand = await Brand.create({ name })
      // return res.json(brand)

      const brand = new Brand({
         name: req.body.name
      })

      await brand.save()

      return res.json({ brand })
   }
   async getAll(req, res) {
      // const brands = await Brand.findAll()
      // return res.json(brands)
      const brands = await Brand.find({})
      return res.json({ brands })
   }
}

module.exports = new BrandController()