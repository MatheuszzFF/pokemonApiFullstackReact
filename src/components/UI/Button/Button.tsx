import { ReactNode } from "react"
import { StyledButton } from "./StyledButton"

type TButton = {
    children: ReactNode | string,
    onClick?: () => any,
    theme: "primary" | "secondary",
    center: boolean
} 
export const Button = (props: TButton) => {
    const {
    children, 
    onClick, 
    theme,
    center
    } = props
    return (
        <StyledButton onClick={onClick} theme={theme} center={center}>
            {children}
        </StyledButton>

    )
}