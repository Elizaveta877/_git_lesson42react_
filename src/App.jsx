import React from 'react';
import DataFetcher from './components/DataFetcher';
import './index.css'; 


const App = () => {
  return (
    <div className="global-container"> 
      <header className="app-header"> 
        <h1 className="app-title"> 
          React Data Fetcher App
        </h1>
        <p className="app-subtitle"> 
          Демонстрація асинхронного запиту з useEffect та axios
        </p>
      </header>

      <DataFetcher />

      <footer className="app-footer"> 
        Дані отримано з API: <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noopener noreferrer" className="app-link">jsonplaceholder.typicode.com/users</a> {/* ДОДАНО: клас app-link */}
      </footer>
    </div>
  );
};

export default App;