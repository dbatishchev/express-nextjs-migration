import { GetServerSideProps } from 'next';
import { Pokemon } from '../../types/pokemon';
import PokemonDetails from '../../components/PokemonDetails';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: Pokemon = await res.json();

  return { props: { pokemon } };
};

export default PokemonDetails;