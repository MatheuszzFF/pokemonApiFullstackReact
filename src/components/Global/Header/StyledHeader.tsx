import styled from "styled-components";

export const StyledHeader = styled.header`
position: fixed;
left: 0;
top: 0;
width: 100%;
padding: 15px 0;
${props => `background-color: ${props.theme.main.colors.darkTheme2};`}
${props => `box-shadow: 2px 2px 2px ${props.theme.main.colors.darkTheme2};`}
position: fixed;
width: 100%;
top: 0;
z-index: 100;
`