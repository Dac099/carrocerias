"use client";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { usePathname } from "next/navigation";
import { getTitleFromPath } from "./utils";
import { useState } from "react";
import Link from "next/link";

export default function AppSidebar() {
  const pathname = usePathname();
  const [visibleSidebar, setVisibleSidebar] = useState(false);

  return (
    <article className="flex items-center justify-between px-3 py-1">
      <h1 className="text-xl">
        Carrocerías David{" "}
        <span className="text-lg text-indigo-400 font-semibold">
          &#123;{getTitleFromPath(pathname)}&#125;
        </span>
      </h1>
      <Button
        icon="pi pi-arrow-right"
        className="h-10"
        onClick={() => setVisibleSidebar(true)}
      />
      <Sidebar
        visible={visibleSidebar}
        onHide={() => setVisibleSidebar(false)}
        position="left"
      >
        <nav className="flex flex-col">
          <Link
            className={`my-1 cursor-pointer rounded-sm px-2 py-1 hover:bg-white/5 ${
              getTitleFromPath(pathname) === "Inicio" && "bg-white/20"
            }`}
            href="/"
          >
            Inicio
          </Link>
          <Link
            className={`my-1 cursor-pointer rounded-sm px-2 py-1 hover:bg-white/5 ${
              getTitleFromPath(pathname) === "Generador" && "bg-white/20"
            }`}
            href={"/generator"}
          >
            Cotizador
          </Link>
          <Link
            className={`my-1 cursor-pointer rounded-sm px-2 py-1 hover:bg-white/5 ${
              getTitleFromPath(pathname) === "Cotizaciones" && "bg-white/20"
            }`}
            href={"/quotes"}
          >
            Cotizaciones
          </Link>
          <Link
            className={`my-1 cursor-pointer rounded-sm px-2 py-1 hover:bg-white/5 ${
              getTitleFromPath(pathname) === "Clientes" && "bg-white/20"
            }`}
            href={"/clients"}
          >
            Clientes
          </Link>
          <Link
            className={`my-1 cursor-pointer rounded-sm px-2 py-1 hover:bg-white/5 ${
              getTitleFromPath(pathname) === "Productos" && "bg-white/20"
            }`}
            href={"/products"}
          >
            Productos
          </Link>
          <Link
            className={`my-1 cursor-pointer rounded-sm px-2 py-1 hover:bg-white/5 ${
              getTitleFromPath(pathname) === "Proveedores" && "bg-white/20"
            }`}
            href={"/suppliers"}
          >
            Proveedores
          </Link>
        </nav>
      </Sidebar>
    </article>
  );
}
