CREATE USER clase_user WITH PASSWORD 'clase123';

-- Dar permisos sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE clase03 TO clase_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO clase_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO clase_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO clase_user;

-- Texto corto con límite
nombre VARCHAR(100)
email VARCHAR(255)

-- Texto largo sin límite
bio TEXT

-- Números
id SERIAL                  -- Entero autoincremental (1, 2, 3...)
paginas INTEGER            -- Número entero
precio NUMERIC(10, 2)      -- Decimal exacto (para dinero)

-- Booleano
publicado BOOLEAN          -- true / false

-- Fecha y hora
creado_en TIMESTAMPTZ      -- Con zona horaria (SIEMPRE usar este)

CREATE TABLE authors (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(255) UNIQUE NOT NULL,
  bio       TEXT,
  country   VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO authors (name, email, bio, country)
VALUES ('George Orwell', 'orwell@example.com', 'Novelista inglés, autor de 1984.', 'UK');

SELECT * FROM authors;

CREATE TABLE posts_sin_fk (
  id      SERIAL PRIMARY KEY,
  title   VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER   -- Sin foreign key
)

INSERT INTO posts_sin_fk (title, content, author_id)
VALUES ('Post huérfano', 'Contenido', 999);

CREATE TABLE posts (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  content     TEXT NOT NULL,
  author_id   INTEGER NOT NULL,
  published   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

INSERT INTO posts (title, content, author_id)
VALUES ('Post inválido', 'Contenido', 999);