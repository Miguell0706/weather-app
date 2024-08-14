# Weather Dashboard
 Link for deployed app https://miguels-weather-app.netlify.app/
## Overview

The Weather Dashboard is a web application designed to provide real-time weather updates and detailed information for any city. The app features dynamic background updates based on weather conditions, pollutant summaries, and news about the selected city.

## Features

- **Real-Time Weather Updates**: View current weather conditions including temperature, wind speed, humidity, and more.
- **Dynamic Backgrounds**: Background images and colors update based on the current weather.
- **Pollutant Information**: Summary of pollutants in the air, their side effects, and sources.
- **City News** News articles about the selected city.
- **Location-Based**: Automatic location detection to show weather updates for the user’s current location.

## Technologies Used

- **Frontend**: React, Vite
- **APIs**: 
  - Weather Data API
  - News API 
  - Open Cage API (for getting a city from longitude and latitude of the device)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   ```
Navigate to the project directory:


```
cd weather-dashboard
```
Install dependencies:


```
npm install
```
Start the development server:


```
npm run dev
```
Open your browser and go to http://localhost:5173 to view the app.

Configuration
Create a .env file in the root of the project and add your API keys:

makefile
Copy code
```
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_NEWS_API_KEY=your_open_cage_api_key
VITE_OPEN_CAGE_API_KEY=your_news_api_key
```
Usage
Search for a city: Enter the name of a city in the search bar to get the weather information.
View details: Check out the current weather, pollutant levels, and city news.

Demonstration
Here’s a screenshot of the Weather Dashboard:


<img src="https://github.com/user-attachments/assets/90f64c6c-e936-4fa2-a333-fff51bf10aca" width="300" height="700" alt="Weather Dashboard Bottom Screenshot"/>

<img src="https://github.com/user-attachments/assets/85ca4bbc-ab5a-4977-a355-6a9813c6fb4f" width="300" height="700" alt="Weaterh Dashboard Main Screenshot"/>


Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the project's coding style and includes tests.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Weather API - for providing weather data. https://www.weatherapi.com/

Open Cage API - for converting long and lat coordinates into a city   https://opencagedata.com/

World News API - for providing news updates. https://worldnewsapi.com/
