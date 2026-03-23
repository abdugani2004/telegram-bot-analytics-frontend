import { Suspense, lazy } from "react";
import { useBotIdentity } from "@/hooks/useBotIdentity";
import { useOwnerAuth } from "@/hooks/useOwnerAuth";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Navigate, Route, Routes } from "react-router-dom";

const BotIdentityForm = lazy(async () => ({
  default: (await import("@/components/bot/BotIdentityForm")).BotIdentityForm
}));

const DashboardPage = lazy(async () => ({
  default: (await import("@/pages/DashboardPage")).DashboardPage
}));

const AccountPage = lazy(async () => ({
  default: (await import("@/pages/AccountPage")).AccountPage
}));

const BillingPage = lazy(async () => ({
  default: (await import("@/pages/BillingPage")).BillingPage
}));

const LandingPage = lazy(async () => ({
  default: (await import("@/pages/LandingPage")).LandingPage
}));

const App = () => {
  const { botIdentity, setBotIdentity, clearBotIdentity } = useBotIdentity();
  const { ownerAuth, setOwnerAuth, clearOwnerAuth } = useOwnerAuth();
  const isReady = Boolean(ownerAuth?.apiKey && botIdentity);
  const activeBotIdentity = botIdentity ?? undefined;

  return (
    <DashboardLayout
      hasBotIdentity={isReady}
      ownerEmail={ownerAuth?.email ?? null}
      onResetWorkspace={() => {
        clearBotIdentity();
        clearOwnerAuth();
      }}
    >
      <Suspense fallback={<div className="glass-panel min-h-[240px] animate-pulse p-6" />}>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route
            element={
              <BotIdentityForm
                initialApiKey={ownerAuth?.apiKey ?? ""}
                initialOwnerEmail={ownerAuth?.email ?? ""}
                initialOwnerName={ownerAuth?.name ?? ""}
                onAuthSubmit={setOwnerAuth}
                onSubmit={setBotIdentity}
              />
            }
            path="/workspace"
          />
          {isReady && activeBotIdentity ? (
            <>
              <Route element={<DashboardPage botIdentity={activeBotIdentity} onChangeBot={clearBotIdentity} view="overview" />} path="/overview" />
              <Route element={<DashboardPage botIdentity={activeBotIdentity} onChangeBot={clearBotIdentity} view="users" />} path="/users" />
              <Route element={<DashboardPage botIdentity={activeBotIdentity} onChangeBot={clearBotIdentity} view="messages" />} path="/messages" />
              <Route element={<DashboardPage botIdentity={activeBotIdentity} onChangeBot={clearBotIdentity} view="revenue" />} path="/revenue" />
              <Route element={<DashboardPage botIdentity={activeBotIdentity} onChangeBot={clearBotIdentity} view="health" />} path="/health" />
              <Route element={<AccountPage />} path="/account" />
              <Route element={<BillingPage />} path="/billing" />
            </>
          ) : (
            <Route element={<Navigate replace to="/workspace" />} path="/billing" />
          )}
          <Route element={<Navigate replace to={isReady ? "/overview" : "/"} />} path="*" />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
};

export default App;
