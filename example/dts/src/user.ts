/**
 * 用户相关功能
 */

import { User, UserRole } from './types/user';

/**
 * 创建一个新用户
 */
export function createUser(
    username: string,
    email: string,
    role: UserRole = UserRole.User
): User {
    return {
        id: generateId(),
        username,
        email,
        role,
        createdAt: new Date(),
    };
}

/**
 * 检查用户是否为管理员
 */
export function isAdmin(user: User): boolean {
    return user.role === UserRole.Admin;
}

/**
 * 生成唯一ID
 */
function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
} 