# ItemStore - Professional Item Management System

A modern, responsive React application built with Vite and TypeScript for managing and showcasing item collections with a beautiful, professional UI.

## 🌟 Features

### Core Functionality
- **View Items Page**: Browse through all items in a responsive grid layout
- **Add Item Page**: Comprehensive form for adding new items with image uploads
- **Item Details Modal**: Detailed view with image carousel and enquiry functionality
- **Search & Filter**: Real-time search and category filtering
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Professional UI Components
- **Navigation**: Clean navigation bar with active state indicators
- **Item Cards**: Beautiful cards with hover effects and animations
- **Image Carousel**: Interactive carousel with thumbnails and navigation
- **Form Validation**: Real-time validation with error messages
- **Success Messages**: User feedback for successful operations
- **Modal/Lightbox**: Overlay modal for detailed item views

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Context API**: Global state management for items
- **React Router**: Client-side routing between pages
- **Tailwind CSS v4**: Modern utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent icon system
- **File Upload**: Handle cover images and additional images
- **Email Integration**: Enquiry button opens default email client

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
1. Clone the repository or download the project files
2. Navigate to the project directory:
   ```bash
   cd assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📱 Usage

### Viewing Items
1. Navigate to the "View Items" page (default page)
2. Browse through the item grid
3. Use the search bar to find specific items
4. Filter by item type using the dropdown
5. Toggle between grid and list view modes
6. Click on any item to open the detailed view

### Adding New Items
1. Navigate to "Add Item" page
2. Fill in the required information:
   - Item Name (required)
   - Item Type (dropdown selection)
   - Item Description (required)
   - Cover Image (required)
   - Additional Images (optional)
3. Preview uploaded images before submission
4. Submit the form to add the item
5. Success message will appear and redirect to View Items

### Item Details & Enquiry
1. Click on any item card to open the detail modal
2. View all item information and images
3. Navigate through images using the carousel
4. Click "Enquire About This Item" to open email client
5. Pre-filled email template includes item details

## 🎨 Design Features

### Modern Professional UI
- Clean, minimalist design with proper spacing
- Consistent color scheme (blue primary, gray neutrals)
- Smooth animations and hover effects
- Professional typography and layout
- Intuitive user experience

### Responsive Layout
- Mobile-first responsive design
- Adaptive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Accessibility
- Proper semantic HTML
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus management

## 🛠️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── ItemCard.tsx     # Item display card
│   ├── ImageCarousel.tsx # Image carousel component
│   └── ItemDetailsModal.tsx # Item detail modal
├── pages/              # Main application pages
│   ├── ViewItems.tsx   # Items listing page
│   └── AddItem.tsx     # Add new item form
├── context/            # State management
│   └── ItemsContext.tsx # Global items context
├── types/              # TypeScript interfaces
│   └── index.ts        # Item and form data types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind
```

## 🔧 Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API + useReducer
- **Form Handling**: React controlled components
- **File Handling**: HTML5 File API

## ✨ Sample Data

The application comes with pre-loaded sample items:
- Premium Cotton T-Shirt
- Slim Fit Jeans
- Running Sneakers
- Tennis Racket Pro

All sample items include multiple high-quality images and detailed descriptions.

## 🎯 Bonus Features Implemented

### 1. Email Integration
- **Enquire Button**: Opens default email client
- **Pre-filled Template**: Includes item details automatically
- **Professional Format**: Well-structured email template

### 2. Professional UI/UX
- **Advanced Animations**: Smooth transitions and hover effects
- **Interactive Elements**: Hover states, loading states, success feedback
- **Modern Design Patterns**: Cards, modals, carousels
- **Responsive Grid**: Adaptive layouts for all devices

### 3. Enhanced Search & Filtering
- **Real-time Search**: Instant filtering as you type
- **Category Filter**: Filter by item type
- **View Mode Toggle**: Switch between grid and list views
- **Results Counter**: Shows filtered results count

### 4. Advanced Form Features
- **Real-time Validation**: Instant feedback on form errors
- **Image Preview**: Preview uploaded images before submission
- **Multiple Image Support**: Cover image + additional images
- **Drag & Drop**: File upload with drag and drop support

## 🚀 Future Enhancements

Potential areas for future development:
- Backend API integration for data persistence
- User authentication and authorization
- Image optimization and cloud storage
- Advanced search with filters (price, date, etc.)
- Wishlist and favorites functionality
- Export functionality (PDF, CSV)
- Admin dashboard for item management

## 📝 Development Notes

### Image Handling
Currently, images are handled using `URL.createObjectURL()` for preview purposes. In a production environment, these would be uploaded to a cloud storage service (AWS S3, Cloudinary, etc.) and stored as URLs in a database.

### State Management
The application uses React Context API for simple state management. For larger applications, consider Redux or Zustand for more complex state management needs.

### Performance
- Components are optimized with proper React patterns
- Images are lazy-loaded where appropriate
- Smooth animations without performance impact

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
