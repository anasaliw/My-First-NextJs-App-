import Layout from "@/components/layout/Layout";
import { Box, Button, Divider, OutlinedInput, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FingerCricle, ProfileCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const [password, setPassword] = useState(true);
  const { data: session } = useSession();
  const { push } = useRouter();
  // console.log("Data", data);
  const handleGoogle = () => {
    console.log("google signin");
    signIn("google", {
      callbackUrl: "https://my-first-next-js-app-three.vercel.app/",
    });
    // signIn("google", { callbackUrl: "http://localhost:3000" });
  };
  const handleGithub = () => {
    console.log("Github signin");
    signIn("github", {
      callbackUrl: "https://my-first-next-js-app-three.vercel.app/",
    });
    // signIn("github", { callbackUrl: "http://localhost:3000" });
  };

  console.log(session);
  useEffect(() => {
    if (session) {
      push("/dashboard");
    }
  }, [session, push]);
  const initialValues = {
    email: "",
    password: "",
  };

  const [signinValues, setSigninValues] = useState(initialValues);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signinValues);
    const status = await signIn("credentials", {
      redirect: false,
      email: signinValues.email,
      password: signinValues.password,
      callbackUrl: "/",
    });

    console.log(status);
    // if (status.ok) {
    //   router.push(status.url);
    // }
  };
  const handleChange = (e) => {
    setSigninValues({ ...signinValues, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Layout>
        <Head>
          <title>NextJs Auth using NextAuth</title>
          <meta name='description' content='My First NextJs App' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box sx={{ textAlign: "center", p: "50px 40px" }}>
          <Typography variant='h3'>Login</Typography>
          <form onSubmit={handleSubmit}>
            <OutlinedInput
              sx={{ height: "35px", m: "10px 0px" }}
              placeholder='Email'
              fullWidth
              name='email'
              onChange={handleChange}
              endAdornment={<ProfileCircle size='26' color='gray' />}
            />
            <OutlinedInput
              sx={{ height: "35px", m: "10px 0px" }}
              placeholder='Password'
              type={password ? "password" : "text"}
              fullWidth
              name='password'
              onChange={handleChange}
              endAdornment={
                <FingerCricle
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setPassword(!password)}
                  size='26'
                  color='gray'
                />
              }
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: "10px", mb: "10px" }}
            >
              Login
            </Button>
          </form>
          <br></br>
          <Box sx={{ m: "10px 0", display: "flex", alignItems: "center" }}>
            <Box
              sx={{ height: "1px", backgroundColor: "gray", width: "100%" }}
            ></Box>
            <Typography sx={{ m: "0px 5px" }}>OR</Typography>
            <Box
              sx={{ height: "1px", backgroundColor: "gray", width: "100%" }}
            ></Box>
          </Box>
          <Button
            fullWidth
            variant='outlined'
            sx={{ mt: "10px", textTransform: "none" }}
            onClick={handleGoogle}
          >
            Login with Google{" "}
            <FcGoogle size={20} style={{ marginLeft: "10px" }} />
          </Button>
          <br></br>
          <Button
            fullWidth
            variant='outlined'
            sx={{ mt: "10px", textTransform: "none", mb: "20px" }}
            onClick={handleGithub}
          >
            Login with Github{" "}
            <FaGithub
              size={20}
              style={{ marginLeft: "10px", color: "black" }}
            />
          </Button>
          <br></br>
          <Box>
            <Typography
              component='span'
              sx={{ color: "gray", fontSize: "14px" }}
            >
              don`t have an account?
            </Typography>
            &nbsp;&nbsp;
            <Link href='/register'>signup</Link>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

// export const getServerSideProps = async ({ req }) => {
//   const session = await getSession(req);
//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }
//   // const jsonSession= session.json();
//   return {
//     props: session,
//   };
// };
