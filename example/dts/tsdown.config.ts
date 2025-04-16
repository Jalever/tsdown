import { defineConfig } from 'tsdown/config';

export default defineConfig({
    // 入口文件
    entry: ['src/index.ts'],

    // 输出目录
    outDir: 'dist',

    // 输出格式
    format: 'esm',

    // 生成类型声明文件
    dts: {
        // 将所有类型打包成一个统一的声明文件
        isolatedDeclaration: true,

        // 处理类型引用
        resolve: []
    },

    // 目标环境
    target: 'es2020',

    // 清理输出目录
    clean: true
}); 