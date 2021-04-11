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
    roles: ["ADMIN", "PROFESIONAL_MEDICO", "COORDINADOR"],
  },
  {
    title: "Formularios",
    path: "/forms",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN", "PROFESIONAL_MEDICO", "COORDINADOR"],
  },
  {
    title: "Respuestas",
    path: "/patients",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN", "PROFESIONAL_MEDICO"],
  },
  {
    title: "Pacientes",
    path: "/assign-patients",
    icon: <IoIcons.IoIosPerson />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN", "COORDINADOR"],
  },
  {
    title: "Hospitales",
    path: "/hospitals",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN", "PROFESIONAL_MEDICO", "COORDINADOR"],
  },
  {
    title: "Usuarios",
    path: "/doctors",
    icon: <IoIcons.IoIosPerson />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN", "COORDINADOR"],
  },
  {
    title: "Coordinadores",
    path: "/coordinators",
    icon: <IoIcons.IoIosPerson />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN"],
  },
  {
    title: "Mensajes",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN", "PROFESIONAL_MEDICO", "COORDINADOR"],
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
    cNameAlt: "nav-text-alternative",
    roles: ["ADMIN", "PROFESIONAL_MEDICO", "COORDINADOR"],
  },
];
