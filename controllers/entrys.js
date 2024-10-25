const Entry = require("../models/entrys");
const { put } = require("../routers/holders");
const { putQRCode } = require("./laptops");


const httpEntry = {
    postEntry: async (req, res) => {
        try {
            const { laptop, holder, entrytime, checkout, type } = req.body;
            const newEntry = new Entry({
                laptop,
                holder,
                entrytime,
                checkout,
                type
            });
            await newEntry.save();
            res.json({ newEntry });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
        }
    },

    getListarporHolder: async (req, res) => {
        try {
            const { holder } = req.params;
            const entries = await Entry.find({ holder });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
        }
    },
    getListarporDia: async (req, res) => {
        try {
            const { entrytime } = req.params;
            const entries = await Entry.find({ entrytime });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
        }
    },
    getlistarEntrys: async (req, res) => {
        try {
            const entries = await Entry.find();
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
        }
    },

    getListarentryEntreFechas: async (req, res) => {
        try {
            const { entrytime, checkout } = req.params;
            const entries = await Entry.find({ entrytime, checkout });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
        }
    },

    putRegistrarEntradaOutput: async (req, res) => {
        try {
            const { id } = req.params;
            const { checkout, type } = req.body;
            const entryModificado = await Entry.findByIdAndUpdate(id, { checkout, type });
            res.json({ entryModificado });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
        }
    },


    }

module.exports = httpEntry