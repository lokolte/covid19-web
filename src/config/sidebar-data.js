/** @format */

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const Sidebar_Data = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
  },
  {
    title: "Formularios",
    path: "/forms",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
  },
  {
    title: "Consultas",
    path: "/patients",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
  },
  {
    title: "Pacientes",
    path: "/assign-patients",
    icon: <IoIcons.IoIosPerson />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
  },
  {
    title: "Mensajes",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
  },
];
