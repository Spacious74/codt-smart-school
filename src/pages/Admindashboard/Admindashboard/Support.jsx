import React from 'react';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <h1>Support</h1>

        {/* Introduction Section */}
        <section>
          <h2>Welcome to Our Support Page</h2>
          <p>
            Welcome to the support page for our School Management System. Whether you have questions about using the platform,
            need assistance with a technical issue, or just want to know more about our features, you're in the right place.
            We are here to help you!
          </p>
        </section>

        {/* FAQ Section */}
        <section>
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <p className="font-semibold">How can I update school details?</p>
              <p>To update your school details, please visit the 'Settings' section in your dashboard. There you will find all the options you need to edit your school's information.</p>
            </div>
            <div className="faq-item">
              <p className="font-semibold">How do I contact support?</p>
              <p>You can contact support by emailing us directly at <strong>support@schoolmanagement.com</strong>, or by calling us.</p>
            </div>
            <div className="faq-item">
              <p className="font-semibold">What if I forgot my password?</p>
              <p>If you've forgotten your password, simply go to the login page and click on 'Forgot Password'. You'll be prompted to reset your password and regain access to your account.</p>
            </div>
          </div>
        </section>

        {/* Contact Details Section */}
        <section>
          <h2>Contact Us</h2>
          <ul>
            <li>Email: <a href="mailto:support@schoolmanagement.com">support@schoolmanagement.com</a></li>
            <li>Phone: <a href="tel:+123456789">+123 456 789</a></li>
            <li>WhatsApp: <a href="https://wa.me/123456789">Click here to chat on WhatsApp</a></li>
            <li>Office Address: 123 School Rd, Education City</li>
          </ul>
        </section>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Basic resets and global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-color: #f7fafc; /* Light gray background */
          color: #4a5568; /* Darker text color for better readability */
        }

        /* Container for centering and responsive design */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* Header Styles */
        h1 {
          font-size: 36px;
          font-weight: 600;
          text-align: center;
          color: #2d3748; /* Dark gray color */
          margin-bottom: 32px;
        }

        /* Section Styles */
        section {
          background-color: #ffffff; /* White background for each section */
          padding: 32px;
          margin-bottom: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }

        /* Heading for each section */
        section h2 {
          font-size: 28px;
          font-weight: 600;
          color: #2d3748; /* Darker text color */
          margin-bottom: 16px;
        }

        /* Paragraph and Text Styles */
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #718096; /* Lighter text color */
        }

        /* FAQ Styles */
        .faq-list {
          margin-top: 16px;
        }

        .faq-item {
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0; /* Light border for separation */
        }

        .faq-item:last-child {
          border-bottom: none; /* Remove border for the last item */
        }

        .faq-item p {
          margin-top: 8px;
          font-size: 16px;
          color: #4a5568;
        }

        /* Contact Details Section */
        ul {
       
         
          color: #4a5568;
        }

      

        ul li a {
          color: #3182ce; /* Blue color for links */
          text-decoration: none;
        }

        ul li a:hover {
          text-decoration: underline; /* Underline on hover */
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          h1 {
            font-size: 28px; /* Smaller heading on mobile */
          }

          section {
            padding: 24px; /* Smaller padding on mobile */
          }

          .container {
            padding: 0 8px; /* Add more padding on smaller screens */
          }

          h2 {
            font-size: 24px; /* Smaller section headers */
          }

          p {
            font-size: 14px; /* Smaller text on mobile */
          }

          ul {
            padding-left: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default SupportPage;
