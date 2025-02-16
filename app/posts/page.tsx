import { prisma } from "@/lib/prisma"

export default async function PostPage() {
    const blogs=await prisma.blog.findMany();

    return(
        <main>
            <ul>
                {blogs.map((blog)=>(
                    
                        <li key={blog.id}>
                            <h1>{blog.title}</h1>
                        </li>
                ))}
            </ul>
        </main>
    )
}