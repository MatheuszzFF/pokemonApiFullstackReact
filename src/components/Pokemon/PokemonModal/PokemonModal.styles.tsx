import styled from "styled-components";

export const Modal = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: #1E1E1E40;
z-index: 9999;
`

export const Content = styled.div`
    border-radius: 15px;
    ${({theme}) => `background-color: ${theme.pokemon.modalColor};` }
    padding: 30px;
`

export const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`