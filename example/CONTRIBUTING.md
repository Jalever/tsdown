# 使用源代码编译版本的 tsdown

要使示例中的 tsdown 使用本地源代码编译的版本（而非 npm 安装的版本），可以按照以下步骤修改：

## 准备工作

1. 确保已经完成了 tsdown 源代码的构建：

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build
```

构建完成后，会在项目根目录下生成 `dist` 目录，包含编译后的代码。

## 修改示例

有两种方法可以让示例使用本地源代码编译的 tsdown：

### 方法一：使用 npm/pnpm link（推荐）

1. 在 tsdown 项目根目录下创建全局链接：

```bash
# 使用 npm
npm link

# 或使用 pnpm
pnpm link --global
```

2. 在每个示例目录中链接到全局包：

```bash
cd example/basic
npm link tsdown  # 或 pnpm link --global tsdown
```

这样，示例就会使用本地编译的 tsdown 版本。

### 方法二：修改脚本直接调用源码版本

修改每个示例的 `package.json` 文件中的脚本部分：

```json
{
  "scripts": {
    "build": "node ../../bin/tsdown.js",
    "dev": "node ../../bin/tsdown.js --watch"
  }
}
```

## 验证配置

要验证示例是否使用了本地编译的 tsdown 版本，可以在运行示例前做一些小改动：

1. 修改 tsdown 源码中的一处输出信息
2. 重新构建 tsdown
3. 运行示例，查看是否显示了修改后的输出

## 注意事项

- 当修改 tsdown 源代码后，需要重新运行 `pnpm build` 来更新编译后的代码
- 如果使用方法一，当 tsdown 版本更新时，可能需要重新执行 `npm link` 或 `pnpm link --global`
- 示例中的 TypeScript 类型错误（例如找不到模块 'tsdown/config'）在实际运行时不会有问题，因为编译后这些模块会存在 