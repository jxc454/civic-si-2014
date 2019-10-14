.PHONY: cars-db-up
cars-db-up:
	docker run \
		--rm \
		-it \
		--publish 15432:5432 \
		-v $(PWD)/migrations\:/docker-entrypoint-initdb.d/migrations \
		-e POSTGRES_PORT=5432 \
		-e POSTGRES_USER=cars \
		-e POSTGRES_PASSWORD=cars \
		-e POSTGRES_DB=cars \
		-e PGDATA=/pgdata \
		postgres