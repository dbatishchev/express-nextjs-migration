import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import fetch from 'node-fetch';
import { Pokemon } from './types/pokemon';
import { matchPath } from 'react-router-dom';

const app = express();
const port = 3000;

app.use(express.static('public'));

async function fetchPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await response.json();
  return data.results;
}

async function fetchPokemonDetails(id: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await response.json();
}

app.get('*', async (req, res) => {
  let initialData = {};

  const listMatch = matchPath('/list', req.path);
  const detailsMatch = matchPath('/pokemon/:id', req.path);

  if (listMatch) {
    initialData = { pokemons: await fetchPokemonList() };
  } else if (detailsMatch) {
    const { id } = detailsMatch.params;
    if (!id) {
      return res.status(404).send('Not found');
    }
    initialData = { pokemon: await fetchPokemonDetails(id) };
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