import React, { useState } from 'react';
import { FiX, FiSave, FiBookOpen } from 'react-icons/fi';

const BookModal = ({ book, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: book?.title || '',
        author: book?.author || '',
        genre: book?.genre || '',
        price: book?.price || '',
        inStock: book?.inStock ?? true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await onSave({
                ...formData,
                price: Number(formData.price),
            });
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>
                        <FiBookOpen style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        {book ? 'Edit Book' : 'Add New Book'}
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        <FiX />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {error && <div className="alert alert-error">{error}</div>}

                        <div className="input-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Genre</label>
                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                placeholder="e.g., Fiction, Self-Help, Technology"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                min="0"
                                required
                            />
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="inStock"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleChange}
                            />
                            <label htmlFor="inStock">In Stock</label>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            <FiSave />
                            {loading ? 'Saving...' : 'Save Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookModal;
