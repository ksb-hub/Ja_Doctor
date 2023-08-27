import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button'
export default function HomePage() {

    const navigate = useNavigate();

    return (
        <>
        <div>임시 HomePage입니다!!!</div>
        <Button
            title = '로그인 하러가기'
            onClick = {() =>{
                navigate("/signin")
            }}
        ></Button>
        </>
    )
}
