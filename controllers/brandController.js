const { Brand } = require('../models/models')

class BrandController {
   async create(req, res) {
      const brand = new Brand({
         name: req.body.name
      })

      await brand.save()

      return res.json({ brand })
   }
   async getAll(req, res) {
      const brands = await Brand.find({})
      return res.json({ brands })
   }
}

module.exports = new BrandController()