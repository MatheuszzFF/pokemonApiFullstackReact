import { useContext } from "react"
import { Container, PokemonCard } from "../components"
import { PokemonContext } from "../contexts/Pokemon/Pokemon"
import { PokemonGrid, HomePage } from "./Styled"

export const Home = function({headerheight} : {headerheight: number}) {
    const pokemonApiContext = useContext(PokemonContext)
    const { homePokemons } = pokemonApiContext
    return (
        <HomePage headerheight={headerheight}>
            <Container>
                <PokemonGrid>
                    {homePokemons && (
                        homePokemons.map(pokemon => {
                            return <PokemonCard key={`card-${pokemon.id}`} pokemon={pokemon}/>
                        })
                    )}
                </PokemonGrid>
            </Container>
        </HomePage>
    )
}