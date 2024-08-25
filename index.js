const fetch = require('node-fetch');
const cron = require('node-cron');
require('dotenv').config();

const blumApiUrl = process.env.BLUM_API_URL;
const telegramToken = process.env.TELEGRAM_TOKEN;
const allowedUserId = parseInt(process.env.ALLOWED_USER_ID);

// Function to log messages with timestamp
const logMessage = (message) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${message}`);
};

// Function to perform daily check-in
const dailyCheckIn = async () => {
    try {
        const response = await fetch(blumApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: telegramToken })
        });

        const data = await response.json();
        if (data.success) {
            logMessage('Daily check-in successful.');
        } else {
            logMessage(`Daily check-in failed: ${data.message}`);
        }
    } catch (error) {
        logMessage(`Error during daily check-in: ${error}`);
    }
};

// Function to perform farming
const performFarming = async () => {
    logMessage('Starting farming...');
    try {
        // Placeholder for actual farming logic
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate farming task
        logMessage('Farming completed.');
    } catch (error) {
        logMessage(`Error during farming: ${error}`);
    }
};

// Function to claim farming rewards
const claimFarming = async () => {
    logMessage('Starting claim farming...');
    try {
        // Placeholder for actual claim farming logic
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate claim farming task
        logMessage('Claim farming successful.');
    } catch (error) {
        logMessage(`Error during claim farming: ${error}`);
    }
};

// Schedule daily check-in at 08:00 AM every day
cron.schedule('0 8 * * *', () => {
    dailyCheckIn();
}, {
    scheduled: true,
    timezone: "Asia/Jakarta"
});

// Schedule farming task every 8 hours
cron.schedule('0 */8 * * *', () => {
    performFarming();
}, {
    scheduled: true,
    timezone: "Asia/Jakarta"
});

// Schedule claim farming task every 8 hours
cron.schedule('5 */8 * * *', () => {
    claimFarming();
}, {
    scheduled: true,
    timezone: "Asia/Jakarta"
});

// Run initial daily check-in and farming tasks when the script starts
dailyCheckIn();
performFarming();
claimFarming();
