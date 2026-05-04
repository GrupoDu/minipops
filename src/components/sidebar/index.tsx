"use client";

import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Logo from "@/assets/GRUPODU_WHITE.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiPackage } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineHandshake } from "react-icons/md";
import { FaChartColumn } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";

function Sidebar() {
  const pathname = usePathname();
  const options = [
    { option: "Dashboard", icon: LuLayoutDashboard },
    { option: "Pedidos", icon: IoDocumentTextOutline },
    { option: "Fornecedores", icon: BiPackage },
    { option: "Clientes", icon: MdOutlineHandshake },
    { option: "Analises", icon: FaChartColumn },
    { option: "Usuarios", icon: FaUserCog },
  ];
  const isOptionSelected = (option: string): boolean => {
    return pathname.includes(option.toLowerCase());
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <Image
          src={Logo}
          alt={"GrupoDu Logo"}
          width={100}
          height={100}
          className={styles.logo}
        />
        <div className={styles.logoText}>
          <span>GrupoDu</span>
          <span className={styles.logoName}>Minipops</span>
        </div>
      </div>
      <div className={styles.menuContainer}>
        {options.map((option) => (
          <Link
            key={option.option}
            href={option.option.toLowerCase()}
            className={`${styles.menuItem} ${isOptionSelected(option.option) && styles.selected}`}
          >
            <option.icon className={styles.menuIcon} />
            <span>{option.option}</span>
          </Link>
        ))}
      </div>
      <div className={styles.logoutContainer}>
        <IoIosLogOut />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default Sidebar;
