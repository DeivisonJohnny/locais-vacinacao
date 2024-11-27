import SessionApi, { inputLogin } from "@/pages/api/SessionApi";
import ApiError from "@/utils/ApiError";
import { AxiosError } from "axios";

export type NotLogin = {
  status: string;
  code: number;
  message: string;
};

export default class SessionController {
  static async create(
    data: inputLogin
  ): Promise<AxiosError | { status: string }> {
    if (!data.username || !data.password) {
      throw new ApiError("Dados fornecidos incompletos");
    }

    try {
      const result = await SessionApi.create(data);
      console.log("🚀 ~ SessionController ~ result:", result)

      if (!result.token || !result.status) {
        throw {
          status: result.status,
          code: result.code,
          message: result.message,
        } as NotLogin;
      }

      // Habilidat no final
      // TokenManager.set(result.token);

      // const validToken = Jwt.verify();
      // console.log("🚀 ~ SessionController ~ validToken:", validToken);

      return { status: result.status };
    } catch (error) {
      console.log("🚀 Erro inesperado 111", error);

      return error as AxiosError;
    }
  }
}
