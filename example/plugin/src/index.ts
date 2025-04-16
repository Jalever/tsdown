/**
 * 这是一个包含调试代码的示例，这些调试代码将在构建时被移除
 */

// 调试工具函数
export function debugLog(message: string, ...args: any[]): void {
    console.log(`[DEBUG] ${message}`, ...args);
}

// 生产环境代码
export function sum(a: number, b: number): number {
    debugLog('Calculating sum of', a, b);
    return a + b;
}

export function multiply(a: number, b: number): number {
    debugLog('Calculating product of', a, b);
    return a * b;
}

// 在应用程序中使用
const result1 = sum(5, 10);
debugLog('Result 1:', result1);

const result2 = multiply(5, 10);
debugLog('Result 2:', result2);

// 导出最终结果
export const results = {
    result1,
    result2
}; 