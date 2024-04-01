import { ReactNode } from "react"
import { StyledButton } from "./StyledButton"

type TButton = {
    children: ReactNode | string,
    onClick?: () => any,
    theme: "primary" | "secondary"
} 
export const Button = ({children, onClick, theme}: TButton) => {
    return (
        <StyledButton onClick={onClick} theme={theme}>
            {children}
        </StyledButton>

    )
}