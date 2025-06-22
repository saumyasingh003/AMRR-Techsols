import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Check, AlertCircle } from 'lucide-react';
import { useItems } from '../context/ItemsContext';
import type { ItemType, ItemFormData } from '../types/index';

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useItems();
  
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    type: 'Shirt',
    description: '',
    coverImage: null,
    additionalImages: []
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const itemTypes: ItemType[] = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Other'];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string | undefined> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Item description is required';
    }
    
    if (!formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      if (errors.coverImage) {
        setErrors(prev => ({ ...prev, coverImage: undefined }));
      }
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ 
      ...prev, 
      additionalImages: [...prev.additionalImages, ...files]
    }));
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const removeCoverImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const coverImageUrl = formData.coverImage ? URL.createObjectURL(formData.coverImage) : '';
    const additionalImageUrls = formData.additionalImages.map(file => URL.createObjectURL(file));

    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      coverImage: coverImageUrl,
      additionalImages: additionalImageUrls,
      createdAt: new Date()
    };

    addItem(newItem);
    
    setShowSuccess(true);
    
    setFormData({
      name: '',
      type: 'Shirt',
      description: '',
      coverImage: null,
      additionalImages: []
    });
    
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 2000);
  };

  const getImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
          <p className="text-gray-600">Fill in the details below to add a new item to your collection</p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">Item successfully added! Redirecting to view items...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`input-field ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter item name"
              />
              {errors.name && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Item Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="input-field"
              >
                {itemTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Item Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className={`input-field resize-none ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Describe the item in detail..."
              />
              {errors.description && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image <span className="text-red-500">*</span>
              </label>
              
              {!formData.coverImage ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="cover-image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a cover image</span>
                        <input
                          id="cover-image"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleCoverImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={getImagePreview(formData.coverImage)}
                    alt="Cover preview"
                    className="w-full max-h-96 object-contain rounded-lg bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {errors.coverImage && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.coverImage}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images (Optional)
              </label>
              
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <Plus className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="additional-images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Add more images</span>
                      <input
                        id="additional-images"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {formData.additionalImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.additionalImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={getImagePreview(file)}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={showSuccess}
            >
              {showSuccess ? 'Adding Item...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem; 