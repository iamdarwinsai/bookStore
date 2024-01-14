import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const EditBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const bookData = response.data;

        setTitle(bookData.title);
        setAuthor(bookData.author);
        setPublishYear(bookData.publishYear);
      } catch (error) {
        console.error('Error fetching book details', error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  const onEditHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5555/books/${id}`, {
        title,
        author,
        publishYear,
      });
      navigate('/');
      console.log(response);
    } catch (error) {
      console.error('Error updating book details', error);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  return (
    <div>
      <div>
        <BackButton />
      </div>
      <div className="flex justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="w-full max-w-xs">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={onEditHandler}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="author"
                  >
                    Author
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="author"
                    type="text"
                    placeholder="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="publishYear"
                  >
                    Published Year
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="publishYear"
                    type="text"
                    placeholder="publishYear"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    UPDATE
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

export default EditBook;
