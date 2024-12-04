import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import styled from "styled-components";
import { useForm } from "react-hook-form";

export const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Nome deve ter ao menos 3 caracteres" }),
  endereco: z.string().min(3, { message: "Endereço deve ter ao menos 3 caracteres" }),
  latitude: z.string().min(5, { message: "Latitude deve ter ao menos 5 caracteres" }),
  longitude: z.string().min(5, { message: "Longitude deve ter ao menos 5 caracteres" }),
});

export type FormValues = z.infer<typeof FormSchema>;

export const FormPosto = ({ 
  form, 
  onSubmit 
}: { 
  form: ReturnType<typeof useForm<FormValues>>,
  onSubmit: (data: FormValues) => Promise<void>
}) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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
            <FormItem className="w-full">
              <FormLabel>Latitude</FormLabel>
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
            <FormItem className="w-full">
              <FormLabel>Longitude</FormLabel>
              <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      </ContainerInputCoords>
      <Button type="submit" className="w-full mt-3 bg-blue-800">
        Salvar
      </Button>
    </form>
  </Form>
);

const ContainerInputCoords = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`; 