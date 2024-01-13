import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';


const BackButton = ({destination = "/"}) => {
  return (
    <Link to={destination}>
        <IoMdArrowRoundBack className=' text-4xl'/>
    </Link>
  )
}

export default BackButton