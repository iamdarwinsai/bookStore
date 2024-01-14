import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const DeleteBook = () => {
  const [loading,setLoading]=useState(false)
  
 const {id}=useParams()
 const navigate=useNavigate()
 const deleteBook=async ()=>{
  try {
    setLoading(true)
    await axios.delete(`http://localhost:5555/books/${id}`)
    navigate("/")
  } catch (error) {
    console.error(error)
  } finally{
    setLoading(false)
  }
 }
  return (
    <div>
      <BackButton />
      <div className=' border border-solid max-w-[1240px] mx-auto text-4xl text-center h-[500px] items-center flex flex-col justify-center'>
        <span className='mt-10'>You really want to delete it</span>
        <button onClick={deleteBook} className='border border-solid p-2 bg-blue-300 rounded-md'>Delete it</button>
      </div>
    </div>
  )
}

export default DeleteBook