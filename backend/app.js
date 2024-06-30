const cors = require('cors'); // Importa el paquete cors
const express = require('express');
const app = express();
const port = 3000;
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

let criptomonedas = [
    {id: 1,nombre: 'Bitcoin',simbolo: 'BTC',fechaCreacion: '03-01-2009',precioActual: 8200,consenso: 'proof of work',cantCirculacion: 18000,algoritmo: 'sha-256',web: 'bitcoin.org'},
    {id: 2,nombre: 'Ethereum',simbolo: 'ETH',fechaCreacion: '30-07-2015',precioActual: 3000,consenso: 'proof of stake',cantCirculacion: 11700,algoritmo: 'ethash',web: 'ethereum.org'},
    {id: 3,nombre: 'Binance Coin',simbolo: 'BNB',fechaCreacion: '14-07-2017',precioActual: 450,consenso: 'proof of stake',cantCirculacion: 200,algoritmo: 'scrypt',web: 'binance.com'},
    {id: 4,nombre: 'Cardano',simbolo: 'ADA',fechaCreacion: '29-09-2017',precioActual: 1800,consenso: 'proof of stake',cantCirculacion: 3200 ,algoritmo: 'x11',web: 'cardano.org'},
    {id: 5,nombre: 'Solana',simbolo: 'SOL',fechaCreacion: '01-04-2020',precioActual: 420,consenso: 'proof of work',cantCirculacion: 32200,algoritmo: 'x11',web: 'solana.com'}
];

function obtenerNuevoID(criptomonedas) {
    if (criptomonedas.length === 0) {
      return 0;
    } else {
      var maxId = Math.max(...criptomonedas.map(crypto => crypto.id));
      return maxId + 1;
    }
}

// Middleware para simular una demora de 3 segundos
const simulateDelay = (req, res, next) => {
    setTimeout(next, 1000);
};

/**
 * Obtiene todas las crypto
 */
app.get('/crypto', simulateDelay, (req, res) => {
    if (criptomonedas.length === 0) {
        res.json([]);
    } else {
        res.json(criptomonedas);
    }
});

/**
 * Crea una nueva crypto
 */
app.post('/crypto', simulateDelay, (req, res) => {
    const nuevaCrypto = req.body;
    nuevaCrypto.id = obtenerNuevoID(criptomonedas);
    console.log(criptomonedas);
    criptomonedas.push(nuevaCrypto);
    res.status(200).json(nuevaCrypto);
});

/**
 * Obtiene crypto por ID
 */
app.get('/crypto/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const crypto = criptomonedas.find(p => p.id === id);
    if (crypto) {
        res.json(crypto);
    } else {
        res.status(404).send('crypto no encontrada');
    }
});

/**
 * Edita crypto por ID
 */
app.put('/crypto/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = criptomonedas.findIndex(crypto => crypto.id === id);
    if (index !== -1) {
        const newObj = {
            id: id,
            ...req.body,
            fechaCreacion: criptomonedas[index].fechaCreacion
        };
        criptomonedas[index] = newObj;
        res.json(newObj);
    } else {
        res.status(404).send('crypto no encontrada');
    }
});

/**
 * Elimina crypto por ID
 */
app.delete('/crypto/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = criptomonedas.findIndex(crypto => crypto.id === id);
    if (index !== -1) {
        criptomonedas.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send('crypto no encontrada');
    }
});

/**
 * Elimina todas las crypto
 */
app.delete('/crypto', simulateDelay, (req, res) => {
    criptomonedas = [];
    res.status(200).send('Todas las crypto han sido eliminadas');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});