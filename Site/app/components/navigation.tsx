import { ReactNode } from "react";


function NavigationBar({children}:{children:ReactNode}) {
    return (
        <div className="tabs">
            {children}
        </div>
    )
}

export default NavigationBar;
