import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Plus, Eye } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ItemStore</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Items
            </Link>
            
            <Link
              to="/add-item"
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/add-item')
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 