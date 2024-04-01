import { LegacyRef,  useContext,  useState } from "react"
import { Button, Container, RightMenu } from "../.."
import { StyledHeader } from "./StyledHeader"
import { PokemonContext } from "../../../contexts/Pokemon/Pokemon"

type THeader = {
    refHook: LegacyRef<HTMLElement> | undefined,
    headerheight: number,
}

export const Header = ({refHook, headerheight}: THeader) => {
    const pokeApiContext = useContext(PokemonContext);
    const {setSearchedString} = pokeApiContext
    const [open, setOpen] = useState<boolean>(false)
    const handleClick = () => {
        setOpen(!open)
    }
    const handleKeyUp = (value: string) => {
        console.log(value)
        setSearchedString(value)
    }
    
    return(
        <StyledHeader ref={refHook}>
            <Container>
                <input type="text" onKeyUp={(e) => handleKeyUp(e.target.value)} />
                <Button theme="primary" onClick={handleClick}>
                    Abrir lista de pokemons!
                </Button>
                <RightMenu open={open} headerheight={headerheight}>
                    Foi!
                </RightMenu>
            </Container>
      </StyledHeader>
    )
}