import { Button } from '@material-ui/core';
import React from 'react';
import B from './b';

export default function A() {
    const onClick = (click) => {
        click()
    };

    return (
        <div>
            <h1>A component</h1>
            <button onClick={onClick}>A compo</button>
            <B funcA={onClick} />
        </div>
    );
}
