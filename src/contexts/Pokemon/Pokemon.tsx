import { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from "react"
import { TPokemon, TStoredPokemons } from "../../types/pokemon";

type TPokemonProvider = {
    homePokemons: TPokemon[], 
    getHomePokemons: () => void;
}
export const PokemonContext = createContext<TPokemonProvider>();

export const PokemonApiProvider =  ({children}: {children: ReactNode | ReactElement}) => {
    const [homePokemons, setHomePokemons] = useState<TPokemon[]>([])
    const [pokeApiHomeUrl, setPokeApiHomeUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0")
    const POKE_API_BASE_URL = "https://pokeapi.co/api/v2"
    const allPokemonsUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"

    useEffect(() => {
        getHomePokemons();
    }, [])

    async function filterPokemonsByName(value: string) {
        console.log(value.length)
        if(value.length === 0 )  {
            if(pokemonMainDiv) pokemonMainDiv.textContent = ""
            runPokemonApp(pokeApiUrl)
        }
        if(value.length <= 3) return

        let pokemonResults =  await fetchData(allPokemonsUrl)
        let pokemonFiltered = [];

        pokemonFiltered = pokemonResults.results.filter((pokemon: TPokemon) => {
            return pokemon.name.includes(value.toLowerCase())
        })

        let allFilteredPokemons = await Promise.all(returnAllPokemonsPromise(pokemonFiltered))
        
        if(pokemonMainDiv) {
            pokemonMainDiv.textContent = "";
        }
        pokemonMainDiv && showPokemonsCards(pokemonMainDiv,allFilteredPokemons)
    }

    function returnAllPokemonsPromise(pokemons: TPokemon[]) {
        return pokemons.map(pokemon => fetchData(pokemon.url))
    }

    async function getHomePokemons() {
        let pokemonResults =  await fetchData(pokeApiHomeUrl)
        let allPokemons = await Promise.all(returnAllPokemonsPromise(pokemonResults.results))
        setPokeApiHomeUrl(pokemonResults.next)
        setHomePokemons((prev) => [...prev,...allPokemons])
    }

    async function returnPokemonList() {
        const pokemons:TStoredPokemons[] = await fetchData("http://localhost:3000/pokemons");
        const pokemonPromises = fetchPokemonsById(pokemons)

        return await Promise.all(pokemonPromises)
    }

    /*async function init() {
        getHomePokemons(pokeApiUrl)
        loadMorePokemonsBtn && loadMorePokemonsBtn.addEventListener("click", () => runPokemonApp(nextUrl))
        filterPokemonsInput && filterPokemonsInput.addEventListener("keyup", (e) => {
            const target = e.target as HTMLInputElement; 
            const value = target.value;
            value && filterPokemonsByName(value)
        })
        const storedPokemons = await returnPokemonList() 
        storedPokemons.forEach((pokemon:TPokemon) => {
            createPokemonListElement(pokemon)
        })

        updatePokemonList(createPokemonListElement)
    }
    */

    
    async function fetchData(url:string) {
        let req = await fetch(url)
        let res = await req.json();
        return res
    }
    
    async function storePokemon(id: number) {
        try {
          const response = await fetch('http://localhost:3000/store-pokemon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
          });
          if (!response.ok) throw new Error('Failed to store Pokemon');
          const data = await response.json();
          console.log(data.message);
          if(data.alreadyHavePokemon) return
          
        } catch (error: any) {
          console.error('Error storing Pokemon:', error.message);
        }
    }
    
    function fetchPokemonsById(pokemons: {id: number, pokemonId: number}[]) {
      return pokemons.map(async ({pokemonId}) => {
          const req = await fetch(`${POKE_API_BASE_URL}/pokemon/${pokemonId}`);
          const res = await req.json();
          return res
      })
    }
    
    function updatePokemonList(callback: (pokemons: TPokemon) => void) {
      const ws = new WebSocket('ws://localhost:3000'); 
      console.log(ws)
      ws.onopen = (event) => {
        console.log("front end connection started")
      }
      
      ws.onmessage = async (event) => {
        const pokemonUpdated = JSON.parse(event.data)
        console.log({"updatedPokemon": pokemonUpdated})
        const pokemons = await Promise.all(fetchPokemonsById(pokemonUpdated))
        console.log(event)
        pokemons.forEach((pokemon: TPokemon) => {
          callback(pokemon)
        })
      }
    }
    
    const contextValue: TPokemonProvider = {
        homePokemons,
        getHomePokemons
    }
    return (
        <PokemonContext.Provider value={contextValue}>
          {children}
        </PokemonContext.Provider>
      );
}