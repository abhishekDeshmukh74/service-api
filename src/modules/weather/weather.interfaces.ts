enum SubscriptionTier {
  'GOLD',
  'FREE',
  'SILVER',
}

export interface SubscriptionRequest {
  id: number;
  name: string;
  email: string;
  subscriptionTier: SubscriptionTier;
}
