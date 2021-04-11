/** @format */
import { Sidebar_Data } from "../../config/sidebar-data";
import { Link } from "react-router-dom";

function SideBarItem(props) {
  let roles = props.roles;
  var rolesNames = roles.map(function (rol) {
    return rol.name;
  });
  return Sidebar_Data.filter((item) =>
    rolesNames.map((rol) => item.roles.includes(rol)).includes(true)
  ).map((item, index) => {
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
