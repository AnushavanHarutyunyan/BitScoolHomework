export default function B(props) {
    debugger
    const onClick = () => {
        console.log('OnClick function');
    };

    const funcSub = (props) => {
        const {funcA} = props;
        funcA(onClick);
        //console.log('B components console')
    };
    //funcSub(props);
    return <h1>B component</h1>;
}
