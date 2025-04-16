import { defineConfig } from 'tsdown/config';

export default defineConfig({
    // 入口文件
    entry: ['src/index.ts'],

    // 输出目录
    outDir: 'dist',

    // 输出多种格式
    format: ['esm', 'cjs'],

    // 生成类型声明文件
    dts: true,

    // 固定扩展名
    fixedExtension: true,

    // 目标环境
    target: 'es2020',

    // 清理输出目录
    clean: true
}); 