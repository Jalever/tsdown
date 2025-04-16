# tsdown 使用示例

这个目录包含了多个 tsdown 使用示例，展示了它的主要功能和使用场景。

## 示例列表

1. **basic** - 基本打包示例
2. **multi-format** - 多格式输出示例
3. **dts** - 类型声明文件生成示例
4. **library** - 库打包示例
5. **node-cli** - Node.js CLI 工具打包
6. **browser-lib** - 浏览器库打包
7. **plugin** - 使用 Rolldown 插件示例
8. **basic-local** - 使用本地编译版本的 tsdown 示例

## 如何运行示例

每个示例目录中都有独立的说明和配置文件。要运行示例，请进入相应的目录并执行：

```bash
# 安装依赖
npm install

# 运行构建
npm run build

# 监视模式
npm run dev
```

## 使用本地编译版本

关于如何使用本地编译版本的 tsdown（而非 npm 安装的版本），请参考 [CONTRIBUTING.md](./CONTRIBUTING.md) 文件中的说明。

`basic-local` 示例展示了如何直接使用项目中编译后的 tsdown。

## 注意事项

- 这些示例仅用于演示目的，实际使用时应根据项目需求进行配置
- tsdown 目前处于 beta 阶段，API 可能会有变化
- 完整文档请参考 [GitHub 仓库](https://github.com/rolldown/tsdown) 