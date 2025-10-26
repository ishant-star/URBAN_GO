import React, { useState } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { IoPerson } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaPaperPlane, FaPhone, FaTag } from "react-icons/fa6";
import { LuMessageSquareMore } from "react-icons/lu";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    inquiry: "",
    message: "",
  });

  const [success, setSuccess] = useState(""); // For success/failure message
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method:"post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setSuccess("✅ Message sent successfully!");
        setFormData({ name: "", email: "", telephone: "", inquiry: "", message: "" }); // clear form
      } else {
        setError(`❌ Failed to send message: ${data.error || data.message || 'Unknown error'}`);
      }
    } catch (e) {
      console.error("Network error:", e);
      setError(`❌ Failed to send message: ${e.message}`);
    }
  };

  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-green-900 flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden w-full max-w-full">
        {/* Add custom CSS styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;600&display=swap');
          
          .font-cursive {
            font-family: 'Dancing Script', cursive;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .contact-form-container {
            background: rgba(5, 46, 22, 0.6);
            backdrop-filter: blur(8px);
            border-radius: 20px;
            box-shadow:
              0 10px 25px rgba(0,0,0,0.4),
              inset 0 0 0 1px rgba(52, 211, 153, 0.2);
            padding: 30px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .contact-form-container:hover {
            box-shadow:
              0 15px 35px rgba(0,0,0,0.5),
              inset 0 0 0 1px rgba(52, 211, 153, 0.3);
          }
          
          .form-field {
            position: relative;
            transition: all 0.3s ease;
          }
          
          .form-field:hover {
            transform: translateY(-2px);
          }
          
          .form-input, .form-textarea {
            width: 100%;
            padding: 15px 15px 15px 45px;
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(6, 78, 59, 0.4);
            font-family: 'Poppins', sans-serif;
            color: #d1fae5;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .form-input::placeholder, .form-textarea::placeholder {
            color: #a7f3d0;
            opacity: 0.7;
          }
          
          .form-input:focus, .form-textarea:focus {
            outline: none;
            border-color: #34d399;
            box-shadow:
              0 0 0 3px rgba(52, 211, 153, 0.25),
              inset 0 2px 4px rgba(0,0,0,0.2);
            background: rgba(6, 78, 59, 0.6);
          }
          
          .form-textarea {
            min-height: 150px;
            padding-left: 45px;
          }
          
          .submit-button {
            width: 100%;
            background: linear-gradient(to right, #10b981, #34d399);
            color: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(5, 150, 105, 0.2);
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            font-family: 'Poppins', sans-serif;
          }
          
          .submit-button::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -60%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.4) 50%,
              rgba(255,255,255,0) 100%
            );
            transform: rotate(30deg);
            transition: all 0.6s ease;
          }
          
          .submit-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 7px 14px rgba(5, 150, 105, 0.3);
            background: linear-gradient(to right, #059669, #10b981);
          }
          
          .submit-button:hover::after {
            left: 120%;
          }
          
          .submit-button:active {
            transform: translateY(1px);
            box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);
          }
        ` }} />
        
        <div className="w-full max-w-md z-10">
          <div className="flex flex-col items-center justify-center mt-15">
            <h1 className="text-4xl sm:text-5xl font-semibold text-center text-emerald-100 whitespace-nowrap">
              Contact Fresh Grocers
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-green-300 rounded-full mt-4"></div>
          </div>

          <div className="contact-form-container relative overflow-hidden">
          {/* Success / Error Messages */}
          {success && (
            <p className="bg-green-900 text-green-400 px-4 py-2 rounded mb-4 animate-bounce">
              {success}
            </p>
          )}
          {error && (
            <p className="bg-red-900 text-red-400 px-4 py-2 rounded mb-4 animate-bounce">
              {error}
            </p>
          )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Success / Error Messages */}
              {success && (
                <p className="bg-green-900 text-green-400 px-4 py-2 rounded mb-4 animate-bounce">
                  {success}
                </p>
              )}
              {error && (
                <p className="bg-red-900 text-red-400 px-4 py-2 rounded mb-4 animate-bounce">
                  {error}
                </p>
              )}

              {/* Name */}
              <div className="form-field">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoPerson className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChanges}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-field">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMdMail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChanges}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Telephone */}
              <div className="form-field">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    name="telephone"
                    placeholder="1234567890"
                    value={formData.telephone}
                    onChange={handleChanges}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Inquiry */}
              <div className="form-field">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTag className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    name="inquiry"
                    placeholder="Order Inquiry"
                    value={formData.inquiry}
                    onChange={handleChanges}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-field">
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <LuMessageSquareMore className="h-5 w-5 text-emerald-400" />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={handleChanges}
                    required
                    className="form-textarea"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-button"
              >
                <span className="font-semibold text-xl text-black mr-2">Send Message</span>
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
