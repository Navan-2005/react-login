import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import collection from './config.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { name, password } = req.body;

    const existUser = await collection.findOne({ name });
    if (existUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await collection.create({ name, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
});

app.post('/', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (!check) {
            return res.status(400).json({ message: "Username not found" });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong password" });
        } else {
            return res.status(200).json({ message: "Login successful" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred, please try again" });
    }
});


app.listen(8080, () => {
    console.log('Server running on port 8080');
});
