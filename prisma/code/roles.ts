export const ROLES = ['Admin', 'Student', 'Lecturer1.1', 'Lecturer1.2', 'Lecturer2'] as const;
export type Role = typeof ROLES[number];

export const ROLE_IDS: { readonly [role in Role]: number } = ROLES.reduce((res, role, index) => { 
    res[role] = index + 1; 
    return res; 
}, {} as { [role in Role]: number });