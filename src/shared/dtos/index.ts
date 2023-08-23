/**
 * Basic DTOs: mapped directly from DB
 */
export * from './basic/user.dto';
export * from './basic/refresh-token.dto';
export * from './basic/notification.dto';
export * from './basic/admin.dto';
export * from './basic/student.dto';
export * from './basic/lecturer.dto';
export * from './basic/role.dto';
export * from './basic/thesis.dto';
export * from './basic/field.dto';
export * from './basic/topic.dto';
export * from './basic/location.dto';
export * from './basic/bachelor-thesis-registration.dto';
export * from './basic/bachelor-thesis-assessment.dto';
export * from './basic/bachelor-thesis-evaluation.dto';
export * from './basic/oral-defense-registration.dto';
export * from './basic/oral-defense-assessment.dto';

/**
 * Other DTOs
 */
// Auth
export * from './auth/jwt-payload.dto';
export * from './auth/jwt-context.dto';
export * from './auth/jwt-refresh-payload.dto';
export * from './auth/jwt-refresh-context.dto';
export * from './auth/user-info.dto';

// API
export * from './api/admin-info.dto';
export * from './api/lecturer-info.dto';
export * from './api/student-info.dto';