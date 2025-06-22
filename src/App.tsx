import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsProvider } from './context/ItemsContext';
import Navigation from './components/Navigation';
import ViewItems from './pages/ViewItems';
import AddItem from './pages/AddItem';

function App() {
  return (
    <ItemsProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<ViewItems />} />
            <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </div>
      </Router>
    </ItemsProvider>
  );
}

export default App;
