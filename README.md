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

### cert-manager 安装

本项目依赖 [cert-manager](https://cert-manager.io/) 自动管理 HTTPS 证书。
如未安装，请先在 Kubernetes 集群中部署 cert-manager：

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
```

> 该命令会自动安装 cert-manager 的 CRDs 及相关组件。

安装完成后可验证：

```bash
kubectl get pods -n cert-manager
```

应看到 cert-manager、cainjector、webhook 等 Pod 正常运行。

如需使用 Helm 安装（可选）：

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --set installCRDs=true
```

## Makefile 自动化

本项目内置 Makefile，简化了镜像构建、推送与 Kubernetes 部署流程。

常用命令：

- `make build`         构建 Docker 镜像
- `make push`          构建并推送镜像到仓库
- `make update-config` 构建、推送并自动更新 k8s 部署镜像 tag
- `make deploy`        一键部署到 Kubernetes 集群
- `make clean`         清理本地镜像
- `make info`          显示当前配置信息
- `make help`          查看所有可用命令

默认执行 `make all`，会依次完成构建、推送、更新配置和部署。

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
