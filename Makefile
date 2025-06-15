# 项目配置
PROJECT_NAME := akazwzdotcom
REGISTRY := akazwz/
IMAGE_TAG := $(shell git rev-parse --short HEAD)
DEPLOYMENT_FILE := k8s/deployment.yaml
K8S_FOLDER := k8s/

# 默认目标
.PHONY: all
all: build push update-config deploy

# 构建 Docker 镜像
.PHONY: build
build:
	@echo "==> 构建 Docker 镜像: $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG)"
	docker buildx build --platform linux/amd64 -t $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG) --load .

# 推送镜像到仓库
.PHONY: push
push: build
	@echo "==> 推送 Docker 镜像: $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG)"
	docker push $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG)

# 更新部署文件
.PHONY: update-config
update-config: push
	@echo "==> 更新 deployment 文件镜像 tag 为: $(IMAGE_TAG)"
	sed -i "" "s|image: $(REGISTRY)$(PROJECT_NAME):.*|image: $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG)|g" $(DEPLOYMENT_FILE)
	@echo "==> 部署配置已更新"

# 部署到 Kubernetes 集群
.PHONY: deploy
deploy: update-config
	@echo "==> 部署到 Kubernetes 集群"
	kubectl apply -f $(K8S_FOLDER)
	@echo "==> 部署完成"

# 只构建不推送
.PHONY: build-only
build-only:
	@echo "==> 仅构建 Docker 镜像: $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG)"
	docker buildx build --platform linux/amd64 -t $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG) --load .

# 清理本地镜像
.PHONY: clean
clean:
	@echo "==> 清理本地镜像"
	docker rmi $(REGISTRY)$(PROJECT_NAME):$(IMAGE_TAG) 2>/dev/null || true

# 显示当前配置
.PHONY: info
info:
	@echo "项目名称: $(PROJECT_NAME)"
	@echo "镜像仓库: $(REGISTRY)"
	@echo "镜像标签: $(IMAGE_TAG)"
	@echo "部署文件: $(DEPLOYMENT_FILE)"

# 帮助信息
.PHONY: help
help:
	@echo "可用命令:"
	@echo "  make build        - 构建 Docker 镜像"
	@echo "  make push         - 构建并推送镜像"
	@echo "  make update-config - 构建、推送并更新部署配置"
	@echo "  make deploy       - 部署到 Kubernetes 集群"
	@echo "  make build-only   - 仅构建镜像，不推送"
	@echo "  make clean        - 清理本地镜像"
	@echo "  make info         - 显示当前配置"
	@echo "  make all          - 执行完整流程 (默认)" 