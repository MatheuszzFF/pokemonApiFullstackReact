import styled from "styled-components";

type TButton = {
    theme: "primary" | "secondary"
}
export const StyledButton = styled.button<TButton>`
    padding: 10px 20px;
    text-align: center;
    width: max-content;
    border-radius: 10px;
    background-color: #333333;
    color: white;
    cursor: pointer;
    transition: .3s;
    outline: none;
    border: none;

    &:hover {
        opacity: .6;
    }

`