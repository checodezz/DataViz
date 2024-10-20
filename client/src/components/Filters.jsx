import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="bg-light p-4 rounded">
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
      <div className="mb-3 col-md-7">
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
      <div className="mb-3 col-md-6">
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
      <section className="my-4">
        <button onClick={resetFilters} className="btn btn-outline-danger ">
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Filters;
