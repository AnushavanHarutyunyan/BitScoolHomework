import { contextDemo } from '../Context/context';

const ContextDemo = () => {
    return (
        <contextDemo.Consumer>
            {function (context) {
                console.log(context);
                return (
                    <div>
                        <p>Count: {context.count}</p>
                    </div>
                );
            }}
        </contextDemo.Consumer>
    );
};

export default ContextDemo;
