// const uuid = require('uuid')
// const path = require('path')
// const { Device, DeviceInfo } = require('../models/models')
// const ApiError = require('../error/ApiError')

// class DeviceController {
//    async create(req, res, next) {
//       try {
//          let { name, price, brandId, typeId, info } = req.body
//          let { img } = req.files
//          let fileName = uuid.v4() + ".jpg"
//          img.mv(path.resolve(__dirname, '..', 'static', fileName))
//          let device = await Device.create({ name, price, brandId, typeId, info, img: fileName })

//          if (info) {
//             info = JSON.parse(info)
//             info.forEach(i => {
//                DeviceInfo.create({
//                   title: i.title,
//                   description: i.descriptions,
//                   deviceId: device.id
//                })
//             })
//          }


//          return res.json(device)
//       }
//       catch (e) {
//          next(ApiError.badRequest(e.message))
//       }
//    }

//    async getAll(req, res) {
//       let { brandId, typeId, limit, page } = req.query
//       page = page || 1
//       limit = limit || 20
//       let offset = page * limit - limit
//       let devices
//       if (!brandId && !typeId) {
//          devices = await Device.findAndCountAll({ limit, offset })
//       }
//       if (brandId && !typeId) {
//          devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
//       }
//       if (!brandId && typeId) {
//          devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
//       }
//       if (brandId && typeId) {
//          devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit })
//       }
//       return res.json(devices)
//    }

//    async getOne(req, res) {
//       const { id } = req.params
//       const device = await Device.findOne({
//          where: { id },
//          include: [{ model: DeviceInfo, as: 'info' }]
//       })

//       return res.json(device)
//    }

//    async deleteOne(req, res) {
//       const { id } = req.body
//       const device = await Device.destroy({
//          where: { id },
//       })
//       return res.json(device)
//    }
// }

// module.exports = new DeviceController()

const uuid = require('uuid')
const path = require('path')
const { Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
   async create(req, res, next) {
      try {
         let { name, price, brandId, typeId, info } = req.body
         let { img } = req.files
         let fileName = uuid.v4() + ".jpg"
         img.mv(path.resolve(__dirname, '..', 'static', fileName))
         // let device = await Device.create({ name, price, brandId, typeId, info, img: fileName })
         const device = new Device({
            name,
            price,
            info: JSON.parse(info),
            rating: 0,
            img: fileName,
            brandId,
            typeId
         })

         await device.save()

         // if (info) {
         //    info = JSON.parse(info)
         //    info.forEach(i => {
         //       DeviceInfo.create({
         //          title: i.title,
         //          description: i.descriptions,
         //          deviceId: device.id
         //       })
         //    })
         // }


         return res.json(device)
      }
      catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getAll(req, res) {
      let { brandId, typeId, limit, page } = req.query
      page = page || 1
      limit = limit || 20
      let offset = page * limit - limit
      let devices
      if (!brandId && !typeId) {
         devices = await Device.find({}).skip(offset).limit(limit)
      }
      if (brandId && !typeId) {
         devices = await Device.find({ brandId }).skip(offset).limit(limit)
      }
      if (!brandId && typeId) {
         devices = await Device.find({ typeId }).skip(offset).limit(limit)
      }
      if (brandId && typeId) {
         devices = await Device.find({ brandId, typeId }).skip(offset).limit(limit)
      }
      const totalCount = await Device.find().count()
      return res.json({ devices, totalCount })
   }

   async getOne(req, res) {
      const { id } = req.params
      const device = await Device.findById(id)
      return res.json(device)
   }

   async deleteOne(req, res) {
      const { id } = req.body

      const device = await Device.findByIdAndRemove(id)
      return res.json(device)
   }
}

module.exports = new DeviceController()