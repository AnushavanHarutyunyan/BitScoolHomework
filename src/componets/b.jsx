export default function B(props) {
    // const onClick = () => {
    //     console.log('Click');
    // };

    const funcSub = (props) => {
        const { func } = props.func;
        console.log(props);
        //func(onClick);
    };
    funcSub(props);
    return <h1>B component</h1>;
}
