import B from './b';

export default function A() {
    const f = (click) => {
        console.log('click')
        //click();
    };
    return (
        <div>
            <h1 onClick={f}>A component</h1>
            <B func={f} />
        </div>
    );
}
