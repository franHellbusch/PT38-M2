INSERT INTO authors (name, email, bio) VALUES
  ('Ana García',   'ana@example.com',    'Desarrolladora full-stack'),
  ('Carlos Ruiz',  'carlos@example.com', 'Escritor técnico'),
  ('María López',  'maria@example.com',  'Ingeniería de APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
  ('Introducción a Node.js',       'Node.js es un runtime...', 1, true),
  ('PostgreSQL vs MySQL',          'Ambas tienen ventajas...',  2, true),
  ('APIs RESTful',                 'REST es un estilo...',      1, true),
  ('Manejo de errores en Express', 'El manejo apropiado...',    3, false),
  ('Async/Await explicado',        'Las promesas...',           1, false);