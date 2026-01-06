
export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  companyName: string;
  companyLogo: string;
  stats: {
    rating: number;
    followers: string;
    following: string;
  };
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  logo: string;
  themeColor: string;
  backgroundImage?: string;
  isInactive?: boolean;
  isEWallet?: boolean;
}

export interface AppState {
  profile: UserProfile;
  bankAccounts: BankAccount[];
}
