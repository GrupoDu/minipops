"use client";

import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Logo from "@/assets/GRUPODU_WHITE.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiPackage } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineHandshake } from "react-icons/md";
import { FaChartColumn, FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { DEFAULT_PARAMS } from "@/constants/defaultParams.constant";
import { useLoading } from "@/hooks/useLoading";
import { PuffLoader } from "react-spinners";

function Sidebar() {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const options = [
    {
      option: "Dashboard",
      icon: LuLayoutDashboard,
      href: "/dashboard",
      disabled: false,
    },
    {
      option: "Pedidos",
      icon: IoDocumentTextOutline,
      href: `/pedidos?${DEFAULT_PARAMS}`,
      disabled: false,
    },
    {
      option: "Fornecedores",
      icon: BiPackage,
      href: `/fornecedores?${DEFAULT_PARAMS}`,
      disabled: false,
    },
    {
      option: "Clientes",
      icon: MdOutlineHandshake,
      href: `/clientes?${DEFAULT_PARAMS}`,
      disabled: false,
    },
    {
      option: "Gastos",
      icon: FaMoneyBillTransfer,
      href: `/gastos?${DEFAULT_PARAMS}`,
      disabled: false,
    },
    {
      option: "Analises",
      icon: FaChartColumn,
      href: "/analises",
      disabled: true,
    },
    {
      option: "Usuarios",
      icon: FaUserCog,
      href: `/usuarios?${DEFAULT_PARAMS}`,
      disabled: true,
    },
  ];
  const router = useRouter();
  const isOptionSelected = (option: string): boolean => {
    return pathname.includes(option.toLowerCase());
  };
  const handleLogout = async () => {
    try {
      await api.post("/login/logout");
      toast.success("Logout realizado com sucesso");
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      router.push("/login");
    }
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        {isLoading ? (
          <PuffLoader size={40} color={"#4AB56C"} />
        ) : (
          <Image
            src={Logo}
            alt={"GrupoDu Logo"}
            width={100}
            height={100}
            className={styles.logo}
          />
        )}
        <div className={styles.logoText}>
          <span>GrupoDu</span>
          <span className={styles.logoName}>Minipops</span>
        </div>
      </div>
      <div className={styles.menuContainer}>
        {options.map((option) => (
          <Link
            key={option.option}
            href={option.href}
            onClick={() => setIsLoading(true)}
            className={`${styles.menuItem} ${isOptionSelected(option.option) && styles.selected} ${option.disabled && styles.disabled}`}
          >
            <option.icon className={styles.menuIcon} />
            <span>{option.option}</span>
          </Link>
        ))}
      </div>
      <div onClick={handleLogout} className={styles.logoutContainer}>
        <IoIosLogOut />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default Sidebar;
