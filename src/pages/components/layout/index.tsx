import { ReactNode } from "react";
import Maps from "../maps/maps";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Maps />
      <section className="px-[10px] w-[50%] h-full flex items-center flex-col justify-center gap-[40px] secBoxShadow ">
        {children}
      </section>
    </>
  );
}
