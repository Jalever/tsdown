/**
 * 产品相关类型定义
 */

export enum ProductCategory {
    Electronics = 'electronics',
    Clothing = 'clothing',
    Books = 'books',
    Food = 'food'
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    inStock: boolean;
    tags: string[];
} 