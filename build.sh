#!/bin/bash

set -e

# 项目根目录
PROJECT_NAME="akazwzdotcom"
IMAGE_TAG="latest"
REGISTRY="akazwz/" # 如果有私有仓库，写成 your-registry.com/，否则留空

echo "==> 安装依赖"
pnpm install

echo "==> 构建项目"
pnpm run build

echo "==> 构建 Docker 镜像"
docker buildx build --platform linux/amd64 -t ${REGISTRY}${PROJECT_NAME}:${IMAGE_TAG} --load .

# 如果需要推送到远程仓库，取消下面注释
echo "==> 推送 Docker 镜像"
docker push ${REGISTRY}${PROJECT_NAME}:${IMAGE_TAG}

echo "==> 打包完成: ${REGISTRY}${PROJECT_NAME}:${IMAGE_TAG}"