# CR AUDIOVIZ AI - MODULE FACTORY
## Rapid Module Deployment System
### "Launch a new module in under 2 weeks"

**Last Updated:** December 28, 2025
**Owner:** Roy Henderson (CEO/Co-Founder)

---

## OVERVIEW

The Module Factory is a standardized system for rapidly deploying new modules within the CR AudioViz AI ecosystem. Every module shares common infrastructure and integrations, allowing focus on unique features rather than rebuilding basics.

---

## PRE-WIRED INTEGRATIONS (Automatic)

Every module created through the Module Factory automatically includes:

| Integration | Purpose | Endpoint |
|-------------|---------|----------|
| **Javari AI** | Embedded AI assistant | `/api/javari` |
| **Universal Credits** | Usage billing | `/api/credits` |
| **Trust & Safety** | Content moderation | `/api/safety` |
| **Universal Search** | Cross-module discovery | `/api/search` |
| **Marketplace** | Vendor/product sales | `/api/marketplace` |
| **Analytics** | Event tracking | `/api/analytics` |
| **Authentication** | User management | Supabase Auth |
| **Payments** | Stripe + PayPal | `/api/stripe`, `/api/paypal` |

---

## MODULE TEMPLATE STRUCTURE

```
module-name/
├── app/
│   ├── api/
│   │   ├── [module]/
│   │   │   └── route.ts          # Module-specific API
│   │   └── webhooks/
│   │       └── route.ts          # Module webhooks
│   ├── (public)/
│   │   ├── page.tsx              # Landing page
│   │   ├── explore/
│   │   │   └── page.tsx          # Browse/discover
│   │   └── [id]/
│   │       └── page.tsx          # Detail view
│   ├── (authenticated)/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # User dashboard
│   │   ├── create/
│   │   │   └── page.tsx          # Create content
│   │   └── settings/
│   │       └── page.tsx          # User settings
│   ├── layout.tsx                # Root layout with providers
│   └── globals.css               # Tailwind styles
├── components/
│   ├── ui/                       # Shared UI components
│   ├── module/                   # Module-specific components
│   ├── JavariChat.tsx            # Embedded AI assistant
│   ├── CreditBalance.tsx         # Credit display
│   └── CrossSell.tsx             # Recommendations
├── lib/
│   ├── supabase.ts               # Database client
│   ├── credits.ts                # Credit operations
│   ├── analytics.ts              # Event tracking
│   └── [module].ts               # Module-specific logic
├── types/
│   └── index.ts                  # TypeScript definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## QUICK START: Creating a New Module

### Step 1: Clone Template
```bash
gh repo create CR-AudioViz-AI/javari-[module-name] --template CR-AudioViz-AI/module-template --private
cd javari-[module-name]
```

### Step 2: Configure Module
Edit `lib/config.ts`:
```typescript
export const MODULE_CONFIG = {
  name: "Module Name",
  slug: "module-slug",
  description: "What this module does",
  creditCosts: {
    basic_action: 1,
    premium_action: 5,
  },
  features: ["feature1", "feature2"],
};
```

### Step 3: Create Database Tables
```sql
-- Run in Supabase SQL Editor
CREATE TABLE public.[module]_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add to search index
CREATE INDEX idx_[module]_items_user ON public.[module]_items(user_id);
CREATE INDEX idx_[module]_items_status ON public.[module]_items(status);
```

### Step 4: Deploy to Vercel
```bash
vercel link --project=javari-[module-name]
vercel env pull
vercel deploy --prod
```

### Step 5: Register in Ecosystem
```bash
# Add to search index
curl -X POST "https://javariai.com/api/search" \
  -H "Content-Type: application/json" \
  -d '{"action": "index", "module": "[module]", "content_type": "module", "content_id": "[uuid]", "title": "Module Name", "description": "Description", "url": "https://[module].vercel.app"}'
```

---

## STANDARD COMPONENTS

### JavariChat.tsx
```typescript
import { useState } from "react";

export function JavariChat({ moduleContext }: { moduleContext: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 h-[500px] bg-white rounded-lg shadow-xl border">
          <div className="p-4 border-b flex justify-between items-center">
            <span className="font-semibold">Javari AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <iframe 
            src={`https://javariai.com/embed?context=${moduleContext}`}
            className="w-full h-[calc(100%-60px)]"
          />
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700"
        >
          💬
        </button>
      )}
    </div>
  );
}
```

### CreditBalance.tsx
```typescript
import { useEffect, useState } from "react";

export function CreditBalance({ userId }: { userId: string }) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://javariai.com/api/credits?user_id=${userId}`)
      .then(r => r.json())
      .then(d => setBalance(d.current_balance));
  }, [userId]);

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
      <span className="text-yellow-500">⚡</span>
      <span className="font-medium">{balance ?? "..."} credits</span>
    </div>
  );
}
```

### useCredits.ts Hook
```typescript
export function useCredits(userId: string) {
  const checkBalance = async () => {
    const res = await fetch(`https://javariai.com/api/credits?user_id=${userId}`);
    return res.json();
  };

  const deductCredits = async (action: string, amount?: number) => {
    const res = await fetch("https://javariai.com/api/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, action, amount, operation: "deduct" }),
    });
    return res.json();
  };

  const canAfford = async (action: string) => {
    const res = await fetch(`https://javariai.com/api/credits?user_id=${userId}&action=${action}`);
    const data = await res.json();
    return data.can_afford;
  };

  return { checkBalance, deductCredits, canAfford };
}
```

---

## CHECKLIST: Module Launch

### Pre-Launch
- [ ] Module config defined
- [ ] Database tables created
- [ ] API routes implemented
- [ ] UI components built
- [ ] Javari integration tested
- [ ] Credits integration tested
- [ ] Search indexing configured
- [ ] Analytics events defined

### Launch
- [ ] Deploy to Vercel
- [ ] Configure custom domain (if applicable)
- [ ] Add to ecosystem navigation
- [ ] Register in search index
- [ ] Create cross-sell recommendations
- [ ] Update main website

### Post-Launch
- [ ] Monitor error rates
- [ ] Track usage analytics
- [ ] Gather user feedback
- [ ] Document in knowledge base

---

## TIMELINE: 2-Week Module Launch

| Day | Task |
|-----|------|
| 1-2 | Clone template, configure module, create database |
| 3-5 | Build core API routes and business logic |
| 6-8 | Build UI components and pages |
| 9-10 | Integration testing (Javari, Credits, Search) |
| 11-12 | Deploy, configure domain, register in ecosystem |
| 13-14 | Soft launch, monitoring, bug fixes |

---

## SUPPORT

- **Documentation:** https://docs.craudiovizai.com
- **API Reference:** https://javariai.com/api-docs
- **Support:** support@craudiovizai.com

---

*"Your Story. Our Design. Everyone Connects. Everyone Wins."*

