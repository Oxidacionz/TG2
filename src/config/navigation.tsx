import { ReactNode } from "react";
import { MdSpaceDashboard, MdAttachMoney } from "react-icons/md";
import { IoScan, IoPeople, IoDocuments } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";

import { Role } from "../types";

export interface SidebarItemConfig {
  label: string;
  path: string;
  icon: ReactNode;
  roles?: Role[]; // Update type to use Enum
}

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <MdSpaceDashboard className="h-6 w-6" />,
  },
  {
    label: "Transacciones",
    path: "/transactions",
    icon: <GrTransaction className="h-6 w-6" />,
  },
  {
    label: "Tesorería",
    path: "/accounts",
    icon: <MdAttachMoney className="h-6 w-6" />,
  },
  {
    label: "Clientes",
    path: "/clients",
    icon: <IoPeople className="h-6 w-6" />,
  },
  {
    label: "Camellos",
    path: "/operators",
    icon: <FaUserTie className="h-6 w-6" />,
  },
  {
    label: "Notas",
    path: "/notes",
    icon: <IoDocuments className="h-6 w-6" />,
  },
  {
    label: "Gastos",
    path: "/expenses",
    icon: <MdAttachMoney className="h-6 w-6" />,
  },
  {
    label: "Reportes",
    path: "/reports",
    icon: <TbReportAnalytics className="h-6 w-6" />,
  },
];

export const DEV_SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    label: "Modo Dev",
    path: "/dev",
    icon: <IoScan className="h-6 w-6" />, // Using IoScan as generic/placeholder or we can import specific
    roles: [Role.DEV],
  },
];
