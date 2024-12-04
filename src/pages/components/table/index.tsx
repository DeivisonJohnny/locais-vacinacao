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
import PostoApi, { TypePosto } from "@/pages/api/PostoApi";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import TableVacinas from "./table-vacinas";
import { FormPosto, FormSchema, FormValues } from "./form-posto";

export default function TableListLocations({
  data,
  updateData,
}: {
  data: TypePostosVacinas[];
  updateData: () => void;
}) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controle do diálogo
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "",
      name: "",
      endereco: "",
      latitude: "",
      longitude: "",
    },
  });

  const handleEdit = (posto: TypePosto) => {
    const fields: (keyof FormValues)[] = ['id', 'name', 'endereco', 'latitude', 'longitude'];
    fields.forEach(field => form.setValue(field, posto[field].toString()));
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      const { data }: any = await PostoApi.putPosto(formData.id, formData as TypePosto);

      if (data.status !== 200) {
        toast({
          title: "Erro ao atualizar posto",
          description: data.message,
        });
        return;
      }

      toast({
        title: "Posto atualizado com sucesso",
        description: "Os dados do posto foram atualizados com sucesso.",
      });

      updateData();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao atualizar o posto.",
      });
    }
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
          <TableRow key={`posto-${posto.id}`}>
            <TableCell className="font-medium">{posto.name}</TableCell>
            <TableCell>{posto.endereco}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-violet-600">
                    <EyeClosed className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent style={{ zIndex: 1000 }}>
                  <DialogHeader>
                    <DialogTitle>Vacinas do posto {posto.name}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription asChild>
                    <TableVacinas vacinas={posto.vacinas} />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-blue-600"
                    onClick={() => handleEdit(posto)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent style={{ zIndex: 1000 }}>
                  <DialogHeader>
                    <DialogTitle>Edite dados do posto</DialogTitle>
                  </DialogHeader>
                  <DialogDescription asChild>
                    <FormPosto form={form} onSubmit={onSubmit} />
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
