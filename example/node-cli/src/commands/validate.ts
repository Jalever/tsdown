import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * 验证结果接口
 */
export interface ValidationResult {
    valid: boolean;
    message?: string;
}

/**
 * 验证文件内容
 * @param filePath 文件路径
 * @returns 验证结果
 */
export async function validateFile(filePath: string): Promise<ValidationResult> {
    try {
        // 检查文件是否存在
        try {
            await fs.access(filePath);
        } catch (error) {
            return {
                valid: false,
                message: '文件不存在',
            };
        }

        // 读取文件内容
        const content = await fs.readFile(filePath, 'utf8');
        if (!content) {
            return {
                valid: false,
                message: '文件为空',
            };
        }

        // 获取文件扩展名
        const ext = path.extname(filePath).toLowerCase();

        // 根据文件类型进行验证
        switch (ext) {
            case '.js':
                return validateJs(content);
            case '.ts':
                return validateTs(content);
            case '.json':
                return validateJson(content);
            default:
                return {
                    valid: false,
                    message: `不支持的文件类型: ${ext}`,
                };
        }
    } catch (error) {
        return {
            valid: false,
            message: `验证过程中发生错误: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

/**
 * 验证 JavaScript 文件
 */
function validateJs(content: string): ValidationResult {
    // 简单验证语法（这里只是一个示例）
    if (!content.includes('function') && !content.includes('class') && !content.includes('const')) {
        return {
            valid: false,
            message: '不是有效的 JavaScript 文件，缺少函数、类或常量定义',
        };
    }
    return { valid: true };
}

/**
 * 验证 TypeScript 文件
 */
function validateTs(content: string): ValidationResult {
    // 简单验证语法（这里只是一个示例）
    if (!content.includes('function') && !content.includes('class') && !content.includes('interface') && !content.includes('type')) {
        return {
            valid: false,
            message: '不是有效的 TypeScript 文件，缺少函数、类、接口或类型定义',
        };
    }
    return { valid: true };
}

/**
 * 验证 JSON 文件
 */
function validateJson(content: string): ValidationResult {
    try {
        JSON.parse(content);
        return { valid: true };
    } catch (error) {
        return {
            valid: false,
            message: '不是有效的 JSON 文件',
        };
    }
} 