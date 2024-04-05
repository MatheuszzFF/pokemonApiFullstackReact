import { PokemonTypesList } from '..'
import { TPokemon } from '../../../types/pokemon'
import { Button } from '../../UI'
import { Content, Modal, Top } from './PokemonModal.styles'

type TPokemonModal = {
  pokemon: TPokemon
  toggleModal: (pokemon: TPokemon | null) => void
}
export const PokemonModal = function ({ pokemon, toggleModal }: TPokemonModal) {
  const handleClick = () => toggleModal(null)
  const { id, name, types } = pokemon

  return (
    <Modal>
      <Content>
        <Button onClick={handleClick} theme="primary" center={false}>
          Fechar Popup!
        </Button>
        <Top>
          #{id} {name}
          <PokemonTypesList types={types} />
        </Top>
      </Content>
    </Modal>
  )
}
