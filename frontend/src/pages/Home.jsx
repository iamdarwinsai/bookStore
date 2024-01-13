import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

import { IoMdAdd } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


import Spinner from '../components/Spinner'

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetching() {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5555/books');
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  
    fetching();
  }, []);
  
  return (
    <div className=''>
      <div className='max-w-[1240px] mx-auto flex justify-between p-5 mt-[100px] bg-slate-300 border border-x-black rounded-lg'>
          <h1 className='font-serif text-2xl text-gray-900'>Books List</h1>
          <Link to='/books/create'>
            <IoMdAdd className='text-4xl text-gray-800'/>
          </Link>
      </div>
      {
        loading ? (
          <Spinner />
        ):(
          <table className='w-full border-separate border-spacing-2 mt-5 p-14'>
            <thead>
              <tr className='font-serif' >  
                <th className='border border-slate-400 rounded-md'>Book No</th>
                <th className='border border-slate-400 rounded-md'> Title </th>
                <th className='border border-slate-400 rounded-md max-md:hidden'>Author</th>
                <th className='border border-slate-400 rounded-md max-md:hidden'>Published Year</th>
                <th className='border border-slate-400 rounded-md'>Operations</th>  
              </tr>
            </thead>
            <tbody>
              {
                books.map((book,index)=>(
                   <tr key={book._id} className='font-extralight h-8'>
                    <td className='text-center'>{index+1}</td>
                    <td className='text-center'> {book.title}</td>
                    <td className='text-center  max-md:hidden'>{book.author}</td>
                    <td className='text-center  max-md:hidden'>{book.publishYear}</td>
                    <td className='flex justify-between max-w-[70%] mx-auto my-1'>
                      <Link to={`/books/details/${book._id}`}>
                        <FiInfo />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <MdModeEditOutline />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdDelete />
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )

      }
    </div>
  )
}

export default Home