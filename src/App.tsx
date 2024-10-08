import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './components/Main';
import About from './components/About';
import List from './components/List';
import PokemonDetails from './components/PokemonDetails';
import { Pokemon } from './types/pokemon';

interface AppProps {
  initialData: {
    pokemons?: Pokemon[];
    pokemon?: Pokemon;
  };
}

const App: React.FC<AppProps> = ({ initialData }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/list">Pokémon List</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/list" element={<List pokemons={initialData.pokemons} />} />
        <Route path="/pokemon/:id" element={<PokemonDetails pokemon={initialData.pokemon} />} />
      </Routes>
    </div>
  );
};

export default App;