const Footer = () => {
  const iconStyle = {
    fontSize: "1.5rem",
    color: "#333",
    margin: "0 1rem",
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.color = "#007bff";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.color = "#333";
  };

  return (
    <footer className="text-center py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="text-muted">
          © {new Date().getFullYear()} All rights reserved.
        </div>
        <div>
          <a
            href="https://github.com/checodezz/"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <i className="bi bi-github" aria-hidden="true"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/checodezz/"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <i className="bi bi-linkedin" aria-hidden="true"></i>
          </a>
          <a
            href="https://chethankumar.in/"
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <i className="bi bi-person" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
