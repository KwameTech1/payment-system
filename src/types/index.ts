export type RecipientStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type PayoutStatus = 'draft' | 'queued' | 'submitted' | 'pending' | 'successful' | 'failed';

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface Recipient {
  id: string;
  fullName: string;
  phoneNumber: string;
  mobileOperator: string;
  countryCode: string;
  currency: string;
  status: RecipientStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: { id: string; fullName: string };
}

export interface PayoutRequest {
  id: string;
  clientReference: string;
  fincraReference?: string;
  recipient: Recipient;
  recipientId: string;
  initiatedById: string;
  amount: number | string;
  currency: string;
  reason?: string;
  status: PayoutStatus;
  fincraStatus?: string;
  failureReason?: string;
  retryCount: number;
  parentPayoutId?: string;
  submittedAt?: string;
  settledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  details?: Array<{ msg: string; path: string }>;
}
