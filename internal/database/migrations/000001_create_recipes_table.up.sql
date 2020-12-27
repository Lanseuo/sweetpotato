CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE recipe (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL
);