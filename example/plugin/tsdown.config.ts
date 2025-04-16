import { defineConfig } from 'tsdown/config';
import { isCallOf } from 'unplugin-ast/ast-kit';
import AST from 'unplugin-ast/rolldown';
import { RemoveNode } from 'unplugin-ast/transformers';

export default defineConfig({
    // 入口文件
    entry: ['src/index.ts'],

    // 输出目录
    outDir: 'dist',

    // 输出格式
    format: 'esm',

    // 目标环境
    target: 'es2020',

    // 清理输出目录
    clean: true,

    // 使用插件
    plugins: [
        // 使用 AST 插件移除所有对 debugLog 函数的调用
        AST({
            exclude: ['**/*.d.ts'],
            transformer: [
                // 移除 debugLog 函数调用
                RemoveNode((node) => isCallOf(node, 'debugLog')),
            ],
        }),
    ],
}); 