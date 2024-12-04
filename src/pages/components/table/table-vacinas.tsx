import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { TypePostosVacinas } from "@/pages/api/PostosVacinas";

const TableVacinas = ({ vacinas }: { vacinas: TypePostosVacinas['vacinas'] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Nome</TableHead>
          <TableHead className="text-center">Descrição</TableHead>
          <TableHead className="text-center">Tipo</TableHead>
          <TableHead className="text-center">Quantidade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(vacinas).map((vacina) => (
          <TableRow key={vacina.id}>
            <TableCell className="text-center">{vacina.name}</TableCell>
            <TableCell className="text-center">{vacina.descricao}</TableCell>
            <TableCell className="text-center">{vacina.tipo}</TableCell>
            <TableCell className="text-center">{vacina.quantidade}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  

export default TableVacinas;