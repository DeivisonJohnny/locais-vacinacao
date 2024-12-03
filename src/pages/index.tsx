import { FormLogin } from "./components/login/form";

import localFont from "next/font/local";
import Layout from "./components/layout";
import { useEffect, useState } from "react";
import TokenManager from "@/utils/TokenManager";
import TableListLocations from "./components/table";
import PostosVacinas, { TypePostosVacinas } from "./api/PostosVacinas";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }:any = await PostosVacinas.getPostosVacinas();
        setPostosVacinas(data);
      } catch (error) {
        console.error(error);
        setToken(null);
        TokenManager.remove();
      }
    };

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
      <Layout>
        <h1 className=" text-3xl font-bold tracking-tight ">Dev Johnny</h1>
        {isAuthenticated ? (
          <>
            <TableListLocations data={postosVacinas} />
          </>
        ) : (
          <FormLogin
            onLoginSuccess={(newToken) => setLocalStorageToken(newToken)}
          />
        )}
      </Layout>
    </main>
  );
}
