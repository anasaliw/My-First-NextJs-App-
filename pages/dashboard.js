import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Dashboard = () => {
  // const [session, setSession] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  return (
    <Box>
      hello
      {session ? (
        <Box>
          <Typography variant='h3'>Authorize User Home Page</Typography>
          <Typography>{session.user.name}</Typography>
          <Typography>{session.user.email}</Typography>
          <Button onClick={() => signOut("google")}>Sign Out</Button>
          <Button variant='contained'>Profile Page</Button>
        </Box>
      ) : (
        <Box>
          <Typography>Guest</Typography>
          <Link href='/' passHref>
            <Button>Sign In</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  console.log("server", session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: session,
  };
};
