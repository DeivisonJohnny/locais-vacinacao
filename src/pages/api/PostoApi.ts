import Api from "@/utils/api";

export type TypePosto = {
  id: string;
  name: string;
  endereco: string;
  latitude: string;
  longitude: string;
};

export default class PostoApi {
  static async putPosto(id: string, data: TypePosto) {
    try {
      const response = await Api.put(`posto/${id}`, data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
