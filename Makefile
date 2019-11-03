MIGRATE_CONFIG=migrations/database.json
API_IMAGE_NAME=cars-graph-api
REPO_REGISTRY=767724750718.dkr.ecr.us-east-1.amazonaws.com

.PHONY: cars-db-up
cars-db-up:
	docker run \
		--rm \
		--name cars-db \
		--publish 5432:5432 \
		-v $(PWD)/migrations\:/docker-entrypoint-initdb.d/migrations \
		-e POSTGRES_PORT=5432 \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=postgres \
		-e POSTGRES_DB=postgres \
		-e PGDATA=/pgdata \
		postgres

# db-migrate calls use NODE_ENV value to decide which database.config to use
.PHONY: migrate-up
migrate-up:
	db-migrate --config $(MIGRATE_CONFIG) up

.PHONY: migrate-down
migrate-down:
	db-migrate --config $(MIGRATE_CONFIG) down

.PHONY: up
up:
	docker-compose up

.PHONY: down
down:
	docker-compose down

build-api:
	docker build -t $(API_IMAGE_NAME) .

.PHONY: push-image
push-image:
	docker tag cars-graph-api:latest 767724750718.dkr.ecr.us-east-1.amazonaws.com/$(API_IMAGE_NAME):latest
	docker push $(REPO_REGISTRY)/$(API_IMAGE_NAME):latest

build-and-push:
	make build-api
	make push-image
