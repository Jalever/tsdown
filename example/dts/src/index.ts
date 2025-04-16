/**
 * 类型声明文件生成示例
 */

// 导出类型
export type { User, UserRole } from './types/user';
export type { Product, ProductCategory } from './types/product';

// 导出函数和常量
export { createUser, isAdmin } from './user';
export { createProduct, getProductPrice } from './product';

// 导出工具类型
export * from './types/utils'; 