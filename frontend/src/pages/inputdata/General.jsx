import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore";

const General = (props) => {
  const { authUser, update } = useAuthstore();

  // const [fullName, setFullName] = useState(props.fullName);
  // const [email, setEmail] = useState(props.email);
  // const [graduationYear, setGraduationYear] = useState("");
  // const [branch, setBranch] = useState("");

  const [formdata, setFormData] = useState({
    fullName: authUser.fullName,
    email: authUser.email,
    graduationYear: "",
    branch: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formdata.graduationYear) {
      alert("Please select a graduation year.");
      return;
    }

    if (!formdata.graduationYear) {
      alert("Please select a branch.");
      return;
    }
    if (formdata.fullName === "" || formdata.email === "" || formdata.graduationYear === "" || formdata.branch === "") {
      toast.error("Please fill all the fields");
      return;
    }
    else {
      update(formdata);
    }
    console.log("Collected User Information:", formdata);
    alert("User information collected successfully!");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-base-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium text-secondary">Full Name</label>
          <input
            type="text"
            value={formdata.fullName}
            onChange={(e) => setFormData({ ...formdata, fullName: e.target.value })}
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-secondary">Email Address</label>
          <input
            type="email"
            value={formdata.email}
            onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-secondary">Graduation Year</label>
          <select
            value={formdata.graduationYear}
            onChange={(e) => setFormData({ ...formdata, graduationYear: e.target.value })}
            className="w-full select select-bordered"
            required
          >
            <option value="" disabled>Select your graduation year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-secondary">Branch</label>
          <select
            value={formdata.branch}
            onChange={(e) => setFormData({ ...formdata, branch: e.target.value })}
            className="w-full select select-bordered"
            required
          >
            <option value="" disabled>Select your branch</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
        </div>

        <button type="submit" className="w-full btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default General;
