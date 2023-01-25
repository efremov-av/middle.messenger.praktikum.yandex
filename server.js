const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/static`));

app.get('*', (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, function () {
  console.log(`Сервер раздачи статики запущен. Порт: ${PORT}`);
});
