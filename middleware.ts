import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { privateRoutes } from "./routes"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async(req)=> {
  // Your custom middleware logic goes here
  // console.log('Middleware called:',req.nextUrl.pathname);
  // console.log("auth",req.auth);
  // console.log("auth name: ",req.auth?.user?.name)
  // console.log("auth name: ",req.auth?.user?.email)
  const isLoggedIn=!!req.auth;
  const {nextUrl}=req;

  const isPrivateRoute=privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute=nextUrl.pathname.includes('/auth');
  const isApiRoute=nextUrl.pathname.includes('/api');

  if(isApiRoute){
    return;
  }
  if(isLoggedIn && isAuthRoute){
    return Response.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
  }
  if(isAuthRoute && !isLoggedIn){
    return;
  }
  if(!isLoggedIn && isPrivateRoute){
    return Response.redirect(`${process.env.NEXTAUTH_URL}/auth/login`);
  }


})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
