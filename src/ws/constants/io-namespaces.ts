import { env } from "../../env"

export const IO_NAMESPACES = {
    /**
     * Any except Socket IO - Admin UI if enabled.
     */
    Any: env.socketAdminUI.enabled 
        ? new RegExp(`^(?!.*(${env.socketAdminUI.nsp}))`, 'g') 
        : /\/.*/, 
    Default: '/',
    Notifications: '/notifications'
} as const;