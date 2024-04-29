import { NextPage } from "next";
import Head from "next/head";
import Login from "@/components/Login";
import { useState, useEffect } from "react";
import Mypage from "@/components/Mypage";
import Header from "@/components/Header";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";

const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState<string>(""); // ログイン状態を管理
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "body::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "::-webkit-scrollbar-track": {
            background: grey[50],
          },
          "::-webkit-scrollbar-thumb": {
            background: grey[400],
            borderRadius: "3px",
          },
        },
      },
    },
  });

  useEffect(() => {
    const storedToken =
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
      setIsLogin(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (token: string) => {
    setAccessToken(token); // accessTokenを設定
    sessionStorage.setItem("accessToken", token);
    setIsLogin(true);
  };

  const handleLogout = () => {
    setAccessToken("");
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    setIsLogin(false);
  };

  if (isLoading) return <CircularProgress sx={{ flex: 1 }} />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>To Do App</title>
        <meta
          name="description"
          content="The easiest way to track your daily work"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Header token={accessToken} onLogout={handleLogout} />
        {!isLogin && <Login onLogin={handleLogin} />}
        {isLogin && <Mypage token={accessToken} />}
      </Box>
    </ThemeProvider>
  );
};

export default Home;
