// utilities

// base API
export const API_POKEMON_OFFICIAL = "https://pokeapi.co/api/v2";

// get list pokemon
export function getListPokemon(limit = 20, offset = 0) {
  return fetch(
    `${API_POKEMON_OFFICIAL}/pokemon/?limit=${limit}&offset=${offset}`
  ).then((response) => response.json());
}

// get detail pokemon by name
export function getPokemonByName(name = "") {
  return fetch(API_POKEMON_OFFICIAL + "/pokemon/" + name).then((response) =>
    response.json()
  );
}

// styles for modal
export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "411px",
    width: "90%",
  },
};
