import React, { useState } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormdata } from "../../redux/features/formSlice";

const ClassSelection = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = {
    Foundation: ["Preschool Year 1", "Preschool Year 2", "Preschool Year 3", "Class 1", "Class 2"],
    Preparatory: ["Class 3", "Class 4", "Class 5"],
    Middle: ["Class 6", "Class 7", "Class 8"],
    Secondary: ["Class 9", "Class 10", "Class 11", "Class 12"],
  };

  const divisions = ["Division A", "Division B", "Division C", "Division D", "Division E", "Division F", "Division G"];

  const handleClassClick = (className) => {
    setSelectedClasses((prev) =>
      prev.includes(className) ? prev.filter((c) => c !== className) : [...prev, className]
    );

    // Reset divisions for this class if it is deselected
    if (selectedClasses.includes(className)) {
      const newSelectedDivisions = { ...selectedDivisions };
      delete newSelectedDivisions[className];
      setSelectedDivisions(newSelectedDivisions);
    }
  };

  const handleDivisionClick = (className, division) => {
    setSelectedDivisions((prev) => ({
      ...prev,
      [className]: prev[className]
        ? prev[className].includes(division)
          ? prev[className].filter((d) => d !== division)
          : [...prev[className], division]
        : [division],
    }));
  };

  const handleNext = () => {
    if (selectedClasses.length > 0 && Object.values(selectedDivisions).some((divs) => divs.length > 0)) {
      dispatch(
        setFormdata({
          selectedClasses: [...selectedClasses],
        })
      );
      dispatch(
        setFormdata({
          selectedDivisions: { ...selectedDivisions },
        })
      );
      navigate("/auth/classhead", { state: { selectedClasses, selectedDivisions } });
    }
  };

  return (
    <Box textAlign="center" p={4}>
      {/* Logo */}
      <Box mb={3} display="flex" justifyContent="center" alignItems="center">
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
      </Box>

      {/* Heading */}
      <Typography variant="h5" mb={4} color="textSecondary">
        Select the classes you teach
      </Typography>

      {/* Class Selection Buttons */}
      {Object.entries(categories).map(([category, classList]) => (
        <Box key={category} mb={4}>
          <Typography variant="h6" color="textSecondary" mb={2}>
            {category}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {classList.map((className) => (
              <Grid item key={className}>
                <Button
                  variant={selectedClasses.includes(className) ? "contained" : "outlined"}
                  onClick={() => handleClassClick(className)}
                  sx={{
                    borderRadius: "8px",
                    px: 3,
                    py: 1.5,
                    fontSize: "1.2rem",
                    color: selectedClasses.includes(className) ? "#fff" : "#6a67ce",
                    borderColor: "#6a67ce",
                    backgroundColor: selectedClasses.includes(className) ? "#6a67ce" : "transparent",
                    "&:hover": {
                      backgroundColor: selectedClasses.includes(className)
                        ? "#6a67ce"
                        : "rgba(106, 103, 206, 0.1)",
                    },
                  }}
                >
                  {className}
                </Button>

                {selectedClasses.includes(className) && (
                  <Box textAlign="left" mt={2}>
                    <Grid container spacing={1} direction="column" mt={1}>
                      {divisions.map((division) => (
                        <Grid item key={division}>
                          <Button
                            variant={selectedDivisions[className]?.includes(division) ? "contained" : "outlined"}
                            onClick={() => handleDivisionClick(className, division)}
                            sx={{
                              borderRadius: "8px",
                              px: 2,
                              py: 1,
                              fontSize: "1rem",
                              color: selectedDivisions[className]?.includes(division) ? "#fff" : "#6a67ce",
                              borderColor: "#6a67ce",
                              backgroundColor: selectedDivisions[className]?.includes(division)
                                ? "#6a67ce"
                                : "transparent",
                              "&:hover": {
                                backgroundColor: selectedDivisions[className]?.includes(division)
                                  ? "#6a67ce"
                                  : "rgba(106, 103, 206, 0.1)",
                              },
                            }}
                          >
                            {division}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Next Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={selectedClasses.length === 0 || Object.values(selectedDivisions).every((divs) => divs.length === 0)}
          sx={{
            borderRadius: "8px",
            px: 3,
            py: 1.5,
            fontSize: "1.2rem",
            backgroundColor: "#6a67ce",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#5a57b6",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ClassSelection;