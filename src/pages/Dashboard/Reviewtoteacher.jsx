import React, { useEffect, useState } from "react";
import { fetchData } from "../../src/Service/apiService";
import Submitteachersreview from "./submitteachersreview.jsx";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const TeacherData = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [filteredData, setFilteredData] = useState(null);

  const storedStud = localStorage.getItem("stud");
  const [uid, setUid] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [classesu, setClassuser] = useState("");
  const [div, setDiv] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = (teacherId) => {
    localStorage.setItem('tid', teacherId);  // Save the teacher's ID in localStorage
    setOpenDialog(true);
  };  const handleDialogClose = () => setOpenDialog(false);

  useEffect(() => {
    
    if (storedStud) {



      const stud = JSON.parse(storedStud);
      const { user_id, schoolcode, grade, division } = stud.data;
      alert(stud.data)



      setUid(user_id);
      setSchoolCode(schoolcode);
      setClassuser(grade);
      setDiv(division);




    } else {
      console.log("No user data found in localStorage.");
    }
  }, [storedStud]);

  const fetchTeacherData = async () => {
    if (!classesu || !div) {
      setError("Grade or division is not set correctly.");
      setLoading(false);
      return;
    }

    try {
      const query = `
        SELECT * FROM teachers 
        WHERE schoolcode = '${schoolCode}' 
        AND class_selection LIKE '%${classesu}%' 
        AND selected_divisions LIKE '%${div}%';
      `;

      const { data, error: fetchError } = await fetchData(query);
      if (fetchError) throw new Error(fetchError);

      if (data?.length > 0) {
        setTeacherData(data);
        setFilteredData(data);
      } else {
        setError("No teacher data found.");
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError("Error occurred while fetching teacher data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) fetchTeacherData();
  }, [uid]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={errorStyle}>Error: {error}</div>;

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Teacher Data</h1>

      {filteredData ? (
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={centerAlign}>First Name</th>
              <th style={centerAlign}>Last Name</th>
              <th style={centerAlign}>Email</th>
              <th style={centerAlign}>Phone Number</th>
              <th style={centerAlign}>City</th>
              <th style={centerAlign}>State</th>
              <th style={centerAlign}>Experience</th>
              <th style={centerAlign}>Action</th>
            </tr>
          </thead>
          <tbody style={tbodyStyle}>
            {currentRows?.map((teacher) => (
              <tr key={teacher.id} style={rowStyle}>
                <td>{teacher.first_name}</td>
                <td>{teacher.last_name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone_number}</td>
                <td>{teacher.city}</td>
                <td>{teacher.state}</td>
                <td>{teacher.experience}</td>
                <td>
                  <Button
                    variant="contained"
                    onClick={() => handleDialogOpen(teacher.id)} // Pass teacher.id to handleDialogOpen
                    sx={{
                      backgroundColor: "#503dff",
                      color: "white",
                      "&:hover": { backgroundColor: "#3d2bb0" },
                    }}
                    aria-label="Submit review for teacher"
                  >
                    Review
                  </Button>

                  <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Submit Teacher Review</DialogTitle>
                    <DialogContent>
                      <Submitteachersreview />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No teacher data available.</div>
      )}

      <div style={paginationStyle}>
        {currentPage > 1 && (
          <button style={buttonStyle} onClick={handlePreviousPage}>
            Previous
          </button>
        )}
        {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }).map(
          (_, i) => (
            <button
              key={i}
              style={buttonStyle}
              onClick={() => paginate(i + 1)}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </button>
          )
        )}
        {currentPage < Math.ceil(filteredData.length / rowsPerPage) && (
          <button style={buttonStyle} onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const containerStyle = { padding: "20px", backgroundColor: "#f4f4f9" };
const headerStyle = { textAlign: "center", color: "#503dff", marginBottom: "20px", fontSize: "28px", fontWeight: "bold" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" };
const theadStyle = { backgroundColor: "#503dff", color: "white", textAlign: "left", padding: "15px", fontSize: "16px" };
const tbodyStyle = { backgroundColor: "white", color: "black" };
const rowStyle = { borderBottom: "1px solid #ddd", padding: "12px", textAlign: "center" };
const paginationStyle = { display: "flex", justifyContent: "center", marginTop: "20px" };
const buttonStyle = { backgroundColor: "#503dff", color: "white", border: "none", padding: "10px 15px", margin: "0 5px", cursor: "pointer", borderRadius: "5px", fontSize: "14px" };
const errorStyle = { color: "red", textAlign: "center", margin: "20px" };
const centerAlign ={textAlign: "center"}
export default TeacherData;
