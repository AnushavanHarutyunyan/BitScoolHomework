export default function B(props) {
    const { funcA } = props;
    const btnFunc = () => {
        console.log('Open SnackBar');
    };

    funcA(btnFunc);
    
    return <h1>B component</h1>;
}
