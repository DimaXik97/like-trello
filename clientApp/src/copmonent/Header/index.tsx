import React from "react";
import axios from 'axios';

import styles from './Header.module.css'
import { GoogleLogin, } from 'react-google-login';

interface LoginResponse{
    token: string;
    user: {
        imageUrl: string;
        email: string;
        name: string;
        givenName: string;
        familyName: string;
    }
}
interface HeaderProps{
    isAuth?: boolean;
}
const Header:React.FC<HeaderProps>=({isAuth=true})=>{
    const login = async (googleData: any)=>{
        const response = await axios.post<LoginResponse>("/api/auth/login", {token: googleData.tokenId});
        localStorage.setItem("jwt", `Bearer ${response.data.token}`);
        console.log(response.data.user)
    }
    return(
        <header className={styles.header}>
            <>Header</>
            <>{isAuth?<GoogleLogin
                clientId="952878566528-kd5v9b20g4mqrafl8bku1f11k312c5rm.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={login}
                onFailure={(d)=>console.log("error",d)}
                cookiePolicy={'single_host_origin'}
            />: "Login"}</>
            
        </header>
    )
}

export default Header;