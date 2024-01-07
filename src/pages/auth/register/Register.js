import React, { useState } from "react";
import { newRequest } from "../../../utils/newRequest";
import { toast } from "react-toastify";
import { setLocalStorage } from "../../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../../utils/validation";
import { initialUserState } from "../../../utils/data";

const Register = () => {
  const [userData, setUserData] = useState(initialUserState);
  const [userError, setUserError] = useState(null);
  let nav = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === "dateOfBirth" && value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        // If value is a valid date, convert it to "YYYY-MM-DD" format
        value = date.toISOString().split("T")[0];
      } else {
        // Handle invalid date input (optional)
        console.error("Invalid date input");
        return;
      }
    }

    // Handle nested location properties
    if (name.startsWith("location.")) {
      const locationProperty = name.split(".")[1];
      setUserData((prev) => {
        return {
          ...prev,
          location: {
            ...prev.location,
            [locationProperty]: value,
          },
        };
      });
    } else {
      setUserData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = async () => {
    try {
      let res = await newRequest.post("/user/create", userData);
      if (res.status === 200) {
        setLocalStorage(res?.data);
        toast.success("User created successfully");
        nav("/");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setUserError(error?.response?.data?.data);
      }
    }
  };

  const validatedForm = validateForm(userData);

  return (
    <div>
      <div className="flex items-center justify-center h-[150vh]">
        <div className="p-8 border rounded shadow-md h-auto w-[650px]">
          <h1 className="font-bold text-md mb-3 text-purple-500 uppercase">
            Register
          </h1>
          <div>
            <div>
              <label htmlFor="title" className="block text-sm text-gray-500">
                Title
              </label>
              <select
                id="title"
                name="title"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                <option value="" selected>
                  Select title
                </option>
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="ms">Ms</option>
                <option value="miss">Miss</option>
                <option value="dr">Dr</option>
              </select>
            </div>

            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              placeholder="firstname"
              name="firstName"
              onChange={handleChange}
            />
            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              name="lastName"
              placeholder="lastname"
              onChange={handleChange}
            />
            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <div>
              <label htmlFor="gender" className="block text-sm text-gray-500">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                <option value="" selected>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm text-gray-500">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <input
              type="number"
              className="border border-gray-300 p-3 w-full mt-3"
              name="phone"
              placeholder="+2347067796826"
              onChange={handleChange}
            />
            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              placeholder="post image url"
              name="picture"
              onChange={handleChange}
            />
            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              placeholder="street"
              name="location.street"
              onChange={handleChange}
            />
            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              placeholder="city"
              name="location.city"
              onChange={handleChange}
            />
            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              placeholder="state"
              name="location.state"
              onChange={handleChange}
            />
            <input
              type="text"
              className="border border-gray-300 p-3 w-full mt-3"
              placeholder="country"
              name="location.country"
              onChange={handleChange}
            />
          </div>
          <div
            className={`bg-blue-500 w-full p-4 mt-3 cursor-pointer text-center rounded-lg text-white ${
              validatedForm ? "" : "opacity-50 pointer-events-none"
            }`}
            onClick={handleSubmit}>
            Submit
          </div>
          {userError && (
            <div className="text-red-500 mb-4">
              {Object.entries(userError).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
