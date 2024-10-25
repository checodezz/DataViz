
# Interactive Data Visualization Dashboard

An interactive dashboard built with the MERN stack, enabling users to explore and analyze large datasets through dynamic charts and advanced filtering options. This project aims to provide insights into data trends, feature usage, and user engagement.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [ETL Process](#etl-process)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Dynamic Charts**: Visualize data trends using bar and line charts.
- **Advanced Filtering**: Filter data by date range, age, and gender for tailored insights.
- **User Authentication**: Secure access with user authentication and session management.
- **Responsive Design**: Optimized for various screen sizes for seamless user experience.
- **Real-time Updates**: Fetch data dynamically to ensure the latest information is displayed.

## Tech Stack

- **Frontend**: React, Redux Toolkit, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Charting Library**: Chart.js
- **Data Integration**: Google Sheets API for ETL
- **Deployment**: Vercel

## ETL Process

This project uses an **ETL (Extract, Transform, Load)** process to fetch and store data from a Google Sheet, allowing up-to-date information for analytics. The process involves:

1. **Extract**: Accessing data from a Google Sheet using Google’s Sheets API and Service Account for authentication. Credentials are securely stored in environment variables.
2. **Transform**: Cleaning and formatting the extracted data for consistency and usability, transforming fields such as "Day," "Age," and "Gender" into usable formats.
3. **Load**: Saving the transformed data into a MongoDB database for efficient access, where it is continuously updated by clearing old entries and inserting new data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/data-visualization-dashboard.git
   cd data-visualization-dashboard
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd server
   npm install
   ```

3. Configure environment variables in `.env` for the `server`:
   - MongoDB URI
   - Google Sheets API credentials (`client_email` and `private_key`)

4. Start the development servers:
   ```bash
   # Start the backend server
   cd server
   npm start

   # Start the frontend server
   cd client
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:5173` to access the dashboard.
- Use the filters to customize your data view.
- Click on any feature in the bar chart to display its timeline in the line chart below.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Acknowledgments

- Thanks to the open-source community for their contributions and resources.
- Special thanks to [Chart.js](https://www.chartjs.org/) for their excellent charting library.
- Thanks to Google Sheets API for providing easy-to-integrate data access.
