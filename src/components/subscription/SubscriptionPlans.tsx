import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface SubscriptionPlan {
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

interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_end: string;
}

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscription, setUserSubscription] =
    useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Fetch all subscription plans
        const { data: plansData, error: plansError } = await supabase
          .from("subscription_plans")
          .select("*")
          .order("price");

        if (plansError) throw plansError;
        setPlans(plansData);

        if (user) {
          // Fetch user's current subscription
          const { data: subscriptionData, error: subscriptionError } =
            await supabase
              .from("user_subscriptions")
              .select("*")
              .eq("user_id", user.id)
              .eq("status", "active")
              .single();

          if (subscriptionError && subscriptionError.code !== "PGRST116") {
            throw subscriptionError;
          }

          setUserSubscription(subscriptionData || null);
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [user]);

  const handleUpgrade = async (planId: string) => {
    if (!user) {
      navigate("/signin");
      return;
    }

    setUpgrading(true);
    try {
      // For now, we'll just update the user's subscription in the database
      // In a real app, you would integrate with a payment processor like Stripe

      // If user already has a subscription, update it
      if (userSubscription) {
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            plan_id: planId,
            status: "active",
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(
              Date.now() + 365 * 24 * 60 * 60 * 1000,
            ).toISOString(), // 1 year from now
            updated_at: new Date().toISOString(),
          })
          .eq("id", userSubscription.id);

        if (error) throw error;
      } else {
        // Otherwise create a new subscription
        const { error } = await supabase.from("user_subscriptions").insert({
          user_id: user.id,
          plan_id: planId,
          status: "active",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 1 year from now
        });

        if (error) throw error;
      }

      // Fetch the updated subscription
      const { data, error } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (error) throw error;
      setUserSubscription(data);

      toast({
        title: "Subscription updated",
        description: "Your subscription has been successfully updated",
      });
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      });
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
          Select the plan that best fits your needs and start building
          professional resumes today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isCurrentPlan = userSubscription?.plan_id === plan.id;
          const isPro = plan.name === "Pro";

          return (
            <Card
              key={plan.id}
              className={`border-2 ${isPro ? "border-primary" : "border-muted"} relative`}
            >
              {isPro && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="px-3 py-1">Most Popular</Badge>
                </div>
              )}
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="text-4xl font-bold">
                    ${plan.price.toFixed(2)}
                    <span className="text-muted-foreground text-base font-normal">
                      /month
                    </span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>
                        {plan.features.max_resumes === -1
                          ? "Unlimited resumes"
                          : `${plan.features.max_resumes} resume${plan.features.max_resumes > 1 ? "s" : ""}`}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>
                        {plan.features.templates.includes("all")
                          ? "All templates"
                          : `${plan.features.templates.length} templates`}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>
                        Export as {plan.features.export_formats.join(", ")}
                      </span>
                    </li>
                    {plan.features.ai_suggestions && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>AI content suggestions</span>
                      </li>
                    )}
                    {plan.features.team_management && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Team management</span>
                      </li>
                    )}
                    {plan.features.priority_support && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Priority support</span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={isPro ? "default" : "outline"}
                  disabled={isCurrentPlan || upgrading}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {isCurrentPlan
                    ? "Current Plan"
                    : upgrading
                      ? "Processing..."
                      : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {userSubscription && (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Your current subscription will renew on{" "}
            {new Date(userSubscription.current_period_end).toLocaleDateString()}
            .
          </p>
        </div>
      )}
    </div>
  );
}
