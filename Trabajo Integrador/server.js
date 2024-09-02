const express = require('express');
const app = express();
const port = 3000;

// Configurar Express para servir archivos estáticos desde las carpetas correspondientes
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));

// Rutas para cada archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/premier-league', (req, res) => {
  res.sendFile(__dirname + '/public/premier-league.html');
});

app.get('/serie-a', (req, res) => {
  res.sendFile(__dirname + '/public/serie-a.html');
});

app.get('/bundesliga', (req, res) => {
  res.sendFile(__dirname + '/public/bundesliga.html');
});

app.get('/la-liga', (req, res) => {
  res.sendFile(__dirname + '/public/la-liga.html');
});

app.get('/uefa', (req, res) => {
  res.sendFile(__dirname + '/public/uefa.html');
});

app.get('/conmebol', (req, res) => {
  res.sendFile(__dirname + '/public/conmebol.html');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
