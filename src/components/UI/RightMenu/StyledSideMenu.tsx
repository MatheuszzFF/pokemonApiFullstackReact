import styled from "styled-components";

type TStyledRightMenu = {
    open: boolean,
    headerheight: number
}
export const StyledRightMenu = styled.div<TStyledRightMenu>`

    position: fixed;
    ${props => props.open ? 
        "right: 0%;" : 
        "right: -100%;"
    }
    width: 350px;
    ${({theme}) => `background-color: ${theme.main.colors.darkTheme2};`}
    height: 100%;
    ${({headerheight}) => `top: ${headerheight}px;`}
    z-index: 5;
    transition: .3s;
    overflow: auto;
`