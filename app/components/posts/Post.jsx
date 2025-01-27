'use client'
import React, { useState } from 'react'
import Model from './Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Post = ({post}) => {
  const router=useRouter();
  const[openModelEdit,setOpenModelEdit]=useState(false);
  const[postToEdit,setPostToEdit]=useState(post);
  
  const[openModelDelete,setOpenmodelDelete]=useState(false);

  const handleEditSubmit=(e)=>{
    e.preventDefault();
    // console.log(inputs);
    // setInputs({});
    axios.patch(`/api/posts/${post.id}`,postToEdit).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setOpenModelEdit(false);
      router.refresh();

    })
  };

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setPostToEdit(preveState=>({...preveState,[name]:value}));
  };

  const handleDeletePost=(id)=>{
    axios.delete(`/api/posts/${id}`,postToEdit).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setOpenModelEdit(false);
      router.refresh();

    })
  };

  return (
    <li className='p-3 my-5 bg-slate-200' key={post.id}>
      <h1 className='text-2xl font-bold'>{post.title}</h1>
      <p>{post.description}</p>

      <div className='pt-5'>
        <button className='text-blue-700 mr-3' onClick={()=>setOpenModelEdit(true)}>Edit</button>
        <Model modalOpen={openModelEdit} setModalOpen={setOpenModelEdit}>
          <form className='w-full' onSubmit={handleEditSubmit}>
            <input
              type='text'
              placeholder='Title'
              name='title'
              className='w-full p-2'
              value={postToEdit.title||''}
              onChange={handleChange}
              
            />
            <input
              type='text'
              placeholder='Description'
              name='description'
              className='w-full p-2 my-5'
              value={postToEdit.description||''}
              onChange={handleChange}
            />
            <button type='submit' className='bg-blue-700 text-white px-5 py-2'>Submit</button>
          </form>
        </Model>
        <button onClick={()=>setOpenmodelDelete(true)} className='text-red-700 mr-3'>Delete</button>
        <Model modalOpen={openModelDelete} setModalOpen={setOpenmodelDelete}>
          <h1 className='text-2xl pb-3'>
            Are You sure , you want to delete this this post
          </h1>
          <div>
              <button onClick={()=>handleDeletePost(post.id)} className='text-blue-700 font-bold mr-5'>Yes</button>
              <button onClick={()=>setOpenmodelDelete(false)} className='text-blue-700 font-bold mr-5'>No</button>
          </div>
        </Model>
      </div>
    </li>
  )
}

export default Post
