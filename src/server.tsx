import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import fetch from 'node-fetch';
import { Pokemon } from './types/pokemon';
import { matchPath } from 'react-router-dom';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ 
  dev, 
  dir: '.', 
  conf: {

  }
});
const handle = nextApp.getRequestHandler();

const app = express();
const port = 3000;

app.use(express.static('public'));

async function fetchPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await response.json();
  return data.results;
}

nextApp.prepare().then(() => {

  // this is necessary to handle next.js files
  app.all('/_next/*', (req, res) => {
    return handle(req, res);
  });

  // this route is handled by next.js
  app.get('/pokemon/:id', (req, res) => {
    return handle(req, res);
  });

  // everything else is handled by express
  app.get('*', async (req, res) => {
    let initialData = {};

    const listMatch = matchPath('/list', req.path);

    if (listMatch) {
      initialData = { pokemons: await fetchPokemonList() };
    }

    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App initialData={initialData} />
      </StaticRouter>
    );

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR React App</title>
        </head>
        <body>
          <div id="root">${app}</div>
          <script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `;

    res.send(html);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});