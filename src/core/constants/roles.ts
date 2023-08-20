export const ROLES = {
    Admin: 'Admin',
    Student: 'Student',
    Lecturer1_1: 'Lecturer1.1',
    Lecturer1_2: 'Lecturer1.2',
    Lecturer2: 'Lecturer2',
} as const;

export const RoleValues = Object.values(ROLES);

export const LecturerRoles = [ROLES.Lecturer1_1, ROLES.Lecturer1_2, ROLES.Lecturer2] as const;