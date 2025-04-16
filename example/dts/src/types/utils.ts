/**
 * 通用工具类型
 */

// 部分类型
export type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 必填类型
export type Required<T> = {
    [P in keyof T]-?: T[P];
};

// 只读类型
export type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 记录类型
export type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 排除类型
export type Exclude<T, U> = T extends U ? never : T;

// 提取类型
export type Extract<T, U> = T extends U ? T : never;

// 选择类型
export type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 忽略类型
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>; 