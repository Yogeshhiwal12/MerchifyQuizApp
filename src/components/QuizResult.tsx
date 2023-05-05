import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { GradientContainer } from "../styled-components";
import ShareIcon from "@mui/icons-material/Share";
import PeopleIcon from "@mui/icons-material/People";
import { questions } from "./QuizAttempt";


interface QuizResultProps {
    score: number;
    timeTakenArray: number[];
  }
  const QuizResult: React.FC = () => {
    const location = useLocation() as any;
    const navigate = useNavigate();
  
    const { score, timeTakenArray } = location.state;
  
    const totalTimeTaken = timeTakenArray ? timeTakenArray.reduce((a:number, b:number) => a + b, 0) : 0;

  


  const totalQuestions = questions.length;
  const scorePercentage = Math.round((score / totalQuestions) * 100); 

  let resultMessage = "Oh Snap, You can Do Better";
  if (scorePercentage >= 50 && scorePercentage < 70) {
    resultMessage = "Good";
  } else if (scorePercentage >= 70 && scorePercentage < 90) {
    resultMessage = "Great";
  } else if (scorePercentage >= 90) {
    resultMessage = "Outstanding";
  }

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <GradientContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Typography
          variant="h3"
          align="center"
          style={{
            background: "linear-gradient(45deg, #4A148C, #880E4F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "32px",
          }}
        >
          The Daily MS Excel Quiz
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="12px"
          bgcolor="white"
          padding="32px"
          marginBottom="32px"
          sx={{
            mx: {
                xs: 2,
                md:2,
                sm: 2,
            },
          }}
        >
          <Typography variant="h4">Your Score:</Typography>
          <Typography variant="h2">{scorePercentage}%</Typography>
          <Typography variant="h5">{resultMessage}</Typography>
          <Typography align="center" style={{ marginTop: "16px" }}>
            Success is not final, failure is not fatal: It is the courage to
            continue the counts.
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="32px"
        >
          <Box sx={{
    mx: {
        xs: 2,
        md:2,
        sm: 2,
    },
  }}>
            <Typography variant="h6">Your Score</Typography>
            <Typography>{score}/{totalQuestions}</Typography>
            
          </Box>
          <Box sx={{ mx: { xs: 2, md: 2, sm: 2 } }}>
          <Typography variant="h6">Time Taken</Typography>
          <Typography>{totalTimeTaken} seconds</Typography>
         
        </Box>

        </Box>
        <Typography variant="h2" align="center" marginBottom="16px">
          Seekho
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="16px"
        >
          <ShareIcon />
          <Typography style={{ marginLeft: "8px" }}>
            Share it with your friends
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom="16px"
        >
          <Typography variant="h6">Leaderboard</Typography>
          <Box
             display="flex"
             width="75%"
             justifyContent="space-between"
             alignItems="center"
             borderRadius="12px"
             bgcolor="white"
             padding="32px"
             marginBottom="12px"
             sx={{
               mx: {
                   xs: 2,
                   md:2,
                   sm: 2,
               },
             }}
          >
            <Box >
              <PeopleIcon />
              <Typography>Yogesh Kumar</Typography>
              <Typography>+ Follow</Typography>
            </Box>
            <Typography>{scorePercentage}%</Typography>
          </Box>
          <Button
           
            size="small"
            style={{backgroundColor:"black", color:"white",marginRight:"50px"}}
            
            sx={{
              alignSelf: "flex-end",
            }}
          >
            View All
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{
            display: "block",
            mx: "auto",
            borderRadius: "12px",
            marginBottom: "16px",
          }}
        >
          Restart
        </Button>
      </motion.div>
    </GradientContainer>
  );
};

export default QuizResult;
