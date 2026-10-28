# 宜搭吸顶时间线插件

用于**自定义页面**的组件扩展，不注册表单组件、不提供表单值或表单服务。
独立实现日期吸顶交替、版本目录滚动定位、滚动高亮、分类记录、容器响应式布局与主题切换。
交互参考 OpenYida 官网更新日志；代码不依赖官网应用。

## 本地预览

```sh
npm ci
npm test
npm run demo:build
npm run preview
```

打开 `http://127.0.0.1:41870`。`?width=narrow` 在宽窗口中检查窄组件；
`?nested` 检查页面嵌套滚动；`?multiple` 检查多实例；`?theme=dark` 检查深色主题。
本地预览是组件验收，不等于宜搭宿主加载验收。

## 构建插件

先用目标分支 CLI 在测试组织创建独立插件并回读真实 ID：

本例验证 OpenYida 的插件功能分支。先 link 含 `plugin create --type other` 的源码版本，
核对 `openyida` 真实路径；已发布的旧版 CLI 未必支持该参数。

```sh
openyida login --check-only --json
openyida plugin extensions --json
openyida plugin create --type other --name '吸顶时间线' --description '自定义页面日期吸顶时间线组件' --logo '<实际 HTTPS 图片地址>' --confirm --json
YIDA_PLUGIN_ID=PLUGIN-实际编号 npm run build
```

容器名从真实插件 ID 派生，不能填展示名或复用其他插件容器名。
构建产物在 `dist/plugin/`，包括 `remoteEntry.js` 和全部 chunks；React 使用宿主的 `window.React`，需要在当前宜搭宿主核实此契约。
只导出 `./app/custom-page` 与 `./designer/custom-page`，组件名 `OpenYidaStickyTimeline`。

资源使用已有企业 HTTPS 静态服务器；集团环境优先内网发布渠道。
没有企业渠道时，可用码云管理源码、阿里云 OSS 托管完整产物；GitHub Actions / Pages 为备选。
本仓库没有自动部署流程，不会因推送而公开发布静态资源。

资源部署后，在 `frontEndDevInfo.cdnEntry` 填真实完整 HTTPS 地址；
扩展点按平台 `plugin extensions` 回读配置为自定义页面领域。
先 `version-get`，保留后端和参数配置，再 `save-dev` 带 `--expected-hash` 和独立备份保存。
组织内发布、安装测试使用官方编辑器；协议由用户本人确认。
如缺插件开发权益，打开 [宜搭开放－插件需求共创](https://ding.aliwork.com/o/Plug-in) 申请。

## 组件属性

| 属性 | 类型 | 默认值 |
| --- | --- | --- |
| title / description | string | 更新日志 / 简介 |
| entries | 数组或 JSON 数组字符串，支持变量绑定 | 样例记录 |
| stickyOffset | number，0–600 px | 24 |
| showNavigation | boolean | true |
| theme | auto / light / dark | auto |
| emptyText | string | 暂无时间线记录 |
| style / className | 标准 React 属性 | 无 |

`entries` 每项支持 `version`、`date`、`title`、`highlights: string[]`、
`sections: {tag, title, items: string[]}[]`。tag 支持 new/update/fix/remove/test。
内容按纯文本渲染，不执行 HTML、Markdown 或脚本。传入空数组显示空态；非法 JSON 显示错误提示。
样例位于 `src/data.js`。日期吸顶相对最近滚动容器；宿主祖先的 overflow 布局会影响 CSS sticky，需在真实页面验收。

## 验证记录

见 `docs/validation.md`。分别记录配置保存、资源可达、启用注册、消费者实际执行，避免把本地成功当成线上通过。
