const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBVW0nIrXofWHIzZ5LbYsFWx-VrQlOBFrE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/query', async (req, res) => {
    const prompt = req.body.query;

    try {
        const result = await model.generateContent(prompt);
        res.json({
            "result": result.response.text()
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your query.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
