import { BotIdentityForm } from "@/components/bot/BotIdentityForm";
import { useBotIdentity } from "@/hooks/useBotIdentity";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const { botIdentity, setBotIdentity, clearBotIdentity } = useBotIdentity();

  return (
    <DashboardLayout hasBotIdentity={Boolean(botIdentity)}>
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
    </DashboardLayout>
  );
};

export default App;
