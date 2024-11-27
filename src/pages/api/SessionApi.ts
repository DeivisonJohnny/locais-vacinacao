import Api from "@/utils/api";
import ApiError from "@/utils/ApiError";

export type inputLogin = {
  username: string;
  password: string;
};

export type Login = {
  token: string;
  status: number;
};

export default class SessionApi {
  static async create({ username, password }: inputLogin) {
    try {
      const { data, status } = await Api.post("auth/login", {
        username,
        password
      });

      if (!data || !status) {
        throw new ApiError("Dados não coletados para retorno");
      }

      return { ...data, status };
    } catch (error) {
      console.log("🚀 ~ SessionApi ~ create ~ error:", error)
      return error;
    }
  }
}
