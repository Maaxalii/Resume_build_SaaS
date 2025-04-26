-- Create profiles table that extends the auth.users table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  features JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  plan_id UUID REFERENCES subscription_plans(id) NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resume_templates table
CREATE TABLE IF NOT EXISTS resume_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT NOT NULL,
  style TEXT NOT NULL,
  industry TEXT[] NOT NULL,
  color_scheme TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  template_id UUID REFERENCES resume_templates(id) NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, features)
VALUES 
  ('Free', 'Basic resume creation with limited features', 0, '{"max_resumes": 1, "templates": ["basic"], "export_formats": ["pdf"]}'::jsonb),
  ('Pro', 'Advanced resume creation with premium features', 9.99, '{"max_resumes": 10, "templates": ["all"], "export_formats": ["pdf", "docx", "txt"], "ai_suggestions": true}'::jsonb),
  ('Enterprise', 'Complete solution for teams and businesses', 29.99, '{"max_resumes": -1, "templates": ["all"], "export_formats": ["pdf", "docx", "txt"], "ai_suggestions": true, "team_management": true, "priority_support": true}'::jsonb);

-- Insert sample resume templates
INSERT INTO resume_templates (name, description, thumbnail, style, industry, color_scheme, popular, premium)
VALUES 
  ('Modern Minimal', 'Clean and minimalist design with a focus on readability', 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80', 'minimal', ARRAY['technology', 'design', 'marketing'], 'monochrome', true, false),
  ('Professional Classic', 'Traditional layout with a professional appearance', 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=400&q=80', 'classic', ARRAY['finance', 'legal', 'healthcare'], 'blue', true, false),
  ('Creative Portfolio', 'Showcase your creative work with this bold template', 'https://images.unsplash.com/photo-1586282023358-06757d4001f7?w=400&q=80', 'creative', ARRAY['design', 'arts', 'media'], 'colorful', false, true),
  ('Executive Brief', 'Sophisticated design for senior professionals', 'https://images.unsplash.com/photo-1586282384495-f35d1eb0ef93?w=400&q=80', 'professional', ARRAY['executive', 'finance', 'consulting'], 'dark', false, true),
  ('Tech Innovator', 'Modern layout for tech professionals', 'https://images.unsplash.com/photo-1586282023783-90002a6e20b5?w=400&q=80', 'minimal', ARRAY['technology', 'engineering', 'data'], 'monochrome', true, false),
  ('Academic CV', 'Detailed layout for academic and research positions', 'https://images.unsplash.com/photo-1586282023284-5abf4f994018?w=400&q=80', 'classic', ARRAY['education', 'research', 'science'], 'blue', false, false);

-- Enable row level security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view their own subscriptions" ON user_subscriptions;
CREATE POLICY "Users can view their own subscriptions"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own resumes" ON resumes;
CREATE POLICY "Users can view their own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own resumes" ON resumes;
CREATE POLICY "Users can insert their own resumes"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own resumes" ON resumes;
CREATE POLICY "Users can update their own resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own resumes" ON resumes;
CREATE POLICY "Users can delete their own resumes"
  ON resumes FOR DELETE
  USING (auth.uid() = user_id);

-- Public access policies
DROP POLICY IF EXISTS "Anyone can view resume templates" ON resume_templates;
CREATE POLICY "Anyone can view resume templates"
  ON resume_templates FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Anyone can view subscription plans" ON subscription_plans;
CREATE POLICY "Anyone can view subscription plans"
  ON subscription_plans FOR SELECT
  USING (true);

-- Enable realtime for relevant tables
alter publication supabase_realtime add table resumes;
alter publication supabase_realtime add table user_subscriptions;
