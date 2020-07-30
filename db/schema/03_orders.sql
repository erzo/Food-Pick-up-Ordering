DROP TABLE IF EXISTS orders CASCADE;
-- CREATE TABLE orders (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   customer_notes text,
--   initial_order_time TIME,
--   estimated_wait_time TIME,
--   order_status VARCHAR(255),
--   pickup_time TIME
-- );


-- test code for new ERD
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
  customer_notes text,
  initial_order_time TIME,
  estimated_wait_time TIME,
  order_status VARCHAR(255),
  pickup_time TIME,
  quantity INT,
  total_price INT
);
