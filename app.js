const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data structures to store medicines and articles
let medicines = [];
let articles = [];

/* ------------------- Combined Routes ------------------- */

// Create a new medicine or article
app.post('/api/content/:type', (req, res) => {
    const { type } = req.params;
    if (type === 'medicines') {
        const { commercialName, medicalName, dosage, description, category, type, frequency, image, sideEffects, precautions, interactions } = req.body;
        const newMedicine = {
            id: medicines.length + 1,
            commercialName,
            medicalName,
            dosage,
            description,
            category,
            type,
            frequency,
            image,
            sideEffects,
            precautions,
            interactions
        };
        medicines.push(newMedicine);
        res.status(201).json(newMedicine);
    } else if (type === 'articles') {
        const { title, photo, link } = req.body;
        const newArticle = {
            id: articles.length + 1,
            title,
            photo,
            link
        };
        articles.push(newArticle);
        res.status(201).json(newArticle);
    } else {
        res.status(400).json({ message: 'Invalid type. Use "medicines" or "articles".' });
    }
});

// Get all medicines or articles
app.get('/api/content/:type', (req, res) => {
    const { type } = req.params;
    if (type === 'medicines') {
        res.json(medicines);
    } else if (type === 'articles') {
        res.json(articles);
    } else {
        res.status(400).json({ message: 'Invalid type. Use "medicines" or "articles".' });
    }
});

// Get a single medicine or article by ID
app.get('/api/content/:type/:id', (req, res) => {
    const { type, id } = req.params;
    if (type === 'medicines') {
        const medicine = medicines.find(m => m.id === parseInt(id));
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(medicine);
    } else if (type === 'articles') {
        const article = articles.find(a => a.id === parseInt(id));
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } else {
        res.status(400).json({ message: 'Invalid type. Use "medicines" or "articles".' });
    }
});

// Update a medicine or article by ID
app.put('/api/content/:type/:id', (req, res) => {
    const { type, id } = req.params;
    if (type === 'medicines') {
        const medicine = medicines.find(m => m.id === parseInt(id));
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const { commercialName, medicalName, dosage, description, category, type, frequency, image, sideEffects, precautions, interactions } = req.body;
        medicine.commercialName = commercialName !== undefined ? commercialName : medicine.commercialName;
        medicine.medicalName = medicalName !== undefined ? medicalName : medicine.medicalName;
        medicine.dosage = dosage !== undefined ? dosage : medicine.dosage;
        medicine.description = description !== undefined ? description : medicine.description;
        medicine.category = category !== undefined ? category : medicine.category;
        medicine.type = type !== undefined ? type : medicine.type;
        medicine.frequency = frequency !== undefined ? frequency : medicine.frequency;
        medicine.image = image !== undefined ? image : medicine.image;
        medicine.sideEffects = sideEffects !== undefined ? sideEffects : medicine.sideEffects;
        medicine.precautions = precautions !== undefined ? precautions : medicine.precautions;
        medicine.interactions = interactions !== undefined ? interactions : medicine.interactions;

        res.json(medicine);
    } else if (type === 'articles') {
        const article = articles.find(a => a.id === parseInt(id));
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const { title, photo, link } = req.body;
        article.title = title !== undefined ? title : article.title;
        article.photo = photo !== undefined ? photo : article.photo;
        article.link = link !== undefined ? link : article.link;

        res.json(article);
    } else {
        res.status(400).json({ message: 'Invalid type. Use "medicines" or "articles".' });
    }
});

// Delete a single medicine or article by ID
app.delete('/api/content/:type/:id', (req, res) => {
    const { type, id } = req.params;
    if (type === 'medicines') {
        const index = medicines.findIndex(m => m.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        medicines.splice(index, 1);
        res.status(204).send();
    } else if (type === 'articles') {
        const index = articles.findIndex(a => a.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: 'Article not found' });
        }
        articles.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(400).json({ message: 'Invalid type. Use "medicines" or "articles".' });
    }
});

// Delete all medicines or articles
app.delete('/api/content/:type', (req, res) => {
    const { type } = req.params;
    if (type === 'medicines') {
        medicines = [];
        res.status(200).json({ message: "All medicines deleted successfully" });
    } else if (type === 'articles') {
        articles = [];
        res.status(200).json({ message: "All articles deleted successfully" });
    } else {
        res.status(400).json({ message: 'Invalid type. Use "medicines" or "articles".' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
