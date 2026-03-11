import apiClient from "@/services/http";
import { ApiResponse, BotIdentity, BotSetupPayload, BotSetupResponse, DashboardData, GrowthStats, MessagesStats, OverviewStats, RevenueStats, UsersStats } from "@/types/api";
import axios from "axios";

const unwrap = <T>(payload: ApiResponse<T>): T => {
  if (!payload.success) {
    throw new Error(payload.message || "Request failed");
  }
  return payload.data;
};

const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message;
    if (typeof apiMessage === "string" && apiMessage.trim()) {
      return apiMessage;
    }

    if (error.code === "ECONNABORTED") {
      return "API request timed out.";
    }

    if (!error.response) {
      return "Backend is unreachable. Check that API is running on http://localhost:3000.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed";
};

export const analyticsApi = {
  connectBot: async (botIdentity: BotIdentity): Promise<BotSetupResponse> => {
    try {
      const payload: BotSetupPayload = {
        botType: botIdentity.type,
        botValue: botIdentity.value
      };
      const response = await apiClient.post<ApiResponse<BotSetupResponse>>("/bots/connect", payload);
      return unwrap(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  },
  verifyBot: async (botIdentity: BotIdentity): Promise<BotSetupResponse> => {
    try {
      const payload: BotSetupPayload = {
        botType: botIdentity.type,
        botValue: botIdentity.value
      };
      const response = await apiClient.post<ApiResponse<BotSetupResponse>>("/bots/verify", payload);
      return unwrap(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  },
  enableTracking: async (botIdentity: BotIdentity): Promise<BotSetupResponse> => {
    try {
      const payload: BotSetupPayload = {
        botType: botIdentity.type,
        botValue: botIdentity.value
      };
      const response = await apiClient.post<ApiResponse<BotSetupResponse>>("/bots/enable-tracking", payload);
      return unwrap(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  },
  getOverview: async (botIdentity: BotIdentity): Promise<OverviewStats> => {
    const response = await apiClient.get<ApiResponse<OverviewStats>>("/stats/overview", {
      params: {
        botType: botIdentity.type,
        botValue: botIdentity.value
      }
    });
    return unwrap(response.data);
  },
  getUsers: async (botIdentity: BotIdentity): Promise<UsersStats> => {
    const response = await apiClient.get<ApiResponse<UsersStats>>("/stats/users", {
      params: {
        botType: botIdentity.type,
        botValue: botIdentity.value
      }
    });
    return unwrap(response.data);
  },
  getGrowth: async (botIdentity: BotIdentity): Promise<GrowthStats> => {
    const response = await apiClient.get<ApiResponse<GrowthStats>>("/stats/growth", {
      params: {
        botType: botIdentity.type,
        botValue: botIdentity.value
      }
    });
    return unwrap(response.data);
  },
  getRevenue: async (botIdentity: BotIdentity): Promise<RevenueStats> => {
    const response = await apiClient.get<ApiResponse<RevenueStats>>("/stats/revenue", {
      params: {
        botType: botIdentity.type,
        botValue: botIdentity.value
      }
    });
    return unwrap(response.data);
  },
  getMessages: async (botIdentity: BotIdentity): Promise<MessagesStats> => {
    const response = await apiClient.get<ApiResponse<MessagesStats>>("/stats/messages", {
      params: {
        botType: botIdentity.type,
        botValue: botIdentity.value
      }
    });
    return unwrap(response.data);
  },
  getDashboard: async (botIdentity: BotIdentity): Promise<DashboardData> => {
    try {
      const response = await apiClient.get<ApiResponse<DashboardData>>("/stats/dashboard", {
        params: {
          botType: botIdentity.type,
          botValue: botIdentity.value
        }
      });
      return unwrap(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  }
};
