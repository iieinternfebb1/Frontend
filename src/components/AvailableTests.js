import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Card, Button, Spinner, Form } from "react-bootstrap";
import axios from "axios";

const AttendTest = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId || null;
  const subject = location.state?.subject || null;

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch Questions Based on Subject
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:2000/questions");
      const filteredQuestions = response.data.filter((q) => q.subject === subject);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setErrorMessage("❌ Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Answer Selection
  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit Test with All Answers
  const handleSubmitTest = async () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert("⚠️ Please answer all questions before submitting!");
      return;
    }

    const answersList = questions.map((q) => ({
      questionId: q.id,
      userAnswer: selectedAnswers[q.id] || "",
    }));

    try {
      const response = await axios.post(`http://localhost:2000/tests/submit/${userId}`, answersList);

      if (response.data.includes("⚠️ You have already answered this question.")) {
        alert("⚠️ You have already answered some questions in this test.");
      } else {
        alert("✅ Test Submitted Successfully!");
        navigate("/results", { state: { userId } }); // Pass userId to Results Page
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("❌ Error submitting test. Please try again");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Attend Test - {subject}</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : errorMessage ? (
        <p className="text-center text-danger">{errorMessage}</p>
      ) : questions.length === 0 ? (
        <p className="text-center text-danger">No questions available for this subject.</p>
      ) : (
        questions.map((question) => (
          <Card key={question.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{question.questionText}</Card.Title>
              <Form>
                {["A", "B", "C", "D"].map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    label={question[`option${option}`]}
                    name={`question-${question.id}`}
                    value={question[`option${option}`]}
                    checked={selectedAnswers[question.id] === question[`option${option}`]}
                    onChange={() => handleAnswerChange(question.id, question[`option${option}`])}
                  />
                ))}
              </Form>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Submit Test Button */}
      <div className="text-center mt-4">
        <Button variant="success" onClick={handleSubmitTest}>
          Submit Test & View Results
        </Button>
      </div>
    </Container>
  );
};

export default AttendTest;
