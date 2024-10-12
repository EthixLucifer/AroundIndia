import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";



const Login = () => {

    return (
        <div className=" p-2 m-4 ">
            <ConnectWallet />
        </div>
    );
}

export default Login;
