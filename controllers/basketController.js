const { User } = require('../models/models')

class BasketController {
   async create(req, res) {
      const { userId, deviceId } = req.body
      const basketDevice = await User.findByIdAndUpdate(userId, { $addToSet: { basket: deviceId } }, {
         new: true
      })
      return res.json(basketDevice)
   }
   async getAll(req, res) {
      const { userId } = req.query
      const user = await User.findById(userId).populate('basket')
      const devices = user.basket

      return res.json(devices)
   }
   async deleteOne(req, res) {
      const { userId, deviceId } = req.body
      const basketDevices = await User.findOne({ _id: userId }).populate('basket')

      const filterdBasket = basketDevices.basket.filter(item => String(item._id) !== deviceId)

      const updatedBasketDevices = await User.findByIdAndUpdate(userId, { basket: filterdBasket })

      return res.json(updatedBasketDevices)
   }
}

module.exports = new BasketController