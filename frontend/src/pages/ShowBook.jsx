import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'


const ShowBook = () => {
  const {id}=useParams()
  const [book,setBook]=useState({});
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    async function fetch(){
      try {
        const response= await axios.get(`http://localhost:5555/books/${id}`)
        setBook(response.data)
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }

    fetch()
  },[])
  return (
    <div>
      <div className='py-10 px-5'><BackButton /></div>
     {
      loading?(
        <Spinner />
      ):(
        <div className='relative left-[100px] rounded-lg border border-solid w-fit bg-slate-200 p-5 px-5 flex flex-col'> 
            <div className='my-4'>
                <span className='text-xl mr-4 text-green-600'>ID :</span>
                <span>{book._id}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-green-600'>Title :</span>
                <span>{book.title}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-green-600'>Author :</span>
                <span>{book.author}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-green-600'>Published Year :</span>
                <span>{book.publishYear}</span>
            </div>
        </div>
      )
     }
    </div>
  )
}

export default ShowBook