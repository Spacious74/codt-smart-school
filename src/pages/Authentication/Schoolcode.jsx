import React from "react";
import { Link, useNavigate } from "react-router-dom";
import signupimg from '../../images/signupimg.png';
import { useDispatch } from "react-redux";
import { setFormdata } from "../../redux/features/formSlice";

const Schoolcode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [schoolcode, setSchoolcode] = React.useState("");

  const handleChange = function (e) {
    setSchoolcode(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(setFormdata({ schoolcode }));
      navigate("/auth/selectclass");
    }
  };

  const handleNextClick = () => {
    dispatch(setFormdata({ schoolcode }));
    navigate("/auth/selectclass");
  };

  return (
    <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
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
            In which School Do you teach?
          </h3>
          <div className="flex flex-col space-y-4 px-4 2xl:px-20">
            <input
              onChange={handleChange}
              type="text"
              placeholder="School Code"
              className="border border-gray-300 p-2 rounded-lg"
              onKeyPress={handleKeyPress}
            />
            <p className="text-1xl 1xl:text-1xl px-4 1xl:px-20 py-0 text-start">
              This Code is given to your registered school, please ask your school to provide you the code.
            </p>
            <button
              onClick={handleNextClick}
              className="bg-[#503dff] text-white p-2 rounded-lg hover:bg-[#402bc8] transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schoolcode;
