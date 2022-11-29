import { useEffect, useState } from "react";
import { getPokemonByName } from "../utils/consts";

// comparation component, consist of selected to be compared pokemon
export default function Compare({ pokemons, isComparing }) {
  // list of all details selected pokemon
  const [pokeDetails, setPokeDetails] = useState([]);

  // handler for fetch all detail of selected pokemon
  useEffect(() => {
    const needPromised = [];
    if (pokemons?.length && isComparing) {
      for (let i = 0; i < pokemons.length; i++) {
        needPromised.push(getPokemonByName(pokemons[i].name));
      }
      fetchAll(needPromised);
    }
  }, [pokemons, isComparing]);

  const fetchAll = async (needPromised = []) => {
    await Promise.all(needPromised)
      .then((x) => {
        setPokeDetails(x);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  if (!pokemons?.length) return;

  return (
    <div className="d-flex compare-container">
      {pokeDetails?.map((poke) => (
        <div
          className="poke-container"
          style={{ width: `calc(100% / ${pokemons?.length})` }}
        >
          <img
            src={poke?.sprites?.front_default}
            alt={poke?.name}
            loading="lazy"
          />
          <p className="poke-name text-center calculate-on-small">
            {poke?.name}
          </p>
          {poke?.stats?.map((stats, i) => (
            <div className="poke-desc row calculate-on-small" key={`stat${i}`}>
              <p>{stats.stat.name}</p>
              <p>{stats.base_stat}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
