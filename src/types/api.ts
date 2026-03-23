export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface BotIdentity {
  type: "token" | "username";
  value: string;
}

export interface BotSetupPayload {
  botType: BotIdentity["type"];
  botValue: string;
}

export interface BotSetupResponse {
  botId?: string;
  displayName?: string;
  status: string;
}

export interface OwnerAuth {
  apiKey: string;
  email: string | null;
  name: string | null;
}

export interface AuthRegisterPayload {
  email: string;
  name: string | null;
}

export interface AuthRegisterResponse {
  ownerId: string;
  email: string;
  name: string | null;
  apiKey: string;
  plan: "starter" | "growth";
}

export interface AccountSummary {
  ownerId: string;
  email: string;
  name: string | null;
  usage: {
    plan: "starter" | "growth";
    limits: {
      maxBots: number;
      monthlyEvents: number;
    };
    usage: {
      totalBots: number;
      monthlyEvents: number;
    };
  };
}

export interface OwnerBotSummary {
  botId: string;
  displayName: string;
  botType: "token" | "username";
  verificationStatus: "pending" | "verified" | "failed";
  trackingStatus: "disabled" | "enabled";
  connectedAt: string;
  totalUsers: number;
  totalMessages: number;
  revenueThisMonth: number;
}

export interface PricingPlan {
  plan: "starter" | "growth";
  priceMonthly: number;
  currency: string;
  features: string[];
}

export interface BillingCheckoutPayload {
  plan: "starter" | "growth";
  provider: "manual" | "stripe" | "click";
  successUrl: string;
  cancelUrl: string;
}

export interface BillingCheckoutResponse {
  checkoutId: string;
  provider: "manual" | "stripe" | "click";
  approvalUrl: string;
  plan: "starter" | "growth";
  amount: number;
  currency: string;
}

export interface SubscriptionSummary {
  id: string;
  accountId: string;
  provider: "manual" | "stripe" | "click";
  providerCustomerId: string | null;
  providerSubscriptionId: string | null;
  plan: "starter" | "growth";
  status: "inactive" | "trialing" | "active" | "past_due" | "canceled" | "incomplete";
  amountMonthly: number;
  currency: string;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface DailyPoint {
  date: string;
  value: number;
}

export interface OverviewStats {
  totalUsers: number;
  activeUsersToday: number;
  newUsersToday: number;
  messagesToday: number;
  totalMessages: number;
  weeklyGrowthPct: number;
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  botStatus: "online" | "offline";
  apiHealth: "healthy" | "degraded";
  uptimePct: number;
  requestsToday: number;
}

export interface UsersStats {
  totalUsers: number;
  activeUsersToday: number;
  newUsersToday: number;
  growthSeries: DailyPoint[];
}

export interface GrowthStats {
  weeklyGrowthPct: number;
  monthlyGrowthPct: number;
  weeklySeries: DailyPoint[];
  monthlySeries: DailyPoint[];
}

export interface RevenueStats {
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenueSeries: DailyPoint[];
}

export interface MessagesStats {
  totalMessages: number;
  messagesToday: number;
  dailyMessagesSeries: DailyPoint[];
}

export interface ActivityItem {
  id: string;
  eventType: string;
  description: string;
  eventCode?: string;
  params?: Record<string, string | number>;
  createdAt: string;
}

export interface DashboardData {
  overview: OverviewStats;
  growth: GrowthStats;
  users: UsersStats;
  revenue: RevenueStats;
  messages: MessagesStats;
  recentActivity: ActivityItem[];
}
