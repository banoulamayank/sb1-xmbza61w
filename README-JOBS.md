# Job Updates - Real-Time Data Setup Guide

This guide explains how to configure real-time job data for the Job Updates page using Google Sheets.

## 📋 Table of Contents
- [Option 1: Google Sheets CSV (Easiest)](#option-1-google-sheets-csv-easiest)
- [Option 2: Google Sheets API (More Control)](#option-2-google-sheets-api-more-control)
- [Option 3: Third-Party Job APIs](#option-3-third-party-job-apis)

---

## Option 1: Google Sheets CSV (Easiest) ⭐ Recommended

This is the easiest and completely free method to get real-time job updates.

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add the following column headers in the first row:

```
id | title | company | location | type | salary | postedDate | category | description | requirements | responsibilities | applicationUrl
```

### Step 2: Add Job Data

Fill in your job data. Here's an example format:

| id | title | company | location | type | salary | postedDate | category | description | requirements | responsibilities | applicationUrl |
|----|-------|---------|----------|------|--------|------------|----------|-------------|--------------|-----------------|----------------|
| 1 | Product Manager | Tech Co | Mumbai, India | Full-time | ₹15-20 LPA | 2 days ago | Technology | We are looking for... | 5+ years experience\|MBA preferred\|Strong communication | Define product roadmap\|Work with engineers\|Analyze metrics | https://example.com/apply |

**Important Formatting:**
- Use `|` (pipe symbol) to separate multiple items in `requirements` and `responsibilities`
- Example: `5+ years experience|MBA preferred|Strong communication`

### Step 3: Publish to Web

1. In your Google Sheet, go to **File** → **Share** → **Publish to web**
2. In the popup:
   - Select the sheet you want to publish
   - Choose format: **Comma-separated values (.csv)**
   - Click **Publish**
3. Copy the URL that appears (it will look like: `https://docs.google.com/spreadsheets/d/e/...`)

### Step 4: Configure Your App

1. Open `src/components/JobUpdates.tsx`
2. Find this line (around line 28):
   ```typescript
   const GOOGLE_SHEETS_CSV_URL = ''; // Add your published Google Sheets CSV URL here
   ```
3. Paste your CSV URL:
   ```typescript
   const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/.../pub?output=csv';
   ```
4. Save the file

### Step 5: Test

1. Restart your development server: `npm run dev`
2. Visit `http://localhost:5173/job-updates`
3. You should see your jobs from Google Sheets!

**Real-time Updates:** Any changes you make to the Google Sheet will be reflected when users refresh the page.

---

## Option 2: Google Sheets API (More Control)

This method gives you more control and better formatting options.

### Step 1: Get API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google Sheets API"
   - Click **Enable**
4. Create credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
   - Copy your API key

### Step 2: Make Sheet Public

1. Open your Google Sheet
2. Click **Share** button
3. Under "General access", select **Anyone with the link** can view
4. Copy your spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
   - Then SPREADSHEET_ID is: `1ABC123xyz`

### Step 3: Configure Your App

1. Open `src/components/JobUpdates.tsx`
2. Find this line (around line 32):
   ```typescript
   const GOOGLE_SHEETS_API_URL = ''; // Add your Google Sheets API URL here
   ```
3. Replace with your configuration:
   ```typescript
   const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/Sheet1!A1:L100?key=YOUR_API_KEY';
   ```

   Replace:
   - `YOUR_SPREADSHEET_ID` with your spreadsheet ID
   - `YOUR_API_KEY` with your API key
   - `Sheet1` with your sheet name if different
   - `A1:L100` with your data range (A1:L100 means columns A-L, rows 1-100)

### Step 4: Test

Same as Option 1, Step 5.

---

## Option 3: Third-Party Job APIs

You can also integrate with job board APIs:

### Free Job APIs:

1. **Adzuna API** (Free tier: 1000 calls/month)
   - Website: https://developer.adzuna.com/
   - Offers jobs from multiple sources

2. **The Muse API** (Free)
   - Website: https://www.themuse.com/developers/api/v2
   - Tech and creative jobs

3. **GitHub Jobs API** (Free)
   - Website: https://jobs.github.com/api
   - Tech jobs only

To use these APIs, you'll need to modify the `fetchJobs` function in `JobUpdates.tsx` to call the specific API endpoint and transform the response to match the `Job` interface.

---

## 📊 Google Sheets Template

Here's a template you can copy:

**[Click here to copy the template](https://docs.google.com/spreadsheets/d/TEMPLATE_ID/copy)**

Or create manually with these columns:

1. **id**: Unique identifier (1, 2, 3, etc.)
2. **title**: Job title (e.g., "Senior Software Engineer")
3. **company**: Company name
4. **location**: Full location (e.g., "Bangalore, Karnataka, India")
5. **type**: Employment type (e.g., "Full-time", "Part-time", "Contract")
6. **salary**: Salary range (e.g., "₹10-15 LPA")
7. **postedDate**: Relative date (e.g., "2 days ago", "1 week ago")
8. **category**: Job category (Technology, Marketing, Sales, Design, Management, Content)
9. **description**: Full job description (text)
10. **requirements**: Pipe-separated list (e.g., "5+ years|MBA|Good communication")
11. **responsibilities**: Pipe-separated list (e.g., "Lead team|Define strategy|Build product")
12. **applicationUrl**: Link to apply (e.g., "https://company.com/apply")

---

## 🔄 Automatic Updates

### How often do jobs refresh?

- **Current**: Jobs are fetched when the page loads
- **To add auto-refresh**: You can modify the `useEffect` hook to refresh every X minutes

Example for auto-refresh every 5 minutes:

```typescript
useEffect(() => {
  fetchJobs();

  // Auto-refresh every 5 minutes
  const interval = setInterval(fetchJobs, 5 * 60 * 1000);

  return () => clearInterval(interval);
}, []);
```

---

## 🎨 Customization

### Adding New Categories

Edit the `categories` array in `JobUpdates.tsx`:

```typescript
const categories = ['All Jobs', 'Technology', 'Marketing', 'Sales', 'Design', 'Management', 'Content', 'Your New Category'];
```

### Changing the Google Jobs Embed

Find the iframe section at the bottom of the component and modify the search query:

```tsx
<iframe
  src="https://www.google.com/search?q=YOUR_CUSTOM_SEARCH&ibp=htl;jobs"
  ...
/>
```

---

## 🐛 Troubleshooting

### Jobs not loading?

1. **Check browser console** for errors (F12 → Console)
2. **Verify URL**: Make sure your Google Sheets URL is correct
3. **Check CORS**: Published CSV URLs should work without CORS issues
4. **API Key**: If using Google Sheets API, verify your API key is valid
5. **Sheet permissions**: Make sure the sheet is publicly accessible

### Data not formatting correctly?

1. Check that column headers match exactly (case-sensitive)
2. Use `|` for separating requirements and responsibilities
3. Ensure no commas in CSV data (they break parsing)

---

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Sheets is published and accessible
3. Test the URL directly in your browser
4. Make sure the data format matches the template

---

## 🚀 Next Steps

After setting up real-time data:
1. Add more jobs to your Google Sheet regularly
2. Consider automating job data updates with Google Apps Script
3. Set up email notifications when new jobs are added
4. Add job search and filtering features

Happy hiring! 🎉
