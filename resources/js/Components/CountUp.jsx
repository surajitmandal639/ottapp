// resources/js/Components/CountUp.jsx

import { useState, useEffect } from "react";

export default function CountUp ({ endValue, duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const newValue = Math.floor(progress * endValue);

            setCount(newValue);

            if (newValue < endValue) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [endValue, duration]);

    return <span>{count}</span>;
}
