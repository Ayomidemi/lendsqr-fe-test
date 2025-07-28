export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
    guarantor: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      address: string;
      gender: string;
    };
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  account: {
    accountNumber: string;
    accountBalance: string;
    accountName: string;
    bankName: string;
  };
}

export const mockUsers: User[] = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "May 15, 2020 10:00 AM",
    status: "inactive",
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
  {
    id: "2",
    organization: "Irorun",
    username: "Debby Ogana",
    email: "debby2@irorun.com",
    phoneNumber: "08160780928",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "pending",
    profile: {
      firstName: "Debby",
      lastName: "Ogana",
      avatar:
        "https://ui-avatars.com/api/?name=Debby+Ogana&background=39CDCC&color=fff",
      gender: "Female",
      bvn: "12345678902",
      address: "Lagos, Nigeria",
      currency: "NGN",
      guarantor: {
        firstName: "Grace",
        lastName: "Effiom",
        phoneNumber: "07060780922",
        address: "Lagos, Nigeria",
        gender: "Female",
      },
    },
    education: {
      level: "Bsc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2-4 years",
      officeEmail: "debby2@irorun.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Debby Ogana",
      instagram: "@debby",
      twitter: "@debby",
    },
    account: {
      accountNumber: "9912345679",
      accountBalance: "₦200,000",
      accountName: "Debby Ogana",
      bankName: "Providus Bank",
    },
  },
  {
    id: "3",
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "blacklisted",
    profile: {
      firstName: "Grace",
      lastName: "Effiom",
      avatar:
        "https://ui-avatars.com/api/?name=Grace+Effiom&background=39CDCC&color=fff",
      gender: "Female",
      bvn: "12345678903",
      address: "Lagos, Nigeria",
      currency: "NGN",
      guarantor: {
        firstName: "Tosin",
        lastName: "Dokunmu",
        phoneNumber: "08078903721",
        address: "Lagos, Nigeria",
        gender: "Male",
      },
    },
    education: {
      level: "Bsc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2-4 years",
      officeEmail: "grace@lendstar.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Grace Effiom",
      instagram: "@grace",
      twitter: "@grace",
    },
    account: {
      accountNumber: "9912345680",
      accountBalance: "₦200,000",
      accountName: "Grace Effiom",
      bankName: "Providus Bank",
    },
  },
  {
    id: "4",
    organization: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "May 15, 2020 10:00 AM",
    status: "active",
    profile: {
      firstName: "Tosin",
      lastName: "Dokunmu",
      avatar:
        "https://ui-avatars.com/api/?name=Tosin+Dokunmu&background=39CDCC&color=fff",
      gender: "Male",
      bvn: "12345678904",
      address: "Lagos, Nigeria",
      currency: "NGN",
      guarantor: {
        firstName: "Adedeji",
        lastName: "Kemi",
        phoneNumber: "08078903721",
        address: "Lagos, Nigeria",
        gender: "Male",
      },
    },
    education: {
      level: "Bsc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2-4 years",
      officeEmail: "tosin@lendsqr.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Tosin Dokunmu",
      instagram: "@tosin",
      twitter: "@tosin",
    },
    account: {
      accountNumber: "9912345681",
      accountBalance: "₦200,000",
      accountName: "Tosin Dokunmu",
      bankName: "Providus Bank",
    },
  },
  {
    id: "5",
    organization: "Irorun",
    username: "Grace Effiom",
    email: "grace@irorun.com",
    phoneNumber: "08160780928",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "inactive",
    profile: {
      firstName: "Grace",
      lastName: "Effiom",
      avatar:
        "https://ui-avatars.com/api/?name=Grace+Effiom&background=39CDCC&color=fff",
      gender: "Female",
      bvn: "12345678905",
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
      officeEmail: "grace@irorun.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Grace Effiom",
      instagram: "@grace",
      twitter: "@grace",
    },
    account: {
      accountNumber: "9912345682",
      accountBalance: "₦200,000",
      accountName: "Grace Effiom",
      bankName: "Providus Bank",
    },
  },
  {
    id: "6",
    organization: "Lendstar",
    username: "Debby Ogana",
    email: "debby@lendstar.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "pending",
    profile: {
      firstName: "Debby",
      lastName: "Ogana",
      avatar:
        "https://ui-avatars.com/api/?name=Debby+Ogana&background=39CDCC&color=fff",
      gender: "Female",
      bvn: "12345678906",
      address: "Lagos, Nigeria",
      currency: "NGN",
      guarantor: {
        firstName: "Grace",
        lastName: "Effiom",
        phoneNumber: "07060780922",
        address: "Lagos, Nigeria",
        gender: "Female",
      },
    },
    education: {
      level: "Bsc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2-4 years",
      officeEmail: "debby@lendstar.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Debby Ogana",
      instagram: "@debby",
      twitter: "@debby",
    },
    account: {
      accountNumber: "9912345683",
      accountBalance: "₦200,000",
      accountName: "Debby Ogana",
      bankName: "Providus Bank",
    },
  },
  {
    id: "7",
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
      bvn: "12345678907",
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
      accountNumber: "9912345684",
      accountBalance: "₦200,000",
      accountName: "Adedeji Kemi",
      bankName: "Providus Bank",
    },
  },
  {
    id: "8",
    organization: "Irorun",
    username: "Debby Ogana",
    email: "debby2@irorun.com",
    phoneNumber: "08160780928",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "inactive",
    profile: {
      firstName: "Debby",
      lastName: "Ogana",
      avatar:
        "https://ui-avatars.com/api/?name=Debby+Ogana&background=39CDCC&color=fff",
      gender: "Female",
      bvn: "12345678908",
      address: "Lagos, Nigeria",
      currency: "NGN",
      guarantor: {
        firstName: "Grace",
        lastName: "Effiom",
        phoneNumber: "07060780922",
        address: "Lagos, Nigeria",
        gender: "Female",
      },
    },
    education: {
      level: "Bsc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2-4 years",
      officeEmail: "debby2@irorun.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Debby Ogana",
      instagram: "@debby",
      twitter: "@debby",
    },
    account: {
      accountNumber: "9912345685",
      accountBalance: "₦200,000",
      accountName: "Debby Ogana",
      bankName: "Providus Bank",
    },
  },
  {
    id: "9",
    organization: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: "blacklisted",
    profile: {
      firstName: "Grace",
      lastName: "Effiom",
      avatar:
        "https://ui-avatars.com/api/?name=Grace+Effiom&background=39CDCC&color=fff",
      gender: "Female",
      bvn: "12345678909",
      address: "Lagos, Nigeria",
      currency: "NGN",
      guarantor: {
        firstName: "Tosin",
        lastName: "Dokunmu",
        phoneNumber: "08078903721",
        address: "Lagos, Nigeria",
        gender: "Male",
      },
    },
    education: {
      level: "Bsc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2-4 years",
      officeEmail: "grace@lendstar.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Grace Effiom",
      instagram: "@grace",
      twitter: "@grace",
    },
    account: {
      accountNumber: "9912345686",
      accountBalance: "₦200,000",
      accountName: "Grace Effiom",
      bankName: "Providus Bank",
    },
  },
  {
    id: "10",
    organization: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phoneNumber: "08078903721",
    dateJoined: "May 15, 2020 10:00 AM",
    status: "active",
    profile: {
      firstName: "Tosin",
      lastName: "Dokunmu",
      avatar:
        "https://ui-avatars.com/api/?name=Tosin+Dokunmu&background=39CDCC&color=fff",
      gender: "Male",
      bvn: "12345678910",
      address: "Lagos, Nigeria",
      currency: "NGN",
      guarantor: {
        firstName: "Adedeji",
        lastName: "Kemi",
        phoneNumber: "08078903721",
        address: "Lagos, Nigeria",
        gender: "Male",
      },
    },
    education: {
      level: "Bsc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2-4 years",
      officeEmail: "tosin@lendsqr.com",
      monthlyIncome: ["₦200,000", "₦400,000"],
      loanRepayment: "₦40,000",
    },
    socials: {
      facebook: "Tosin Dokunmu",
      instagram: "@tosin",
      twitter: "@tosin",
    },
    account: {
      accountNumber: "9912345687",
      accountBalance: "₦200,000",
      accountName: "Tosin Dokunmu",
      bankName: "Providus Bank",
    },
  },
];

