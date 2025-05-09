import React from 'react';

const CustomBadge = ({ text, textColor = 'white', bgColor = 'primary' }) => {
    return (
        <div className={`inline-block text-sm px-4 py-1 rounded-full text-${textColor} bg-${bgColor}`}>
            {text}
        </div>
    );
};

export default CustomBadge;