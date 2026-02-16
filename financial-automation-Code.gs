/**
 * MISSION: Automated Financial Sync Pipeline
 * PLATFORM: Google Apps Script + Antigravity Agent
 * 
 * This script automatically syncs transaction alerts from Gmail to Google Sheets,
 * providing real-time financial tracking without manual data entry.
 * 
 * FEATURES:
 * - Regex-based transaction parsing
 * - Multi-account support with billing cycle tracking
 * - Duplicate detection
 * - Web dashboard for real-time insights
 * 
 * PRIVACY: Zero data sent to third-party APIs. All processing within Google Apps Script.
 */

const CONFIG = {
  SENDER_EMAILS: "notifications@yourbank.com, alerts@provider.com", // Add your generic filters here
  SHEET_NAME: "Transactions",
  DASHBOARD_URL: "https://script.google.com/.../exec"
};

// Mapping for different accounts (Generic placeholders)
const ACCOUNT_MAP = {
  'CARD_001': { name: 'Primary Card', statementDay: 15 },
  'CARD_002': { name: 'Travel Card', statementDay: 5 },
  'UPI_SYNC': { name: 'Digital Wallet', statementDay: 1 }
};

/**
 * Main Sync function to be triggered by the Antigravity Agent
 * Can be set as a time-driven trigger (daily at 3:00 AM)
 */
function syncTransactions() {
  const threads = GmailApp.search(`from:(${CONFIG.SENDER_EMAILS}) label:unread`);
  const results = [];

  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(msg => {
      const body = msg.getPlainBody();
      const parsedData = parseTransaction(body);
      if (parsedData && validateTransaction(parsedData)) {
        saveToSheet(parsedData);
        results.push(parsedData);
      }
    });
    thread.markRead();
  });
  
  // Generate verification artifact for review
  if (results.length > 0) {
    generateVerificationArtifact(results);
  }
  
  return `Sync Complete: ${results.length} transactions processed.`;
}

/**
 * Regex-based Parsing Engine (Generic)
 * Handles multiple email formats from different banks/wallets
 */
function parseTransaction(text) {
  // Pattern to find amounts and merchants
  const amountMatch = text.match(/(?:Rs\.|INR|USD)\s?([\d,]+\.?\d*)/i);
  const merchantMatch = text.match(/at\s+([^.\n]+)/i);
  const accountMatch = text.match(/ending\s+in\s+(\d{4})/i);

  if (amountMatch && merchantMatch) {
    return {
      date: new Date(),
      amount: parseFloat(amountMatch[1].replace(/,/g, '')),
      merchant: sanitizeMerchant(merchantMatch[1].trim()),
      account: accountMatch ? `Account-${accountMatch[1]}` : 'Unknown'
    };
  }
  return null;
}

/**
 * Validate parsed transaction data
 */
function validateTransaction(parsed) {
  const validations = {
    amountCheck: parsed.amount > 0,
    merchantCheck: parsed.merchant && parsed.merchant.length > 0,
    duplicateCheck: !isDuplicate(parsed),
    reasonableAmount: parsed.amount < 100000 // Flag large transactions
  };
  
  return Object.values(validations).every(v => v === true);
}

/**
 * Check for duplicate transactions
 */
function isDuplicate(newTransaction) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                               .getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Check last 50 transactions for duplicates
  const recentTransactions = data.slice(-50);
  
  return recentTransactions.some(row => {
    const [date, account, merchant, amount] = row;
    return Math.abs(new Date(date) - newTransaction.date) < 60000 && // Within 1 min
           merchant === newTransaction.merchant &&
           amount === newTransaction.amount;
  });
}

/**
 * Sanitize merchant names to prevent injection
 */
