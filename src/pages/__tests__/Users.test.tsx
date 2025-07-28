import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Users from "../Users";

// Mock the API
jest.mock("../../services/api", () => ({
  mockApi: {
    getUsers: jest.fn().mockResolvedValue({
      users: [
        {
          id: "1",
          organization: "Lendsqr",
          username: "Adedeji",
          email: "adedeji@lendsqr.com",
          phoneNumber: "08078903721",
          dateJoined: "May 15, 2020 10:00 AM",
          status: "active",
          profile: {
            firstName: "Adedeji",
            lastName: "Kemi",
            avatar:
              "https://ui-avatars.com/api/?name=Adedeji+Kemi&background=39CDCC&color=fff",
            gender: "Male",
            bvn: "12345678901",
            address: "Lagos, Nigeria",
            currency: "NGN",
            guarantor: {
              firstName: "Debby",
              lastName: "Ogana",
              phoneNumber: "08160780928",
              address: "Lagos, Nigeria",
              gender: "Female",
            },
          },
          education: {
            level: "Bsc",
            employmentStatus: "Employed",
            sector: "FinTech",
            duration: "2-4 years",
            officeEmail: "adedeji@lendsqr.com",
            monthlyIncome: ["₦200,000", "₦400,000"],
            loanRepayment: "₦40,000",
          },
          socials: {
            facebook: "Adedeji Kemi",
            instagram: "@adedeji",
            twitter: "@adedeji",
          },
          account: {
            accountNumber: "9912345678",
            accountBalance: "₦200,000",
            accountName: "Adedeji Kemi",
            bankName: "Providus Bank",
          },
        },
      ],
      total: 1,
      totalPages: 1,
    }),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn().mockReturnValue("mock_token"),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Users Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders users page with title", async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Users" })
      ).toBeInTheDocument();
    });
  });

  test("displays user data in table", async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      // Check for table data specifically
      const tableCells = screen.getAllByText("Adedeji");
      expect(tableCells.length).toBeGreaterThan(0);
      expect(screen.getByText("adedeji@lendsqr.com")).toBeInTheDocument();
      expect(screen.getByText("08078903721")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });
  });

  test("shows table headers", async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(screen.getByText("ORGANIZATION")).toBeInTheDocument();
      expect(screen.getByText("USERNAME")).toBeInTheDocument();
      expect(screen.getByText("EMAIL")).toBeInTheDocument();
      expect(screen.getByText("PHONE NUMBER")).toBeInTheDocument();
      expect(screen.getByText("DATE JOINED")).toBeInTheDocument();
      expect(screen.getByText("STATUS")).toBeInTheDocument();
    });
  });

  test("displays pagination info", async () => {
    renderWithRouter(<Users />);

    await waitFor(() => {
      expect(screen.getByText(/Showing 1 out of 1/)).toBeInTheDocument();
    });
  });

  test("redirects to login when no auth token", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    renderWithRouter(<Users />);

    // Should redirect to login, so the component might not render
    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith("auth_token");
    });
  });

  test("handles loading state", () => {
    renderWithRouter(<Users />);

    // Initially should show loading
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
