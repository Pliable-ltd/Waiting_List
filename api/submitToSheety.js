// File: api/submitToSheety.js

export default async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
  
    const { companyName, email } = req.body;
  
    // Fetch the secret from Vercel's environment variables
    const apiKey = process.env.BEARERAUTH;
    const postApiUrl = "https://api.sheety.co/be370507ddc10bb893e1b81823fbf756/waitingList/sheet1";
  
    try {
      // Make a request to the Sheety API
      const response = await fetch(postApiUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${apiKey}`, 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sheet1: {
            company: companyName,
            email: email
          }
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        res.status(200).json({ message: "Successfully added to the waiting list", data });
      } else {
        res.status(response.status).json({ message: "Error submitting to Sheety API" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };