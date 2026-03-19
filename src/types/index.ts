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

export type SettlementStatus = 'queued' | 'submitted' | 'pending' | 'successful' | 'failed';

export interface Client {
  id: string;
  businessName: string;
  email: string;
  clientCode: string;
  mobileNumber: string;
  mobileOperator: string;
  countryCode: string;
  currency: string;
  feeRate: number | string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientBalance {
  grossReceived: number;
  totalFees: number;
  totalSettled: number;
  availableBalance: number;
}

export interface PayinTransaction {
  id: string;
  fincraReference?: string;
  customerName?: string;
  customerEmail?: string;
  customerReference?: string;
  amount: number | string;
  currency: string;
  status: string;
  clientId?: string;
  clientCode?: string;
  isAttributed: boolean;
  feeAmount?: number | string;
  netAmount?: number | string;
  receivedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settlement {
  id: string;
  clientId: string;
  payinId: string;
  grossAmount: number | string;
  feeAmount: number | string;
  netAmount: number | string;
  currency: string;
  status: SettlementStatus;
  payoutRequestId?: string;
  failureReason?: string;
  createdAt: string;
  settledAt?: string;
  payoutRequest?: { id: string; clientReference: string; status: string };
}
