MIGRATE_CONFIG=migrations/database.json
API_IMAGE_NAME=cars-graph-api

.PHONY: cars-db-up
cars-db-up:
	docker run \
		--rm \
		--publish 15432:5432 \
		-v $(PWD)/migrations\:/docker-entrypoint-initdb.d/migrations \
		-e POSTGRES_PORT=5432 \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=postgres \
		-e POSTGRES_DB=postgres \
		-e PGDATA=/pgdata \
		postgres

.PHONY: migrate-local-up
migrate-local-up:
	db-migrate --env development --config $(MIGRATE_CONFIG) up

.PHONY: migrate-local-down
migrate-local-down:
	db-migrate --env development --config $(MIGRATE_CONFIG) down

.PHONY: migrate-up
migrate-up:
	db-migrate --env production --config $(MIGRATE_CONFIG) up

.PHONY: migrate-down
migrate-down:
	db-migrate --env production --config $(MIGRATE_CONFIG) down

.PHONY: up
up:
	docker-compose up

.PHONY: down
down:
	docker-compose down

build-api:
	docker build -t $(API_IMAGE_NAME) .