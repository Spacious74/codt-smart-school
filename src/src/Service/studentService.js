import { useState } from 'react';

export function useArrayService() {
  const [Studentarray, setStudentArray] = useState(null);

  // Function to update the array
  const updateArray = (newArray) => {
    setStudentArray(newArray); // Update the state with the new student data
  };

  return {
    Studentarray,
    updateArray,
  };
}
