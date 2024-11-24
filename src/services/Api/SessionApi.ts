import Api from "@/utils/api";

export type Login = {
  username: string;
  password: string;
};

export default class SessionApi {
  static async create({username, password}: Login) {
    const {data, status} = await Api.post("auth/login", {username, password});
    console.log("🚀 ~ SessionApi ~ login ~ status:", status)
    return data;
  }
}
