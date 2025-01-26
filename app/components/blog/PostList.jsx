import Post from './Post'

const PostList = ({posts}) => {
    // const data=await fetch('http://localhost:3000/api/posts',{cache:'no-store'});
    // const posts=await data.json();

  return (
    <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
    </ul>

  );
}

export default PostList;
