-- Create news_articles table for storing GenAI news articles
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  link TEXT NOT NULL UNIQUE,
  pub_date TIMESTAMP WITH TIME ZONE NOT NULL,
  source TEXT DEFAULT 'Google News',
  category TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on link for faster duplicate checking
CREATE INDEX IF NOT EXISTS idx_news_articles_link ON news_articles(link);

-- Create index on pub_date for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_news_articles_pub_date ON news_articles(pub_date DESC);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles(category);

-- Enable Row Level Security (RLS)
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON news_articles
  FOR SELECT USING (true);

-- Create policy to allow insert for all users (adjust based on your auth requirements)
CREATE POLICY "Allow public insert" ON news_articles
  FOR INSERT WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE
    ON news_articles FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
