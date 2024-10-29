import React from 'react';

const DownArrow = ({
    itemKey,
    openChildren,
}: {
    itemKey: string;
    openChildren: string | null;
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            className={`ml-2 size-3 transition-transform duration-500 ${
                openChildren === itemKey ? 'rotate-180' : 'rotate-0'
            }`}
            // Added `transition-transform` and `duration-300` to handle the smooth rotation
        >
            <path
                d="M5.99496 4.89449L1.81066 0.710136C1.39645 0.295916 0.724867 0.295926 0.310658 0.710136C-0.103552 1.12435 -0.103552 1.79592 0.310658 2.21009L5.85356 7.75299C6.24406 8.14359 6.87726 8.14359 7.26776 7.75299L12.8107 2.21009C13.2249 1.79593 13.2249 1.12435 12.8107 0.710136C12.3965 0.295926 11.7249 0.295926 11.3107 0.710136L7.12636 4.89449C6.81396 5.20689 6.30736 5.20689 5.99496 4.89449Z"
                fill="white"
            />
        </svg>
    );
};

export default DownArrow;
