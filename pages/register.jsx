import Layout from "@/components/layout/Layout";
import { Box, Button, Divider, OutlinedInput, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbFingerprintOff } from "react-icons/tb";
import axios from "axios";
import { FingerCricle, ProfileCircle } from "iconsax-react";
import { useState } from "react";

const Register = () => {
  const [password, setPassword] = useState(true);
  const [password2, setPassword2] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    console.log(values);
    await axios.post("http://localhost:3000/api/auth/signup", values);
  };

  return (
    <Layout>
      <Box sx={{ textAlign: "center", p: "50px 40px" }}>
        <Typography variant='h3'>Register</Typography>
        <OutlinedInput
          sx={{ height: "35px", m: "10px 0px" }}
          placeholder='Name'
          type='text'
          fullWidth
          endAdornment={<ProfileCircle size='26' color='gray' />}
          name='name'
          onChange={handleChange}
        />
        <OutlinedInput
          sx={{ height: "35px", m: "10px 0px" }}
          placeholder='Email'
          text='email'
          fullWidth
          name='email'
          onChange={handleChange}
          endAdornment={<MdOutlineMailOutline size='26' color='gray' />}
        />
        <OutlinedInput
          sx={{ height: "35px", m: "10px 0px" }}
          placeholder='Password'
          type={password ? "password" : "text"}
          //   type='password'
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
        <OutlinedInput
          sx={{ height: "35px", m: "10px 0px" }}
          placeholder='Confirm Password'
          fullWidth
          type={password2 ? "password" : "text"}
          endAdornment={
            <FingerCricle
              style={{ cursor: "pointer" }}
              onClick={(e) => setPassword2(!password2)}
              size='26'
              color='gray'
            />
          }
        />
        <Button
          onClick={handleLogin}
          fullWidth
          variant='contained'
          sx={{ mt: "10px", mb: "10px" }}
        >
          Sign up
        </Button>
        <br></br>

        <Box>
          <Typography component='span' sx={{ color: "gray", fontSize: "14px" }}>
            Already have an account?
          </Typography>
          &nbsp;&nbsp;
          <Link href='/'>Signin</Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;
