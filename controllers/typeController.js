const { Type } = require('../models/models')

class TypeController {
   async create(req, res) {
      const type = new Type({
         name: req.body.name
      })

      await type.save()

      return res.json({ type })

   }
   async getAll(req, res) {
      const types = await Type.find({})
      return res.json({ types })

   }
}

module.exports = new TypeController()