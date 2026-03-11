export type Locale = "uz" | "ru" | "en";

export interface Messages {
  appTitle: string;
  themeLight: string;
  themeDark: string;
  navOverview: string;
  navUsers: string;
  navMessages: string;
  navRevenue: string;
  navHealth: string;
  workspaceTitle: string;
  workspaceSubtitle: string;
  routeOverview: string;
  routeUsers: string;
  routeMessages: string;
  routeRevenue: string;
  routeHealth: string;
  botAccess: string;
  botIdentityTitle: string;
  botIdentitySubtitle: string;
  useUsername: string;
  useToken: string;
  botToken: string;
  telegramBotToken: string;
  telegramBotUsername: string;
  openDashboard: string;
  enterBotToken: string;
  enterBotUsername: string;
  usernameValidation: string;
  tokenValidation: string;
  performancePulse: string;
  liveDashboard: string;
  currentBot: string;
  refresh: string;
  changeBot: string;
  failedToLoadDashboard: string;
  unexpectedError: string;
  retry: string;
  totalUsers: string;
  allTimeUsers: string;
  activeUsersToday: string;
  activeUsersSubtitle: string;
  newUsersToday: string;
  weeklyGrowth: string;
  messagesToday: string;
  totalSuffix: string;
  revenueToday: string;
  revenueWeek: string;
  revenueMonth: string;
  currentMonth: string;
  botStatus: string;
  online: string;
  offline: string;
  api: string;
  uptimeRequests: string;
  requestsToday: string;
  userGrowth: string;
  dailyMessages: string;
  revenueTrend: string;
  recentActivity: string;
  type: string;
  description: string;
  createdAt: string;
  noRecentActivity: string;
  noAnalyticsTitle: string;
  noAnalyticsDescription: string;
  setupStepOneTitle: string;
  setupStepOneText: string;
  setupStepTwoTitle: string;
  setupStepTwoText: string;
  setupStepThreeTitle: string;
  setupStepThreeText: string;
  back: string;
  continue: string;
  connectSuccess: string;
  verifySuccess: string;
  trackingSuccess: string;
  setupInProgress: string;
}

