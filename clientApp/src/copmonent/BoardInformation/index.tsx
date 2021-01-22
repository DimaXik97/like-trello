import React from "react";

import styles from './BoardInformation.module.css'

interface BoardInformationProps{
    owner?: string;
    createdAt?: string;
    status?: Boolean
}
const BoardInformation:React.FC<BoardInformationProps>=({
    owner="dimaxik97@gmail.com",
    createdAt="24.10.2012",
    status=true
})=>{
    return(
        <div className={styles.container}>
            <div>Owner: {owner}</div>
            <div>Created at: {createdAt}</div>
            <div>Status: {status?"Public":"Private"}</div>
        </div>
    )
}

export default BoardInformation;