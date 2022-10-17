const { BasketDevice, Basket, Device, User } = require('../models/models')
const ApiError = require('../error/ApiError')
const userController = require('./userController')
const { Schema } = require('mongoose')

class BasketController {
   async create(req, res) {
      const { userId, deviceId } = req.body
      // const basketDevice = await BasketDevice.create({ userId, deviceId })
      const basketDevice = await User.findByIdAndUpdate(userId, { $addToSet: { basket: deviceId } }, {
         new: true
      })
      return res.json(basketDevice)
   }
   async getAll(req, res) {
      const { userId } = req.query

      // const basketDevices = await BasketDevice.findAll({
      //    where: { basketId: Number(basketId) },
      //    include: { model: Device }
      // })
      // const basketDevices = await User.findById(userId)
      const user = await User.findById(userId).populate('basket')
      const devices = user.basket

      return res.json(devices)
   }
   async deleteOne(req, res) {
      const { userId, deviceId } = req.body
      // const basketDevice = await BasketDevice.destroy({
      //    where: { userId, deviceId },
      // })

      // const basketDevice = await User.findById(userId).populate('basket').select('basket').findById(deviceId)
      const basketDevices = await User.findOne({ _id: userId }).populate('basket')

      // basketDevice.basket.map(item => {
      //    console.log('item', String(item._id) === deviceId)
      // })

      const filterdBasket = basketDevices.basket.filter(item => String(item._id) !== deviceId)

      const updatedBasketDevices = await User.findByIdAndUpdate(userId, { basket: filterdBasket })

      // basketDevice.basket.find(deviceId).remove()
      // const device = await Device.findById(basketDevice._id)
      return res.json(updatedBasketDevices)
   }
}

module.exports = new BasketController