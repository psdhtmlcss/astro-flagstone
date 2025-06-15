const ftp = require("basic-ftp");
const sharp = require("sharp");
require('dotenv').config();

async function getImagesInfoFromFTP(host, user, password, rootDir = "/") {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    const imagesInfo = [];

    try {
        await client.access({
            host,
            user,
            password,
            secure: false,
        });

        async function walkDir(dir) {
            // Получаем список файлов и папок в текущей директории
            const list = await client.list(dir);

            for (const item of list) {
                const fullPath = dir.endsWith("/") ? dir + item.name : dir + "/" + item.name;

                if (item.isDirectory) {
                    // Рекурсивно заходим в папку
                    await walkDir(fullPath);
                } else {
                    // Проверяем, является ли файл изображением по расширению
                    if (/\.(jpe?g|png|gif|bmp|webp|tiff)$/i.test(item.name)) {
                        imagesInfo.push({
							path: fullPath,
						});
                    }
                }
            }
        }

        await walkDir(rootDir);

        return imagesInfo;

    } catch (err) {
        console.error("Ошибка FTP:", err);
        return [];
    } finally {
        client.close();
    }
}

// Пример использования
(async () => {
    const host = "u541860.ftp.masterhost.ru";
    const user = "u541860_cdn";
    const password = process.env.CDN;
    const rootDir = "www/trotuarnaja-plitka"; // корневая папка для обхода

    const images = await getImagesInfoFromFTP(host, user, password, rootDir);
    console.log(JSON.stringify(images, null, 2));
})();
