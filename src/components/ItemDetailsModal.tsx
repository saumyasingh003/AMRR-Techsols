import React from 'react';
import { X, Mail, Calendar, Package } from 'lucide-react';
import { useItems } from '../context/ItemsContext';
import ImageCarousel from './ImageCarousel';

const ItemDetailsModal: React.FC = () => {
  const { state, setSelectedItem } = useItems();
  const { selectedItem } = state;

  if (!selectedItem) return null;

  const allImages = [selectedItem.coverImage, ...selectedItem.additionalImages];

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleEnquire = () => {
    const subject = `Enquiry about ${selectedItem.name}`;
    const body = `Hi,\n\nI'm interested in the following item:\n\nItem: ${selectedItem.name}\nType: ${selectedItem.type}\nDescription: ${selectedItem.description}\n\nPlease provide more information.\n\nThank you!`;
    const mailtoLink = `mailto:store@itemstore.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-2xl transform transition-all w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-4 border-b border-gray-200 z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {selectedItem.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Package className="h-3 w-3 mr-1" />
                    {selectedItem.type}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedItem.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="ml-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all duration-200 hover:scale-105"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-4 sm:p-6">
              <div className="block lg:hidden space-y-6">
                <div className="w-full">
                  <ImageCarousel images={allImages} itemName={selectedItem.name} />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Type:</dt>
                        <dd className="text-sm text-gray-900 font-medium">{selectedItem.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Images:</dt>
                        <dd className="text-sm text-gray-900 font-medium">{allImages.length} photos</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Added:</dt>
                        <dd className="text-sm text-gray-900 font-medium">
                          {selectedItem.createdAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <button
                    onClick={handleEnquire}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/25 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Enquire About This Item</span>
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Opens your email client with a pre-filled message
                  </p>
                </div>
              </div>

              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                <div>
                  <ImageCarousel images={allImages} itemName={selectedItem.name} />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Details</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between items-center">
                        <dt className="text-sm font-medium text-gray-500">Type:</dt>
                        <dd className="text-sm text-gray-900 font-semibold">{selectedItem.type}</dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-sm font-medium text-gray-500">Images:</dt>
                        <dd className="text-sm text-gray-900 font-semibold">{allImages.length} photos</dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-sm font-medium text-gray-500">Added:</dt>
                        <dd className="text-sm text-gray-900 font-semibold">
                          {selectedItem.createdAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleEnquire}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/25 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                    >
                      <Mail className="h-5 w-5" />
                      <span>Enquire About This Item</span>
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      Opens your email client with a pre-filled message
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal; 