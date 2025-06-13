import React, { useState } from 'react';
import './App.css';
import dwaejiGukbapImg from './img/돼지국밥.png';
import sundaeGukbapImg from './img/순대국밥.png';
import seokkeoGukbapImg from './img/섞어국밥.png';
import suyukImg from './img/수육.jpg';

function App() {
  const menuItems = [
    { id: 1, name: '돼지국밥', price: 9000, image: dwaejiGukbapImg },
    { id: 2, name: '순대국밥', price: 10000, image: sundaeGukbapImg },
    { id: 3, name: '내장국밥', price: 9500, image: seokkeoGukbapImg },
    { id: 4, name: '섞어국밥', price: 9500, image: seokkeoGukbapImg },
    { id: 5, name: '수육 반접시', price: 13000, image: suyukImg },
    { id: 6, name: '수육 한접시', price: 25000, image: suyukImg }
  ];

  const [orderItems, setOrderItems] = useState([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const addToOrder = (menuItem) => {
    setOrderItems(prevOrderItems => {
      const existingItem = prevOrderItems.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prevOrderItems.map(item =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevOrderItems, { ...menuItem, quantity: 1 }];
      }
    });
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      alert('음성 인식이 시작됩니다. 주문하실 메뉴를 말씀해주세요.');
      // Here you would integrate with a speech recognition API
    } 
  };

  const completeOrder = () => {
    if (orderItems.length === 0) {
      alert('주문할 메뉴를 선택해주세요.');
      return;
    }

    const orderSummary = orderItems.map(item =>
      `${item.name} ${item.quantity}개`
    ).join('\n');

    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (window.confirm(`주문을 완료하시겠습니까?\n\n주문 내역:\n${orderSummary}\n\n총 금액: ${total.toLocaleString()}원`)) {
      alert('주문이 완료되었습니다! 감사합니다.');
      setOrderItems([]);
    }
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container">
      <header>
        <h1>24시돼지국밥</h1>
      </header>

      <main className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item" onClick={() => addToOrder(item)}>
            <div className="menu-image">
              {item.image ? (
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
              ) : (
                <div className="placeholder-image"></div> 
              )}
            </div>
            <div className="menu-info">
              <h3>{item.name}</h3>
              <p>{item.price.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </main>

      <div className="order-section">
        <div className="order-list">
          <h3>주문 목록</h3>
          <div className="order-items">
            {orderItems.map(item => (
              <div key={item.id} className="order-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              </div>
            ))}
          </div>
          <div className="total-amount">
            <span>최종 금액</span>
            <span className="amount">{totalAmount.toLocaleString()}원</span>
          </div>
        </div>
        <div className="voice-control" onClick={toggleVoiceMode}>
          <span className="material-icons mic-icon">mic</span>
        </div>
      </div>

      {isVoiceMode && (
        <div className="voice-mode-indicator active">
          <span className="material-icons mic-pulse">mic</span>
          <p>음성 인식 중...</p>
        </div>
      )}

      <div className="action-buttons">
        <button className="btn voice-order" onClick={toggleVoiceMode}>
          <span className="material-icons">mic_none</span>
          음성 주문
        </button>
        <button className="btn complete-order" onClick={completeOrder}>
          <span className="material-icons">check_circle</span>
          주문 완료
        </button>
      </div>
    </div>
  );
}

export default App;
