import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBook, FiLogIn, FiArrowRight } from 'react-icons/fi';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="hero">
            <div className="container">
                <h1>📚 Your Digital Library</h1>
                <p>
                    Discover, organize, and manage your book collection with our beautiful
                    and intuitive catalog system. Add, edit, and explore books with ease.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/books" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        <FiBook />
                        Browse Books
                        <FiArrowRight />
                    </Link>

                    {!isAuthenticated && (
                        <Link to="/login" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                            <FiLogIn />
                            Login to Manage
                        </Link>
                    )}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '5rem',
                    textAlign: 'left'
                }}>
                    {[
                        { icon: '📖', title: 'Browse Books', desc: 'View all books in our catalog without signing in' },
                        { icon: '✨', title: 'Add New Books', desc: 'Logged in users can add books to the collection' },
                        { icon: '✏️', title: 'Edit & Update', desc: 'Modify book details and stock status' },
                        { icon: '🔐', title: 'Secure Access', desc: 'JWT-based authentication for protected actions' },
                    ].map((feature, i) => (
                        <div key={i} className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
