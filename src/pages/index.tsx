import { FormLogin } from "./components/login/form";

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import TokenManager from "@/utils/TokenManager";
import TableListLocations from "./components/table";
import PostosVacinas, { TypePostosVacinas } from "./api/PostosVacinas";
import Maps from "./components/maps/maps";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [token, setToken] = useState<string | null>(TokenManager.get());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postosVacinas, setPostosVacinas] = useState<TypePostosVacinas[]>([]);

  const updateData = async () => {
    try {
      const { data }: any = await PostosVacinas.getPostosVacinas();
      setPostosVacinas(data);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  };

  const fetchData = async () => {
    try {
      const { data }: any = await PostosVacinas.getPostosVacinas();
      setPostosVacinas(data);
    } catch (error) {
      console.error(error);
      setToken(null);
      TokenManager.remove();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setLocalStorageToken = (token: string) => {
    TokenManager.set(token);
    setToken(token);
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <main
      className={` ${geistSans.variable} ${geistMono.variable} bg-gradient w-[100vw] h-[100vh] flex items-center `}
    >
      <Maps data={postosVacinas} />
      <section className="px-[10px] w-[50%] h-full flex items-center flex-col justify-center gap-[40px] secBoxShadow ">
        <h1 className=" text-3xl font-bold tracking-tight ">Dev Johnny</h1>
        {isAuthenticated ? (
          <>
            <TableListLocations data={postosVacinas} updateData={updateData} />
          </>
        ) : (
          <FormLogin
            onLoginSuccess={(newToken) => setLocalStorageToken(newToken)}
          />
        )}
      </section>
    </main>
  );
}
