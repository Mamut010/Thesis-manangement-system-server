/**
 * Basic DTOs: mapped directly from DB
 */
export * from './user.dto';
export * from './refresh-token.dto';
export * from './notification.dto';
export * from './admin-info.dto';
export * from './student-info.dto';
export * from './lecturer-info.dto';
export * from './role.dto';
export * from './thesis.dto';
export * from './field.dto';
export * from './topic.dto';
export * from './location.dto';
export * from './bachelor-thesis-registration.dto';
export * from './bachelor-thesis-assessment.dto';
export * from './bachelor-thesis-evaluation.dto';
export * from './oral-defense-registration.dto';
export * from './oral-defense-assessment.dto';

/**
 * Other DTOs
 */
// Auth
export * from './auth/jwt-payload.dto';
export * from './auth/jwt-context.dto';
export * from './auth/jwt-refresh-payload.dto';
export * from './auth/jwt-refresh-context.dto';
export * from './auth/user-info.dto';