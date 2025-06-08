const fs = require('fs');
const path = require('path');

// Преобразование kebab-case в camelCase
function kebabToCamel(str) {
  return str.replace(/-([a-zA-Z])/g, (_, letter) => letter.toUpperCase());
}

// Функция для изменения имени файла с .twig на .astro и с заглавной первой буквой
function renameTwigFile(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);

  if (ext === '.twig') {
    // Первая буква имени файла заглавная
    const newBaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    const newFilePath = path.join(dir, newBaseName + '.astro');

    fs.renameSync(filePath, newFilePath);
    console.log(`Файл .twig переименован: ${filePath} → ${newFilePath}`);
    return newFilePath;
  }
  return filePath;
}

// Рекурсивная функция обхода и переименования
function walkAndRename(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const oldPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Переименование папки, если нужно
      if (/-[a-zA-Z]/.test(entry.name)) {
        const newName = kebabToCamel(entry.name);
        const newPath = path.join(dir, newName);
        fs.renameSync(oldPath, newPath);
        console.log(`Папка переименована: ${oldPath} → ${newPath}`);
        walkAndRename(newPath);
      } else {
        walkAndRename(oldPath);
      }
    } else if (entry.isFile()) {
      // Переименование файла с kebab-case в camelCase
      let currentPath = oldPath;
      if (/-[a-zA-Z]/.test(entry.name)) {
        const newName = kebabToCamel(entry.name);
        const newPath = path.join(dir, newName);
        fs.renameSync(oldPath, newPath);
        console.log(`Файл переименован: ${oldPath} → ${newPath}`);
        currentPath = newPath;
      }
      // Если расширение .twig, меняем имя и расширение
      renameTwigFile(currentPath);
    }
  });
}

// Запуск на вашей папке
walkAndRename('./src/components/');
