import { TPokemon } from '../../../types/pokemon'
import { PokemonTypesList } from '../PokemonTypesList'
import {
  Content,
  RadiusImage,
  StyledPokemonCard,
  Top,
} from './StyledPokemonCard'

type TPokemonCard = {
  pokemon: TPokemon
  handlePokemonModal: (pokemon: TPokemon | null) => void
}
export const PokemonCard = function ({
  pokemon,
  handlePokemonModal,
}: TPokemonCard) {
  const handleModal = () => handlePokemonModal(pokemon)
  const { id, name, types, sprites } = pokemon

  const image = sprites.other.home.front_default
    ? sprites.other.home.front_default
    : sprites.versions['generation-vi']['x-y'].front_default

  return (
    <StyledPokemonCard onClick={handleModal}>
      <Top>
        <span>#{id}</span>
        <PokemonTypesList types={types} />
      </Top>
      <RadiusImage type={types[0].type.name}>
        <img src={image} />
      </RadiusImage>
      <Content>
        <h4>
          {name.substring(0, 1).toUpperCase() +
            name.substring(1).replace('-', ' ')}
        </h4>
      </Content>
    </StyledPokemonCard>
  )
}
