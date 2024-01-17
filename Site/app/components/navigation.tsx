import { ReactNode } from "react";


function NavigationBar({children}:{children:ReactNode}) {
    return (
        <div className="row">
            {children}
        </div>
    )
}

export default NavigationBar;