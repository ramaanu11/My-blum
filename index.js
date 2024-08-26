const fetch = require('node-fetch');
const cron = require('cron');
require('dotenv').config();

const accounts = [
    {
        number: 18,
        username: 'nomor1',
        apiUrl: 'https://blum-api-url-1.com'
    },
    {
        number: 19,
        username: 'nomor2',
        apiUrl: 'https://blum-api-url-2.com'
    },
    // Tambahkan akun lainnya jika diperlukan
];

const logMessage = (account, message) => {
    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
    console.log(`[${timestamp}] account number = ${account.number}`);
    console.log(`[${timestamp}] login as = ${account.username}`);
    console.log(`[${timestamp}] ${message}`);
};

const dailyCheckIn = async (account) => {
    try {
        const response = await fetch(`${account.apiUrl}/daily-checkin`, { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            logMessage(account, 'already check in today!');
        } else {
            logMessage(account, `failed to check in: ${data.message}`);
        }
    } catch (error) {
        logMessage(account, `Error during daily check-in: ${error}`);
    }
};

const performFarming = async (account) => {
    logMessage(account, 'Starting farming...');
    try {
        // Placeholder for actual farming API call
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate farming task
        logMessage(account, 'end farming = ' + new Date(Date.now() + 8 * 60 * 60 * 1000).toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' }));
    } catch (error) {
        logMessage(account, `Error during farming: ${error}`);
    }
};

const claimFarming = async (account) => {
    logMessage(account, 'Starting claim farming...');
    try {
        // Placeholder for actual claim farming API call
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate claim farming task
        logMessage(account, 'Claim farming successful.');
    } catch (error) {
        logMessage(account, `Error during claim farming: ${error}`);
    }
};

// Schedule daily check-in at 08:00 AM every day
const dailyCheckInJob = new cron.CronJob('0 8 * * *', () => {
    accounts.forEach(account => dailyCheckIn(account));
}, null, true, 'Asia/Jakarta');

// Schedule farming task every 8 hours
const farmingJob = new cron.CronJob('0 */8 * * *', () => {
    accounts.forEach(account => performFarming(account));
}, null, true, 'Asia/Jakarta');

// Schedule claim farming task every 8 hours, 5 minutes after farming
const claimFarmingJob = new cron.CronJob('5 */8 * * *', () => {
    accounts.forEach(account => claimFarming(account));
}, null, true, 'Asia/Jakarta');

// Start all jobs
dailyCheckInJob.start();
farmingJob.start();
claimFarmingJob.start();

// Run the initial tasks immediately on startup
accounts.forEach(account => {
    dailyCheckIn(account);
    performFarming(account);
    claimFarming(account);
});
