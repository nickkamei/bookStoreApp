import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";
import Book from "./model/book.model.js";  // Correct path to the book model




const app = express();

// Use CORS for the frontend
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Add this line to parse JSON requests
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000;
const MongoDBURI = process.env.MongoDB;

// Modified MongoDB connection
mongoose.connect(MongoDBURI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Search route
app.get('/books/search', async (req, res) => {
    const query = req.query.q;
    console.log('Search query:', query); // Log the search query
    try {
        const books = await Book.find({ name: { $regex: query, $options: 'i' } });
        console.log('Search results:', books); // Log the search results
        res.json(books);
    } catch (error) {
        console.error('Error searching books:', error); // Log any errors
        res.status(500).json({ message: 'Error searching books' });
    }
});
// Add a route for the root path
app.get('/', (req, res) => {
  res.json({ message: 'Book Store API is running' });
});