const fs = require('fs');
const path = './src/components/styles.scss';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;

  const regex = /[a-z]+-[a-z]+/g;

  function kebabToCamel(match) {
    return match.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  const result = data.replace(regex, kebabToCamel);

  fs.writeFile(path, result, 'utf8', (err) => {
    if (err) throw err;
    console.log('Файл успешно обновлён');
  });
});
