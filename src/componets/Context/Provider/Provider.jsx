import { contextDemo } from '../context';
import { useState } from 'react';

const Provider = (props) => {
    const [count, setCount] = useState(0);

    return (
        <contextDemo.Provider
            value={{
                count,
            }}
        >
            {props.children}
        </contextDemo.Provider>
    );
};

export default Provider;
