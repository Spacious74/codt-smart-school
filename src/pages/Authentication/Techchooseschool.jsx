import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupimg from '../../images/signupimg.png';
import { useDispatch } from "react-redux";
import { setFormdata } from "../../redux/features/formSlice";

const Techchooseschool = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [formdata , setFormData]=useState({
    schoolName:"",
    city:"",
    pincode:"",
    state:"",
  })
  const handlechange=(e)=>{
    const {name,value}=e.target;
    setFormData((pre)=>({
      ...pre,[name]:value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch(setFormdata({
    //   schoolName:formdata.schoolName,
    // city:formdata.city,
    // pincode:formdata.pincode,
    // state:formdata.state,
    // }))
    

    navigate("/auth/schoolcode");
  };

  return (
    <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center justify-center">
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
            In which School Do you teach?
          </h3>
          <form className="flex flex-col space-y-4 px-4 2xl:px-20" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="School Name"
              name="schoolName"
              value={formdata.schoolName}
              onChange={handlechange}
              className="border border-gray-300 p-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formdata.city}
              onChange={handlechange}
              className="border border-gray-300 p-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Pin Code"
              name="pincode"
              value={formdata.pincode}
              onChange={handlechange}
              className="border border-gray-300 p-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formdata.state}
              onChange={handlechange}
              className="border border-gray-300 p-2 rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Techchooseschool;
