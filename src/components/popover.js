"use client"

import { useState } from "react"

const PopOver = ({button, content}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    return ( 
        <div className="relative inline-block">
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {button}
                {isOpen && (
					<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
						<div className="p-2 text-sm text-gray-900">
							{content}
						</div>
					</div>
				)}
            </div>
        </div>
     );
}
 
export default PopOver;