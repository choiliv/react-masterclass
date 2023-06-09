import React, { useEffect } from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;    
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    width: 300px;
    margin: 10px 10px;
    padding: 20px;
    border-radius: 15px;
    a {
        display: flex;
        align-items: center;
    }
    &:hover {
        a{
            transition: color 0.3s ease-in;
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;


interface CoinInterface {
    id: string,
    name: string,
    symbol:string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}


function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        (async () => { 
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    }, []);
    return(
    <Container>
        <Header>
            <Title>코인</Title>
        </Header>
    {loading ? <Loader>Loading...</Loader> : (
           <CoinsList>
           {coins.map((coin) => <Coin key={coin.id}>
            <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.id }
            }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                {coin.name} &rarr;</Link>    
           </Coin>)}
       </CoinsList>
    )}
    </Container>
    )
};


export default Coins;
