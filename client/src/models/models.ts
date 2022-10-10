export interface IUser {
  email: string
  exp: number
  iat: number
  id: number
  role: string
}

export interface IType {
  id: number
  name: string
}

export interface IBrand {
  id: number
  name: string
}

type DeviceInfo = {
  id: number
  deviceId: number
  description: string
  title: string
}

export interface IDevice {
  id: number
  name: string
  price: number
  rating: number
  img: string
  brandId: number
  typeId: number
  info: Array<DeviceInfo>
}

export interface IBasket {
  id: number
  basketId: number
  device: IDevice
  deviceId: number
}
