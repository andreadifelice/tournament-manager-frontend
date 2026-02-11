import type React from "react";

type DivGridProps = {
    children?: React.ReactNode;
}

const DivGrid = ({children}: DivGridProps) => {
    return (
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:justify-between max-h-[80vh]">
            {children}
        </div>
    )
}

export default DivGrid