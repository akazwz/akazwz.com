#!/bin/bash

set -e

# 项目根目录
PROJECT_NAME="akazwzdotcom"
IMAGE_TAG=$(git rev-parse --short HEAD)
REGISTRY="akazwz/"

echo "==> 安装依赖"
pnpm install

echo "==> 构建项目"
pnpm run build

echo "==> 构建 Docker 镜像"
docker buildx build --platform linux/amd64 -t ${REGISTRY}${PROJECT_NAME}:${IMAGE_TAG} --load .

# 如果需要推送到远程仓库，取消下面注释
echo "==> 推送 Docker 镜像"
docker push ${REGISTRY}${PROJECT_NAME}:${IMAGE_TAG}

# 替换 deployment.yaml 中的镜像 tag
DEPLOYMENT_FILE="k8s/deployment.yaml"
echo "==> 更新 deployment 文件镜像 tag 为: ${IMAGE_TAG}"
sed -i "" "s|image: ${REGISTRY}${PROJECT_NAME}:.*|image: ${REGISTRY}${PROJECT_NAME}:${IMAGE_TAG}|g" ${DEPLOYMENT_FILE} 

echo "==> 打包完成: ${REGISTRY}${PROJECT_NAME}:${IMAGE_TAG}"