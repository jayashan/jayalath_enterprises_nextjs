import React from 'react'
import AddPost from '../components/blog/AddPost'
import PostList from '../components/blog/PostList'



async function GetData(){
    const res=await fetch(`${BASE_URL}/api/posts`);
    const posts=await res.json();

    if(!res.ok){
        throw new Error('Failed to fetch data...!');

    }
    return posts;
}

const page = async () => {
    const posts=await GetData();
    console.log(posts);

  return (
    <div className='max-w-4xl mx-auto mt-4'>
        <div className='my-5 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Todo List</h1>
            <AddPost/>
        </div> 
        <div>
            <PostList posts={posts}/>
        </div>
    </div>
  )
}

export default page
