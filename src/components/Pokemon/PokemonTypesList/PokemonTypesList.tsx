import { PokemonTypeIcon } from "..";
import { TType } from "../../../types/pokemon";
import { TypeList } from "./StyledTypeList";


export const PokemonTypesList = ({types}:{types: TType[]}) => {
    return (
        <TypeList>
            {types.map((type, index) => <PokemonTypeIcon type={type} key={`typeIcon-${type.type.name + index}`}/>)}
        </TypeList>
    )
}