const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  required,
}) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
