// src/features/formSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  schoolName: "",
  educationalBoard: "",
  address: "",
  city: "",
  pinCode: "",
  state: "",
  subjects: "",
  schoolcode: "",
  selectedClasses: [],
  selectedDivisions: {},
  selectedSubject: [],
  selectedClass: "",
  selectedDivision: "",
  password: "",
  image: null,
  // For other pages' data
};


// Create async thunk to send data to the backend
export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://codtsmartschool.strangeweb.in/teacherapi/teacherreg.php",
        formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        
      ); 
      
  
      
      // if(response.data.success){
      //   useNavigate()('/teacher/home');
      // }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormdata: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFormdata, resetForm } = formSlice.actions;

export default formSlice.reducer;
