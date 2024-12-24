import React, { useState } from 'react';
import './payment.css';
import { getDatabase, ref, push } from 'firebase/database'; // Firebase Database
import firebaseApp from './firebase'; // Firebase yapılandırmanızı buraya ekleyin

function PaymentNotification() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const txid = e.target.txid.value;

    setLoading(true); // Set loading state
    try {
      const db = getDatabase(firebaseApp);
      const notificationsRef = ref(db, 'payment_notifications'); // Firebase veritabanı yolu

      await push(notificationsRef, { email, txid });
      setMessage('The form has been successfully submitted!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false); // Reset loading state
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="logo">
          <img src="/images/logo.png" alt="Sensei Strategy Logo" />
        </div>
        <div className="buttons">
          <a href="/">
            <button>Return to Payment Page</button>
          </a>
          <a href="https://senseistrategy.com/">
            <button>Home Click</button>
          </a>
        </div>
      </div>

      {/* Notification Form */}
      <div className="notification-container">
        <h2>Make Payment Notification</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail Address:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your e-mail"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="txid">Transaction ID (TXID):</label>
            <input
              type="text"
              id="txid"
              placeholder="Enter TXID"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'SEND'}
          </button>
        </form>

        {message && <p className="notification-message">{message}</p>}

        {/* Instructions */}
        <div className="instructions">
          <h3>How to Find Your TXID:</h3>
          <p>After making a payment, you can find your TXID as follows:</p>
          <ol>
            <li>Open your wallet application or platform.</li>
            <li>Go to the "Sent Transactions" or "Transaction History" section.</li>
            <li>
              Click on the transaction details and copy the TXID or Transaction
              Hash.
            </li>
          </ol>
          <p>
            <strong>Example TXID Format:</strong>
          </p>
          <p>
            BTC TXID:
            b669f91d0604f2dc95d9e19b0e69f4a9b5425b3c872b4649b09b9123456789
          </p>
          <p>
            USDT TXID:
            0xfcd3ef889fc425c0fb1256f8acbd12345678901234567890abc
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>Contact: senseistrategysales@tuta.mail</p>
        <p>Copyright © 2024 - Sensei Strategy</p>
      </footer>
    </div>
  );
}

export default PaymentNotification;
