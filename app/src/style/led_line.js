import React from 'react';
import './led_line.css';
import { Line } from './line';

const LedLine = () => {
    const { useState } = React;

    const [state, setState] = useState({
        lines: [
            { id: 0, delay: 30600, style: "line blink" },
            { id: 1, delay: 6200, style: "line blink" },
            { id: 2, delay: 20600, style: "line blink" },
            { id: 3, delay: 1000, style: "line blink" },
            { id: 4, delay: 12500, style: "line blink" },
        ],
        counter: 0,
    })
    console.log(state)
    return (
        <div className="led_line__container">
            {state.lines.map(line => <Line styling={line.style} delay={line.delay} />)}
        </div>
    )
}
export default LedLine