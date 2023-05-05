import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { GradientContainer } from "../styled-components";
import { Question } from "../quizTypes";

// Dummy data
export const questions: Question[] = [
    {
        id: 1,
        question:
          "You are working on a large dataset in Excel, and you need to find the average of a specific range of cells, but only if the values in another range of cells meet a certain criterion. Which of the following functions would you use to achieve this?",
        options: [
          { id: 1, optionText: "AVERAGEIF" },
          { id: 2, optionText: "COUNTIF" },
          { id: 3, optionText: "AVERAGEIFS" },
          { id: 4, optionText: "SUMIF" },
        ],
        correctOptionId: 1,
      },
      {
        id: 2,
        question:
          "You are working on a sales report in Excel and want to apply a specific format to the cells containing the total sales values. The format should be applied only if the value in the cell is greater than $5,000. Which of the following features in Excel allows you to achieve this?",
        options: [
          { id: 1, optionText: "Cell Styles" },
          { id: 2, optionText: "Conditional Formatting" },
          { id: 3, optionText: "Format Cells" },
          { id: 4, optionText: "Data Validation" },
        ],
        correctOptionId: 2,
      },
      {
        id: 3,
        question:
          "You need to create a drop-down list in a cell that allows users to choose from a predefined list of options. Which Excel feature would you use to accomplish this task?",
        options: [
          { id: 1, optionText: "Data Validation" },
          { id: 2, optionText: "PivotTable" },
          { id: 3, optionText: "Conditional Formatting" },
          { id: 4, optionText: "Cell Styles" },
        ],
        correctOptionId: 1,
      },
      {
        id: 4,
        question:
          "You are working on an Excel worksheet and need to identify duplicate values within a specific column. Which of the following methods can you use to achieve this?",
        options: [
          { id: 1, optionText: "Conditional Formatting" },
          { id: 2, optionText: "Remove Duplicates feature" },
          { id: 3, optionText: "COUNTIF function" },
          { id: 4, optionText: "All of the above" },
        ],
        correctOptionId: 4,
      },
      {
        id: 5,
        question:
          "You are asked to create a dynamic summary report in Excel that can quickly analyze large amounts of data, and you need the ability to easily rearrange the data fields to get different views of the data. Which of the following features in Excel would be best suited for this task?",
        options: [
          { id: 1, optionText: "Subtotal" },
          { id: 2, optionText: "PivotTable" },
          { id: 3, optionText: "Data Validation" },
          { id: 4, optionText: "Conditional Formatting" },
        ],
        correctOptionId: 2,
      },{
        id: 6,
        question:
        "You are working on an Excel sheet that contains a list of products and their prices. You want to calculate the total cost for each product, including a 5% sales tax. How would you calculate the total cost, including the tax, for each product?",
        options: [
        { id: 1, optionText: "Multiply the price by 1.05" },
        { id: 2, optionText: "Multiply the price by 0.05 and then add the price" },
        { id: 3, optionText: "Divide the price by 0.95" },
        { id: 4, optionText: "Add 5 to the price" },
        ],
        correctOptionId: 1,
        },
];

const QuizAttempt: React.FC = () => {
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Initialize start time for the first question
    setStartTimes((prevStartTimes) => {
      const newStartTimes = [...prevStartTimes];
      newStartTimes[0] = new Date().getTime();
      return newStartTimes;
    });

    const countdown = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const [startTimes, setStartTimes] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  const [questionTimeLimits, setQuestionTimeLimits] = useState<number[]>(
    Array(questions.length).fill(60)
  );

  useEffect(() => {
    if (timer <= 0) {
      handleNext();
    }

    const countdown = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (questionId: number, optionId: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };
  const handleSubmit = () => {
    // Calculate the score
    let score = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctOptionId) {
        score++;
      }
    });

    navigate("/quiz-result", {
      state: { score, timeTakenArray: calculateTimeTaken() },
    });
  };

  const handleNext = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);

    if (nextQuestionIndex < questions.length) {
      setTimer(questionTimeLimits[nextQuestionIndex]);

      // Update start times
      setStartTimes((prevStartTimes) => {
        const newStartTimes = [...prevStartTimes];
        newStartTimes[nextQuestionIndex] = new Date().getTime();
        return newStartTimes;
      });
    } else {
      handleSubmit();
    }
  };
  const calculateTimeTaken = () => {
    const currentTime = new Date().getTime();
    const timeTakenArray = startTimes.map((startTime, index) => {
      if (index === currentQuestionIndex) {
        return (currentTime - startTime) / 1000;
      }
      return (startTimes[index + 1] - startTime) / 1000;
    });
    return timeTakenArray;
  };

  const question = questions[currentQuestionIndex];

  return (
    <GradientContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="quiz-attempt"
      >
        <Box
          textAlign="center"
          style={{
            background: "linear-gradient(45deg, #4A148C, #880E4F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <h2>Attempt Quiz</h2>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            mx: {
              xs: 3,
              md: 3,
              sm: 3,
            },
          }}
          mb={4}
        >
          <Box
            style={{ color: "white" }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",

              borderRadius: "10px",
              p: 1,
              width: "10%",
              height: "20px",
            }}
          >
            <h5>
              {currentQuestionIndex + 1}/{questions.length}
            </h5>
          </Box>
          <Box
            style={{ color: "white" }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              borderRadius: "10px",
              p: 1,
              width: "10%",
              height: "20px",
            }}
          >
            <h5>{timer}s</h5>
          </Box>
        </Box>
        <Box
          sx={{
            mx: {
              xs: 3,
              md: 3,
              sm: 3,
            },
          }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl key={question.id} component="fieldset">
              <FormLabel component="legend" style={{ color: "white" }}>
                {question.question}
              </FormLabel>
              <RadioGroup
                style={{ color: "white" }}
                value={selectedAnswers[question.id] || ""}
                onChange={(e) =>
                  handleChange(question.id, parseInt(e.target.value))
                }
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.optionText}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    display: "block", 
                    mx: "auto", 
                    borderRadius: "12px", 
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={timer <= 0}
                  sx={{
                    display: "block", 
                    mx: "auto", 
                    borderRadius: "12px", 
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </motion.div>
    </GradientContainer>
  );
};

export default QuizAttempt;
