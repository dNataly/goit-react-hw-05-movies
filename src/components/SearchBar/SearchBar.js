import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [requestName, setRequestName] = useState("");

  const handleNameChange = (e) => {
    setRequestName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (requestName.trim() === "") {
      return toast.error("Please enter a correct name");
    }

    onSubmit(requestName);
    setRequestName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className={s.searchInput} placeholder="Search movie by name" value="requestName" onChange={handleNameChange}></input>
      <button type="submit" className={s.searchBtn}>
        Search
      </button>
    </form>
  );
}
