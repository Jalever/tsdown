import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * 生成一个新文件
 * @param name 文件名
 * @param type 文件类型 (js, ts, json)
 * @param dir 输出目录
 * @returns 生成的文件路径
 */
export async function generateFile(
    name: string,
    type: string = 'js',
    dir: string = 'output'
): Promise<string> {
    // 确保文件名合法
    const sanitizedName = name.replace(/[^a-zA-Z0-9_-]/g, '');
    if (!sanitizedName) {
        throw new Error('无效的文件名');
    }

    // 创建目录（如果不存在）
    await fs.mkdir(dir, { recursive: true });

    // 根据文件类型生成内容
    let content = '';
    const filename = `${sanitizedName}.${type}`;
    const filePath = path.join(dir, filename);

    switch (type) {
        case 'js':
            content = `/**
 * ${sanitizedName}
 * 由 demo-cli 生成
 * 生成时间: ${new Date().toISOString()}
 */

function ${sanitizedName}() {
  console.log('Hello from ${sanitizedName}!');
}

module.exports = ${sanitizedName};
`;
            break;

        case 'ts':
            content = `/**
 * ${sanitizedName}
 * 由 demo-cli 生成
 * 生成时间: ${new Date().toISOString()}
 */

export function ${sanitizedName}(): void {
  console.log('Hello from ${sanitizedName}!');
}
`;
            break;

        case 'json':
            content = JSON.stringify(
                {
                    name: sanitizedName,
                    description: `由 demo-cli 生成的 ${sanitizedName} 配置`,
                    createdAt: new Date().toISOString(),
                    version: '1.0.0',
                },
                null,
                2
            );
            break;

        default:
            throw new Error(`不支持的文件类型: ${type}`);
    }

    // 写入文件
    await fs.writeFile(filePath, content, 'utf8');

    return filePath;
} 