import React, { useState,useEffect } from 'react'
import Background from './Components/Background/Background';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';

const App = () => {
  // Each page has its own text
  let heroData=[
    {text1:"Dive into",text2:"What you love"},
    {text1:"Indulge",text2:"Your passions"},
    {text1:"Give in to",text2:"Your passions"},
  ]

  const [heroCount,setheroCount] =useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setheroCount(prevCount => (prevCount + 1) % heroData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  
  const [playStatus,setPlayStatus] = useState(false);

  return (
    <div>
      <Background playStatus={playStatus} heroCount={heroCount}/>
      <Navbar/>
      <Hero setPlayStatus={setPlayStatus} 
            heroCount={heroCount} 
            setheroCount={setheroCount} 
            heroData={heroData[heroCount]}
            playStatus={playStatus}
      />
    </div>
  )
}

export default App
