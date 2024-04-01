import { ReactNode } from "react"
import { StyledRightMenu } from "./StyledSideMenu"

type TRightMenu = {
    open: boolean,
    children: ReactNode,
    headerheight: number
}
export const RightMenu = ({open, children, headerheight}: TRightMenu) => {
  
    return (
        <>
            <StyledRightMenu open={open} headerheight={headerheight}>
                {children}
            </StyledRightMenu>
        </>
    )
}