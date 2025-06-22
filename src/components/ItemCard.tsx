import React from 'react';
import { Clock, Eye } from 'lucide-react';
import type { Item } from '../types/index';
import { useItems } from '../context/ItemsContext';

interface ItemCardProps {
  item: Item;
  list?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, list = false }) => {
  const { setSelectedItem } = useItems();

  const handleClick = () => {
    setSelectedItem(item);
  };

  return (
    <div
      className={
        list
          ? 'card flex flex-row items-center space-x-4 p-4 sm:p-5 cursor-pointer hover:scale-[1.01] transition-all duration-300 group min-h-[120px] max-h-[180px]'
          : 'card cursor-pointer transform hover:scale-[1.02] transition-all duration-300 overflow-hidden group'
      }
      onClick={handleClick}
    >
      <div
        className={
          list
            ? 'relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100'
            : 'relative aspect-square overflow-hidden bg-gray-100'
        }
      >
        <img
          src={item.coverImage}
          alt={item.name}
          className={
            list
              ? 'w-full h-full object-contain'
              : 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
          }
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Eye className="h-5 w-5 text-gray-800" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">
            {item.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
            {item.additionalImages.length + 1} 📷
          </span>
        </div>
      </div>
      <div className={list ? 'flex-1 min-w-0 pl-4' : 'p-4 sm:p-5'}>
        <div className="flex items-start justify-between mb-3">
          <h3 className={
            list
              ? 'text-lg font-bold text-gray-900 line-clamp-1 flex-1 mr-2 group-hover:text-blue-600 transition-colors duration-300'
              : 'text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 flex-1 mr-2 group-hover:text-blue-600 transition-colors duration-300'
          }>
            {item.name}
          </h3>
        </div>
        <p className={
          list
            ? 'text-sm text-gray-600 line-clamp-1 mb-2 leading-relaxed'
            : 'text-sm sm:text-base text-gray-600 line-clamp-2 mb-4 leading-relaxed'
        }>
          {item.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span>{item.createdAt.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-300">
            <span className={list ? 'hidden md:inline' : 'hidden sm:inline'}>View Details</span>
            <span className={list ? 'md:hidden' : 'sm:hidden'}>View</span>
            <Eye className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard; 