const { Schema, model } = require('mongoose')

const typeSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   }
})
const Type = model('type', typeSchema)

const brandSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   }
})
const Brand = model('brand', brandSchema)

const deviceSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   price: {
      type: Number,
      required: true
   },
   rating: {
      type: Number,
      default: 0
   },
   img: {
      type: String,
      required: true,
   },
   brandId: {
      type: Schema.Types.ObjectId,
      required: true,
   },
   typeId: {
      type: Schema.Types.ObjectId,
      required: true,
   },
   info: [{
      title: {
         type: String
      },
      descriptions: {
         type: String
      }
   }]
})
const Device = model('device', deviceSchema)

const userSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: 'USER'
   },
   basket: [{
      type: Schema.Types.ObjectId,
      ref: 'device'
   }]
})
const User = model('user', userSchema)


module.exports = {
   Type,
   Brand,
   Device,
   User
}