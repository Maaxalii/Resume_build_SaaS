import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  style: string;
  industry: string[];
  color_scheme: string;
  popular: boolean;
  premium: boolean;
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get user's subscription plan to determine which templates they can access
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) {
        setPlanLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_subscriptions")
          .select("subscription_plans(name)")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (error && error.code !== "PGRST116") throw error;
        setUserPlan(data?.subscription_plans?.name || "Free");
      } catch (err) {
        console.error("Error fetching user plan:", err);
        setUserPlan("Free"); // Default to free plan if there's an error
      } finally {
        setPlanLoading(false);
      }
    };

    fetchUserPlan();
  }, [user]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("resume_templates")
          .select("*");

        if (error) throw error;
        setTemplates(data || []);
      } catch (err: any) {
        console.error("Error fetching templates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Filter templates based on user's subscription plan
  const getAccessibleTemplates = () => {
    if (!templates.length) return [];

    // If plan is still loading, return all templates
    if (planLoading) return templates;

    // If user has Pro or Enterprise plan, they can access all templates
    if (userPlan === "Pro" || userPlan === "Enterprise") {
      return templates;
    }

    // Free plan users can only access non-premium templates
    return templates.filter((template) => !template.premium);
  };

  return {
    templates: getAccessibleTemplates(),
    allTemplates: templates,
    loading: loading || planLoading,
    error,
    userPlan,
  };
}
