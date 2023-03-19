import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => res.send('Server running'));
// app.use(express.json())
const config = {
    headers: {
        'X-Api-Key': 'Ia4/pPBk5shq/5Fyxuow6g==tBXT7XWdgZtf9kkW'
    }

};

const getTemp = async (city) => {
    const response = await axios.get(`https://api.api-ninjas.com/v1/weather?city=${city}`, config);
    return response.data

};

app.get('/api/weather/:location', async (req, res) => {
    const location = req.params.location;
    try {
        const data = await getTemp(location);
        res.json(data);
    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Could not fetch temperature data' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
