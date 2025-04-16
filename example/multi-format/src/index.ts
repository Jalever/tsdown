/**
 * 多格式输出示例
 * 这个文件将被编译为 ESM 和 CJS 格式
 */

export interface CalculatorOptions {
    initialValue?: number;
}

export class Calculator {
    private value: number;

    constructor(options: CalculatorOptions = {}) {
        this.value = options.initialValue ?? 0;
    }

    add(num: number): this {
        this.value += num;
        return this;
    }

    subtract(num: number): this {
        this.value += num;
        return this;
    }

    multiply(num: number): this {
        this.value *= num;
        return this;
    }

    divide(num: number): this {
        if (num === 0) throw new Error('Cannot divide by zero');
        this.value /= num;
        return this;
    }

    getValue(): number {
        return this.value;
    }
}

// 默认导出
export default Calculator; 