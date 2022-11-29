import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonByName } from "../utils/consts";
import back from "../assets/back.png";

// detail page, based on pokemon name params
export default function Detail() {
  // params from url
  const { name } = useParams();
  // object to hold pokemon detail
  const [pokeDetail, setPokeDetail] = useState(null);

  // get detail pokemon based on pokemon name
  useEffect(() => {
    getPokemonByName(name)
      .then((result) => {
        setPokeDetail(result);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [name]);

  if (!pokeDetail) return null;

  return (
    <div>
      <div className="header">
        <Link className="d-flex" to="..">
          <img src={back} className="icons" alt="back" />
        </Link>
        <p className="title">Pokémon Detail</p>
      </div>
      <div className="d-flex pt-58">
        <div className="card-container">
          <p className="poke-order">No. {pokeDetail?.order}</p>
          <img
            src={pokeDetail?.sprites?.front_default}
            alt={pokeDetail?.name}
            loading="lazy"
          />
          <p className="poke-name">{pokeDetail?.name}</p>
          <div className="poke-type">
            {pokeDetail?.types?.map((type, i) => (
              <div className={type.type.name} key={i}>
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="stat-container">
          <p className="poke-order">Stats</p>
          <div className="poke-stat">
            {pokeDetail?.stats?.map((stats, i) => (
              <div className="poke-desc row" key={`stat${i}`}>
                <p>{stats.stat.name}</p>
                <p>{stats.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
