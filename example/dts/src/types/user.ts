/**
 * 用户相关类型定义
 */

export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Guest = 'guest'
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    profile?: UserProfile;
    createdAt: Date;
}

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
} 