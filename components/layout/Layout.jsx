import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import img1 from "../../public/assets/img1.png";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#42A5F5",
      }}
    >
      <Box
        sx={{
          //   bgcolor: "white",
          padding: { lg: "5% 20%", md: "5% 15%", sm: "5% 10%", xs: "5% 5%" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            minHeight: "500px",
            display: "flex",
            flexDirection: {
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",

              background:
                "linear-gradient(90deg, rgba(237,255,235,1) 0%, rgba(193,191,246,1) 0%, rgba(139,162,255,1) 0%, rgba(63,94,251,1) 73%);",
            }}
          >
            <Image
              src={img1}
              width='0'
              height='0'
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              alt='pix'
            />
          </Box>

          <Box sx={{ width: "100%" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