export const messages: Record<Locale, Messages> = {
  uz: {
    appTitle: "AboutBot Analytics",
    themeLight: "Yorug'",
    themeDark: "Tungi",
    navOverview: "Umumiy",
    navUsers: "Foydalanuvchilar",
    navMessages: "Xabarlar",
    navRevenue: "Daromad",
    navHealth: "Holat",
    workspaceTitle: "Telegram Bot Analytics Platform",
    workspaceSubtitle: "Botingizni ulang va tracking ishga tushgach analytics shu yerda ko'rinadi.",
    routeOverview: "overview",
    routeUsers: "users",
    routeMessages: "messages",
    routeRevenue: "revenue",
    routeHealth: "health",
    botAccess: "Bot Access",
    botIdentityTitle: "Botingizni ulang",
    botIdentitySubtitle: "Username yoki token kiriting. Backend shu bot uchun tracking va analytics yig'adi.",
    useUsername: "Username orqali ulash",
    useToken: "Token orqali ulash",
    botToken: "Bot token",
    telegramBotToken: "Telegram bot token",
    telegramBotUsername: "Telegram bot username",
    openDashboard: "Dashboardni ochish",
    enterBotToken: "Bot token kiriting.",
    enterBotUsername: "Bot username kiriting.",
    usernameValidation: "Username kamida 5 ta belgidan iborat bo'lsin.",
    tokenValidation: "Token juda qisqa ko'rinmoqda.",
    performancePulse: "Performance Pulse",
    liveDashboard: "Botingiz uchun yig'ilgan analytics shu yerda ko'rsatiladi",
    currentBot: "Joriy bot",
    refresh: "Yangilash",
    changeBot: "Botni almashtirish",
    failedToLoadDashboard: "Dashboardni yuklab bo'lmadi",
    unexpectedError: "Kutilmagan xato",
    retry: "Qayta urinish",
    totalUsers: "Jami users",
    allTimeUsers: "Barcha vaqt",
    activeUsersToday: "Bugun active users",
    activeUsersSubtitle: "So'nggi 24 soatda faol",
    newUsersToday: "Bugungi yangi users",
    weeklyGrowth: "haftalik o'sish",
    messagesToday: "Bugungi xabarlar",
    totalSuffix: "jami",
    revenueToday: "Bugungi daromad",
    revenueWeek: "Hafta",
    revenueMonth: "Oy daromadi",
    currentMonth: "Joriy oy",
    botStatus: "Bot holati",
    online: "Online",
    offline: "Offline",
    api: "API",
    uptimeRequests: "Uptime / So'rovlar",
    requestsToday: "bugungi so'rovlar",
    userGrowth: "User Growth (30 kun)",
    dailyMessages: "Kunlik xabarlar",
    revenueTrend: "Daromad trendi",
    recentActivity: "So'nggi faollik",
    type: "Turi",
    description: "Tavsif",
    createdAt: "Vaqti",
    noRecentActivity: "So'nggi faollik yo'q.",
    noAnalyticsTitle: "Hali analytics yig'ilmagan",
    noAnalyticsDescription: "Bu bot uchun tracking eventlari hali backendga kelmagan. Botni ulang va event yuborishni ishga tushiring.",
    setupStepOneTitle: "1. Botni ulang",
    setupStepOneText: "Username yoki token kiriting va botni platformaga ulang.",
    setupStepTwoTitle: "2. Verify qiling",
    setupStepTwoText: "Backend bot ownerligini va connection holatini tasdiqlaydi.",
    setupStepThreeTitle: "3. Trackingni yoqing",
    setupStepThreeText: "Webhook yoki event pipeline ishga tushgach analytics to'plana boshlaydi.",
    back: "Orqaga",
    continue: "Davom etish",
    connectSuccess: "Bot platformaga ulandi.",
    verifySuccess: "Bot access muvaffaqiyatli tekshirildi.",
    trackingSuccess: "Tracking yoqildi. Endi analytics yig'ila boshlaydi.",
    setupInProgress: "So'rov bajarilmoqda..."
  },
  ru: {
    appTitle: "AboutBot Analytics",
    themeLight: "Light",
    themeDark: "Dark",
    navOverview: "Обзор",
    navUsers: "Пользователи",
    navMessages: "Сообщения",
    navRevenue: "Доход",
    navHealth: "Статус",
    workspaceTitle: "Telegram Bot Analytics Platform",
    workspaceSubtitle: "Подключите бота, и после запуска tracking аналитика появится здесь.",
    routeOverview: "overview",
    routeUsers: "users",
    routeMessages: "messages",
    routeRevenue: "revenue",
    routeHealth: "health",
    botAccess: "Bot Access",
    botIdentityTitle: "Подключите своего бота",
    botIdentitySubtitle: "Введите username или token. Backend будет собирать tracking и аналитику для этого бота.",
    useUsername: "Подключить через username",
    useToken: "Подключить через token",
    botToken: "Bot token",
    telegramBotToken: "Telegram bot token",
    telegramBotUsername: "Telegram bot username",
    openDashboard: "Открыть dashboard",
    enterBotToken: "Введите token бота.",
    enterBotUsername: "Введите username бота.",
    usernameValidation: "Username должен содержать минимум 5 символов.",
    tokenValidation: "Token выглядит слишком коротким.",
    performancePulse: "Performance Pulse",
    liveDashboard: "Собранная аналитика по боту будет показана здесь",
    currentBot: "Текущий бот",
    refresh: "Обновить",
    changeBot: "Сменить бота",
    failedToLoadDashboard: "Не удалось загрузить dashboard",
    unexpectedError: "Неожиданная ошибка",
    retry: "Повторить",
    totalUsers: "Всего users",
    allTimeUsers: "За все время",
    activeUsersToday: "Активные сегодня",
    activeUsersSubtitle: "Активны за последние 24 часа",
    newUsersToday: "Новые users сегодня",
    weeklyGrowth: "недельный рост",
    messagesToday: "Сообщения сегодня",
    totalSuffix: "всего",
    revenueToday: "Доход сегодня",
    revenueWeek: "Неделя",
    revenueMonth: "Доход за месяц",
    currentMonth: "Текущий месяц",
    botStatus: "Статус бота",
    online: "Online",
    offline: "Offline",
    api: "API",
    uptimeRequests: "Uptime / Запросы",
    requestsToday: "запросов сегодня",
    userGrowth: "Рост пользователей (30 дней)",
    dailyMessages: "Сообщения по дням",
    revenueTrend: "Тренд дохода",
    recentActivity: "Последняя активность",
    type: "Тип",
    description: "Описание",
    createdAt: "Создано",
    noRecentActivity: "Нет недавней активности.",
    noAnalyticsTitle: "Аналитика еще не собрана",
    noAnalyticsDescription: "Для этого бота backend еще не получил tracking events. Подключите бота и запустите отправку событий.",
    setupStepOneTitle: "1. Подключите бота",
    setupStepOneText: "Введите username или token и добавьте бота в платформу.",
    setupStepTwoTitle: "2. Пройдите проверку",
    setupStepTwoText: "Backend проверит права владельца и статус подключения.",
    setupStepThreeTitle: "3. Включите tracking",
    setupStepThreeText: "Когда webhook или event pipeline запущен, аналитика начнет собираться.",
    back: "Назад",
    continue: "Продолжить",
    connectSuccess: "Бот успешно подключен к платформе.",
    verifySuccess: "Доступ к боту успешно проверен.",
    trackingSuccess: "Tracking включен. Аналитика начнет собираться.",
    setupInProgress: "Запрос выполняется..."
  },
  en: {
    appTitle: "AboutBot Analytics",
    themeLight: "Light",
    themeDark: "Dark",
    navOverview: "Overview",
    navUsers: "Users",
    navMessages: "Messages",
    navRevenue: "Revenue",
    navHealth: "Health",
    workspaceTitle: "Telegram Bot Analytics Platform",
    workspaceSubtitle: "Connect your bot and analytics will appear here once tracking starts.",
    routeOverview: "overview",
    routeUsers: "users",
    routeMessages: "messages",
    routeRevenue: "revenue",
    routeHealth: "health",
    botAccess: "Bot Access",
    botIdentityTitle: "Connect your bot",
    botIdentitySubtitle: "Enter a username or token. The backend will collect tracking and analytics for this bot.",
    useUsername: "Connect with username",
    useToken: "Connect with token",
    botToken: "Bot token",
    telegramBotToken: "Telegram bot token",
    telegramBotUsername: "Telegram bot username",
    openDashboard: "Open Dashboard",
    enterBotToken: "Enter bot token.",
    enterBotUsername: "Enter bot username.",
    usernameValidation: "Username must be at least 5 characters long.",
    tokenValidation: "Token looks too short.",
    performancePulse: "Performance Pulse",
    liveDashboard: "Collected analytics for your bot will appear here",
    currentBot: "Current bot",
    refresh: "Refresh",
    changeBot: "Change Bot",
    failedToLoadDashboard: "Failed to load dashboard",
    unexpectedError: "Unexpected error",
    retry: "Retry",
    totalUsers: "Total users",
    allTimeUsers: "All-time users",
    activeUsersToday: "Active users today",
    activeUsersSubtitle: "Users active in last 24h",
    newUsersToday: "New users today",
    weeklyGrowth: "weekly growth",
    messagesToday: "Messages today",
    totalSuffix: "total",
    revenueToday: "Revenue today",
    revenueWeek: "Week",
    revenueMonth: "Revenue month",
    currentMonth: "Current month",
    botStatus: "Bot status",
    online: "Online",
    offline: "Offline",
    api: "API",
    uptimeRequests: "Uptime / Requests",
    requestsToday: "requests today",
    userGrowth: "User Growth (30 days)",
    dailyMessages: "Daily Messages",
    revenueTrend: "Revenue Trend",
    recentActivity: "Recent Activity",
    type: "Type",
    description: "Description",
    createdAt: "Created At",
    noRecentActivity: "No recent activity.",
    noAnalyticsTitle: "No analytics collected yet",
    noAnalyticsDescription: "The backend has not received tracking events for this bot yet. Connect the bot and start sending events.",
    setupStepOneTitle: "1. Connect your bot",
    setupStepOneText: "Enter a username or token and add the bot to the platform.",
    setupStepTwoTitle: "2. Verify access",
    setupStepTwoText: "The backend verifies ownership and connection status.",
    setupStepThreeTitle: "3. Start tracking",
    setupStepThreeText: "Once webhook or event tracking is enabled, analytics start collecting.",
    back: "Back",
    continue: "Continue",
    connectSuccess: "Bot connected to the platform.",
    verifySuccess: "Bot access verified successfully.",
    trackingSuccess: "Tracking enabled. Analytics will start collecting.",
    setupInProgress: "Request in progress..."
  }
};
