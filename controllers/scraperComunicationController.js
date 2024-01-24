
const axios = require('axios');

const URL = 'http://localhost:3033'


async function scraper(req, res) {
    const keyword = req.params.keyword;
    console.log("keyword: " + keyword)
    try {
        const response = await axios.get(`${URL}/process/v1/main/${keyword}`);

        const dadosFormatados = response.data;

        res.json(dadosFormatados);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados do scraper');
    }
}

module.exports = {
    scraper,
};
