import React, { useState } from 'react';
import { Search, Filter, Grid, List, Sparkles } from 'lucide-react';
import { useItems } from '../context/ItemsContext';
import ItemCard from '../components/ItemCard';
import ItemDetailsModal from '../components/ItemDetailsModal';
import type { ItemType } from '../types/index';

const ViewItems: React.FC = () => {
  const { state } = useItems();
  const { items } = state;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ItemType | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const itemTypes: (ItemType | 'All')[] = ['All', 'Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">View Items</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Discover and explore our curated collection of premium items</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="block lg:hidden space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>

            <div className="flex space-x-3">
              <div className="flex-1 flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as ItemType | 'All')}
                  className="input-field flex-1 min-w-0"
                >
                  {itemTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`tap-target p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`tap-target p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-between lg:space-x-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as ItemType | 'All')}
                className="input-field min-w-[160px]"
              >
                {itemTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-gray-200">
            Showing <span className="font-semibold text-gray-900">{filteredItems.length}</span> of <span className="font-semibold text-gray-900">{items.length}</span> items
            {filterType !== 'All' && (
              <span className="ml-1">
                in <span className="font-semibold text-blue-600">{filterType}</span>
              </span>
            )}
            {searchTerm && (
              <span className="ml-1">
                matching <span className="font-semibold text-blue-600">"{searchTerm}"</span>
              </span>
            )}
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">No items found</h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              {searchTerm || filterType !== 'All'
                ? 'Try adjusting your search criteria or filters to find what you\'re looking for'
                : 'No items have been added to the collection yet'
              }
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
              : 'space-y-4 sm:space-y-6'
          }>
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <ItemDetailsModal />
    </div>
  );
};

export default ViewItems; 