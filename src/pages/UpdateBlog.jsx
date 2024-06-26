import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


export default function UpdateBlog() 
{
  const nav = useNavigate()
  const [title, setTitle] = useState()
  const [comments, setComment] = useState([])
  const [author, setAuthor] = useState()
  const [content, setContent] = useState()

  const {post_id} = useParams()


  useEffect(()=>{
    fetch(`http://localhost:3000/posts/${post_id}`)
    .then((res)=>res.json())
    .then((data)=>{
       setTitle(data.title)
       setAuthor(data.author)
       setContent(data.content)
      
    })
  }, [post_id])


  // Update
  function handleSubmit(e){
    e.preventDefault()

    fetch(`http://localhost:3000/posts/${post_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        content: content,
        author: author
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
  .then((response) => response.json())
  .then((res) =>{
    nav("/")
    toast.success("Post Updated successfully")
  });

  }
  return (
    <div className='grid grid-cols-2 h-[80vh] mt-6'>
      <div className='bg-gray-800 text-white flex justify-center items-center'>
        <h1 className='text-6xl font-bold'>Update Blog {post_id}</h1>
      </div>
      <div className='p-6 '>
        <h1 className='text-center font-semibold text-2xl'>Update Blog</h1>
        
        <form onSubmit={handleSubmit} class="max-w-md mx-auto">
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
            <textarea value={content} onChange={(e)=> setContent(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required >
              </textarea>
          </div>
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
            <input value={author} onChange={(e)=> setAuthor(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update Post
          </button>

        </form>



      </div>
    </div>
  )
}
