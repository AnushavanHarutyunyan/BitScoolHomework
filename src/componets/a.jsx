import { Button } from '@material-ui/core';
import React from 'react';
import B from './b';
import Button from '@material-ui/core/Button';

export default function A() {
    debugger;
    const f = (click) => {
        //console.log(click);
        click();
    };
    return (
        <div>
            <Button onClick={this.addBtn} variant="contained" color="primary">
                Subbmit
            </Button>
            <B funcA={f} />
        </div>
    );
}
