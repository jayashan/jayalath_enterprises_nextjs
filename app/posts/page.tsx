import { prisma } from "@/lib/prisma"

export default async function PostPage() {
    const blogs=await prisma.blog.findMany();

    return(
        <main>
            {blogs.map((blog)=>(
                <ul>
                    <li key={blog.id}>
                        <h1>{blog.title}</h1>
                    </li>
                </ul>
            ))}
        </main>
    )
}