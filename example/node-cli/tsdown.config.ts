import { defineConfig } from 'tsdown/config';

export default defineConfig({
    // 入口文件
    entry: ['src/cli.ts'],

    // 输出目录
    outDir: 'dist',

    // 输出格式
    format: 'esm',

    // 平台
    platform: 'node',

    // 目标环境
    target: 'node18',

    // 跳过 node_modules 打包
    skipNodeModulesBundle: true,

    // 启用垫片
    shims: true,

    // 外部依赖
    external: ['consola', 'cac'],

    // 清理输出目录
    clean: true,

    // 构建成功后运行
    onSuccess: 'chmod +x dist/cli.js'
}); 