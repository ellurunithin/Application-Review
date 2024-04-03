import React, { useState, useEffect } from 'react';

// Sample data for demonstration
const sampleStudentData = [
  { id: 1, name: 'Keerthana', Course: 'A/ML', email: 'Keerthana@example.com' },
  { id: 2, name: 'Harshitha', Course: 'Python Programming', email: 'harshitha@example.com' },
  { id: 3, name: 'Likhitha', Course: 'ADS', email: 'likhitha@example.com' },
];

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [deniedApplications, setDeniedApplications] = useState([]);

  // Fetch student details from the database
  useEffect(() => {
    // Simulated fetch call
    setTimeout(() => {
      setStudents(sampleStudentData);
    }, 1000); // Simulating a delay
  }, []);

  // Function to handle accept button click
  const handleAccept = (id, email, name) => {
    // Implement logic to accept the student
    setAcceptedApplications([...acceptedApplications, { id, name }]);
    sendNotification(email, 'Accepted', name);
  };

  // Function to handle deny button click
  const handleDeny = (id, email, name) => {
    // Implement logic to deny the student
    setDeniedApplications([...deniedApplications, { id, name }]);
    sendNotification(email, 'Denied', name);
  };

  // Function to send notification via email
  const sendNotification = (email, status, name) => {
    // Simulated email sending
    console.log(`Notification sent to ${email} - Student ${name} ${status}`);
    // Update the student status to indicate that mail has been sent
    const updatedStudents = students.map(student => {
      if (student.email === email) {
        return { ...student, mailSent: true };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Review Dashboard</h1>
      <div>
        <p style={{ color: 'blue' }}>Search for:</p>
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <h2>Applications</h2>
        {filteredStudents.map(student => (
          <div key={student.id} style={{ border: '1px solid black', padding: '10px', margin: '10px', position: 'relative' }}>
            <ReviewCard student={student} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
              <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '8px 16px', borderRadius: '4px' }} onClick={() => handleAccept(student.id, student.email, student.name)}>Accept</button>
              <button style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '4px' }} onClick={() => handleDeny(student.id, student.email, student.name)}>Deny</button>
            </div>
            {student.mailSent && <p style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: 'green', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>Mail Sent!!</p>}
          </div>
        ))}
      </div>
      <div>
        <h2>Accepted Applications</h2>
        {acceptedApplications.map(application => (
          <div key={application.id}>
            <p>{application.name}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Denied Applications</h2>
        {deniedApplications.map(application => (
          <div key={application.id}>
            <p>{application.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ student }) => {
  const { name, Course } = student;

  return (
    <div>
      <h3>{name}</h3>
      <p>Course: {Course}</p>
    </div>
  );
};

export default Dashboard;
