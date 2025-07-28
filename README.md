# Lendsqr Frontend Assessment

A React TypeScript application built for the Lendsqr Frontend Engineer assessment. This application replicates the Lendsqr Admin Console with pixel-perfect design fidelity and comprehensive functionality.

## 🚀 Live Demo

**Deployed URL:** [https://peace-adeniji-lendsqr-fe-test.vercel.app](https://peace-adeniji-lendsqr-fe-test.vercel.app)

## 📋 Project Overview

This application implements a complete admin dashboard with the following features:

### ✅ **Pages Implemented**

- **Login Page**: Authentication with pixel-perfect design
- **Dashboard**: Overview with statistics and user management
- **Users Page**: Dedicated user listing with advanced filtering
- **User Details Page**: Comprehensive user information with tabs

### ✅ **Technical Requirements Met**

- **React + TypeScript**: Full TypeScript implementation
- **SCSS**: Advanced styling with variables and mixins
- **Mobile Responsive**: Responsive design across all devices
- **Mock API**: 500 user records with filtering, pagination, and search
- **Local Storage**: Authentication and user data persistence
- **Unit Testing**: Comprehensive test coverage

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: SCSS with CSS Grid and Flexbox
- **Routing**: React Router v6
- **Testing**: Jest + React Testing Library
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Navbar.tsx      # Top navigation bar
│   ├── Icons.tsx       # SVG icon components
│   ├── FilterModal.tsx # Filter overlay
│   └── ActionDropdown.tsx # User action menu
├── pages/              # Main application pages
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Users.tsx       # User listing page
│   └── UserDetails.tsx # User detail view
├── services/           # API and business logic
│   └── api.ts         # Mock API implementation
├── data/              # Static data and types
│   └── mockUsers.ts   # 500 user records
├── styles/            # SCSS stylesheets
│   ├── variables.scss # Design tokens
│   ├── global.scss    # Global styles
│   └── *.scss        # Component-specific styles
└── types/             # TypeScript type definitions
    └── index.ts       # Shared types
```

## 🎨 Design Fidelity

### **Pixel-Perfect Implementation**

- **100% Figma Match**: Exact replication of provided designs
- **Typography**: Avenir Next font family throughout
- **Color Palette**: Exact brand colors (#213F7D, #39CDCC, etc.)
- **Spacing**: Precise padding and margins
- **Shadows**: Box shadows matching design specifications

### **Responsive Design**

- **Desktop**: Full-featured layout with sidebar
- **Tablet**: Optimized layout with simplified navigation
- **Mobile**: Touch-friendly interface with collapsible sidebar

## 🔧 Key Features

### **Authentication System**

- **Login**: Email/password authentication
- **Token Storage**: JWT tokens in localStorage
- **Route Protection**: Automatic redirect to login
- **Session Management**: Persistent authentication state

### **Dashboard Analytics**

- **Statistics Cards**: Users, Active Users, Loans, Savings
- **Real-time Data**: Dynamic statistics from mock API
- **Visual Indicators**: Color-coded status badges

### **User Management**

- **500 User Records**: Comprehensive mock data
- **Advanced Filtering**: Organization, status, date, search
- **Pagination**: 10 users per page with navigation
- **Action Menu**: View details, blacklist, activate users

### **User Details**

- **Tabbed Interface**: General, Documents, Bank, Loans, Savings, App
- **Local Storage**: User data persistence
- **Comprehensive Data**: Full user profile information

## 🧪 Testing

### **Test Coverage**

- **Login Page**: Authentication flow testing
- **Users Page**: Component rendering and interactions
- **API Integration**: Mock API testing
- **Error Handling**: Negative scenario testing

### **Test Files**

- `src/pages/__tests__/Login.test.tsx`
- `src/pages/__tests__/Users.test.tsx`

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn

### **Installation**

```bash
# Clone the repository
git clone https://github.com/your-username/lendsqr-fe-test.git

# Navigate to project directory
cd lendsqr-fe-test

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
```

## 🔐 Authentication

**Test Credentials:**

- **Email**: `admin@lendsqr.com`
- **Password**: `password`

## 📱 Mobile Responsiveness

### **Breakpoints**

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

### **Mobile Optimizations**

- **Collapsible Sidebar**: Hamburger menu on mobile
- **Simplified Navigation**: Essential elements only
- **Touch-Friendly**: Larger touch targets
- **Optimized Tables**: Horizontal scrolling on mobile

## 🎯 Assessment Requirements Met

### ✅ **Visual Fidelity**

- Pixel-perfect implementation of Figma designs
- Exact color matching and typography
- Proper spacing and layout alignment

### ✅ **Code Quality**

- TypeScript throughout with proper typing
- Component-based architecture
- Clean, maintainable code structure
- Consistent naming conventions

### ✅ **Best Practices**

- Responsive design principles
- Accessibility considerations
- Performance optimizations
- Error handling and loading states

### ✅ **Unit Testing**

- Positive and negative test scenarios
- Component rendering tests
- User interaction testing
- API integration testing

### ✅ **Documentation**

- Comprehensive README
- Clear commit history
- Code comments and documentation
- Project structure explanation

## 🚀 Deployment

The application is deployed on Vercel with the following configuration:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

## 📝 Development Decisions

### **Architecture Choices**

1. **Component Separation**: Modular components for reusability
2. **SCSS Structure**: Organized with variables and mixins
3. **Mock API**: Comprehensive data with realistic scenarios
4. **TypeScript**: Full type safety throughout

### **Design Decisions**

1. **Mobile-First**: Responsive design from mobile up
2. **Consistent Styling**: Design system with variables
3. **Performance**: Optimized rendering and loading
4. **User Experience**: Intuitive navigation and interactions

### **Technical Decisions**

1. **Vite**: Fast development and build times
2. **React Router**: Client-side routing
3. **Local Storage**: Simple authentication persistence
4. **Mock Data**: Realistic 500-user dataset

## 🔄 Future Enhancements

- **Real API Integration**: Replace mock API with actual backend
- **Advanced Filtering**: More sophisticated search capabilities
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Testing**: E2E testing with Cypress
- **Performance**: Code splitting and lazy loading

## 📞 Contact

**Developer**: Peace Adeniji  
**Email**: adenijiayomide13@gmail.com 
**GitHub**: https://github.com/Ayomidemi

---

_This project was built for the Lendsqr Frontend Engineer assessment. All code is original and demonstrates modern React/TypeScript development practices._
