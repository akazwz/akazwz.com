# akazwz.com

> 个人主页 / 博客 / 作品集

这是 [akazwz.com](https://akazwz.com) 的主仓库，包含前端应用源码、Kubernetes 部署配置等。欢迎访问我的个人站点，了解更多项目与想法。

## 技术栈

- **前端框架**：React + TypeScript
- **路由管理**：React Router
- **样式**：Tailwind CSS
- **构建工具**：Vite
- **包管理**：pnpm
- **容器化**：Docker
- **部署编排**：Kubernetes (k8s)
- **证书管理**：cert-manager + Let's Encrypt

## 本地开发

1. 安装依赖：
   ```bash
   pnpm install
   # 或 npm install
   ```
2. 启动开发服务器：
   ```bash
   pnpm dev
   # 或 npm run dev
   ```
   默认访问地址： http://localhost:5173

## 构建与部署

### 构建生产包
```bash
pnpm build
# 或 npm run build
```

### Docker 构建与运行
```bash
docker build -t akazwz.com .
docker run -p 3000:3000 akazwz.com
```

### Kubernetes 部署
- 所有 k8s 配置文件位于 `k8s/` 目录：
  - `deployment.yaml`：应用部署
  - `service.yaml`：服务暴露
  - `ingress.yaml`：Ingress 入口与 TLS
  - `clusterissuer.yaml`：证书颁发器
- 推荐使用 cert-manager 自动管理 HTTPS 证书。

## 目录结构

```
├── app/           # 前端应用源码
├── k8s/           # Kubernetes 配置
├── public/        # 静态资源
├── Dockerfile     # Docker 镜像构建
├── README.md      # 项目说明
└── ...
```

## 访问

- 线上地址：https://akazwz.com

## 联系

- GitHub: [akazwz](https://github.com/akazwz)

---

> 本项目采用现代前端技术栈与云原生部署，持续优化中，欢迎交流与建议。
