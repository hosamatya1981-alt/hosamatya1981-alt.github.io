const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const PI_API_KEY = process.env.PI_API_KEY;
app.post('/approve', async (req, res) => {
    const { paymentId } = req.body;
    try {
        const response = await axios.post(
            `https://minepi.com{paymentId}/approve`,
            {},
            { headers: { Authorization: `Key ${PI_API_KEY}` } }
        );
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Approval Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: "فشلت الموافقة" });
    }
});

app.post('/complete', async (req, res) => {
    const { paymentId, txid } = req.body;
    try {
        const response = await axios.post(
            `https://minepi.com{paymentId}/complete`,
            { txid: txid },
            { headers: { Authorization: `Key ${PI_API_KEY}` } }
        );
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Completion Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: "فشل الإكمال" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// version 2
