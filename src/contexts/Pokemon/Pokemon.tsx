import { 
  Dispatch, 
  ReactElement, 
  ReactNode, 
  SetStateAction, 
  createContext, 
  useEffect, 
  useState 
} from "react"
import { TPokemon, TStoredPokemons } from "../../types/pokemon";

type TPokemonProvider = {
    homePokemons: TPokemon[], 
    getHomePokemons: (apiUrl: string) => void,
    setSearchedString: Dispatch<SetStateAction<string>>
}
export const PokemonContext = createContext<TPokemonProvider>();

export const PokemonApiProvider =  ({children}: {children: ReactNode | ReactElement}) => {
    const [homePokemons, setHomePokemons] = useState<TPokemon[]>([])
    const [pokeApiHomeUrl, setPokeApiHomeUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0")
    const [searchedString, setSearchedString] = useState<string>("")

    const initialApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0"
    const POKE_API_BASE_URL = "https://pokeapi.co/api/v2"
    const allPokemonsUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"

    useEffect(() => {
        getHomePokemons(pokeApiHomeUrl);
    }, [])

    useEffect(() => {
      filterPokemonsByName(searchedString)
      console.log("useEffect")
    }, [searchedString])

    async function filterPokemonsByName(value: string) {
        if(value.length <= 3) return

        let pokemonResults =  await fetchData(allPokemonsUrl)
        let pokemonFiltered = [];

        pokemonFiltered = pokemonResults.results.filter((pokemon: TPokemon) => {
            return pokemon.name.includes(value.toLowerCase())
        })

        let allFilteredPokemons = await Promise.all(returnAllPokemonsPromise(pokemonFiltered))
        setHomePokemons(allFilteredPokemons)
    }

    function returnAllPokemonsPromise(pokemons: TPokemon[]) {
        return pokemons.map(pokemon => fetchData(pokemon.url))
    }

    async function getHomePokemons(apiUrl: string) {
        let pokemonResults =  await fetchData(apiUrl)
        let allPokemons = await Promise.all(returnAllPokemonsPromise(pokemonResults.results))
        setPokeApiHomeUrl(pokemonResults.next)
        setHomePokemons((prev) => [...prev,...allPokemons])
    }

    async function returnPokemonList() {
        const pokemons:TStoredPokemons[] = await fetchData("http://localhost:3000/pokemons");
        const pokemonPromises = fetchPokemonsById(pokemons)

        return await Promise.all(pokemonPromises)
    }

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
        getHomePokemons,
        setSearchedString
    }
    return (
        <PokemonContext.Provider value={contextValue}>
          {children}
        </PokemonContext.Provider>
      );
}