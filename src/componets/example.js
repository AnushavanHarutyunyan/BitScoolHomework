// import React from 'react';

// // function Example(props) {
// //     console.log(props)
// //     return (
// //         <div>
// //             <h1>Привет, мир!</h1>
// //             <h2>Сейчас {props.data.toLocaleTimeString()}.</h2>
// //         </div>
// //     );
// // }

// const context = React.createContext('light');

// class Example extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isTogle: true,
//         };
//     }

//     //isTogle = this.state.isTogle

//     changeState = () => {
//         this.setState({
//             isTogle: !this.state.isTogle,
//         });
//         console.log(this.state.isTogle);
//     };

//     render() {
//         console.log(context);
//         return (
//             <div>
//                 <button onClick={this.changeState}>Change</button>
//                 <h1>{this.isTogle}</h1>
//                 <h1>{`${this.state.isTogle}`}</h1>
//             </div>
//         );
//     }
// }

// export default Example;
