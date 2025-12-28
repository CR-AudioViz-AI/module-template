"use client";

import { useEffect, useState } from "react";

interface CreditBalanceProps {
  userId: string;
}

export function CreditBalance({ userId }: CreditBalanceProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    fetch(`https://javariai.com/api/credits?user_id=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        setBalance(data.current_balance);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full animate-pulse">
        <span className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full border border-yellow-200">
      <span className="text-yellow-600">⚡</span>
      <span className="font-medium text-amber-800">
        {balance !== null ? `${balance.toLocaleString()} credits` : "---"}
      </span>
    </div>
  );
}

