/** @format */
import { SidebarData } from "./sidebar-data";
import { Link } from "react-router-dom";

function SideBarItem(props) {
  return SidebarData.map((item, index) => {
    return props.active ? (
      <li key={index} className={item.cName}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    ) : (
      <li key={index} className={item.cNameAlt}>
        <Link to={item.path}>{item.icon}</Link>
      </li>
    );
  });
}

export default SideBarItem;
