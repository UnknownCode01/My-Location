import fetch from 'node-fetch';  // ES6 import syntax for node-fetch
import express from 'express';   // ES6 import syntax for express
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());

const apiKey = process.env.API_KEY;

app.get('/api/get-location', async (req, res) => {
  const { latitude, longitude } = req.query;  // Get lat/long from client
  console.log(apiKey);
  
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`;

  try {
    console.log(`Fetching location data...`);
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Location data fetched successfully');
    
    res.json(data);  // Send the data back to the client
  } catch (error) {
    res.status(500).json({ error: 'Error fetching location data' });
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
