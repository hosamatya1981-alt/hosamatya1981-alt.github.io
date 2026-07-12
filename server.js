const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// هنا تضع مفتاح المطورين الخاص بك (Pi API Key)
// يمكنك استخراجه من الـ Developer Portal داخل متصفح باي
const PI_API_KEY = "ضع_مفتاح_الـ_API_الخاص_بك_هنا"; 

// 1. نقطة الموافقة على الدفع (Approve Payment)
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
        res.status(500).json({ success: false, error: "فشلت الموافقة على العملية" });
    }
});

// 2. نقطة إكمال الدفع النهائي (Complete Payment)
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
        res.status(500).json({ success: false, error: "فشل إكمال العملية نهائياً" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
