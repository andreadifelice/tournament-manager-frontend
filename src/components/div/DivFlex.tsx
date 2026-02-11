import React from 'react'

type DivFlexProps = {
    children?:React.ReactNode;
    className?: string;
}

const DivFlex = ({children, className}: DivFlexProps) => {
    const baseClasses = "w-full lg:flex-1 border-2 shadow-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5";
    const combinedClasses = `${baseClasses} ${className || ''}`.trim();

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    )
}

export default DivFlex