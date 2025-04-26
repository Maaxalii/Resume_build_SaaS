import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

export interface Resume {
  id: string;
  title: string;
  status: "draft" | "completed";
  template_id: string;
  created_at: string;
  updated_at: string;
  template?: {
    name: string;
    thumbnail: string;
  };
}

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setResumes([]);
      setLoading(false);
      return;
    }

    const fetchResumes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("resumes")
          .select(
            `
            id,
            title,
            status,
            template_id,
            created_at,
            updated_at,
            template:resume_templates(name, thumbnail)
          `,
          )
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });

        if (error) throw error;
        setResumes(data || []);
      } catch (err: any) {
        console.error("Error fetching resumes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();

    // Set up realtime subscription
    const resumesSubscription = supabase
      .channel("resumes_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "resumes",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchResumes();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(resumesSubscription);
    };
  }, [user]);

  const createResume = async (title: string, templateId: string) => {
    if (!user) return { error: "User not authenticated" };

    try {
      // Default content structure for a new resume
      const defaultContent = {
        personal: {
          name: "",
          title: "",
          email: user.email || "",
          phone: "",
          location: "",
          website: "",
          summary: "",
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { data, error } = await supabase
        .from("resumes")
        .insert({
          user_id: user.id,
          template_id: templateId,
          title,
          content: defaultContent,
          status: "draft",
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error("Error creating resume:", error);
      return { error: error.message };
    }
  };

  const updateResume = async (id: string, updates: Partial<Resume>) => {
    if (!user) return { error: "User not authenticated" };

    try {
      const { data, error } = await supabase
        .from("resumes")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error("Error updating resume:", error);
      return { error: error.message };
    }
  };

  const deleteResume = async (id: string) => {
    if (!user) return { error: "User not authenticated" };

    try {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error("Error deleting resume:", error);
      return { error: error.message };
    }
  };

  return {
    resumes,
    loading,
    error,
    createResume,
    updateResume,
    deleteResume,
  };
}
