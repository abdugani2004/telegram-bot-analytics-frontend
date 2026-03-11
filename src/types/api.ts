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
