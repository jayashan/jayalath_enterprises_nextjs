import Link from "next/link"



async function getPostData(){
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    await new Promise((resolve)=>setTimeout(resolve,3000))
    return data.json();
}

async function getUserData(){
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
  await new Promise((resolve)=>setTimeout(resolve,3000))
  return data.json();
}



export default async function Page() {
    //const posts = await getPostData();
    const[posts,users]=await Promise.all([getPostData(),getUserData()])

    return (
      <div>
        <h1>users</h1>
        {
          users.map((user,index)=>(
            <p key={index}>{user.name}</p>
          ))
        }
        <ul className="flex flex-col gap-5">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <li className="bg-gray-100 p-5 cursor-pointer">
                  <h4 className="text-2xl font-bold">{post.title}</h4>
                  <p>{post.body}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }