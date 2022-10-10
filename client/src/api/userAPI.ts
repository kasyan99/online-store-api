import jwtDecode from "jwt-decode"
import { $authHost, $host } from "."
import { IUser } from "../models/models"

export const userAPI = {
  async registration(email: string, password: string) {
    const { data } = await $host.post("api/user/registration", {
      email,
      password,
      role: "ADMIN",
    })

    localStorage.setItem("token", data)

    return jwtDecode<IUser>(data)
  },

  async login(email: string, password: string) {
    const { data } = await $host.post("api/user/login", {
      email,
      password,
    })
    localStorage.setItem("token", data)
    return jwtDecode<IUser>(data)
  },

  async check() {
    const { data } = await $authHost.get("api/user/auth")

    localStorage.setItem("token", data.token)
    const res: IUser = jwtDecode(data.token)

    return res
  },

  async getBasketDevices(id: number) {
    const { data } = await $host.get("api/basket/", {
      params: {
        basketId: id,
      },
    })
    return data
  },

  async addDeviceToBasket(basketId: number, deviceId: number) {
    const { data } = await $host.post("api/basket/", {
      basketId,
      deviceId,
    })
    return data
  },

  async removeDeviceFromBasket(basketId: number, deviceId: number) {
    const { data } = await $host.delete("api/basket/", {
      data: {
        basketId,
        deviceId,
      },
    })
    return data
  },
}
