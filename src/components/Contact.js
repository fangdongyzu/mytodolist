import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <footer className="contact-container">
            <h2 className="contact-title">Contact Me</h2>
            <div className="contact-info">
                <a href="mailto:fangdongyzu@gmail.com" className="contact-link">
                    <i className="fas fa-envelope"></i> Email
                </a>
                <a href="https://github.com/fangdongyzu" className="contact-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> GitHub
                </a>
                <a href="https://www.linkedin.com/in/fang-dong-li-b10a19217/" className="contact-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i> LinkedIn
                </a>
            </div>
        </footer>
    );
}

export default Contact;
