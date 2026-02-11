import React from "react"

type DivMax4Props = {
    children?: React.ReactNode;
    className?: string;
}

const DivMax4 = ({ children, className }: DivMax4Props) => {
    const baseClasses = "px-4 w-full md:max-w-4xl mx-auto";
    const combinedClasses = `${baseClasses} ${className || ''}`.trim();
    return (
        <div className={combinedClasses}>
            {children}
        </div>
    )
}

export default DivMax4