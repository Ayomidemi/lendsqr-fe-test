import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

// Mock the API
jest.mock('../../services/api', () => ({
  mockApi: {
    login: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render login form', () => {
      renderLogin();
      
      expect(screen.getByText('Welcome!')).toBeInTheDocument();
      expect(screen.getByText('Enter details to login to your account')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'LOG IN' })).toBeInTheDocument();
    });

    it('should render password toggle button', () => {
      renderLogin();
      
      expect(screen.getByRole('button', { name: 'SHOW' })).toBeInTheDocument();
    });

    it('should render forgot password link', () => {
      renderLogin();
      
      expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should update email input value', () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('should update password input value', () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      expect(passwordInput).toHaveValue('password123');
    });

    it('should toggle password visibility', () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText('Password');
      const toggleButton = screen.getByRole('button', { name: 'SHOW' });
      
      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');
      
      // Click toggle button
      fireEvent.click(toggleButton);
      expect(screen.getByRole('button', { name: 'HIDE' })).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'text');
      
      // Click toggle button again
      fireEvent.click(screen.getByRole('button', { name: 'HIDE' }));
      expect(screen.getByRole('button', { name: 'SHOW' })).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Form Validation', () => {
    it('should show error for invalid credentials', async () => {
      const { mockApi } = require('../../services/api');
      mockApi.login.mockRejectedValue(new Error('Invalid credentials'));
      
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'LOG IN' });
      
      fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument();
      });
    });

    it('should clear error when user types', async () => {
      const { mockApi } = require('../../services/api');
      mockApi.login.mockRejectedValue(new Error('Invalid credentials'));
      
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'LOG IN' });
      
      fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument();
      });
      
      // Clear error by typing
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      expect(screen.queryByText('Invalid email or password. Please try again.')).not.toBeInTheDocument();
    });
  });

  describe('Successful Login', () => {
    it('should navigate to dashboard on successful login', async () => {
      const { mockApi } = require('../../services/api');
      mockApi.login.mockResolvedValue({
        data: {
          token: 'mock-token',
          user: { id: '1', email: 'admin@lendsqr.com', name: 'Admin' }
        },
        status: 'success',
        message: 'Login successful'
      });
      
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'LOG IN' });
      
      fireEvent.change(emailInput, { target: { value: 'admin@lendsqr.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
      
      expect(localStorage.getItem('auth_token')).toBe('mock-token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify({ id: '1', email: 'admin@lendsqr.com', name: 'Admin' }));
    });

    it('should show loading state during login', async () => {
      const { mockApi } = require('../../services/api');
      mockApi.login.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'LOG IN' });
      
      fireEvent.change(emailInput, { target: { value: 'admin@lendsqr.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(submitButton);
      
      expect(screen.getByRole('button', { name: 'LOGGING IN...' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'LOGGING IN...' })).toBeDisabled();
    });
  });
}); 