import { TType } from "../../../types/pokemon";
import { StyledType } from "./StyledType";

export const PokemonTypeIcon =  ({type}: {type: TType}) => {
    const typeName = type.type.name;
    let nameFirstLetter = typeName.substring(0,1).toUpperCase();
    const formmatedName = nameFirstLetter + typeName.substring(1)
        
    return (
        <StyledType key={`id-${type.type.name}`} type={type.type.name}>
            <img src={`/assets/img/pokemon/types/icons/${typeName}.svg`}/>
            <span className="tooltip">{formmatedName}</span>
        </StyledType>
    )
}