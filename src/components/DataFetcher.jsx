import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.length > 0) {
        setData(response.data);
      } else {
        setError("Помилка: API повернуло порожні дані.");
        setData(null);
      }
    } catch (err) {
      console.error("Помилка при отриманні даних:", err);
      setError(`Помилка запиту: ${err.message}. Спробуйте оновити сторінку.`);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    return () => { };
  }, [fetchData]);


  if (loading) {
return (
      <div className="status-message loading">
        ⏳ Завантаження даних... Будь ласка, зачекайте.
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        ⚠️ Виникла помилка: {error}
        <button onClick={fetchData} className="retry-button">
          Спробувати ще раз
        </button>
      </div>
    );
  }


  if (!data) {

    return (
      <div className="status-message no-data">
        ℹ️ Не вдалося отримати дані користувачів.
      </div>
    );
  }

  return (
    <div className="data-container">
      <div className="data-header-row">
        <h2 className="data-title">
          🎉 Дані користувачів успішно завантажено!
        </h2>
        <button onClick={fetchData} className="refresh-button">
          Оновити
        </button>
      </div>
      <p className="data-subtitle">
        Отримано {data.length} записів з фіктивного API.
      </p>

      <div className="grid-layout">
        {data.map(user => ( 
          <div key={user.id} className="user-card">
            <h3 className="card-title">{user.name}</h3>
            <p className="card-username">@{user.username}</p>

            <div className="card-details-wrapper">
              <p className="card-detail">
                <span>Email:</span> {user.email}
              </p>
              <p className="card-detail">
                <span>Сайт:</span> {user.website}
              </p>
              <p className="card-detail">
                <span>Компанія:</span> {user.company.name}
              </p>
            </div>
          </div>
        ))}
      
        <style>
          {`
.card-detail::before {
 content: '';
 display: inline-block;
 width: 16px;
 height: 16px;
 margin-right: 8px;
}
`}
        </style>
      </div>
    </div>
  );
};

export default DataFetcher;