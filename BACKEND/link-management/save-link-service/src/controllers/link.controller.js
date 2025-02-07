const Link = require('../models/link.model');

exports.saveLink = async (req, res) => {
    try {
        const { url, description } = req.body;
        const newLink = new Link({ url, description });
        await newLink.save();
        res.status(201).json({ message: 'Link guardado exitosamente', data: newLink });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getLinks = async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};