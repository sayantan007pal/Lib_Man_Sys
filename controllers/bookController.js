import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Book } from "../models/bookModel.js";
import  ErrorHandler  from "../middlewares/errorMiddlewares.js";
//import express from 'express';

export const addBook = catchAsyncErrors(async (req, res, next) => {
    const { title, author, price, rating, description, numReviews, availability, countInStock } = req.body;
    if (!title || !author || !price || !rating || !description || !numReviews || !availability || !countInStock) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const book = await Book.create({title, author, price, rating, description, numReviews, availability, countInStock});
    res.status(201).json({
        success: true,
        message: "Book is created",
        book
    });
});
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const book
    = await Book.findById(id);
    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }
    await book.deleteOne();
    res.status(200).json({
        success: true,
        message: "Book is deleted"
    });
});
export const getAllBook = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        books,
    });
});