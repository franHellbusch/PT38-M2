let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "El Principito", author: "Antoine de Saint-Exupéry" },
];
let nextId = 3;

export const getAllBooks = (req, res) => {
  res.status(200).json(books);
};

export const getBookById = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "book not found" });
  }

  res.status(200).json(book);
};

export const createBook = (req, res) => {
  const { title, author } = req.body;

  if (!title || typeof title !== "string" || title.trim() == "") {
    return res.status(400).json({
      error: "title is required and must be a non-empty string",
    });
  }

  if (!author || typeof author !== "string" || author.trim() === "") {
    return res.status(400).json({
      error: "author is required and must be a non-empty string",
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
  };

  books.push(newBook);

  res.status(201).json(newBook);
};

export const demo = (req, res) => {
  // 1. PARAMS — viajan en la URL, identifican recursos
  const id = req.params.id; // /demo/5 → "5"

  // 2. QUERY — después del ?, para filtros opcionales
  const limit = req.query.limit; // /demo/5?limit=10 → "10"
  const author = req.query.author; // /demo/5?author=Orwell → "Orwell"

  // 3. BODY — datos complejos en POST/PUT, requiere express.json()
  const data = req.body; // { "title": "..." }

  res.json({
    params: { id },
    query: { limit, author },
    body: data,
  });
};
