/*
  # Création des tables pour le système de quiz

  1. Tables
    - `users`: Stockage des informations utilisateurs
      - `id` (uuid, clé primaire)
      - `created_at` (timestamp)
      - `name` (text)
    
    - `quizzes`: Stockage des quiz
      - `id` (uuid, clé primaire)
      - `created_at` (timestamp)
      - `section` (text)
      - `questions` (jsonb)
      - `correct_answers` (jsonb)
    
    - `user_answers`: Stockage des réponses utilisateurs
      - `id` (uuid, clé primaire)
      - `created_at` (timestamp)
      - `user_id` (uuid, référence users)
      - `quiz_id` (uuid, référence quizzes)
      - `answers` (jsonb)
      - `score` (integer)

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques d'accès pour les utilisateurs authentifiés
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  section text NOT NULL,
  questions jsonb NOT NULL,
  correct_answers jsonb NOT NULL
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quizzes"
  ON quizzes
  FOR SELECT
  TO authenticated
  USING (true);

-- Create user_answers table
CREATE TABLE IF NOT EXISTS user_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES users(id) NOT NULL,
  quiz_id uuid REFERENCES quizzes(id) NOT NULL,
  answers jsonb NOT NULL,
  score integer NOT NULL
);

ALTER TABLE user_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own answers"
  ON user_answers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answers"
  ON user_answers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);