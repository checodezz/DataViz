import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

const Filters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedAge,
  setSelectedAge,
  selectedGender,
  setSelectedGender,
  resetFilters,
}) => {
  return (
    <div>
      <h3 className="mb-4">Filters</h3>
      <div className="mb-3">
        <label className="form-label">Start Date:</label>
        <br />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="form-control"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Start Date"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">End Date:</label>
        <br />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="form-control"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select End Date"
        />
      </div>
      <div className="mb-3 col-md-5">
        <label className="form-label">Age:</label>
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="form-select"
        >
          <option value="15-25">15-25</option>
          <option value=">25">25 & Above</option>
        </select>
      </div>
      <div className="mb-3 col-md-5">
        <label className="form-label">Gender:</label>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="form-select"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <button onClick={resetFilters} className="btn btn-danger">
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
