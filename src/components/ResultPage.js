import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || null;
  const [scoreData, setScoreData] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchResults();
    }
  }, [userId]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/results/check/${userId}`);

      // Extract data properly
      setScoreData({
        totalQuestions: response.data.totalQuestions || 0,
        correctAnswers: response.data.correctAnswers || 0,
        wrongAnswers: response.data.wrongAnswers || 0,
        score: response.data.score || 0,
        subject: response.data.subject || "Unknown"
      });

      // Set answers array from response
      setResults(response.data.answers || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary">Test Results - {scoreData?.subject}</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : results.length === 0 ? (
        <p className="text-center text-danger">No results found.</p>
      ) : (
        <>
          {/* Display Overall Score Summary */}
          <Card className="p-4 shadow-sm mb-3">
            <h4>Total Questions: {scoreData.totalQuestions}</h4>
            <h4>Correct Answers: {scoreData.correctAnswers}</h4>
            <h4>Wrong Answers: {scoreData.wrongAnswers}</h4>
            <h4>Score: {scoreData.score}%</h4>
          </Card>

          {/* Display Individual Question Results */}
          {results.map((result, index) => (
            <Card key={index} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{result.questionText}</Card.Title>
                <p><strong>Your Answer:</strong> {result.userAnswer}</p>
                <p><strong>Correct Answer:</strong> {result.correctAnswer}</p>
                <p><strong>Result:</strong> {result.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </Container>
  );
};

export default ResultPage;
