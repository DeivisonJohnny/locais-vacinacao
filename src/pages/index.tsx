import { FormLogin } from "./components/login/form";

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import TokenManager from "@/utils/TokenManager";
import TableListLocations from "./components/table";
import PostosVacinas, { TypePostosVacinas } from "./api/PostosVacinas";
import Maps from "./components/maps/maps";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";

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
  const [widthWidows, setWidthWidows] = useState<number | null>();

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

    const handleResize = () => {
      setWidthWidows(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  console.log(widthWidows);

  return (
    <main
      className={` ${geistSans.variable} ${geistMono.variable} bg-gradient w-[100vw] h-[100vh] flex items-center`}
    >
      {widthWidows && widthWidows > 800 ? (
        <Maps data={postosVacinas} />
      ) : (
        <Dialog  >
          <DialogTrigger className="absolute top-[20px] right-[20px] z-[52] bg-[#4b00cb] " asChild>
            <Button>
              <MapIcon />
              <span>Mapa</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] h-[90vh] max-w-none m-0 p-0 border-none z-[54] rounded-[10px] overflow-hidden ">
            <Maps data={postosVacinas} />
          </DialogContent>
        </Dialog>
      )}

      <section
        className={`px-[10px] ${
          widthWidows && widthWidows > 800 ? "w-[50%]" : "w-[100%]"
        } h-full flex items-center flex-col justify-center gap-[40px] secBoxShadow`}
      >
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