// Generate more users for pagination testing
export const generateMoreUsers = (count: number): User[] => {
  const organizations = [
    "Lendsqr",
    "Irorun",
    "Lendstar",
    "Lendstack",
    "Lendflow",
  ];
  const firstNames = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Lisa",
    "Tom",
    "Emma",
    "Chris",
    "Anna",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ];
  const statuses: User["status"][] = [
    "active",
    "inactive",
    "pending",
    "blacklisted",
  ];

  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const organization =
      organizations[Math.floor(Math.random() * organizations.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    users.push({
      id: (11 + i).toString(),
      organization,
      username: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
      phoneNumber: `080${Math.floor(Math.random() * 90000000) + 10000000}`,
      dateJoined: new Date(
        2020,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status,
      profile: {
        firstName,
        lastName,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=39CDCC&color=fff`,
        gender: Math.random() > 0.5 ? "Male" : "Female",
        bvn: (Math.floor(Math.random() * 90000000000) + 10000000000).toString(),
        address: "Lagos, Nigeria",
        currency: "NGN",
        guarantor: {
          firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
          lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
          phoneNumber: `081${Math.floor(Math.random() * 90000000) + 10000000}`,
          address: "Lagos, Nigeria",
          gender: Math.random() > 0.5 ? "Male" : "Female",
        },
      },
      education: {
        level: "Bsc",
        employmentStatus: "Employed",
        sector: "FinTech",
        duration: "2-4 years",
        officeEmail: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
        monthlyIncome: ["₦200,000", "₦400,000"],
        loanRepayment: "₦40,000",
      },
      socials: {
        facebook: `${firstName} ${lastName}`,
        instagram: `@${firstName.toLowerCase()}`,
        twitter: `@${firstName.toLowerCase()}`,
      },
      account: {
        accountNumber: `9912345${(688 + i).toString().padStart(3, "0")}`,
        accountBalance: "₦200,000",
        accountName: `${firstName} ${lastName}`,
        bankName: "Providus Bank",
      },
    });
  }

  return users;
};

// Combine original users with generated users
export const allUsers = [...mockUsers, ...generateMoreUsers(490)]; // 500 total users
