import { PokemonTypesList } from "..";
import { TPokemon } from "../../../types/pokemon";
import { Content, RadiusImage, StyledPokemonCard, Top } from "./StyledPokemonCard";

export const PokemonCard = function ({pokemon}:{pokemon: TPokemon}) {
    const {
        id,
        name,
        types,
        sprites
    } = pokemon

    let image = sprites.other.home.front_default ? 
    sprites.other.home.front_default 
    : sprites.versions['generation-vi']['x-y'].front_default;

    return (
        <StyledPokemonCard>
            <Top>
                <span>#{id}</span>
               <PokemonTypesList types={types}/>
            </Top>
            <RadiusImage type={types[0].type.name}>
                <img src={image}/>
                <img className="shadow" src={image}/>
            </RadiusImage>
            <Content>
                <h4>{name.substring(0,1).toUpperCase() + name.substring(1).replace("-", " ")}</h4>
            </Content>
        </StyledPokemonCard>
    )
}