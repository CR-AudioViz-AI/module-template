import { MODULE_CONFIG } from "./config";

const ANALYTICS_API = MODULE_CONFIG.api.javari + "/analytics";

export async function trackEvent(
  eventName: string,
  properties?: Record<string, any>,
  userId?: string
) {
  try {
    await fetch(ANALYTICS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        module: MODULE_CONFIG.slug,
        properties,
        user_id: userId,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Analytics error:", error);
  }
}

export const events = {
  pageView: (page: string, userId?: string) =>
    trackEvent("page_view", { page }, userId),
  
  buttonClick: (button: string, userId?: string) =>
    trackEvent("button_click", { button }, userId),
  
  featureUsed: (feature: string, userId?: string) =>
    trackEvent("feature_used", { feature }, userId),
  
  creditSpent: (action: string, amount: number, userId?: string) =>
    trackEvent("credit_spent", { action, amount }, userId),
  
  error: (errorType: string, message: string, userId?: string) =>
    trackEvent("error", { errorType, message }, userId),
};

