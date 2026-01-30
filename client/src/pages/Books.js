import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import { FiPlus, FiBook, FiAlertCircle } from 'react-icons/fi';

const Books = () => {
    const { isAuthenticated } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await booksAPI.getAll();
            setBooks(response.data.data || []);
        } catch (err) {
            setError('Failed to fetch books');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data) => {
        await booksAPI.create(data);
        fetchBooks();
    };

    const handleUpdate = async (data) => {
        await booksAPI.update(editingBook._id, data);
        fetchBooks();
    };

    const handleDelete = async (id) => {
        try {
            await booksAPI.delete(id);
            setDeleteConfirm(null);
            fetchBooks();
        } catch (err) {
            setError('Failed to delete book');
        }
    };

    const openEditModal = (book) => {
        setEditingBook(book);
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingBook(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingBook(null);
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <div className="books-header">
                <h1>📚 Book Catalog</h1>
                {isAuthenticated && (
                    <button className="btn btn-primary" onClick={openCreateModal}>
                        <FiPlus />
                        Add Book
                    </button>
                )}
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {!isAuthenticated && (
                <div className="alert alert-success" style={{ marginBottom: '2rem' }}>
                    💡 Login to add, edit, or delete books from the catalog.
                </div>
            )}

            {books.length === 0 ? (
                <div className="empty-state">
                    <FiBook style={{ width: '80px', height: '80px' }} />
                    <h3>No Books Yet</h3>
                    <p>The catalog is empty. {isAuthenticated ? 'Add your first book!' : 'Login to add books.'}</p>
                    {isAuthenticated && (
                        <button className="btn btn-primary" onClick={openCreateModal}>
                            <FiPlus />
                            Add First Book
                        </button>
                    )}
                </div>
            ) : (
                <div className="books-grid">
                    {books.map(book => (
                        <BookCard
                            key={book._id}
                            book={book}
                            onEdit={openEditModal}
                            onDelete={(id) => setDeleteConfirm(id)}
                            isAuthenticated={isAuthenticated}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <BookModal
                    book={editingBook}
                    onClose={closeModal}
                    onSave={editingBook ? handleUpdate : handleCreate}
                />
            )}

            {deleteConfirm && (
                <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h2><FiAlertCircle style={{ color: 'var(--accent)', marginRight: '0.5rem' }} /> Confirm Delete</h2>
                        </div>
                        <div className="modal-body">
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Are you sure you want to delete this book? This action cannot be undone.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                                Delete Book
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;
