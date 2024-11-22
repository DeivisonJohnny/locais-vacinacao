"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"


const FormSchema = z.object({
  username: z.string().min(5, {
    message: "Usuario deve ter ao menos 5 caracteres",
  }),
  password: z.string().min(8, {
    message: "Usuario deve ter ao menos 8 caracteres",
  }),
})

export function FormLogin() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" lg:w-[80%] xl:w-[60%] max- w-[90%] flex items-center flex-col gap-8 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-0 " >
              <FormLabel className=" before:content-['*_'] before:text-[red] before:font-bold ">Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-0 " >
              <FormLabel className=" before:content-['*_'] before:text-[red] before:font-bold ">Senha</FormLabel>
              <FormControl>
                <Input placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#1f6df5] font-bold tracking-[0.8px]" >Acessar</Button>
      </form>
    </Form>
  )
}
