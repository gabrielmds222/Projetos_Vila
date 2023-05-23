// import axios from 'axios';

// export default async function handler(req, res) {
//   const { name } = req.query;

//   try {
//     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
//     const pokemonData = response.data;
//     res.status(200).json(pokemonData);
//   } catch (error) {
//     res.status(404).json({ message: 'Pokémon não encontrado.' });
//   }