function sanitizeMerchant(name) {
  return name.replace(/[<>"']/g, '') // Remove HTML/JS chars
             .substring(0, 100);     // Limit length
}

/**
 * Save transaction to Google Sheets
 */
function saveToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                               .getSheetByName(CONFIG.SHEET_NAME);
  sheet.appendRow([data.date, data.account, data.merchant, data.amount]);
}

/**
 * Calculate current billing cycle based on statement date
 */
function getCurrentBillingCycle(accountId) {
  const account = ACCOUNT_MAP[accountId];
  if (!account) return null;
  
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  
  // If before statement day, cycle is last month's statement to this month
  // If after statement day, cycle is this month's statement to next month
  if (currentDay < account.statementDay) {
    return {
      start: new Date(today.getFullYear(), currentMonth - 1, account.statementDay),
      end: new Date(today.getFullYear(), currentMonth, account.statementDay - 1)
    };
  } else {
    return {
      start: new Date(today.getFullYear(), currentMonth, account.statementDay),
      end: new Date(today.getFullYear(), currentMonth + 1, account.statementDay - 1)
    };
  }
}

/**
 * Calculate total spend for current billing cycle
 */
function getTotalSpendForCycle(accountId) {
  const cycle = getCurrentBillingCycle(accountId);
  if (!cycle) return 0;
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                               .getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let total = 0;
  data.forEach((row, index) => {
    if (index === 0) return; // Skip header
    
    const [date, account, merchant, amount] = row;
    if (account.includes(accountId) && 
        date >= cycle.start && 
        date <= cycle.end) {
      total += amount;
    }
  });
  
  return total;
}

/**
 * Provide metrics for dashboard
 */
function getMetrics() {
  const MONTHLY_BUDGET = 50000; // Configure as needed
  
  const cycleSpend = getTotalSpendForCycle('CARD_001') + 
                     getTotalSpendForCycle('CARD_002') +
                     getTotalSpendForCycle('UPI_SYNC');
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                               .getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  return {
    cycleSpend: cycleSpend,
    remaining: MONTHLY_BUDGET - cycleSpend,
    count: data.length - 1 // Exclude header
  };
}

/**
 * Generate verification artifact for agent review
 */
function generateVerificationArtifact(results) {
  const artifact = {
    runId: Utilities.getUuid(),
    timestamp: new Date().toISOString(),
    transactionsProcessed: results.length,
    transactions: results.map(t => ({
      merchant: t.merchant,
      amount: t.amount,
      confidence: calculateConfidence(t)
    })),
    flaggedForReview: results.filter(t => calculateConfidence(t) < 0.8)
  };
  
  // Save to Google Drive for agent review
  const file = DriveApp.createFile(
    `verification_${artifact.runId}.json`,
    JSON.stringify(artifact, null, 2)
  );
  
  Logger.log(`Verification artifact: ${file.getUrl()}`);
  return artifact;
}

/**
 * Calculate confidence score for parsed transaction
 */
function calculateConfidence(transaction) {
  let score = 1.0;
  
  // Reduce confidence if merchant name is very short
  if (transaction.merchant.length < 3) score -= 0.3;
  
  // Reduce confidence if amount has decimal precision issues
  if (transaction.amount % 1 !== 0 && transaction.amount % 0.01 !== 0) {
    score -= 0.2;
  }
  
  // Reduce confidence if account is unknown
  if (transaction.account === 'Unknown') score -= 0.4;
  
  return Math.max(score, 0);
}

/**
 * Setup function - Run once to create Gmail labels
 */
function setup() {
  GmailApp.createLabel('fintech-automation/processed');
  Logger.log('Setup complete: Gmail labels created');
}

/**
 * Test function to validate parsing logic
 */
function testParse() {
  const sampleEmail = `
    Your account ending in 5432 was debited 
    with Rs. 1,249.00 at Amazon on 16-Feb-2026
  `;
  
  const result = parseTransaction(sampleEmail);
  Logger.log(result);
  // Expected: {amount: 1249, merchant: "Amazon", account: "Account-5432", date: ...}
}

/**
 * Web App Entry Point - Returns HTML dashboard
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Dashboard')
      .setTitle('Financial Command Center')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
