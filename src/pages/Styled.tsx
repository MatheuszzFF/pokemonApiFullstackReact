import styled from "styled-components";

export const PokemonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    grid-auto-rows: 300px;
    grid-gap: 70px;
`

export const HomePage = styled.main`
    background-color: ${(props) => props.theme.main.colors.darkTheme1}
`