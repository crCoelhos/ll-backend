const axios = require('axios');

const { DailyWatch, ProcessNumber } = require('../models');


const URL = 'http://localhost:3033'

async function scrapeAndSaveApiResponses() {
    try {
        const processNumbers = await ProcessNumber.findAll();

        for (const processNumberInstance of processNumbers) {
            const processNumber = processNumberInstance.processNumber;

            const response = await axios.get(`${URL}/process/v1/main/${processNumber}`);


            const content = response.data[0].page.content;

            await DailyWatch.create({
                processNumber,
                content,
            });

            console.log(`ApiResponse salvo para o processo: ${processNumber}`);
        }

        console.log('Operação concluída com sucesso.');
    } catch (error) {
        console.error('Erro ao realizar scraping e salvar as respostas:', error);
    }
}

async function getAllApiResponses(req, res) {
    try {
        const apiResponses = await DailyWatch.findAll();

        return res.status(200).json(apiResponses);
    } catch (err) {
        console.error('Erro no getAllApiREsponses:', err);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
        throw err;
    }
}

module.exports = {
    scrapeAndSaveApiResponses,
    getAllApiResponses
};
