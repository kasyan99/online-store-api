// const sequelize = require('../db')
// const { DataTypes } = require('sequelize')

// const User = sequelize.define('user', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    email: { type: DataTypes.STRING, unique: true },
//    password: { type: DataTypes.STRING },
//    role: { type: DataTypes.STRING, defaultValue: "USER" }
// })

// const Basket = sequelize.define('basket', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

// const BasketDevice = sequelize.define('basket_device', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    deviceId: { type: DataTypes.INTEGER, allowNull: false }
// })

// const Device = sequelize.define('device', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    name: { type: DataTypes.STRING, unique: true, allowNull: false },
//    price: { type: DataTypes.INTEGER, allowNull: false },
//    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
//    img: { type: DataTypes.STRING, allowNull: false }
// })

// const Type = sequelize.define('type', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    name: { type: DataTypes.STRING, unique: true, allowNull: false },
// })

// const Brand = sequelize.define('brand', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    name: { type: DataTypes.STRING, unique: true, allowNull: false },
// })

// const Rating = sequelize.define('rating', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    rate: { type: DataTypes.INTEGER, allowNull: false },
// })

// const DeviceInfo = sequelize.define('device_info', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    title: { type: DataTypes.STRING, allowNull: false },
//    description: { type: DataTypes.STRING, allowNull: false },
//    deviceId: { type: DataTypes.INTEGER, allowNull: false }
// })

// const TypeBrand = sequelize.define('type_brand', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

// User.hasOne(Basket)
// Basket.belongsTo(User)

// User.hasMany(Rating)
// Rating.belongsTo(User)

// Basket.hasMany(BasketDevice)
// BasketDevice.belongsTo(Basket)

// Type.hasMany(Device)
// Device.belongsTo(Type)

// Brand.hasMany(Device)
// Device.belongsTo(Brand)

// Device.hasMany(Rating)
// Rating.belongsTo(Device)

// Device.hasMany(BasketDevice)
// BasketDevice.belongsTo(Device)

// Device.hasMany(DeviceInfo, { as: 'info' })
// DeviceInfo.belongsTo(Device)

// Type.belongsToMany(Brand, { through: TypeBrand })
// Brand.belongsToMany(Type, { through: TypeBrand })

// module.exports = {
//    User,
//    Basket,
//    BasketDevice,
//    Device,
//    Type,
//    Brand,
//    Rating,
//    DeviceInfo,
//    TypeBrand
// }

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