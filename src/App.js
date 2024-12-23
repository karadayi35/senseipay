import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [countdownTime, setCountdownTime] = useState(59 * 60); // 59 dakika

  const [cryptoDetails, setCryptoDetails] = useState({
    btc: {
      qr: "/images/qr-btc.jpg",
      address: "bc1q9gunnesj7twytakmfggcgc5yuryuux5j6v0nqt",
    },
    eth: {
      qr: "/images/qr-eth.jpg",
      address: "0x5A85cE7f88e25F8Ed29C72aAF7cbFFae2E3678A4",
    },
    ltc: {
      qr: "/images/qr-ltc.jpg",
      address: "ltc1qkr04x4s5qz3qzuyr9lvpwrlmjuglxu35a64l3r",
    },
    usdt: {
      qr: "/images/qr-usdt.jpg",
      address: "TN9mSzn1KUSZKaLrLodLEjLyjBpGz6DvLi",
    },
  });

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(cryptoDetails[selectedCrypto].address);
    setShowCopyAlert(true);
    setTimeout(() => {
      setShowCopyAlert(false);
    }, 3000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Temizlik
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src="/images/logo.png" alt="Sensei Strategy Logo" />
        </div>
        <div className="buttons">
          <a href="https://senseistrategy.com/">
            <button>Home Click</button>
          </a>
          <Link to="/payment">
            <button>Make Payment Notification</button>
          </Link>
        </div>
      </header>

      <div className="payment-container">
        <h2>CRYPTO PAYMENT SELECT</h2>
        <div className="payment-layout">
          <div className="payment-options">
            {Object.keys(cryptoDetails).map((crypto) => (
              <div
                key={crypto}
                className={`crypto-option ${
                  selectedCrypto === crypto ? "selected" : ""
                }`}
                onClick={() => handleCryptoSelect(crypto)}
              >
                <img src={`/images/${crypto}.png`} alt={crypto} />
                <span>{crypto.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <div className="payment-details">
            <div className="qr-code">
              <img
                src={cryptoDetails[selectedCrypto].qr}
                alt="QR Code"
                id="qr-image"
              />
            </div>
            <div className="payment-address">
              <span id="crypto-address">
                {cryptoDetails[selectedCrypto].address}
              </span>
              <button onClick={copyAddress}>Copy</button>
            </div>
            <div className="timer">
              <span id="timer">{formatTime(countdownTime)}</span>
              <p>Pay until time expires</p>
            </div>
          </div>
        </div>
      </div>

      {showCopyAlert && (
        <div className="copy-alert">
          Address copied successfully!
        </div>
      )}

      <footer>
        <p>Copyright © 2024 - Sensei Strategy senseistrategysales@tuta.mail</p>
      </footer>
    </div>
  );
}

export default App;
