CREATE TABLE cars(
	id bigserial PRIMARY KEY,
	make text,
	model text,
	year integer,
	initial_mileage integer,
	doors smallint,
	purchase_date timestamp
);

CREATE TABLE gas(
	id bigserial PRIMARY KEY,
	car_id bigint REFERENCES cars(id) ON DELETE CASCADE,
	date timestamp,
	octane smallint,
	price real,
	gallons real,
	total real,
	mileage real
);