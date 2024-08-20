import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';

interface PokemonDetailsProps {
  pokemon?: Pokemon;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon: initialPokemon }) => {
  const params = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(initialPokemon || null);

  useEffect(() => {
    if (!pokemon && params.id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        .then(response => response.json())
        .then(data => setPokemon(data))
        .catch(error => console.error('Error fetching pokemon details:', error));
    }
  }, [params.id, pokemon]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <h2>Abilities:</h2>
      <ul>
        {pokemon.abilities?.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;