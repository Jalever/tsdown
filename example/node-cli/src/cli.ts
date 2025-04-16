#!/usr/bin/env node

import { cac } from 'cac';
import consola from 'consola';
import { version } from '../package.json';
import { generateFile } from './commands/generate';
import { validateFile } from './commands/validate';

// 创建CLI实例
const cli = cac('demo-cli');

// 设置CLI版本
cli.version(version);

// 命令: 生成文件
cli
    .command('generate <name>', '生成一个新文件')
    .option('-t, --type <type>', '文件类型 (js, ts, json)', { default: 'js' })
    .option('-d, --dir <directory>', '输出目录', { default: 'output' })
    .action(async (name: string, options) => {
        try {
            const filePath = await generateFile(name, options.type, options.dir);
            consola.success(`文件已生成: ${filePath}`);
        } catch (error) {
            consola.error(`生成文件失败: ${error instanceof Error ? error.message : String(error)}`);
            process.exit(1);
        }
    });

// 命令: 验证文件
cli
    .command('validate <file>', '验证文件内容')
    .action(async (file: string) => {
        try {
            const result = await validateFile(file);
            if (result.valid) {
                consola.success(`文件 ${file} 验证通过`);
            } else {
                consola.error(`文件 ${file} 验证失败: ${result.message}`);
                process.exit(1);
            }
        } catch (error) {
            consola.error(`验证文件失败: ${error instanceof Error ? error.message : String(error)}`);
            process.exit(1);
        }
    });

// 显示帮助信息
cli.help();

// 处理未知命令
cli.on('command:*', () => {
    consola.error('无效的命令');
    consola.info(`请参阅帮助: --help`);
    process.exit(1);
});

// 解析命令行参数
cli.parse();

// 如果没有提供命令，显示帮助
if (!process.argv.slice(2).length) {
    cli.outputHelp();
} 