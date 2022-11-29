import { useEffect, useState } from "react";
import Card from "../components/card";
import Compare from "../components/compare";
import { customStyles, getListPokemon } from "../utils/consts";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import filter from "../assets/filter.png";

// Main pages, consist of list of pokemon
export default function Home() {
  // pagination state
  const [paginate, setPaginate] = useState({
    limit: 50,
    offset: 0,
    fetchMore: true,
  });
  // fetching flag
  const [fetching, setFetching] = useState(true);
  // pokemon list
  const [pokemonList, setPokemonList] = useState([]);
  
  // compare related state
  // mode selection, compare or redirect to pdp
  const [isCompareMode, setIsCompareMode] = useState(false);
  // list of selected pokemon to be compared
  const [selected, setSelected] = useState([]);
  // comparing Flag
  const [isComparing, setIsComparing] = useState(false);
  // modal to display pokemon comparation
  const [modalIsOpen, setIsOpen] = useState(false);

  // infinite scroll handler, use threshold 30px
  window.onscroll = () => {
    if (
      window.innerHeight +
        document.documentElement.scrollTop -
        document.documentElement.offsetHeight >
      -30
    ) {
      if (paginate.fetchMore) setFetching(true);
    }
  };

  // get pokemon list function
  useEffect(() => {
    if (fetching && paginate.fetchMore) {
      getListPokemon(paginate.limit, paginate.offset)
        .then((data) => {
          setFetching(false);
          setPokemonList(pokemonList.concat(data.results));
          setPaginate({
            limit: paginate.limit,
            offset: paginate.offset + data.results.length,
            fetchMore: data.next,
          });
        })
        .catch(() => {
          setFetching(false);
        });
    }
  }, [
    fetching,
    pokemonList,
    paginate.limit,
    paginate.offset,
    paginate.fetchMore,
  ]);

  // comparation flag handler
  useEffect(() => {
    setIsComparing(true);
  }, [modalIsOpen]);

  // pokemon selection handler
  const selectPokemon = (pokemon) => {
    setIsComparing(false);
    const pokemonIndex = selected.findIndex((x) => x.name === pokemon.name);
    // clear all pokemon selection
    if (pokemonIndex !== -1 && selected.length === 1) {
      setSelected([]);
    // when pokemon selected are new pokemon
    } else if (pokemonIndex !== -1) {
      const updated = [...selected];
      updated.splice(pokemonIndex, 1);
      setSelected(updated);
    // when pokemon selected are on the list, needed to be removed
    } else if (selected.length < 3) {
      setSelected([...selected, pokemon]);
    // when more than 3 pokemon selected
    } else {
      toast.info("Max Pokemon to be compared are 3");
    }
  };

  // modal handler
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="header">
        <p className="title">Pokédex</p>
        <div
          className={`compare ${isCompareMode ? "active" : ""}`}
          onClick={() => setIsCompareMode(!isCompareMode)}
        >
          Compare
        </div>
        <img
          src={filter}
          className="icons-lg active"
          alt="filter"
          onClick={() =>
            toast.info(
              "Currently Official Pokemon API V2 not provide filter API"
            )
          }
        />
      </div>
      <div className="poke-list-container">
        {pokemonList.map((pokemon, i) => (
          <Card
            pokemon={pokemon}
            key={i}
            order={i + 1}
            isCompareMode={isCompareMode}
            onSelected={selectPokemon}
          />
        ))}
      </div>

      {isCompareMode && (
        <div className="footer">
          <div className="poke-selected">
            {selected?.map((x, i) => (
              <div key={`s-${i}`} onClick={() => selectPokemon(x)}>
                {x.name}
              </div>
            ))}
          </div>
          <div
            className={`footer-btn ${
              selected?.length >= 2 ? "active" : "disable"
            }`}
            onClick={selected?.length >= 2 ? openModal : null}
          >
            Compare
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Compare pokemons={selected} isComparing={isComparing} />
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
