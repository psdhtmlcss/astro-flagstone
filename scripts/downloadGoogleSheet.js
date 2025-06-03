require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const csv = require('csvtojson');
const redirectCodes = [300, 301, 302, 303, 304, 305, 306, 307, 308];
const outputPath = path.join(__dirname, 'output.json');

const writeData = (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data += chunk;
    });
    response.on('end', () => {
        convertToJSON(data);
    });
    return data;
};

const convertToJSON = (data) => {
    csv().fromString(data).then((json) => {
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
        console.log('Данные успешно сохранены в output.json');
        process.exit(0);
    }).catch(error => {
        console.error('Ошибка при конвертации данных:', error);
        process.exit(1);
    });
};

function getPrices() {
    const tableId = process.env.SHEET_ID;
    const sheetId = process.env.VL_GID;

    if (!tableId || !sheetId) {
        console.error('Ошибка: не указаны SHEET_ID или VL_GID в .env файле');
        process.exit(1);
    }

    // Создаем правильный URL для экспорта
    const url = `https://docs.google.com/spreadsheets/d/${tableId}/export?format=csv&gid=${sheetId}`;
    
    https.get(url, (response) => {
        if (redirectCodes.includes(response.statusCode)) {
            const redirectUrl = response.headers.location;
            https.get(redirectUrl, (response) => {
                writeData(response);
            });
            return;
        }
        writeData(response);
    }).on('error', (err) => {
        console.error('Ошибка:', err);
        process.exit(1);
    });
}

getPrices();