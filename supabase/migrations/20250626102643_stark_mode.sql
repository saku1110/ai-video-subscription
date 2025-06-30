/*
  # Initial Database Schema for AI Video Subscription Service

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `subscription_plan` (text)
      - `downloads_remaining` (integer)
      - `trial_ends_at` (timestamptz)
      - `stripe_customer_id` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `videos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `file_url` (text)
      - `thumbnail_url` (text)
      - `duration` (integer)
      - `tags` (text array)
      - `created_at` (timestamptz)
    
    - `downloads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `video_id` (uuid, references videos)
      - `downloaded_at` (timestamptz)
    
    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `video_id` (uuid, references videos)
      - `created_at` (timestamptz)
    
    - `custom_orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `description` (text)
      - `age_range` (text)
      - `face_type` (text)
      - `status` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  subscription_plan text DEFAULT 'trial',
  downloads_remaining integer DEFAULT 0,
  trial_ends_at timestamptz DEFAULT (now() + interval '3 days'),
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  file_url text NOT NULL,
  thumbnail_url text NOT NULL,
  duration integer NOT NULL DEFAULT 5,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  downloaded_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Create custom_orders table
CREATE TABLE IF NOT EXISTS custom_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  description text NOT NULL,
  age_range text NOT NULL,
  face_type text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Videos policies (public read access)
CREATE POLICY "Anyone can view videos"
  ON videos FOR SELECT
  TO authenticated
  USING (true);

-- Downloads policies
CREATE POLICY "Users can view own downloads"
  ON downloads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own downloads"
  ON downloads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Custom orders policies
CREATE POLICY "Users can manage own orders"
  ON custom_orders FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample video data
INSERT INTO videos (title, category, file_url, thumbnail_url, duration, tags) VALUES
  ('美容ルーティン - 朝のスキンケア', 'beauty', 'https://example.com/videos/beauty-1.mp4', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg', 8, '{"美容", "スキンケア", "朝", "ルーティン"}'),
  ('ダイエット - ヨガストレッチ', 'diet', 'https://example.com/videos/diet-1.mp4', 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg', 10, '{"ダイエット", "ヨガ", "ストレッチ", "運動"}'),
  ('ヘアケア - ブラッシング', 'hair-care', 'https://example.com/videos/hair-1.mp4', 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg', 6, '{"ヘアケア", "ブラッシング", "髪", "美容"}'),
  ('日常 - コーヒータイム', 'daily', 'https://example.com/videos/daily-1.mp4', 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg', 7, '{"日常", "コーヒー", "リラックス", "朝"}'),
  ('美容 - メイクアップ', 'beauty', 'https://example.com/videos/beauty-2.mp4', 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg', 9, '{"美容", "メイク", "化粧", "女性"}'),
  ('ダイエット - ウォーキング', 'diet', 'https://example.com/videos/diet-2.mp4', 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg', 8, '{"ダイエット", "ウォーキング", "運動", "健康"}'),
  ('ヘアケア - シャンプー', 'hair-care', 'https://example.com/videos/hair-2.mp4', 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg', 10, '{"ヘアケア", "シャンプー", "洗髪", "美容"}'),
  ('日常 - 料理の準備', 'daily', 'https://example.com/videos/daily-2.mp4', 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg', 6, '{"日常", "料理", "キッチン", "準備"}'),
  ('美容 - フェイスマスク', 'beauty', 'https://example.com/videos/beauty-3.mp4', 'https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg', 7, '{"美容", "フェイスマスク", "スキンケア", "リラックス"}'),
  ('ダイエット - ストレッチ', 'diet', 'https://example.com/videos/diet-3.mp4', 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg', 5, '{"ダイエット", "ストレッチ", "運動", "柔軟"}');