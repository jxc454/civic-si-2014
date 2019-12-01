DELETE FROM cars;
INSERT INTO cars (make, model, year, initial_mileage, doors, purchase_date)
VALUES ('honda', 'civic', 2000, 5000, 4, '2019-12-12T12:00:00');
UPDATE cars SET id=1 WHERE make = 'honda';

DELETE FROM gas;
INSERT INTO gas (car_id, date, octane, price, gallons, total, mileage)
VALUES
(1, '2019-12-17T07:00:00', 93, 2.345, 9.80, 22.98, 5300),
(1, '2019-12-25T09:56:00', 93, 2.645, 10.25, 27.11, 5635),
(1, '2019-12-28T16:45:59', 93, 2.960, 9.77, 28.92, 5967);