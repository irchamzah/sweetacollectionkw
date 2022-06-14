// import { useSession, signIn, signOut } from "next-auth/react";

// const demo = () => {
//   const { data: session } = useSession();
//   console.log(session);
//   if (session) {
//     return (
//       <>
//         signed in as {session.user.email}
//         <button onClick={() => signOut()}>Sign Out</button>
//       </>
//     );
//   }
//   return (
//     <>
//       <button onClick={() => signIn()}>Sign In</button>
//     </>
//   );
// };

// export default demo;
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
