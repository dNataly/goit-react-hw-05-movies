import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [requestName, setRequestName] = useState('');

  const handleNameChange = event => {
    setRequestName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (requestName.trim() === '') {
      return toast.error('Please enter a correct name!');
    }

    onSubmit(requestName);
    setRequestName('');
  };

  return (
    <form onSubmit={handleSubmit} className="reviews__text">
      <input
        className="input__search"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movie by name"
        value={requestName}
        onChange={handleNameChange}
      />
      <button type="submit" className="button__search">
        <span>Search</span>
      </button>
    </form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
