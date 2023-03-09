import {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Quote =()=>{
    const [quotes,setQuotes]=useState([]);
    const [randquote,setRandQuote]=useState([]);
    const [color,setColor]=useState("#8ed1fc");

    useEffect(()=>{
        async function fetchData(){
            const res=await fetch("https://type.fit/api/quotes")
            const data=await res.json();

            setQuotes(data);
            let randidx=Math.floor(Math.random()*data.length);
            setRandQuote(data[randidx])
        }
        fetchData();
    },[])
    const getNewQuote=()=>{
        const colors=[
            "#994F14",
        "#DA291C",
        "#FFCD00",
        "#007A33",
        "#EB9CA8",
        "#7C878E",
        "#8A004F",
        "#000000",
        "#10069F",
        "#00a3e0",
        "#4CC1A1"
        ];
        let randidx=Math.floor(Math.random()*quotes.length);
        let randColoridx=Math.floor(Math.random()*colors.length);
        setRandQuote(quotes[randidx])
        setColor(colors[randColoridx])
    }


    return (
        <div style={{backgroundColor:color,minHeight:"100vh"}}>
        <div className='container pt-5' >
            <div className='jumbotron'>
                <div className='card'>
                    <div className='card-header'>     Insipirational Quotes</div>
                    <div className='card-body'>
                        {randquote?(
                            <>
                                <h5 className='card-title'>- {randquote.author|| "No Author"}</h5>
                                <p className='card-text'>&quot;{randquote.text}&quot;</p>
                            </>
                        ):(
                            <h2>Loading...</h2>
                        )}
                        <div className='row'>
                            <button onClick={getNewQuote} className="btn btn-primary ml-3 button" >New Quote</button>
                            <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                            encodeURIComponent(
                                '"'+randquote.text+'" - '+randquote.author
                            )} 
                            target="_blank" rel='noreferrer'
                            className='btn btn-warning button l'>
                            <i class="bi bi-twitter"></i>
                            </a>
                            <a href={"https://www.tumblr.com/new/quote?hashtags=quotes&related=freecodecamp&text=" +
                            encodeURIComponent(
                                '"'+randquote.text+'"'+randquote.author
                            )} target="_blank" rel='noreferrer' className='btn btn-danger button l'>
                            <FontAwesomeIcon icon="fab fa-tumblr" />
                            </a>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        </div>
    );
}

export default Quote;