# 使用 Node.js 22 的 Alpine 版本作为开发依赖环境
FROM node:22-alpine AS development-dependencies-env
# 启用 corepack 并激活 pnpm，合并为一层，减少镜像层数
RUN corepack enable && corepack prepare pnpm@latest --activate
# 复制所有源代码到容器中
COPY . /app
WORKDIR /app
# 安装所有依赖（包括开发依赖），使用 pnpm 的锁文件保证一致性
RUN pnpm install --frozen-lockfile

# 使用 Node.js 22 的 Alpine 版本作为生产依赖环境
FROM node:22-alpine AS production-dependencies-env
RUN corepack enable && corepack prepare pnpm@latest --activate
# 只复制生产环境需要的文件，减少镜像体积
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
# 只安装生产依赖，进一步减小体积
RUN pnpm install --frozen-lockfile --prod

# 使用 Node.js 22 的 Alpine 版本作为构建环境
FROM node:22-alpine AS build-env
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY . /app/
# 复制开发依赖，保证构建时依赖齐全
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
# 构建项目
RUN pnpm run build

# 最终生产镜像，体积最小，仅包含运行所需内容
FROM node:22-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
# 只复制生产依赖和构建产物
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
# 使用 pnpm 启动应用
CMD ["pnpm", "run", "start"]