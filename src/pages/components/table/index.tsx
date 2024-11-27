import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableListLocations() {
  const data = [
    {
      id: {
        postoId: 21,
        vacinaId: 21,
      },
      posto: {
        id: 21,
        name: "Posto Central",
        endereco: "Rua A, 123, Centro",
        latitude: "-23.550520",
        longitude: "-46.633308",
      },
      vacina: {
        id: 21,
        name: "BCG",
        description: "Vacina contra tuberculose",
        tipo: "Bacteriana",
      },
      amount: 50,
    },
    {
      id: {
        postoId: 21,
        vacinaId: 22,
      },
      posto: {
        id: 21,
        name: "Posto Central",
        endereco: "Rua A, 123, Centro",
        latitude: "-23.550520",
        longitude: "-46.633308",
      },
      vacina: {
        id: 22,
        name: "Hepatite B",
        description: "Vacina contra Hepatite B",
        tipo: "Viral",
      },
      amount: 75,
    },
    {
      id: {
        postoId: 21,
        vacinaId: 23,
      },
      posto: {
        id: 21,
        name: "Posto Central",
        endereco: "Rua A, 123, Centro",
        latitude: "-23.550520",
        longitude: "-46.633308",
      },
      vacina: {
        id: 23,
        name: "Tríplice Viral",
        description: "Vacina contra sarampo, caxumba e rubéola",
        tipo: "Viral",
      },
      amount: 60,
    },
    {
      id: {
        postoId: 22,
        vacinaId: 24,
      },
      posto: {
        id: 22,
        name: "Posto Norte",
        endereco: "Avenida B, 456, Zona Norte",
        latitude: "-23.540520",
        longitude: "-46.620308",
      },
      vacina: {
        id: 24,
        name: "Febre Amarela",
        description: "Vacina contra febre amarela",
        tipo: "Viral",
      },
      amount: 40,
    },
    {
      id: {
        postoId: 22,
        vacinaId: 25,
      },
      posto: {
        id: 22,
        name: "Posto Norte",
        endereco: "Avenida B, 456, Zona Norte",
        latitude: "-23.540520",
        longitude: "-46.620308",
      },
      vacina: {
        id: 25,
        name: "DTP",
        description: "Vacina contra difteria, tétano e coqueluche",
        tipo: "Bacteriana",
      },
      amount: 90,
    },
    {
      id: {
        postoId: 23,
        vacinaId: 26,
      },
      posto: {
        id: 23,
        name: "Posto Sul",
        endereco: "Rua C, 789, Zona Sul",
        latitude: "-23.570520",
        longitude: "-46.640308",
      },
      vacina: {
        id: 26,
        name: "HPV",
        description: "Vacina contra papilomavírus humano",
        tipo: "Viral",
      },
      amount: 45,
    },
    {
      id: {
        postoId: 23,
        vacinaId: 27,
      },
      posto: {
        id: 23,
        name: "Posto Sul",
        endereco: "Rua C, 789, Zona Sul",
        latitude: "-23.570520",
        longitude: "-46.640308",
      },
      vacina: {
        id: 27,
        name: "Meningocócica",
        description: "Vacina contra meningite",
        tipo: "Bacteriana",
      },
      amount: 35,
    },
    {
      id: {
        postoId: 24,
        vacinaId: 28,
      },
      posto: {
        id: 24,
        name: "Posto Leste",
        endereco: "Avenida D, 1011, Zona Leste",
        latitude: "-23.560520",
        longitude: "-46.650308",
      },
      vacina: {
        id: 28,
        name: "Influenza",
        description: "Vacina contra gripe",
        tipo: "Viral",
      },
      amount: 100,
    },
    {
      id: {
        postoId: 24,
        vacinaId: 29,
      },
      posto: {
        id: 24,
        name: "Posto Leste",
        endereco: "Avenida D, 1011, Zona Leste",
        latitude: "-23.560520",
        longitude: "-46.650308",
      },
      vacina: {
        id: 29,
        name: "Varicela",
        description: "Vacina contra catapora",
        tipo: "Viral",
      },
      amount: 80,
    },
    {
      id: {
        postoId: 25,
        vacinaId: 21,
      },
      posto: {
        id: 25,
        name: "Posto Oeste",
        endereco: "Rua E, 1213, Zona Oeste",
        latitude: "-23.580520",
        longitude: "-46.630308",
      },
      vacina: {
        id: 21,
        name: "BCG",
        description: "Vacina contra tuberculose",
        tipo: "Bacteriana",
      },
      amount: 65,
    },
    {
      id: {
        postoId: 25,
        vacinaId: 30,
      },
      posto: {
        id: 25,
        name: "Posto Oeste",
        endereco: "Rua E, 1213, Zona Oeste",
        latitude: "-23.580520",
        longitude: "-46.630308",
      },
      vacina: {
        id: 30,
        name: "Poliomielite",
        description: "Vacina contra poliomielite",
        tipo: "Viral",
      },
      amount: 70,
    },
    {
      id: {
        postoId: 26,
        vacinaId: 22,
      },
      posto: {
        id: 26,
        name: "Posto Saúde",
        endereco: "Rua F, 1314, Saúde",
        latitude: "-23.590520",
        longitude: "-46.610308",
      },
      vacina: {
        id: 22,
        name: "Hepatite B",
        description: "Vacina contra Hepatite B",
        tipo: "Viral",
      },
      amount: 55,
    },
    {
      id: {
        postoId: 27,
        vacinaId: 23,
      },
      posto: {
        id: 27,
        name: "Posto Vila",
        endereco: "Avenida G, 1516, Vila Nova",
        latitude: "-23.530520",
        longitude: "-46.600308",
      },
      vacina: {
        id: 23,
        name: "Tríplice Viral",
        description: "Vacina contra sarampo, caxumba e rubéola",
        tipo: "Viral",
      },
      amount: 85,
    },
    {
      id: {
        postoId: 28,
        vacinaId: 24,
      },
      posto: {
        id: 28,
        name: "Posto Esperança",
        endereco: "Rua H, 1718, Esperança",
        latitude: "-23.500520",
        longitude: "-46.590308",
      },
      vacina: {
        id: 24,
        name: "Febre Amarela",
        description: "Vacina contra febre amarela",
        tipo: "Viral",
      },
      amount: 95,
    },
    {
      id: {
        postoId: 28,
        vacinaId: 29,
      },
      posto: {
        id: 28,
        name: "Posto Esperança",
        endereco: "Rua H, 1718, Esperança",
        latitude: "-23.500520",
        longitude: "-46.590308",
      },
      vacina: {
        id: 29,
        name: "Varicela",
        description: "Vacina contra catapora",
        tipo: "Viral",
      },
      amount: 60,
    },
    {
      id: {
        postoId: 29,
        vacinaId: 25,
      },
      posto: {
        id: 29,
        name: "Posto Família",
        endereco: "Avenida I, 1920, Família",
        latitude: "-23.510520",
        longitude: "-46.580308",
      },
      vacina: {
        id: 25,
        name: "DTP",
        description: "Vacina contra difteria, tétano e coqueluche",
        tipo: "Bacteriana",
      },
      amount: 65,
    },
    {
      id: {
        postoId: 29,
        vacinaId: 28,
      },
      posto: {
        id: 29,
        name: "Posto Família",
        endereco: "Avenida I, 1920, Família",
        latitude: "-23.510520",
        longitude: "-46.580308",
      },
      vacina: {
        id: 28,
        name: "Influenza",
        description: "Vacina contra gripe",
        tipo: "Viral",
      },
      amount: 75,
    },
    {
      id: {
        postoId: 30,
        vacinaId: 26,
      },
      posto: {
        id: 30,
        name: "Posto Alegria",
        endereco: "Rua J, 2122, Alegria",
        latitude: "-23.520520",
        longitude: "-46.570308",
      },
      vacina: {
        id: 26,
        name: "HPV",
        description: "Vacina contra papilomavírus humano",
        tipo: "Viral",
      },
      amount: 50,
    },
    {
      id: {
        postoId: 30,
        vacinaId: 27,
      },
      posto: {
        id: 30,
        name: "Posto Alegria",
        endereco: "Rua J, 2122, Alegria",
        latitude: "-23.520520",
        longitude: "-46.570308",
      },
      vacina: {
        id: 27,
        name: "Meningocócica",
        description: "Vacina contra meningite",
        tipo: "Bacteriana",
      },
      amount: 30,
    },
  ];

  return (
    <Table>
      <TableCaption> Lista dos locais de vacinação </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Vacinas</TableHead>
          <TableHead className="text-right">Editar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((dados, ind) => {
          console.log("🚀 ~ {data.map ~ ind:", ind);
          console.log("🚀 ~ {data.map ~ dados:", dados);
          return (
            <TableRow key={ind}>
              <TableCell className="font-medium">{dados.posto.name}</TableCell>
              <TableCell>{dados.posto.endereco}</TableCell>
              <TableCell>{dados.vacina.name}</TableCell>
              <TableCell className="text-right">
                <button>Editar</button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
