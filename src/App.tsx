import { Suspense, lazy } from "react";
import { useBotIdentity } from "@/hooks/useBotIdentity";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Navigate, Route, Routes } from "react-router-dom";

const BotIdentityForm = lazy(async () => ({
  default: (await import("@/components/bot/BotIdentityForm")).BotIdentityForm
}));

const DashboardPage = lazy(async () => ({
  default: (await import("@/pages/DashboardPage")).DashboardPage
}));

const App = () => {
  const { botIdentity, setBotIdentity, clearBotIdentity } = useBotIdentity();

  return (
    <DashboardLayout hasBotIdentity={Boolean(botIdentity)}>
      <Suspense fallback={<div className="glass-panel min-h-[240px] animate-pulse p-6" />}>
        {botIdentity ? (
          <Routes>
            <Route element={<DashboardPage botIdentity={botIdentity} onChangeBot={clearBotIdentity} view="overview" />} path="/" />
            <Route element={<DashboardPage botIdentity={botIdentity} onChangeBot={clearBotIdentity} view="overview" />} path="/overview" />
            <Route element={<DashboardPage botIdentity={botIdentity} onChangeBot={clearBotIdentity} view="users" />} path="/users" />
            <Route element={<DashboardPage botIdentity={botIdentity} onChangeBot={clearBotIdentity} view="messages" />} path="/messages" />
            <Route element={<DashboardPage botIdentity={botIdentity} onChangeBot={clearBotIdentity} view="revenue" />} path="/revenue" />
            <Route element={<DashboardPage botIdentity={botIdentity} onChangeBot={clearBotIdentity} view="health" />} path="/health" />
            <Route element={<Navigate replace to="/overview" />} path="*" />
          </Routes>
        ) : (
          <BotIdentityForm onSubmit={setBotIdentity} />
        )}
      </Suspense>
    </DashboardLayout>
  );
};

export default App;
