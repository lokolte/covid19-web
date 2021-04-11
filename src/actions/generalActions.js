/** @format */

export const delayFunction = (myFunction) => setTimeout(() => myFunction(), 1);

export const isDoctor = (roles) =>
  roles.map((rol) => rol.name).includes("PROFESIONAL_MEDICO");

export const isCoordinator = (roles) =>
  roles.map((rol) => rol.name).includes("COORDINADOR");

export const isAdmin = (roles) =>
  roles.map((rol) => rol.name).includes("ADMIN");
