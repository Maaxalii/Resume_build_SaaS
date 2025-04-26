import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: {
    max_resumes: number;
    templates: string[];
    export_formats: string[];
    ai_suggestions?: boolean;
    team_management?: boolean;
    priority_support?: boolean;
  };
}

export interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  subscription_plan?: SubscriptionPlan;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("user_subscriptions")
          .select(
            `
            id,
            plan_id,
            status,
            current_period_start,
            current_period_end,
            subscription_plan:subscription_plans(*)
          `,
          )
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (error && error.code !== "PGRST116") throw error;
        setSubscription(data);
      } catch (err: any) {
        console.error("Error fetching subscription:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();

    // Set up realtime subscription
    const subscriptionChannel = supabase
      .channel("user_subscriptions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_subscriptions",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchSubscription();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscriptionChannel);
    };
  }, [user]);

  return {
    subscription,
    loading,
    error,
  };
}
