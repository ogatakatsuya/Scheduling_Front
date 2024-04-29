import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useEffect } from "react";

const QuateCard = () => {
  //reactは非同期関数を直接コンポーネントに書くことができない
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://scheduling-endpoint-8e42d36f5cf9.herokuapp.com/api/"
        );
        const data = await res.json();
        setQuote(data.response);
      } catch (error) {
        setQuote("Quote not found.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography
        variant="h5"
        color="#0b4d87"
        sx={{ pl: 2, pb: 1, fontWeight: "medium" }}
      >
        Today's Tips
      </Typography>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <Box
        sx={{
          maxHeight: "70vh",
          overflow: "auto",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
          fontStyle: "italic",
        }}
      >
        <Typography variant="h6" color="#0b4d87">
          {quote}
        </Typography>
      </Box>
    </>
  );
};

export default QuateCard;
