const About = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">About This Dashboard</h2>
      <div className="card mb-4 shadow-sm border-light">
        <div className="card-body">
          <h4 className="card-title text-success">
            <i className="bi bi-bar-chart-fill me-2"></i>
            Bar Chart
          </h4>
          <p className="card-text">
            The Bar Chart displays the total time spent by users on various
            features (A, B, C, etc.) on the x-axis, while the y-axis represents
            the features in the product. Each bar corresponds to a specific
            feature, and the width of the bar indicates the amount of time users
            have engaged with that feature. This allows you to quickly identify
            which features are the most utilized by users.
          </p>
        </div>
      </div>
      <div className="card mb-4 shadow-sm border-light">
        <div className="card-body">
          <h4 className="card-title text-success">
            <i className="bi bi-line-chart-fill me-2"></i>
            Line Chart
          </h4>
          <p className="card-text">
            By clicking on a bar from the Bar Chart, you can view a Line Chart
            displaying the time trend for that specific feature over time. This
            line chart allows you to pan and zoom in and out to explore
            different time ranges, enabling you to observe how engagement with
            that feature has changed over time.
          </p>
        </div>
      </div>
      <div className="card mb-4 shadow-sm border-light">
        <div className="card-body">
          <h4 className="card-title text-success">
            <i className="bi bi-funnel-fill me-2"></i>
            Filters
          </h4>
          <p className="card-text">
            The Filters allow you to refine the data displayed in the charts
            based on demographic criteria such as age and gender. You can also
            select a date range to analyze the time spent on features within
            that specific period. This functionality helps you tailor the data
            to your specific interests and needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
