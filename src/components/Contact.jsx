import React from 'react';
import './Home.css'; // Style this as needed

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We’re here to help. Reach out to us anytime!</p>

      <div className="contact-content">
        {/* Contact Form */}
        <form className="contact-form">
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Write your message..." required></textarea>

          <button type="submit">Send Message</button>
        </form>

        {/* Contact Details */}
        <div className="contact-details">
          <h3>Customer Support</h3>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📧 Email: support@ehsaaslabel.com</p>
          

          <h3>Business Hours</h3>
          <p>🕒 Monday - Friday: 9:00 AM - 7:00 PM</p>
          <p>🕒 Saturday: 10:00 AM - 5:00 PM</p>
          <p>🛑 Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
