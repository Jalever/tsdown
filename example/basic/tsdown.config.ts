import { defineConfig } from 'tsdown/config';

export default defineConfig({
    // 入口文件
    entry: ['src/index.ts'],

    // 输出目录
    outDir: 'dist',

    // 输出格式
    format: 'esm',

    // 目标环境
    target: 'es2020',

    // 是否进行 tree-shaking
    treeshake: true,

    // 构建前清理输出目录
    clean: true
}); 