import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Links() {
  return (
    <nav className=" flex items-center flex-col gap-[35px] ">
      <div className="flex items-start flex-row gap-[25px] ">
        <Link
          href={"https://instagram.com/deivisonjohnny"}
          className=" hover:text-[#c4daff] w-[45px] h-[45px] flex items-center justify-center "
        >
          <Instagram
            size={30}
            className=" transition-all duration-300 opacity-[50%] hover:opacity-[100%] hover:translate-y-[-13px] filter dropShadow dropShadowHover "
          />
        </Link>
        <Link
          href={"https://instagram.com/deivisonjohnny"}
          className=" hover:text-[#c4daff] w-[45px] h-[45px] flex items-center justify-center "
        >
          <Linkedin
            size={30}
            className=" transition-all duration-300 opacity-[50%] hover:opacity-[100%] hover:translate-y-[-13px] filter dropShadow dropShadowHover "
          />
        </Link>
        <Link
          href={"https://instagram.com/deivisonjohnny"}
          className=" hover:text-[#c4daff] w-[45px] h-[45px] flex items-center justify-center "
        >
          <Github
            size={30}
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
  );
}
