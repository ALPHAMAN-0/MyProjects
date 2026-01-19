import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/api/data', (req, res) => {
    const data = [
        {
            id: 1,
            name: 'Sample Data'
        },
        {
            id: 2,
            name: 'More Sample Data'
        }
    ];
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});