/** @format */

const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });

    await newBook.save();

    res
      .status(200)
      .send({ message: "Book posted successfully!", book: newBook });
  } catch (err) {
    console.error("Error while creating book!", err);
    res.status(500).send({ message: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).send(books);
  } catch (err) {
    console.error("Error while fetching books!", err);
    res.status(500).send({ message: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    res.status(200).send(book);
  } catch (err) {
    console.error("Error while fetching a book!", err);
    res.status(500).send({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .send({ message: "Updated Successfully!", book: updatedBook });
  } catch (err) {
    console.error("Error while changing a book!", err);
    res.status(500).send({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    res
      .status(200)
      .send({ message: "Deleted Successfully!", book: deletedBook });
  } catch (err) {
    console.error("Error while deleting a book!", err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
