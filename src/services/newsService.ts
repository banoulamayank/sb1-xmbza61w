import { supabase, NewsArticle } from '../lib/supabase';

/**
 * Save multiple news articles to the database
 * Handles duplicates by ignoring articles with existing links
 */
export async function saveNewsArticles(articles: NewsArticle[]): Promise<{ success: boolean; saved: number; errors: number }> {
  let saved = 0;
  let errors = 0;

  for (const article of articles) {
    try {
      // Convert pubDate string to ISO format for database
      const pubDate = new Date(article.pub_date).toISOString();

      const { error } = await supabase
        .from('news_articles')
        .insert({
          title: article.title,
          description: article.description,
          link: article.link,
          pub_date: pubDate,
          source: article.source,
          category: article.category,
          image: article.image
        })
        .select()
        .single();

      if (error) {
        // If duplicate link, skip silently (this is expected behavior)
        if (error.code === '23505') {
          continue;
        }
        console.error('Error saving article:', error);
        errors++;
      } else {
        saved++;
      }
    } catch (err) {
      console.error('Exception saving article:', err);
      errors++;
    }
  }

  return { success: true, saved, errors };
}

/**
 * Fetch all news articles from the database
 * Optionally filter by days (e.g., last 7 days)
 */
export async function fetchNewsArticles(daysBack: number = 7): Promise<NewsArticle[]> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);

    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .gte('pub_date', cutoffDate.toISOString())
      .order('pub_date', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }

    // Transform database format to component format
    return (data || []).map(article => ({
      title: article.title,
      description: article.description,
      link: article.link,
      pub_date: article.pub_date,
      source: article.source,
      category: article.category,
      image: article.image
    }));
  } catch (err) {
    console.error('Exception fetching articles:', err);
    return [];
  }
}

/**
 * Get count of articles in database
 */
export async function getArticleCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('news_articles')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error counting articles:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Exception counting articles:', err);
    return 0;
  }
}
