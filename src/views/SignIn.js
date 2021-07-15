// // import {Button, IconButton} from "@material-ui/core";
// // import {Auth} from "aws-amplify";
// // import Amplify, {Hub } from 'aws-amplify';
// // import awsconfig from '../aws-exports';
// // import React, {useState} from "react";
// // import jwt_decode from "jwt-decode";
// // import FacebookIcon from "@material-ui/icons/Facebook";
// // import App from "../App";
// //
// //
// //
// // export default function SignIn() {
// //     const [responseUrl, setresponseUrl] = useState(null)
// //     const [loggedIn,setLoggedIn] = useState(false)
// //     var url = window.location.href
// //
// //     let code = url.match(/(?<=id_token=).*(?=&state=)/)
// //     if(code){
// //         var token = code[0];
// //         var decoded = jwt_decode(token);
// //         console.log(decoded)
// //         // setLoggedIn(true)
// //     }
// //
// //     return(
// //         loggedIn ? <App/>
// //                 :
// //         <div>
// //             <Button href={process.env.REACT_APP_SignInUrl}> Sign in </Button>}
// //         </div>
// //
// //
// //
// //
// //     )
// // }
import {Button, Grid, IconButton} from '@material-ui/core';
// import Login from "./Components/Authentication/Login";
import Login from "../components/Authentication/Login_material";
import {Auth, Hub} from "aws-amplify";
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {updateLoginState} from "../actions/loginActions";
import App from "../App";
import { Cache } from 'aws-amplify';
import {func} from "prop-types";
import FacebookIcon from "@material-ui/icons/Facebook";



function SignIn(props) {
    const {loginState, updateLoginState} = props;
    const [currentUser,setCurrentUser]= useState(null)

    const [currentLoginState, updateCurrentLoginState] = useState(loginState);





    useEffect(async () => {
        updateCurrentLoginState(loginState);
    }, [loginState]);

    const [user, setUser] = useState(null);
    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then(userData => userData)
            .catch(() => console.log('Not signed in'));
    }


    useEffect( () => {

        Hub.listen('auth', ({payload: {event, data}}) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then(userData => setUser(userData));
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        })
    });


    return (
        <Grid container>
            <Grid item xs={12}>
                {
                    currentLoginState !== "signedIn" && (
                        <div>
                            <Login logo={"custom"} type={"image"} themeColor={"standard"} animateTitle={true}
                                   title={"Student App"} darkMode={true}
                                   disableSignUp={false}
                            />

                        </div>

                    )
                }
                {
                    (currentLoginState === "signedIn") && (
                        <App/>
                    )
                }
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginState.currentState,
    };
};

const mapDispatchToProps = {
    updateLoginState,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

// import React, { useEffect, useState } from 'react';
// import Amplify, { Auth, Hub } from 'aws-amplify';
// import awsconfig from '../aws-exports';
//
// Amplify.configure(awsconfig);
//
// function SignIn() {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         Hub.listen('auth', ({ payload: { event, data } }) => {
//             switch (event) {
//                 case 'signIn':
//                 case 'cognitoHostedUI':
//                     getUser().then(userData => setUser(userData));
//                     break;
//                 case 'signOut':
//                     setUser(null);
//                     break;
//                 case 'signIn_failure':
//                 case 'cognitoHostedUI_failure':
//                     console.log('Sign in failure', data);
//                     break;
//             }
//         });
//
//         getUser().then(userData => setUser(userData));
//     }, []);
//
//     function getUser() {
//         return Auth.currentAuthenticatedUser()
//             .then(userData => userData)
//             .catch(() => console.log('Not signed in'));
//     }
//
//     return (
//         <div>
//             <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
//             {user ? (
//                 <button onClick={() => Auth.signOut()}>Sign Out</button>
//             ) : (
//                 <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
//             )}
//         </div>
//     );
// }
//
// export default SignIn;