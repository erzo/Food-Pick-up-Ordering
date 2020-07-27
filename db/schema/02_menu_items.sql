DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price SMALLINT(255) NOT NULL,
  description text,
  food_item_photo VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL
);
