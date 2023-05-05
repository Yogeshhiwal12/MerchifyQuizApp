import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Rating } from "@mui/material";
import { motion } from "framer-motion";
import { GradientContainer } from "../styled-components";
import CommentIcon from '@mui/icons-material/Comment';
import SaveIcon from '@mui/icons-material/Save';
import ChallengeIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import QuestionIcon from '@mui/icons-material/HelpOutline';
import TimerIcon from '@mui/icons-material/Timer';
import AttemptsIcon from '@mui/icons-material/RepeatOne';
import { useTheme } from '@mui/material/styles';
import QuizRulesPopup from './QuizRulesPopup';

const QuizDetail: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [showRulesPopup, setShowRulesPopup] = React.useState(false);

  const handleStartQuiz = () => {
    setShowRulesPopup(true);
  };

  return (
    <GradientContainer>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Typography
  variant="h2"
  align="center"
  mb={4}
  style={{
    background: 'linear-gradient(45deg, #4A148C, #880E4F)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  The Daily MS Excel Quiz
</Typography>

        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={4}  sx={{
    mx: {
      xs: 2,
      md:2,
      sm: 2,
    },
  }}>
          <Box mb="2">
            <Box display="flex" alignItems="center" mb={1}>
              <CommentIcon  />
              <Typography ml={1} style={{color:"white"}}>Leave a comment</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <SaveIcon />
              <Typography ml={1} style={{color:"white"}}>Save Quiz</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <ChallengeIcon />
              <Typography ml={1} style={{color:"white"}}>Challenge a Friend</Typography>
            </Box>
          </Box>
          <Box textAlign="center">
            <PeopleIcon fontSize="large" />
            <Typography style={{color:"white"}}>+93</Typography>
            <Typography style={{color:"white"}}> people enrolled</Typography>
            <Rating value={3} readOnly />
            <Typography style={{color:"white"}}>(3.0 rating/5)</Typography>
          </Box>
        </Box>
        <Typography mb={4} style={{color:"white"}}   sx={{
    mx: {
        xs: 2,
        md:2,
        sm: 2,
    },
  }}>
          The Microsoft Excel Proficiency test is designed to evaluate the individual's knowledge and skills in using Microsoft Excel.
          It covers a wide range of topics da...Read More
        </Typography>
        <Typography variant="h4" mb={2} style={{
    background: 'linear-gradient(45deg, #4A148C, #880E4F)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }} sx={{
    mx: {
        xs: 2,
        md:2,
        sm: 2,
    },
  }}>
          The Quiz Includes
        </Typography>
        <Box  mb={4}   sx={{
    mx: {
        xs: 2,
        md:2,
        sm: 2,
    },
  }}>
          <Box display="flex" alignItems="center"  >
            <QuestionIcon />
            <Typography ml={1} style={{color:"white"}}>50% Passing Percentage</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <QuestionIcon />
            <Typography ml={1} style={{color:"white"}}>5 Questions</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <TimerIcon />
            <Typography ml={1} style={{color:"white"}}>10 mins</Typography>
          </Box>
          
          <Box display="flex" alignItems="center">
            <AttemptsIcon />
            <Typography ml={1} style={{color:"white"}}>1 Attempt Daily</Typography>
          </Box>
        </Box>
        <Button
  variant="contained"
  onClick={handleStartQuiz}
  sx={{
    display: 'block', 
    mx: 'auto', 
    borderRadius: '12px',
  }}
>
  Take Quiz
</Button>
      </motion.div>
      {showRulesPopup && (
      <QuizRulesPopup onClose={() => setShowRulesPopup(false)} />
    )}
    </GradientContainer>
  );
};

export default QuizDetail;
