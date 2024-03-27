import { ReactNode } from "react";
import { StyledContainer } from "./StyledContainer";

export const Container = ({children}: {children: ReactNode}) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    )
}