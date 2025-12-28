"use client";

const JAVARI_API = "https://javariai.com/api";

export function useCredits(userId: string) {
  const checkBalance = async () => {
    const res = await fetch(`${JAVARI_API}/credits?user_id=${userId}`);
    return res.json();
  };

  const deductCredits = async (action: string, amount?: number) => {
    const res = await fetch(`${JAVARI_API}/credits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        action,
        amount,
        operation: "deduct",
      }),
    });
    return res.json();
  };

  const addCredits = async (amount: number, description: string) => {
    const res = await fetch(`${JAVARI_API}/credits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        amount,
        operation: "add",
        description,
      }),
    });
    return res.json();
  };

  const canAfford = async (action: string): Promise<boolean> => {
    const res = await fetch(
      `${JAVARI_API}/credits?user_id=${userId}&action=${action}`
    );
    const data = await res.json();
    return data.can_afford;
  };

  return { checkBalance, deductCredits, addCredits, canAfford };
}

