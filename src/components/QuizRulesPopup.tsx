import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import QuestionIcon from '@mui/icons-material/HelpOutline';
import RatingIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

interface QuizRulesPopupProps {
  onClose: () => void;
}

const QuizRulesPopup: React.FC<QuizRulesPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz-attempt');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        padding: 3,
        zIndex: 2,
      }}
    >
      <Typography variant="h4" align="center" mb={3}>
        Quiz Rules
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" mb={1}>
          <TimerIcon />
          <Typography ml={1}>5 questions, 5 mins</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <QuestionIcon />
          <Typography ml={1}>Total questions: 5</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <RatingIcon />
          <Typography ml={1}>50% Passing Criteria</Typography>
        </Box>
      </Box>
      <Typography align="center" mb={3}>
        ! This quiz can only be attempted once daily
      </Typography>
      <Button variant="contained"
          onClick={handleStart}
          sx={{
            display: "block",
            mx: "auto",
            borderRadius: "12px",
            marginBottom: "16px",
          }}>
        Start
      </Button>
    </Box>
  );
};

export default QuizRulesPopup;
