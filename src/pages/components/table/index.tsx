import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styled from "styled-components";
import { TypePostosVacinas } from "@/pages/api/PostosVacinas";



export default function TableListLocations({data}: {data: TypePostosVacinas[]}) {


  const FormSchema = z.object({
    nome: z.string().min(3, {
      message: "Nome deve ter ao menos 3 caracteres",
    }),
    endereco: z.string().min(3, {
      message: "Endereço deve ter ao menos 3 caracteres",
    }),
    latitude: z.string().min(5, {
      message: "Latitude deve ter ao menos 5 caracteres",
    }),
    longitude: z.string().min(5, {
      message: "Longitude deve ter ao menos 5 caracteres",
    }),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      endereco: "",
      latitude: "",
      longitude: "",
    },
  });

  const handleEdit = (posto: TypePostosVacinas) => {
    form.setValue("nome", posto.nome);
    form.setValue("endereco", posto.endereco);
    form.setValue("latitude", posto.latitude);
    form.setValue("longitude", posto.longitude);
  };

  return (
    <Table className="table-body-main">
      <TableCaption>Lista dos locais de vacinação</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Vacinas</TableHead>
          <TableHead className="text-right">Editar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((posto) => (
          <TableRow key={posto.id}>
            <TableCell className="font-medium">{posto.nome}</TableCell>
            <TableCell>{posto.endereco}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className=" bg-violet-600">
                    <EyeClosed className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent style={{ zIndex: 1000 }}>
                  <DialogHeader>
                    <DialogTitle>Vacinas do posto {posto.nome}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center text-[white] font-bold ">Nome</TableHead>
                          <TableHead className="text-center text-[white] font-bold ">
                            Descrição
                          </TableHead>
                          <TableHead className="text-center text-[white] font-bold ">Tipo</TableHead>
                          <TableHead className="text-center text-[white] font-bold ">
                            Quantidade
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.values(posto.vacinas).map((vacina) => (
                          <TableRow key={vacina.id}>
                            <TableCell className="text-center text-[white] ">
                              {vacina.nome}
                            </TableCell>
                            <TableCell className="text-center text-[white] ">
                              {vacina.descricao}
                            </TableCell>
                            <TableCell className="text-center text-[white] ">
                              {vacina.tipo}
                            </TableCell>
                            <TableCell className="text-center text-[white] ">
                              {vacina.quantidade}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className=" bg-blue-600"
                    onClick={() => handleEdit(posto)} 
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent style={{ zIndex: 1000 }}>
                  <DialogHeader>
                    <DialogTitle>Edite dados do posto</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2"
                      >
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem className="text-[white] ">
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="endereco"
                          render={({ field }) => (
                            <FormItem className="text-[white] ">
                              <FormLabel>Endereço</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <ContainerInputCoords>
                          <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                              <FormItem className="w-full text-[white] ">
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                              <FormItem className="w-full text-[white] ">
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </ContainerInputCoords>
                        <Button
                          type="submit"
                          className="w-full mt-3 bg-blue-800 font-bold tracking-[0.8px]"
                        >
                          <p>Salvar</p>
                        </Button>
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const ContainerInputCoords = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
