import { google } from "googleapis"
import AnalyticsData from "./model/analyticsData.model.js";

/*
 import csv from "csv-parser"

import fs from "fs"
import cron from "node-cron"

const fetchSheetData = async () => {
    const csvUrl = `https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/export?format=csv&gid=485741054&timestamp=${Date.now()}`;
    
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.text();
    console.log(data);
  };
  
  // Schedule to run every minute (example)
  cron.schedule('* * * * *', fetchSheetData);
  
  // Initial fetch
  fetchSheetData(); 
  */


  const clientEmail = 'chethankumar@after-all-319412.iam.gserviceaccount.com';
const privateKey = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRk/M3VpZk48Jc\nIgB3uFBjfFxALlmUdzlivvnAEj4Gbuu5w1cfEPthUjHpiklA/TnjSLNutv0nYX9F\ngh+eJfpLcnHe5xHAEJroOwYkLScy3bXZDOh2+OG+7WRwASdydHK4k7aPOS8zw/ke\nfIcAEbBPvQhtMB9eWfaZJoJtkA03BJOp6NrN/TBfjoxUReTXtLYCixzks6sOYSPn\nN+ukDvul1fXz2815OosiibBJIf3UcOiqGSOZe0NKudg3vhiHE/xLeMIqnRjwVoRO\nH0g+LzZAYJqv9iyeWsdWiFMdKMWoaZ4A+RSFeZ8ZMhzyQYXrs736j9JjhXHATm6q\nQFXEvSaRAgMBAAECggEAAsiGXOd95p3oKGTKB3/xoYVOKjf4pHsHENk/4yk2IF9c\niGewsbpcZAbzR1jKf8CXq73HGHXNL0SQ715GhnqJZ4nfnXhjgX2PyKLgQi7O0g0l\nHeo+Q5AMmN7nDbEn9Os/CkJguipIub+kcq3E0v6DlXKyx4uk/ePQcCspUTjw171q\nR49VJQ8PZVfVYqKybDwZGEP03PIWwBTYtRh33HQNf5/OlFR8LmN6WFSAOd4s0pS9\n7xO/FHTSNcWlMOAMzsho38owtM8Ln+/42dTjMYiskw7RMnwA1fBkAFWeMj0gorjh\nvHvJk8uVWHcMDSsUcKLbd2ptDr+4ELuOBmEqFtQjBQKBgQDBEjsIbl6cb0SzYUfE\npwtFc0I/3ao8kPv/T4dQFumMaIMgHQl92Q+eExEGnPHiNAod2Q5BlhrEaZpTbdIm\n1FlGELCll83uD+sXCkCnI2pfMADjkm47eo6ISHRf29rayejtTY6dN+fazY1z7h5I\nzdrEqlN3Bztew/+F8SpXIEx2owKBgQDBBucWvL4nKdtfFbVhLKxv310QVEaVEc5n\n0n7D0P6gIrNuooFMyoeIYAA19T+y3ZQ/g6yp/a0uDk4b3x7hy9CknkRvUa9pMdE3\nXhMhu8q+MWRcv7ZBPbLske95hAwnyL17GNnNZxNFNHnanpGlX17Glr6cF0dAdFDM\nIg/5VOrlOwKBgAay/T1jpwDCk52tyHG4Yhm80BWrOVb0qOnI9qb+xIfMsJASsdue\nBn6zpqmWFIaGy7sRZv87mB4sk+BFNT+HqrlVput4Avs5riyUfH3QKsa2wbEjyZNi\nw0NTUEZrOILS8rQZNtOZtv/OlhPptT9NdUPRrSe6JoM5Rcp9/bwcMMsFAoGATwaT\nb4SgWQpS7K/HjVwr0LVitX+7UeZzWaAdE/ApfsgWK/JN+3FjYZrkGzMn/AOpYQN4\nmjPoRdXHdrO3QfwelHbTT7vik6+4lvFl5carb4hrLWmzpSwsZ5wrrdU44MTXhmEb\nMnPDuO6OAMowmMLd23H14ZPKMQIt3hUH8y0n6ecCgYEAiZ72Wh/rfPH53vpxueh7\nrRATF66zB6LhA+xUBTSYccTrHtHfoKDqfQt4SfaUaR25NCGVlHooSqW2oXBYNAPm\nOk1xFrkuPB/nbwMotD3p8A9qxM4u71qmzUSjWDYGxQ48TIY+vol643rWWLDvQTL9\nlqyPF0pSf7yaF+Uzvtp0b7g=\n-----END PRIVATE KEY-----\n`;

 

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  
 export const fetchSheetData = async () => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0';
  const range = 'Sheet3!A:Z'; 

  
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      auth: client,
      headers: {
        'Cache-Control': 'no-store'
      }
    });

    const data = res.data.values;

    if (data && data.length > 1) {  
      const headers = data[0];      
      const rows = data.slice(1);   
      
      const documents = rows.map((row) => {
        let doc = {};
        headers.forEach((header, index) => {
          doc[header.trim()] = row[index] || null;  
        });
        return doc;
      });

      // Insert data into MongoDB
      await storeDataInDB(documents);
    } else {
      console.log('No valid data found in the Google Sheet');
    }

  } catch (error) {
    console.error('Error fetching sheet data:', error);
  }
};
  
const storeDataInDB = async (documents) => {
  try {
    await AnalyticsData.deleteMany({});  
    await AnalyticsData.insertMany(documents);
    console.log('Data successfully stored in MongoDB');
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
  }
};




