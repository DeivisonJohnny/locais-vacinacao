import Link from "next/link";
import Maps from "./components/google-maps/maps";
import { FormLogin } from "./components/login/form";

import localFont from "next/font/local";
import { Github, Instagram, Linkedin } from "lucide-react";

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
  return (
    <main
      className={` ${geistSans.variable} ${geistMono.variable} bg-gradient w-[100vw] h-[100vh] flex items-center `}
    >
      <Maps></Maps>
      <section className="px-[10px] w-[50%] h-full flex items-center flex-col justify-center gap-[40px] secBoxShadow ">
        <h1 className=" text-3xl font-bold tracking-tight ">Dev Johnny</h1>
        <FormLogin />
        <nav className=" flex items-center flex-col gap-[35px] ">
          <div className="flex items-start flex-row gap-[25px] ">
            <Link
              href={"https://instagram.com/deivisonjohnny"}
              className=" hover:text-[#c4daff] "
            >
              <Instagram
                size={27}
                className=" transition-all duration-300 opacity-[50%] hover:opacity-[100%] hover:translate-y-[-13px] filter dropShadow dropShadowHover "
              />
            </Link>
            <Link
              href={"https://instagram.com/deivisonjohnny"}
              className=" hover:text-[#c4daff] "
            >
              <Linkedin
                size={27}
                className=" transition-all duration-300 opacity-[50%] hover:opacity-[100%] hover:translate-y-[-13px] filter dropShadow dropShadowHover "
              />
            </Link>
            <Link
              href={"https://instagram.com/deivisonjohnny"}
              className=" hover:text-[#c4daff] "
            >
              <Github
                size={27}
                className=" transition-all duration-300 opacity-[50%] hover:opacity-[100%] hover:translate-y-[-13px] filter dropShadow dropShadowHover "
              />
            </Link>
          </div>
          <div>
            <a href={"/assets/pdf/curriculo.pdf"} download>
              <div className="container">
                <label className="label">
                  <input type="checkbox" className="input" />
                  <span className="circle">
                    <svg
                      className="icon"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M12 19V5m0 14-4-4m4 4 4-4"
                      ></path>
                    </svg>
                    <div className="square"></div>
                  </span>
                  <p className="title">Download CV</p>
                  <p className="title">Iniciado</p>
                </label>
              </div>
            </a>
          </div>
        </nav>
      </section>
    </main>
  );
}
