#Makefile
SHELL := /bin/bash
include .env
export VERSION
export NAME
export REGISTRY_NAME

# Cible par défaut
all: help

# Build l'image avec Node seul
build_node:
	@docker build --tag ${REGISTRY_NAME}${NAME}:latest --tag ${REGISTRY_NAME}${NAME}:${VERSION} --file configs/Dockerfile .

# Build l'image avec Node derrière NGINX
build_node_nginx:
	@docker build --tag ${REGISTRY_NAME}${NAME}-nginx:latest --tag ${REGISTRY_NAME}${NAME}-nginx:${VERSION} --file configs/nginx/Dockerfile .

# Lance tous les build
build_all: build_node build_node_nginx


# Push l'image avec Node seul
push_node: build_node
	@docker push ${REGISTRY_NAME}${NAME}:latest
	@docker push ${REGISTRY_NAME}${NAME}:${VERSION}

# Push l'image avec Node derrière NGINX
push_node_nginx: build_node_nginx
	@docker push ${REGISTRY_NAME}${NAME}-nginx:latest
	@docker push ${REGISTRY_NAME}${NAME}-nginx:${VERSION}

# Lance tous les push
push_all: push_node push_node_nginx

dev:
	@npm run dev

up:
	@docker compose up

help:
	@echo "Makefile pour exécuter des commandes pour le projet '${NAME}'"
