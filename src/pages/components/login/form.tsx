"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import SessionApi from "@/pages/api/SessionApi";
import Links from "./links";

const FormSchema = z.object({
  username: z.string().min(5, {
    message: "Usuario deve ter ao menos 5 caracteres",
  }),
  password: z.string().min(8, {
    message: "Usuario deve ter ao menos 8 caracteres",
  }),
});

interface FormLoginProps {
  onLoginSuccess: (token: string) => void;
}

export const FormLogin = ({ onLoginSuccess }: FormLoginProps) => {
  const { toast } = useToast();


  const [username] = useState("devjohnny");
  const [password] = useState("mecontrate");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: username,
      password: password,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await SessionApi.create(data);

      if (result.status != 200) {
        toast({
          title: "Usuario e/ou invalida",
          description: "Use o usuario padrão",
          className: "toast",
        });
      }


      onLoginSuccess(result.token);
    } catch (error) {
      console.log("Erro inesperado - > ", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" lg:w-[80%] xl:w-[60%] max- w-[90%] flex items-center flex-col gap-8 transition-all duration-300 "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-0 ">
                <FormLabel className=" before:content-['*_'] before:text-[red] before:font-bold font-bold">
                  Usuario
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Usuario"
                    {...field}
                    className="border-[#c4daffb4] "
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-0 ">
                <FormLabel className=" before:content-['*_'] before:text-[red] before:font-bold font-bold">
                  Senha
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Senha"
                    {...field}
                    className="border-[#c4daffb4] "
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-[#1f6df5] font-bold tracking-[0.8px]"
          >
            Acessar
          </Button>
        </form>
      </Form>
      <Links />
    </>
  );
};
