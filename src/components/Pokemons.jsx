import React, { useState } from 'react'
import "./Pokemons.css";
import axios from 'axios';
const Pokemons = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState({
        name: "",
        number: "",
        species: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        type: "",
    });
    const searchPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
            (res) => {
                setPokemon({
                    name: pokemonName,
                    number: res.data.id,
                    species: res.data.species.name,
                    image: res.data.sprites.front_default,
                    hp: res.data.stats[0].base_stat,
                    attack: res.data.stats[1].base_stat,
                    defense: res.data.stats[2].base_stat,
                    speed: res.data.stats[5].base_stat,
                    type: res.data.types[0].type.name,
                });
                setPokemonChosen(true);
            }
        )
    };
    return (
        <div >
            <div className="head">
                <h1>Pokédex</h1>
                <input type="text"
                    onChange={(event) => {
                        setPokemonName(event.target.value.toLowerCase());
                    }}
                />
                <div>
                    {pokemonName && <button onClick={searchPokemon}>Search Pokémon</button>}
                </div>
            </div>

            
            <div className="container">
                {!pokemonChosen ? (
                    <h1 className="busca"> Busca tu Pokemon </h1>
                ) : (
                    <div className="pokemon">
                        <div className="title">
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.image} alt={pokemon.name} />
                        </div>
                        <div className="stats">
                            <p>Number: <span>#{pokemon.number}</span></p>
                            <p>Species: <span>{pokemon.species}</span></p>
                            <p>Type: <span>{pokemon.type}</span></p>
                            <p>Hp: <span>{pokemon.hp}</span></p>
                            <p>Attack: <span>{pokemon.attack}</span></p>
                            <p>Defense: <span>{pokemon.defense}</span></p>
                            <p>Speed: <span>{pokemon.speed}</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pokemons
