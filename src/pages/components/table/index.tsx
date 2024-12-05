import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EyeClosed, Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { TypePostosVacinas } from "@/pages/api/PostosVacinas";
import PostoApi, { TypePosto } from "@/pages/api/PostoApi";
import { FormPosto, FormSchema, FormValues } from "./form-posto";
import TableVacinas from "./table-vacinas";

interface TableListLocationsProps {
  data: TypePostosVacinas[];
  updateData: () => void;
}

const TableRowPosto = ({
  posto,
  onEdit,
}: {
  posto: TypePostosVacinas;
  onEdit: (posto: TypePosto) => void;
}) => (
  <TableRow key={`posto-${posto.id}`}>
    <TableCell className="font-medium">{posto.name}</TableCell>
    <TableCell>{posto.endereco}</TableCell>
    <TableCell>
      <VacinasDialog posto={posto} />
    </TableCell>
    <TableCell className="text-right">
      <Button className="bg-blue-600" onClick={() => onEdit(posto)}>
        <Pencil className="w-4 h-4" />
      </Button>
    </TableCell>
  </TableRow>
);

const VacinasDialog = ({ posto }: { posto: TypePostosVacinas }) => (
  <Dialog>
    {Array.isArray(posto.vacinas) && posto.vacinas.length > 0 ? (
      <DialogTrigger asChild>
        <Button className="bg-violet-600">
          <EyeClosed className="w-4 h-4" />
        </Button>
      </DialogTrigger>
    ) : (
      <p className="text-[gray] text-center ">Vazio</p>
    )}
    {Array.isArray(posto.vacinas) && posto.vacinas.length > 0 && (
      <DialogContent style={{ zIndex: 1000 }}>
        <DialogHeader>
          <DialogTitle>Vacinas do posto {posto.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <TableVacinas vacinas={posto.vacinas} />
        </DialogDescription>
      </DialogContent>
    )}
  </Dialog>
);

export default function TableListLocations({
  data,
  updateData,
}: TableListLocationsProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const fields: (keyof FormValues)[] = [
      "id",
      "name",
      "endereco",
      "latitude",
      "longitude",
    ];
    fields.forEach((field) => form.setValue(field, posto[field].toString()));
    setIsDialogOpen(true);
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      const { data }: any = await PostoApi.putPosto(
        formData.id,
        formData as TypePosto
      );

      if (data.status !== 201) {
        toast({
          title: "Erro ao atualizar posto",
          description: data.message,
        });
        console.log(data);
        return;
      }

      toast({
        title: "Posto atualizado com sucesso",
        description: "Os dados do posto foram atualizados com sucesso.",
        duration: 1000,
      });

      setIsDialogOpen(false);
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
    <>
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
            <TableRowPosto
              key={`posto-${posto.id}`}
              posto={posto}
              onEdit={handleEdit}
            />
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent style={{ zIndex: 1000 }}>
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <FormPosto form={form} onSubmit={onSubmit} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
