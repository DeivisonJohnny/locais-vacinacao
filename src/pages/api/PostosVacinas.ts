import Api from "@/utils/api";



export type Vacina = {
    quantidade: number;
    descricao: string;
    id: number;
    tipo: string;
    nome: string;
  };
  
  export type TypePostosVacinas = {
    id: number;
    nome: string;
    endereco: string;
    latitude: string;
    longitude: string;
    vacinas: {
      [key: string]: Vacina;
    };
  };

export default class PostosVacinas {

    static async getPostosVacinas() {
        const data = await Api.get("postos-vacinas");

        return data;
    }

}