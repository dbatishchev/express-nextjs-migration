import React, { useEffect, useState } from 'react';
import { Pokemon } from '../types/pokemon';
import Link from 'next/link';

interface ListProps {
  pokemons?: Pokemon[];
}

const List: React.FC<ListProps> = ({ pokemons: initialPokemons }) => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(initialPokemons || null);
  useEffect(() => {
    if (!pokemons) {
      fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(data => setPokemons(data.results))
        .catch(error => console.error('Error fetching pokemons:', error));
    }
  }, []);

  if (!pokemons) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
      {pokemons.map((pokemon, index) => (
        <li key={index}>
          <h2>
            <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </h2>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default List;