import { ReactNode } from "react";
import { GrTransaction } from "react-icons/gr";
import { MdAttachMoney, MdSpaceDashboard } from "react-icons/md";

import { Role } from "@/types";

export interface SidebarItemConfig {
  label: string;
  path: string;
  icon: ReactNode;
  roles?: Role[];
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
];

export const DEV_SIDEBAR_ITEMS: SidebarItemConfig[] = [];
