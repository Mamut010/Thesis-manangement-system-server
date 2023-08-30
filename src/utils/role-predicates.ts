import { AuthorizedUser } from "../core/auth-checkers";
import { Role } from "../core/constants/roles";

export function hasRole(user: AuthorizedUser, role: Role): boolean {
    return user.roles.findIndex(item => item === role) > -1;
}

export function isAdmin(user: AuthorizedUser): boolean {
    return hasRole(user, Role.Admin);
}

export function isStudent(user: AuthorizedUser): boolean {
    return hasRole(user, Role.Student);
}

export function isLecturer(user: AuthorizedUser): boolean {
    return isLecturer1_1(user) || isLecturer1_2(user) || isLecturer2(user);
}

export function isLecturer1_1(user: AuthorizedUser): boolean {
    return hasRole(user, Role.Lecturer1_1);
}

export function isLecturer1_2(user: AuthorizedUser): boolean {
    return hasRole(user, Role.Lecturer1_2);
}

export function isLecturer2(user: AuthorizedUser): boolean {
    return hasRole(user, Role.Lecturer2);
}