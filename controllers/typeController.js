const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
   async create(req, res) {
      //    const { name } = req.body
      //    const type = await Type.create({ name })
      //    return res.json(type)
      const type = new Type({
         name: req.body.name
      })

      await type.save()

      return res.json({ type })

   }
   async getAll(req, res) {
      // const types = await Type.findAll()
      // return res.json(types)

      const types = await Type.find({})
      return res.json({ types })

   }
}

module.exports = new TypeController()