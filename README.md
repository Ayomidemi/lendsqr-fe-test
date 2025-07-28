# Lendsqr Frontend Assessment

A React TypeScript application built for the Lendsqr Frontend Engineering assessment. This application demonstrates a complete admin dashboard with user management capabilities.

## 🚀 Features

### Pages Implemented

- **Login Page**: Authentication with form validation
- **Dashboard**: Overview with statistics and quick actions
- **Users Page**: User listing with filtering and pagination
- **User Details Page**: Detailed user information with editing capabilities

### Key Features

- ✅ **React + TypeScript**: Modern development stack
- ✅ **SCSS Styling**: Advanced CSS preprocessing
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Mock API**: 500 user records with filtering
- ✅ **Local Storage**: User details persistence
- ✅ **Authentication**: Token-based auth system
- ✅ **Pagination**: Efficient data loading
- ✅ **Filtering**: Advanced search capabilities
- ✅ **Form Validation**: Input validation and error handling

## 🛠️ Tech Stack

- **React 19.1.0** - UI framework
- **TypeScript 5.8.3** - Type safety
- **SCSS** - Advanced styling
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lendsqr-assessment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Authentication

**⚠️ IMPORTANT FOR REVIEWERS:**
Please use these credentials to login and test the application:

- **Email**: `admin@lendsqr.com`
- **Password**: `password`

> **Note**: These are mock credentials for demonstration purposes. In a production environment, these would be securely managed through proper authentication systems.

## 📱 Pages Overview

### Login Page (`/login`)

- Clean, modern login interface
- Form validation with error handling
- Password visibility toggle
- Responsive design

### Dashboard (`/dashboard`)

- Statistics cards showing user metrics
- Quick action buttons
- User authentication status
- Navigation to other pages

### Users Page (`/users`)

- Data table with 500 mock users
- Advanced filtering system
- Pagination (10 users per page)
- Status badges with color coding
- Responsive table design

### User Details (`/users/:userId`)

- Comprehensive user information
- Tabbed interface (General, Documents, Bank, Loans, Savings, App)
- Edit functionality with local storage
- Form validation and error handling
- Status management

## 🎨 Design System

### Colors

- **Primary**: `#213F7D` (Dark Blue)
- **Secondary**: `#39CDCC` (Cyan)
- **Success**: `#27AE60` (Green)
- **Warning**: `#F39C12` (Orange)
- **Danger**: `#E74C3C` (Red)

### Typography

- **Font Family**: Work Sans, system fonts
- **Responsive**: Scales from mobile to desktop

### Components

- Consistent button styles
- Form inputs with focus states
- Status badges with color coding
- Loading spinners
- Error messages

## 📊 Data Structure

### User Object

```typescript
interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
  };
  // ... additional fields
}
```

## 🔧 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   └── UserDetails.tsx
├── services/           # API services
│   └── api.ts
├── styles/             # SCSS styles
│   ├── variables.scss
│   ├── global.scss
│   ├── Login.scss
│   ├── Dashboard.scss
│   ├── Users.scss
│   └── UserDetails.scss
├── types/              # TypeScript interfaces
│   └── index.ts
├── utils/              # Utility functions
│   └── storage.ts
└── App.tsx            # Main app component
```

## 🧪 Testing Considerations

The application is structured to support comprehensive testing:

### Unit Testing Areas

- **Authentication**: Login form validation
- **API Calls**: Mock API responses
- **Local Storage**: Data persistence
- **Form Validation**: Input validation
- **Navigation**: Route protection
- **Component Rendering**: UI components

### Test Scenarios

- **Positive**: Successful login, data loading, form submission
- **Negative**: Invalid credentials, network errors, validation errors

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 576px
- **Tablet**: 576px - 992px
- **Desktop**: > 992px

### Mobile Optimizations

- Collapsible navigation
- Touch-friendly buttons
- Optimized table layouts
- Simplified forms

## 🚀 Performance Features

- **Lazy Loading**: Components load on demand
- **Pagination**: Efficient data loading
- **Debounced Search**: Optimized filtering
- **Cached Data**: Local storage for user details
- **Optimized Images**: SVG icons and avatars

## 🔒 Security Features

- **Authentication**: Token-based auth
- **Route Protection**: Protected routes
- **Input Validation**: Form validation
- **Error Handling**: Graceful error management

## 📈 Future Enhancements

- Unit testing with Jest/React Testing Library
- E2E testing with Cypress
- State management with Redux/Zustand
- Real API integration
- Advanced filtering options
- Export functionality
- Real-time updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for assessment purposes only.

---

**Built with ❤️ for Lendsqr Frontend Engineering Assessment**
