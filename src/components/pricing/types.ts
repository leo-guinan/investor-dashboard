export interface Plan {
  id: string;
  name: string;
  tokens: string;
  originalTokens?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  savings?: string;
  description: string;
}

export interface PricingProps {
  isDark: boolean;
  onClose: () => void;
}