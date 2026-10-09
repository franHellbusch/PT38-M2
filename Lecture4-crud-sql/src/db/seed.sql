INSERT INTO authors (name, email, country)
VALUES ('George Orwell', 'orwell@example.com', 'UK');

SELECT * FROM authors;

INSERT INTO authors (name, email, country)
VALUES
  ('García Márquez', 'gabo@example.com', 'Colombia'),
  ('Chimamanda Adichie', 'chimamanda@example.com', 'Nigeria'),
  ('Haruki Murakami', 'murakami@example.com', 'Japan'),
  ('Toni Morrison', 'morrison@example.com', 'USA');

INSERT INTO authors (name, email, country)
VALUES ('Italo Calvino', 'calvino@example.com', 'Italy')
RETURNING id, name;

INSERT INTO posts (title, content, author_id, published)
VALUES
  ('1984 y el lenguaje', 'El Newspeak como herramienta de control...', 1, TRUE),
  ('Realismo mágico', 'Una técnica narrativa que...', 2, TRUE),
  ('Cien años de soledad', 'En el principio fue...', 2, FALSE),
  ('Norwegian Wood', 'La nostalgia como tema central...', 3, TRUE),
  ('Beloved', 'La memoria y el trauma...', 4, TRUE),
  ('Ciudades invisibles', 'Marco Polo y Kublai Khan...', 5, FALSE);

-- Todas las columnas
SELECT * FROM authors;

-- Columnas específicas
SELECT name, email FROM authors;

-- Alias: renombrar columnas en el resultado
SELECT
  name AS autor,
  country AS pais,
  created_at AS fecha_registro
FROM authors;

-- Operadores básicos
SELECT * FROM posts WHERE published = TRUE;
SELECT * FROM authors WHERE country = 'Colombia';
SELECT * FROM posts WHERE author_id = 2;

-- AND / OR
SELECT * FROM posts 
WHERE published = TRUE AND author_id = 2;

SELECT * FROM authors 
WHERE country = 'UK' OR country = 'USA';

-- IN: múltiples valores
SELECT * FROM authors 
WHERE country IN ('Colombia', 'Nigeria', 'Japan');

-- LIKE: búsqueda de patrones
SELECT * FROM posts WHERE title LIKE '%lenguaje%';
SELECT * FROM posts WHERE title ILIKE '%cien%';

-- IS NULL / IS NOT NULL
SELECT * FROM authors WHERE country IS NULL;
SELECT * FROM authors WHERE country IS NOT NULL;

-- ORDER BY
SELECT name, country FROM authors ORDER BY name ASC;
SELECT title FROM posts ORDER BY created_at DESC;

-- Múltiples columnas
SELECT * FROM posts 
ORDER BY published DESC, created_at ASC;

-- LIMIT: traer solo N resultados
SELECT * FROM posts ORDER BY created_at DESC LIMIT 3;

-- OFFSET: paginación
-- Página 1 (posts 1-3)
SELECT * FROM posts ORDER BY id LIMIT 3 OFFSET 0;
-- Página 2 (posts 4-6)
SELECT * FROM posts ORDER BY id LIMIT 3 OFFSET 3;

-- ⚠️ REGLA DE ORO:
-- 1. Escribí el SELECT primero
-- 2. Verificá que devuelve exactamente lo que querés modificar
-- 3. Recién ahí convertilo en UPDATE o DELETE

-- Paso 1: SELECT para verificar qué vamos a modificar
SELECT * FROM authors WHERE country = 'UK';

-- Paso 2: Convertir en UPDATE
UPDATE authors
SET country = 'United Kingdom'
WHERE country = 'UK';

-- Verificar con RETURNING
UPDATE posts
SET published = TRUE
WHERE author_id = 2 AND published = FALSE
RETURNING id, title, published;

-- Paso 1: SELECT primero
SELECT * FROM posts WHERE published = FALSE;

-- Paso 2: Contar cuántos vamos a borrar
SELECT COUNT(*) FROM posts WHERE published = FALSE;

-- Paso 3: Recién ahí el DELETE
DELETE FROM posts
WHERE published = FALSE
RETURNING id, title;

-- Probar CASCADE: borrar un author borra sus posts
SELECT * FROM posts WHERE author_id = 3;
DELETE FROM authors WHERE id = 3;

-- TRUNCATE vs DELETE
-- TRUNCATE TABLE posts;  -- Borra todo, más rápido, reinicia secuencias
-- DELETE FROM posts;     -- Borra todo, más lento, no reinicia secuencias

INSERT INTO authors (name, email, country)
VALUES
  ('García Márquez', 'gabo2@example.com', 'Colombia'),
  ('Murakami', 'murakami2@example.com', 'Japan'),
  ('Autor sin posts', 'sinposts@example.com', 'France');


-- JOIN básico: posts con su autor
SELECT
  posts.title,
  authors.name,
  authors.country
FROM posts
INNER JOIN authors ON posts.author_id = authors.id;

-- Con alias (más limpio)
SELECT
  p.title,
  p.published,
  a.name AS autor,
  a.country
FROM posts p
INNER JOIN authors a ON p.author_id = a.id;

-- Con WHERE sobre el JOIN
SELECT 
  p.title, 
  a.name
FROM posts p
INNER JOIN authors a ON p.author_id = a.id
WHERE p.published = FALSE;

-- Con ORDER BY
SELECT 
  p.title, 
  a.name, 
  p.created_at
FROM posts p
INNER JOIN authors a ON p.author_id = a.id
ORDER BY p.created_at DESC;

-- LEFT JOIN: todos los autores, tengan o no posts
SELECT 
  a.name AS autor,
  p.title AS post
FROM authors a
LEFT JOIN posts p ON a.id = p.author_id;

-- Patrón clave: encontrar autores SIN posts
SELECT a.name
FROM authors a
LEFT JOIN posts p ON a.id = p.author_id
WHERE p.id IS NULL;

-- Total de posts por autor (incluyendo los que tienen 0)
SELECT 
  a.name,
  COUNT(p.id) AS total_posts
FROM authors a
LEFT JOIN posts p ON a.id = p.author_id
GROUP BY a.id, a.name
ORDER BY total_posts DESC;