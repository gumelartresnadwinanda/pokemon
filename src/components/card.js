import { Link } from "react-router-dom";

// card component, use on compare mode or redirect to detail mode
export default function Card({ pokemon, isCompareMode, onSelected }) {
  // when no pokemon selected
  if (!pokemon) return;

  // handler for selection
  const clickHandler = () => {
    if (onSelected) onSelected(pokemon);
  };

  // when selecting compare mode
  if (isCompareMode)
    return (
      <div className="poke-list-card" onClick={clickHandler}>
        {pokemon.name}
      </div>
    );

  // when selecting normal mode, redirect to detail page
  return (
    <Link className="poke-list-card" to={pokemon?.name}>
      {pokemon.name}
    </Link>
  );
}
