DROP TABLE IF EXISTS pickup_orders CASCADE;
CREATE TABLE pickup_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity SMALLINT,
  total_price SMALLINT
);
