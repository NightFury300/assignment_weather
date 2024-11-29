# Weather API Web Application

[Live Project](https://assignment-weather-green.vercel.app/api/v1/users/weather)
[Github Page](https://github.com/NightFury300/assignment_weather)

This is a web-based application for displaying and managing weather data for various cities. Users can view real-time weather information, set thresholds for temperature and conditions, and receive alerts based on the specified criteria. The application fetches weather data from an external API and provides a user-friendly interface to interact with the data.

## Features
- **View Weather Data** for metro cities, including:
  - Temperature
  - Feels Like
  - Weather Condition
  - Last Updated Time
- **Set Thresholds** for temperature and weather conditions, along with counters for alerts.
- **Receive Alerts** when specified thresholds are met.
- **Save Weather Data** to a database for persistence and later retrieval.
- **Roll Up Daily Summary** of weather data at the end of the day (11:55 PM Local Time) to aggregate statistics such as average, maximum, and minimum temperatures, and the dominant weather condition for each city, stored in the database.
- **Toggle Temperature Units** between Celsius and Fahrenheit for user preference.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript (with Fetch API for asynchronous data retrieval)
- **Database**: MongoDB (for saving and aggregating weather data)

## Dependencies
To run this application, the following dependencies are required:
```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "mongoose": "^8.5.1",
    "node-cron": "^3.0.3"
},
"devDependencies": {
    "nodemon": "^3.1.4"
}
```

## Steps To Set Up

1. Clone the repository using:
   ```sh
   git clone https://github.com/NightFury300/assignment_weather.git
   ```
2. Change directory to the `assignment_weather` folder which contains the source files:
   ```sh
   cd assignment_weather
   ```
3. Install all the dependencies:
   ```sh 
   npm install
   ```
4. Set up the `.env` file to use your API Key and modify the `MONGODB_URI` in the `.env` file and `DB_NAME` in `constants.js` if you want to use your own database URI and port.
5. Start the application:
   ```sh 
   npm run dev
   ```
6. Access the application at:
   ```sh 
   http://localhost:3000/api/v1/users/weather/
   ```

## API Endpoints
- **Get Weather Data**
  - **Endpoint**: `GET /api/v1/weather`
  - **Response**: Weather data for the metro cities.

- **Save Weather Data**
  - **Endpoint**: `POST /api/v1/weather`
  - **Body**: JSON array of city weather data objects.
  - **Response**: Confirmation of saved weather data.

- **Roll Up Weather Data**
  - This process aggregates daily weather data and stores daily summaries in the database.

## Usage
- **View Weather Data**: The application displays current weather data for metro cities.
- **Set Temperature and Condition Thresholds**: Users can enter threshold values for temperature and conditions.
- **Receive Alerts**: The application checks the current weather against the set thresholds and sends alerts accordingly. *(P.S: It does not check for the threshold if the threshold count for that field is set to 0.)*
- **Toggle Temperature Units**: Switch between Celsius and Fahrenheit using the button provided in the UI.
- **Save Weather Data**: Weather data is saved automatically for analysis and later retrieval.
- **Rollups**: At the end of the day, the saved weather data is rolled up to get the average, maximum, minimum temperature, and dominant weather conditions for the day. A daily summary is created and saved in the database for visual analysis and historical trends. *(P.S: Visual analysis not implemented yet.)*

## Acknowledgments
- [OpenWeatherMap API](https://openweathermap.org) - For providing weather data.

Thank you for checking out the Weather API Web Application! For any inquiries or feedback, feel free to reach out to me at [shubhsaxena447@gmail.com](mailto:shubhsaxena447@gmail.com).
