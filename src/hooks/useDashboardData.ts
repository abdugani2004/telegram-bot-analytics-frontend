import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import { BotIdentity, DashboardData } from "@/types/api";

interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

export const useDashboardData = (botIdentity: BotIdentity | null) => {
  const [state, setState] = useState<DashboardState>({
    data: null,
    isLoading: true,
    error: null
  });

  const refetch = async () => {
    if (!botIdentity) {
      setState({
        data: null,
        isLoading: false,
        error: null
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await analyticsApi.getDashboard(botIdentity);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load dashboard"
      });
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!botIdentity) {
        setState({
          data: null,
          isLoading: false,
          error: null
        });
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await analyticsApi.getDashboard(botIdentity);
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : "Failed to load dashboard"
        });
      }
    };

    void load();
  }, [botIdentity]);

  return {
    ...state,
    refetch
  };
};
