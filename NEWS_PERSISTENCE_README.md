# News Articles Persistence System

## Overview

The Gen AI News section now includes automatic article persistence with Supabase database integration. This ensures all news articles are saved permanently for SEO benefits and continuous content availability.

## Features

### 1. **Instant Save on Refresh**
- Every time news articles are fetched from RSS feeds, they are **instantly saved** to the Supabase database
- Duplicate articles are automatically filtered (based on unique article links)
- Console logs show how many new articles were saved

### 2. **Continuous Regeneration**
- Articles are **automatically refreshed every 15 minutes**
- New articles are fetched from Google News RSS feeds and saved to the database
- Runs in the background without user interaction
- Articles accumulate over time, building a comprehensive news archive

### 3. **Database-First Loading**
- On page load, articles are loaded from **both database and RSS feeds**
- Database articles are merged with freshly fetched RSS articles
- All duplicates are removed based on article link
- Shows articles from the last 7 days

### 4. **SEO Benefits**
- All articles are permanently stored in Supabase PostgreSQL database
- Articles persist across browser sessions and page refreshes
- Database can be queried for sitemaps, search indexing, and content distribution
- Enables server-side rendering of news content

### 5. **Robust Fallback System**
Priority order for loading articles:
1. Fresh RSS fetch + Database merge (primary)
2. Database-only (if RSS fails)
3. LocalStorage cache (if database fails)
4. Empty state with error message (if all fail)

## Setup Instructions

### Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Enter project details and create the project
4. Wait for the project to finish setting up

### Step 2: Run Database Migration

1. Go to your Supabase project dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the contents of `supabase-migration.sql`
5. Click "Run" to execute the migration
6. Verify the `news_articles` table was created under "Table Editor"

### Step 3: Configure Environment Variables

1. In your Supabase project, go to Settings > API
2. Copy the "Project URL" and "anon public" key
3. Add them to your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Restart your development server: `npm run dev`

### Step 4: Test the Implementation

1. Navigate to the Gen AI News page
2. Click "Refresh News" button
3. Open browser console and look for: `"Saved X new articles to database"`
4. Check the database counter showing articles saved
5. Verify articles persist after page refresh

## Database Schema

### `news_articles` Table

```sql
Column       | Type                     | Description
-------------|--------------------------|----------------------------------
id           | UUID                     | Primary key (auto-generated)
title        | TEXT                     | Article headline
description  | TEXT                     | Article summary/description
link         | TEXT (UNIQUE)            | Article URL (unique constraint)
pub_date     | TIMESTAMP WITH TIME ZONE | Publication date
source       | TEXT                     | Source attribution
category     | TEXT                     | Article category
image        | TEXT                     | Article image URL
created_at   | TIMESTAMP WITH TIME ZONE | When saved to database
updated_at   | TIMESTAMP WITH TIME ZONE | Last update timestamp
```

### Indexes
- `idx_news_articles_link` - Fast duplicate checking
- `idx_news_articles_pub_date` - Optimized date-based queries
- `idx_news_articles_category` - Category filtering

### Row Level Security (RLS)
- Public read access enabled (SELECT)
- Public insert access enabled (INSERT)
- Update/Delete restricted (can be customized based on auth requirements)

## Architecture

### Components

1. **`src/lib/supabase.ts`**
   - Supabase client initialization
   - TypeScript interfaces for NewsArticle

2. **`src/services/newsService.ts`**
   - `saveNewsArticles()` - Batch save articles with duplicate handling
   - `fetchNewsArticles()` - Query articles from last N days
   - `getArticleCount()` - Get total article count

3. **`src/components/GenAINews.tsx`**
   - RSS feed fetching logic
   - Database save/load integration
   - Auto-refresh mechanism (15-minute interval)
   - UI for database stats and last saved time

### Data Flow

```
RSS Feeds (Google News)
         ↓
Parse & Extract Articles
         ↓
Save to Database (Instant) ← [Continuous Regeneration Every 15 min]
         ↓
Merge with Database Articles
         ↓
Display in UI
```

## Monitoring

### Console Logs
- `"Saved X new articles to database"` - Success message after save
- `"Auto-refreshing news articles..."` - Auto-refresh trigger (every 15 min)
- `"Error saving article:"` - Individual article save errors
- `"Error fetching articles:"` - Database fetch errors

### UI Indicators
- **Database counter badge**: Shows total articles in database
- **Green checkmark with timestamp**: Shows last successful save time
- **Auto-refresh info**: Displays refresh interval and policy

## Configuration

### Auto-Refresh Interval
Change the refresh interval in `GenAINews.tsx`:

```typescript
const AUTO_REFRESH_INTERVAL = 15 * 60 * 1000; // Currently 15 minutes
```

### Article Retention Period
Modify the days parameter in fetch calls:

```typescript
const dbArticles = await fetchNewsArticles(7); // Currently 7 days
```

### Categories
Current categories (5):
- Generative AI
- Machine Learning
- AI Tools
- Research
- Industry News

To add more categories, update the `searchTopics` array in `GenAINews.tsx`.

## Troubleshooting

### Articles Not Saving
1. Check browser console for error messages
2. Verify Supabase URL and anon key are correct in `.env`
3. Verify database migration ran successfully
4. Check Supabase dashboard > Table Editor for `news_articles` table
5. Check Supabase dashboard > Logs for any errors

### Database Connection Errors
1. Ensure Supabase project is active (not paused)
2. Check if anon key has expired or been rotated
3. Verify CORS settings in Supabase project if needed
4. Check network tab in browser dev tools for API calls

### Duplicate Articles
- The system handles duplicates automatically via unique constraint on `link` column
- Duplicates are silently skipped (error code 23505)
- This is expected behavior and doesn't indicate a problem

### Auto-Refresh Not Working
1. Check browser console for interval logs every 15 minutes
2. Verify component hasn't unmounted (interval cleanup)
3. Check if browser tab is active (some browsers throttle inactive tabs)

## Performance Considerations

- **Database size**: Plan for ~50-100 articles/day = ~3,000 articles/month
- **Query optimization**: Indexes ensure fast queries even with 10,000+ articles
- **Image storage**: Images are hotlinked (not stored in database)
- **API rate limits**: Google News RSS has no strict limits; Supabase free tier = 50,000 monthly active users

## Future Enhancements

Potential improvements:
- [ ] Server-side cron job for scheduled article fetching
- [ ] Admin dashboard for article management
- [ ] Article search and filtering UI
- [ ] Export articles to sitemap.xml for SEO
- [ ] Email notifications for breaking news
- [ ] Social media sharing integration
- [ ] Analytics on popular articles
- [ ] Image caching/CDN integration

## License

This news persistence system is part of the AI Loop project.
