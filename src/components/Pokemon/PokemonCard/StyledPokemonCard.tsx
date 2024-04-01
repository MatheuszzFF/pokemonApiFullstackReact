import styled from "styled-components";

type TRadiusImage = {
    type: string
} 
export const StyledPokemonCard = styled.div`

    padding: 30px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: -10px -10px 20px rgba(255, 255, 255, 0.12) , 10px 10px 25px rgba(174, 174, 192, 0.12);
    border-radius: 25px;
    gap: 15px;
    background-color: ${({theme}) => theme.pokemon.homeCard};
    position: relative;
    cursor: pointer;
    transition: .3s;
    
    &:hover {
        position: relative;
        transform: translatey(-30px);
    }

`

export const Top = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    span {
        color: #fff;
        font-size: 18px;
        font-weight: 400;
        opacity: .8;
    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    h4 {
        color: #fff;
        font-size: 22px;
    }
`

export const RadiusImage = styled.div<TRadiusImage>`
    background: linear-gradient(135deg, rgba(239,239,242,1) 45%, rgba(255,255,255,1) 82%);
    height: 250px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(/assets/img/pokemon/types/background/background-${(props) => props.type}.svg);

    img {
        position: relative;
        object-fit: contain;
        z-index: 3;
        height: 180px;
        margin-top: -30px;
    }

    .shadow {
        position: absolute;
        bottom: -56px;
        filter: brightness(0.2) blur(10px);
        opacity: 0.9;
        transform: rotatex(96deg);
        width: 40%;
        z-index: 1;
    }

`