import { ROLES } from "../../core/constants/roles";

const roles = Object.values(ROLES);
export type Role = typeof roles[number];