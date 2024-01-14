import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"



const CreateBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate=useNavigate()

  const onAddHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const data = await axios.post('http://localhost:5555/books/', {
      title,
      author,
      publishYear
    });
    navigate("/")
    console.log(data);
  };

  return (
    <div>
      <div><BackButton /></div>
      <div className='flex justify-center'>
        {loading ? (
          <Spinner />
        ) : (
          <div className=''>
            <div className="w-full max-w-xs">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={onAddHandler}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                    Author
                  </label>
                  <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="author" onChange={(e)=>setAuthor(e.target.value)}/>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishYear">
                    Published Year
                  </label>
                  <input 
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="publishYear" type="text" placeholder="publishYear" onChange={(e)=>setPublishYear(e.target.value)}/>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;


