# Google Sheets Integration Setup Guide

This guide will help you set up the Google Sheets integration for your contact form and newsletter subscriptions.

## Overview

Both the contact form and newsletter subscription send data to a Google Apps Script web app, which then writes the data to a Google Sheet. This is a free, serverless solution that requires no backend infrastructure.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "AI Loop - Website Submissions"
4. Create **two sheets** within this spreadsheet:
   - **Sheet 1**: "Contact Form" - for contact form submissions
   - **Sheet 2**: "Newsletter" - for newsletter subscriptions

### Sheet 1: Contact Form
In the first row, add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Subject`
   - E1: `Message`

### Sheet 2: Newsletter
In the first row, add these headers:
   - A1: `Timestamp`
   - B1: `Email`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any existing code in the script editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // Check if this is a newsletter subscription or contact form submission
    if (data.type === 'newsletter') {
      // Handle newsletter subscription
      var newsletterSheet = spreadsheet.getSheetByName('Newsletter');

      // If Newsletter sheet doesn't exist, create it
      if (!newsletterSheet) {
        newsletterSheet = spreadsheet.insertSheet('Newsletter');
        newsletterSheet.appendRow(['Timestamp', 'Email']);
      }

      // Append newsletter subscription
      newsletterSheet.appendRow([
        data.timestamp,
        data.email
      ]);

    } else {
      // Handle contact form submission
      var contactSheet = spreadsheet.getSheetByName('Contact Form');

      // If Contact Form sheet doesn't exist, create it
      if (!contactSheet) {
        contactSheet = spreadsheet.insertSheet('Contact Form');
        contactSheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      }

      // Append contact form data
      contactSheet.appendRow([
        data.timestamp,
        data.name,
        data.email,
        data.subject,
        data.message
      ]);
    }

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾) and name your project (e.g., "Website Forms Handler")

## Step 3: Deploy the Script as a Web App

1. Click the **Deploy** button (top right) > **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Contact Form to Google Sheets" (or any description)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (important: this allows the form to submit without authentication)
4. Click **Deploy**
5. You may need to authorize the script:
   - Click **Authorize access**
   - Select your Google account
   - Click **Advanced** > **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
6. Copy the **Web app URL** that appears (it looks like: `https://script.google.com/macros/s/...../exec`)

## Step 4: Configure Your Application

1. Create a `.env` file in the root of your project if it doesn't exist
2. Add the following line with your Web app URL:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual URL you copied from the deployment.

3. If you already have your app running, restart the development server:

```bash
npm run dev
```

## Step 5: Test the Integration

### Testing Contact Form
1. Open your website and navigate to the contact form
2. Fill in all the fields:
   - Full Name
   - Email Address
   - Phone
   - Message
3. Click "Send Message"
4. You should see a success message: "Thank you! Your message has been sent successfully."
5. Check your Google Sheet's "Contact Form" tab - a new row should appear with the submitted data

### Testing Newsletter Subscription
1. Scroll to the footer of your website
2. Enter an email address in the Newsletter field
3. Click "Subscribe"
4. You should see a success message: "Successfully subscribed!"
5. Check your Google Sheet's "Newsletter" tab - a new row should appear with the email and timestamp

## Troubleshooting

### Common Issues

**Issue: "Google Sheets integration not configured" error**
- Make sure you've created the `.env` file with the correct `VITE_GOOGLE_SCRIPT_URL`
- Restart your development server after adding the environment variable

**Issue: Form submits but no data appears in Google Sheet**
- Verify that your Google Apps Script is deployed as a web app
- Make sure "Who has access" is set to "Anyone"
- Check that the Web app URL in your `.env` file is correct and ends with `/exec`
- Open the Apps Script editor and check "Executions" to see if there are any errors

**Issue: Permission errors in Google Apps Script**
- Make sure you authorized the script when deploying
- Try re-deploying the script and authorizing again

**Issue: CORS errors in browser console**
- This is expected! The script uses `mode: 'no-cors'` which prevents CORS issues
- The form will still work even with CORS warnings in the console

### Viewing Script Execution Logs

1. Go to your Apps Script editor
2. Click on "Executions" in the left sidebar
3. You'll see a log of all script executions, including any errors

## Advanced Customization

### Email Notifications

You can modify the Google Apps Script to send email notifications when a form is submitted:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.subject,
      data.message
    ]);

    // Send email notification
    MailApp.sendEmail({
      to: 'connectwithailoop@gmail.com',
      subject: 'New Contact Form Submission: ' + data.subject,
      body: 'Name: ' + data.name + '\n' +
            'Email: ' + data.email + '\n' +
            'Subject: ' + data.subject + '\n' +
            'Message: ' + data.message + '\n\n' +
            'Submitted at: ' + data.timestamp
    });

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Data Validation

Add validation in the Google Apps Script:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Missing required fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Invalid email format' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.subject,
      data.message
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Security Considerations

- The web app URL is public but can only append data to your sheet (not read or modify existing data)
- Consider adding rate limiting or additional validation in the Apps Script if you're concerned about spam
- You can add CAPTCHA to the form for additional spam protection
- The Apps Script runs under your Google account, so only you can see the submitted data

## Need Help?

If you encounter any issues, please contact us at connectwithailoop@gmail.com
