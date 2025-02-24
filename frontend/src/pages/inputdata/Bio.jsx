import React, { useState } from "react";
import { useAuthstore } from "../../store/useAuthstore";
import { Loader } from "lucide-react";

export default function Bio() {
  const { authUser, update, isUpdatingProfile } = useAuthstore();

  const [formdata, setFormData] = useState({
    biodata: authUser.biodata || "",
  });

  const handlesubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing
    update(formdata);
  };

  return (
    <form onSubmit={handlesubmit} className="p-4 max-w-md mx-auto bg-base-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">About Myself</h2>

      {/* Input Container */}
      <textarea
        className="w-full textarea textarea-bordered"
        placeholder="Write your bio here..."
        value={formdata.biodata}
        onChange={(e) => setFormData({ ...formdata, biodata: e.target.value })}
        rows="5"
        required
      ></textarea>

      {/* Save Button */}
      <button type="submit" className="mt-4 w-full btn btn-primary" disabled={isUpdatingProfile}>
        {isUpdatingProfile ? <Loader className="animate-spin" size={20} /> : "Save"}
      </button>

      {/* Display the Saved Bio */}
      <div className="mt-4 p-4 bg-base-200 border rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2 ">Your Saved Bio:</h3>
        <p className="text-base ">{formdata.biodata || "Your saved bio will appear here..."}</p>
      </div>
    </form>
  );
}
