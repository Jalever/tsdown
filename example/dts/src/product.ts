/**
 * 产品相关功能
 */

import { Product, ProductCategory } from './types/product';

/**
 * 创建一个新产品
 */
export function createProduct(
    name: string,
    description: string,
    price: number,
    category: ProductCategory,
    tags: string[] = []
): Product {
    return {
        id: generateId(),
        name,
        description,
        price,
        category,
        inStock: true,
        tags,
    };
}

/**
 * 获取产品价格（含税）
 */
export function getProductPrice(product: Product, taxRate: number = 0.1): number {
    return product.price * (1 + taxRate);
}

/**
 * 生成唯一ID
 */
function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
} 