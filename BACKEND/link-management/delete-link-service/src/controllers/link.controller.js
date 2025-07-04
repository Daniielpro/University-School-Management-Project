const Link = require('../models/link.model');

exports.deleteLink = async (req, res) => {
    try {
        const { id } = req.params;
        await Link.findByIdAndDelete(id);
        res.status(200).json({ message: 'Link eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};