.PHONY: cars-db-up
cars-db-up:
	docker run \
		--rm \
		-t \
		--publish 15432:5432 \
		-v $(PWD)/migrations\:/docker-entrypoint-initdb.d/migrations \
		-e POSTGRES_PORT=5432 \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=cars \
		-e POSTGRES_DB=postgres \
		-e PGDATA=/pgdata \
		postgres

.PHONY: migrate-local-up
migrate-local-up:
	db-migrate --env development up

.PHONY: migrate-local-down
migrate-local-down:
	db-migrate --env development down

.PHONY: migrate-up
migrate-up:
	db-migrate --env production up

.PHONY: migrate-down
migrate-down:
	db-migrate --env production down