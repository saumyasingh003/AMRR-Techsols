export type ItemType = 'Shirt' | 'Pant' | 'Shoes' | 'Sports Gear' | 'Accessories' | 'Other';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  coverImage: string;
  additionalImages: string[];
  createdAt: Date;
}

export interface ItemFormData {
  name: string;
  type: ItemType;
  description: string;
  coverImage: File | null;
  additionalImages: File[];
} 