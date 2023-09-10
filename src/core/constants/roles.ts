import { valuesOf } from "../../utils/object-helpers";
import { ValueOf } from "../../utils/types";

export const Role = {
    Admin: 'Admin',
    Student: 'Student',
    Lecturer1_1: 'Lecturer1.1',
    Lecturer1_2: 'Lecturer1.2',
    Lecturer2: 'Lecturer2',
} as const;

export type Role = ValueOf<typeof Role>;

export const Roles = valuesOf(Role);

export const LecturerRoles = [Role.Lecturer1_1, Role.Lecturer1_2, Role.Lecturer2] as const;