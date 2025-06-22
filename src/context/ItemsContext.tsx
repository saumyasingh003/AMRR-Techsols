import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Item, ItemFormData } from '../types/index';

interface ItemsState {
  items: Item[];
  selectedItem: Item | null;
}

type ItemsAction =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'SET_SELECTED_ITEM'; payload: Item | null }
  | { type: 'SET_ITEMS'; payload: Item[] };

interface ItemsContextType {
  state: ItemsState;
  addItem: (item: Item) => void;
  setSelectedItem: (item: Item | null) => void;
  setItems: (items: Item[]) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const initialState: ItemsState = {
  items: [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      type: 'Shirt',
      description: 'High-quality cotton t-shirt with modern fit. Perfect for casual wear and everyday comfort.',
      coverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1583743814966-8936f37f86df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      type: 'Pant',
      description: 'Classic slim-fit jeans made from premium denim. Comfortable stretch fabric with modern styling.',
      coverImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'Running Sneakers',
      type: 'Shoes',
      description: 'Lightweight running shoes with advanced cushioning technology. Perfect for daily runs and workouts.',
      coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: new Date('2024-01-05')
    },
    {
      id: '4',
      name: 'Tennis Racket Pro',
      type: 'Sports Gear',
      description: 'Professional-grade tennis racket with carbon fiber construction. Excellent control and power for serious players.',
      coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      createdAt: new Date('2024-01-01')
    }
  ],
  selectedItem: null
};

function itemsReducer(state: ItemsState, action: ItemsAction): ItemsState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case 'SET_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: action.payload
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  const addItem = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const setSelectedItem = (item: Item | null) => {
    dispatch({ type: 'SET_SELECTED_ITEM', payload: item });
  };

  const setItems = (items: Item[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  };

  return (
    <ItemsContext.Provider value={{ state, addItem, setSelectedItem, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
} 