import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Image, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "../Styles/CandidateProfile.css"; // Import CSS file

const CandidateProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUserDetails(parsedUser.id);
    } else {
      navigate("/login"); // Redirect if no user is logged in
    }
  }, [navigate]);

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:2000/users/${id}`);
      setUser(response.data);
      setUpdatedUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:2000/users/update/${user.id}`,
        updatedUser
      );
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/CandidateLogin");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`http://localhost:2000/users/${user.id}`);
        localStorage.removeItem("user");
        navigate("/register");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name; // "photo" or "resume"

    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      await axios.post(
        `http://localhost:2000/users/update/files/${user.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(`${fieldName} updated successfully!`);
      fetchUserDetails(user.id);
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  return (
    <Container className="dashboard-container">
      <Card className="dashboard-card">
        <Card.Body>
          <h2 className="text-center text-primary">
            {editing ? "Edit Profile" : `Welcome, ${user?.username}!`}
          </h2>

          {user?.photo && (
            <Image
              src={`http://localhost:2000/users/photo/${user.id}`}
              alt="Profile"
              className="profile-photo"
              roundedCircle
            />
          )}

          <Row className="mt-3">
            {/* Left Column - Personal Details */}
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Email:</strong></Form.Label>
                <Form.Control type="email" name="email" value={updatedUser?.email || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>

              <Form.Group>
                <Form.Label><strong>Date of Birth:</strong></Form.Label>
                <Form.Control type="date" name="dateOfBirth" value={updatedUser?.dateOfBirth || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>

              <Form.Group>
                <Form.Label><strong>Gender:</strong></Form.Label>
                <Form.Control as="select" name="gender" value={updatedUser?.gender || ""} onChange={handleInputChange} disabled={!editing}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>

              
              <Form.Group>
              <Form.Label><strong>Country:</strong></Form.Label>
               <Form.Control type="text" name="country" value={updatedUser?.country || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>


       <Form.Group>
            <Form.Label><strong>State:</strong></Form.Label>
            <Form.Control type="text" name="state" value={updatedUser?.state || ""} onChange={handleInputChange} readOnly={!editing} />
            </Form.Group>
           


<Form.Group>
  <Form.Label><strong>District:</strong></Form.Label>
  <Form.Control type="text" name="district" value={updatedUser?.district || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>

   <Form.Group>
                <Form.Label><strong>Address:</strong></Form.Label>
                <Form.Control type="text" name="address" value={updatedUser?.address || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>


<Form.Group>
  <Form.Label><strong>Pincode:</strong></Form.Label>
  <Form.Control type="text" name="pincode" value={updatedUser?.pincode || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>


<Form.Group>
  <Form.Label><strong>Subject:</strong></Form.Label>
  <Form.Control type="text" name="subject" value={updatedUser?.subject || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>

            </Col>

            {/* Right Column - Education & Work */}
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>10th School:</strong></Form.Label>
                <Form.Control type="text" name="tenthSchool" value={updatedUser?.tenthSchool || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>

              <Form.Group>
                <Form.Label><strong>10th Board:</strong></Form.Label>
                <Form.Control type="text" name="tenthBoard" value={updatedUser?.tenthBoard || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>

                  <Form.Group>
               <Form.Label><strong>10th Percentage:</strong></Form.Label>
                <Form.Control type="text" name="tenthPercentage" value={updatedUser?.tenthPercentage || ""} onChange={handleInputChange} readOnly={!editing} />
             </Form.Group>

             <Form.Group>
             <Form.Label><strong>UG College Name:</strong></Form.Label>
            <Form.Control type="text" name="ugCollegeName" value={updatedUser?.ugCollegeName || ""} onChange={handleInputChange} readOnly={!editing} />
             </Form.Group>
              <Form.Group>
                <Form.Label><strong>UG Degree:</strong></Form.Label>
                <Form.Control type="text" name="ugDegree" value={updatedUser?.ugDegree || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>

              <Form.Group>
                <Form.Label><strong>Work Experience (Years):</strong></Form.Label>
                <Form.Control type="number" name="yearsOfExperience" value={updatedUser?.yearsOfExperience || ""} onChange={handleInputChange} readOnly={!editing} />
              </Form.Group>
            

<Form.Group>
  <Form.Label><strong>Current Company:</strong></Form.Label>
  <Form.Control type="text" name="currentCompany" value={updatedUser?.currentCompany || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>

<Form.Group>
  <Form.Label><strong>Current Job Title:</strong></Form.Label>
  <Form.Control type="text" name="currentJobTitle" value={updatedUser?.currentJobTitle || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>

<Form.Group>
  <Form.Label><strong>Industry:</strong></Form.Label>
  <Form.Control type="text" name="industry" value={updatedUser?.industry || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>

<Form.Group>
  <Form.Label><strong>Expected Salary:</strong></Form.Label>
  <Form.Control type="text" name="expectedSalary" value={updatedUser?.expectedSalary || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>


          <Form.Group>
            <Form.Label><strong>Skills:</strong></Form.Label>
            <Form.Control type="text" name="skills" value={updatedUser?.skills || ""} onChange={handleInputChange} readOnly={!editing} />
          </Form.Group>
          
<Form.Group>
  <Form.Label><strong>Projects:</strong></Form.Label>
  <Form.Control as="textarea" rows={3} name="projects" value={updatedUser?.projects || ""} onChange={handleInputChange} readOnly={!editing} />
</Form.Group>
  </Col>
          </Row>

          {/* Resume Upload */}
          <Form.Group className="mt-3">
            <Form.Label><strong>Upload Resume:</strong></Form.Label>
            <Form.Control type="file" name="resume" onChange={handleFileUpload} />
          </Form.Group>

          {/* Resume Status */}
          {user?.resume ? (
            <p className="text-success">
              ✅ Resume Uploaded{" "}
              <a href={`http://localhost:2000/users/resume/${user.id}`} target="_blank" rel="noopener noreferrer" className="text-primary">
                (Download Resume)
              </a>
            </p>
          ) : (
            <p className="text-danger">❌ Resume Not Uploaded</p>
          )}

          {/* Profile Photo Upload */}
          <Form.Group className="mt-3">
            <Form.Label><strong>Upload Profile Photo:</strong></Form.Label>
            <Form.Control type="file" name="photo" onChange={handleFileUpload} />
          </Form.Group>


          {editing ? (
            <>
              <Button className="btn-success w-100 mt-3" onClick={handleSaveChanges}>Save Changes</Button>
              <Button className="btn-secondary w-100 mt-2" onClick={() => setEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button className="btn-primary w-100 mt-3" onClick={() => setEditing(true)}>Edit Profile</Button>
          )}

          <Button className="btn-danger w-100 mt-2" onClick={handleDeleteAccount}>Delete Account</Button>
          <Button className="btn-secondary w-100 mt-2" onClick={handleLogout}>Logout</Button>
<Button
  className="btn-warning w-100 mt-2"
  onClick={() => navigate("/available-tests", { 
    state: { 
      userId: user.id,
      subject: updatedUser?.subject 
    } 
  })}
>
  Take Exam
</Button>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default CandidateProfile;  

