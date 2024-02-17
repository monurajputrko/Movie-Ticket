import React, { useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../movies'
import { useState } from 'react'
import Contextpage from '../Contextpage'
import { HiChevronLeft } from "react-icons/hi";


const Player = () => {



    return (
      <>
        <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>
      
      </>
    )
}

export default Player