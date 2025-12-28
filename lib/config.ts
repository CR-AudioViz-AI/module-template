// Module Configuration - CUSTOMIZE THIS
export const MODULE_CONFIG = {
  name: "Module Name",
  slug: "module-slug",
  description: "Your module description",
  
  // Credit costs for different actions
  creditCosts: {
    basic_action: 1,
    premium_action: 5,
    export_action: 10,
  },
  
  // Features enabled
  features: {
    marketplace: true,
    credits: true,
    javariChat: true,
    analytics: true,
  },
  
  // API endpoints
  api: {
    javari: "https://javariai.com/api",
    credits: "https://javariai.com/api/credits",
    search: "https://javariai.com/api/search",
    safety: "https://javariai.com/api/safety",
    marketplace: "https://javariai.com/api/marketplace",
  },
};

