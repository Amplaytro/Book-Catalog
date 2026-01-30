import React from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const BookCard = ({ book, onEdit, onDelete, isAuthenticated }) => {
    return (
        <div className="card book-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="book-genre">{book.genre}</span>
                {isAuthenticated && <span className="book-id">ID: {book._id}</span>}
            </div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>

            <div className="book-meta">
                <span className="book-price">₹{book.price}</span>
                <span className={`book-stock ${book.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {book.inStock ? (
                        <>
                            <FiCheck /> In Stock
                        </>
                    ) : (
                        <>
                            <FiX /> Out of Stock
                        </>
                    )}
                </span>
            </div>

            {isAuthenticated && (
                <div className="book-actions">
                    <button className="btn btn-secondary btn-icon" onClick={() => onEdit(book)}>
                        <FiEdit2 />
                    </button>
                    <button className="btn btn-danger btn-icon" onClick={() => onDelete(book._id)}>
                        <FiTrash2 />
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookCard;
