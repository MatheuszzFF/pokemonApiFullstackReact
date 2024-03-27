import styled from "styled-components";
type TStyledType = {
    type: string
}
export const StyledType = styled.li<TStyledType>`
    border-radius: 50%;
    padding: 11px 11px 6px 10px;
    transition: .3s;
    position: relative;
    cursor: help;

    img {
        width: 30px;
    }

    &, .tooltip {
        background-color: ${(props) => props.theme.pokemon.types[props.type].color};
    }
    .tooltip {
        position: absolute;
        top: -45px;
        left: 0;
        pointer-events: none;
        opacity: 0;
        padding: 10px;
        border-radius: 4px;
        color: white; 
        transition: .3s;
        font-weight: 500;
        font-size: 18px;
    }

    + .type-icon {
        margin-left: 10px;
    }

    &:hover {
        filter: saturate(200%);

        .tooltip {
            opacity: 1;
            pointer-events: normal;
        }
    }
    
`