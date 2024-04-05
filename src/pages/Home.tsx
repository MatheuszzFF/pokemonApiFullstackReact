import { useContext, useState } from 'react'
import { Button, Container, PokemonCard } from '../components'
import { PokemonContext } from '../contexts/Pokemon/Pokemon'
import { PokemonGrid, HomePage } from './Styled'
import { TPokemon } from '../types/pokemon'
import { PokemonModal } from '../components/Pokemon'

export const Home = function ({ headerheight }: { headerheight: number }) {
  const pokemonApiContext = useContext(PokemonContext)
  const { homePokemons, pokeApiHomeUrl, getHomePokemons } = pokemonApiContext
  const [modalPokemon, setModalPokemon] = useState<TPokemon | null>(null)

  const handlePokemonModal = (pokemon: TPokemon | null) =>
    setModalPokemon(pokemon)

  const handleClick = () => {
    getHomePokemons(pokeApiHomeUrl)
  }
  return (
    <HomePage headerheight={headerheight}>
      <Container>
        <PokemonGrid>
          {homePokemons &&
            homePokemons.map((pokemon) => {
              return (
                <PokemonCard
                  key={`card-${pokemon.id}`}
                  pokemon={pokemon}
                  handlePokemonModal={handlePokemonModal}
                />
              )
            })}
        </PokemonGrid>

        <Button onClick={handleClick} theme="primary" center={true}>
          Carregar Mais Pokemons!
        </Button>
      </Container>
      {modalPokemon && (
        <PokemonModal pokemon={modalPokemon} toggleModal={handlePokemonModal} />
      )}
    </HomePage>
  )
}
