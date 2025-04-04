import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Alert, Table } from "react-bootstrap";

const AdminQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject: "",
  });

  const [bulkQuestions, setBulkQuestions] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [message, setMessage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:2000/questions");
      setQuestions(response.data);
      extractSubjects(response.data);
    } catch (error) {
      setMessage("Error fetching questions");
    }
  };

  const extractSubjects = (questions) => {
    const uniqueSubjects = [...new Set(questions.map((q) => q.subject))];
    setSubjects(uniqueSubjects);
  };

  const fetchQuestionsBySubject = async (subject) => {
    setSelectedSubject(subject);

    if (subject === "All") {
      fetchQuestions();
      return;
    }

    try {
      const response = await axios.get(`http://localhost:2000/questions/subject/${subject}`);
      setQuestions(response.data);
      setMessage(`Showing questions for subject: ${subject}`);
    } catch (error) {
      setMessage("Error fetching questions by subject");
    }
  };

  const handleInputChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleBulkInputChange = (e) => {
    setBulkQuestions(e.target.value);
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    try {
      if (editingQuestionId) {
        await axios.put(`http://localhost:2000/questions/update/${editingQuestionId}`, question);
        setMessage("Question updated successfully!");
        setEditingQuestionId(null);
      } else {
        await axios.post("http://localhost:2000/questions", question);
        setMessage("Question added successfully!");
      }
      setQuestion({ questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "", subject: "" });
      fetchQuestions();
    } catch (error) {
      setMessage("Error saving question");
    }
  };

  const uploadBulkQuestions = async () => {
    try {
      const parsedQuestions = JSON.parse(bulkQuestions);
      if (!Array.isArray(parsedQuestions)) {
        throw new Error("Invalid JSON format. Expecting an array of questions.");
      }

      await axios.post("http://localhost:2000/questions/bulk", parsedQuestions);
      setMessage("Bulk questions added successfully!");
      setBulkQuestions("");
      fetchQuestions();
    } catch (error) {
      setMessage("Error uploading bulk questions. Ensure valid JSON format.");
    }
  };

  const editQuestion = (q) => {
    setQuestion(q);
    setEditingQuestionId(q.id);
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/questions/${id}`);
      setMessage(`Question with ID ${id} deleted.`);
      fetchQuestions();
    } catch (error) {
      setMessage("Error deleting question");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Admin Question Management</h2>

      {message && <Alert variant="info">{message}</Alert>}

      {/* Add / Edit Question Form */}
      <Form onSubmit={submitQuestion} className="border p-3 rounded shadow-sm mb-4">
        <h4>{editingQuestionId ? "Edit Question" : "Add Question"}</h4>
        <Form.Group>
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" name="questionText" value={question.questionText} onChange={handleInputChange} required />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Option A</Form.Label>
              <Form.Control type="text" name="optionA" value={question.optionA} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Option B</Form.Label>
              <Form.Control type="text" name="optionB" value={question.optionB} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Option C</Form.Label>
              <Form.Control type="text" name="optionC" value={question.optionC} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Option D</Form.Label>
              <Form.Control type="text" name="optionD" value={question.optionD} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Correct Answer</Form.Label>
          <Form.Control type="text" name="correctAnswer" value={question.correctAnswer} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" name="subject" value={question.subject} onChange={handleInputChange} required />
        </Form.Group>

        <Button variant={editingQuestionId ? "warning" : "primary"} type="submit" className="mt-3">
          {editingQuestionId ? "Update Question" : "Add Question"}
        </Button>
      </Form>

      {/* Bulk Upload Section */}
      <h4>Bulk Upload Questions (JSON Format)</h4>
      <Form.Group>
        <Form.Control as="textarea" rows={6} value={bulkQuestions} onChange={handleBulkInputChange} placeholder='[{"questionText":"Sample?", "optionA":"A", "optionB":"B", "optionC":"C", "optionD":"D", "correctAnswer":"A", "subject":"Math"}]' />
      </Form.Group>
      <Button variant="success" className="mt-2" onClick={uploadBulkQuestions}>
        Upload Bulk Questions
      </Button>

      {/* Filter by Subject using Buttons */}
      <h4>Filter Questions by Subject</h4>
      <div className="mb-3">
        <Button variant="secondary" className="me-2" onClick={() => fetchQuestionsBySubject("All")}>
          Show All
        </Button>
        {subjects.map((subject) => (
          <Button key={subject} variant="info" className="me-2" onClick={() => fetchQuestionsBySubject(subject)}>
            {subject}
          </Button>
        ))}
      </div>

      {/* Questions Table */}
      <h4>All Questions</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Option C</th>
            <th>Option D</th>
            <th>Correct Answer</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.questionText}</td>
              <td>{q.optionA}</td>
              <td>{q.optionB}</td>
              <td>{q.optionC}</td>
              <td>{q.optionD}</td>
              <td>{q.correctAnswer}</td>
              <td>{q.subject}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => editQuestion(q)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => deleteQuestion(q.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminQuestion;
