const axios = require('axios');
const cron = require('node-cron');

const { DailyWatch, ProcessNumber, User, Lawyer, Notification } = require('../models');


const URL = 'http://localhost:3033'

async function scrapeAndSaveApiResponses(req, res) {
    try {
        const processes = await ProcessNumber.findAll();

        for (const process of processes) {
            const processNumber = process.processNumber;


            try {
                const response = await axios.get(`${URL}/process/v1/main/${processNumber}`);

                if (response.status === 404) {
                    console.log(`Processo não encontrado para o número: ${processNumber}`);
                    continue;
                }

                const apiResponses = response.data;

                let dailyWatchEntry = await DailyWatch.findOne({
                    where: {
                        processNumber,
                    },
                });

                if (!dailyWatchEntry) {
                    dailyWatchEntry = await DailyWatch.create({
                        processNumber,
                        response: apiResponses,
                    });
                    console.log(`ApiResponse(s) salvo(s) para o processo: ${processNumber}`);


                } else {
                    const existingContent = dailyWatchEntry.content || [];
                    for (const apiResponse of apiResponses) {
                        const contentExists = existingContent.some(existing => existing.keyword === apiResponse.keyword);
                        if (!contentExists) {
                            existingContent.push(apiResponse);
                        }
                    }
                    dailyWatchEntry.content = existingContent;
                    console.log(`ApiResponse(s) atualizado(s) para o processo: ${processNumber}`);
                    await dailyWatchEntry.save();
                }





                const lawyerId = process.lawyerId

                const title = 'Movimentação';
                const message = ` houve movimentação no monitorado por: ${JSON.stringify(processNumber)}`;
                const notification = await Notification.create({
                    title: title,
                    message: message,
                    isRead: 0,
                });

                console.log('Notification criada:', notification)

                const user = await User.findOne({
                    include: [
                        {
                            model: Lawyer,
                            as: 'lawyer',
                            where: { id: lawyerId },
                        },
                    ],
                });

                await user.addNotification(notification);
                console.log('Notification associada ao usuário', user.id);

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log(`Processo não encontrado para o número: ${processNumber}`);
                    continue;
                } else {
                    throw error;
                }
            }
        }

        console.log('Operação concluída com sucesso.');
        return res.status(201).json('ApiResponse(s) salvo(s) com sucesso.');
    } catch (error) {
        console.error('Erro ao realizar scraping e salvar as respostas:', error);
        res.status(500).json({ message: 'Ocorreu um erro interno.' });
        throw error;
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

cron.schedule('0 */4 * * *', async () => {
    await scrapeAndSaveApiResponses();
});

module.exports = {
    scrapeAndSaveApiResponses,
    getAllApiResponses
};
