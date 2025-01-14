import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupimg from "../../images/signupimg.png";
import { useDispatch } from 'react-redux';
import { setFormdata } from "../../redux/features/formSlice";
const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Music",
  "Art",
  "Science",
  "Business",
  "Design",
  "I.T (Information Technology)",
  "Computer Science",
  "Physical Education",
  "French",
  "Spanish",
  "History",
  "Social Studies",
  "Philosophy",
  "Geography",
  "Drama",
  "Other",
];

const SubjectGrid = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();
  const dispatch= useDispatch()
  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
    
  };

  const handleNext = () => {
    dispatch(setFormdata({selectedSubject:[...selectedSubjects]}))
    navigate("/auth/chooseschool", { state: { selectedSubjects } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:border-strokedark dark:bg-boxdark">
      <div className="rounded-sm">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="hidden dark:block"
                  src="../../src/assets/logo.png"
                  alt="Logo"
                  style={{ width: "200px" }}
                />
                <img
                  className="dark:hidden"
                  src="../../src/assets/logo.png"
                  alt="Logo"
                  style={{ width: "200px" }}
                />
              </Link>

              <p className="text-lg 2xl:px-20">
                We create Smart Schools with our Technology
              </p>

              <img
                src={signupimg}
                alt="Signup"
                className="mt-4 mx-auto"
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          </div>

          <div className="w-full xl:w-1/2 p-6">
            <h3 className="text-2xl 2xl:text-3xl px-4 2xl:px-20 py-4 text-center">
              Select Your Subjects
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`border text-center p-2 rounded-lg transition-transform transform cursor-pointer 
                              ${selectedSubjects.includes(subject) ? "bg-blue-500 text-white" : "text-blue-500"}`}
                >
                  {subject}
                </div>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={selectedSubjects.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectGrid;
