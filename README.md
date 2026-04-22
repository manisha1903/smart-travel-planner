# Travel Planner App ✈️

A React app where you can search for destinations, check weather, view country information and save your trips.

---

## How to Run

1. Clone the repo or download the files

2. Install dependencies:
```
npm install
```

3. Start the app:
```
npm start
```

4. Open your browser and go to `http://localhost:5173/`

---

## Features

- Search any city or country
- Autocomplete suggestions while typing
- Live weather data (temperature, humidity, wind speed, 3-day forecast)
- Country information (capital, population, currency, languages etc)
- Save trips to local storage
- Remove trips from saved list
- Mock login / signup (any email and password works)
- Protected route for My Trips page (need to be logged in)
- Dark mode toggle
- Responsive design

---

## APIs Used

- **wttr.in** - For weather data (free, no API key needed)
- **REST Countries API** - For country information (free, no API key needed)

> Note: For city autocomplete I used REST Countries API as a workaround.
> If you want proper city search you can integrate GeoDB Cities API
> (requires RapidAPI key).

---

## Folder Structure

```
src/
  components/
    Navbar.js         - top navigation bar
    WeatherCard.js    - shows weather info
    CountryCard.js    - shows country details
    TripCard.js       - card for each saved trip
  hooks/
    useDebounce.js    - delays input so we dont spam API calls
    useFetch.js       - reusable hook for fetching data
  pages/
    Home.js           - landing page with search and popular places
    SearchResults.js  - search results with weather and country info
    TripDetails.js    - full details page for a destination
    MyTrips.js        - shows all saved trips
    Login.js          - login and signup page
  App.js              - main app with routing setup
  App.css             - global styles including dark mode
  index.js            - entry point
  index.css           - base reset styles
```

---

## How Authentication Works

This app uses mock authentication. There is no real backend.
When you login or signup it just saves your name and email in React state.
If you refresh the page you will be logged out (this is expected since its mock auth).

In a real app you would connect this to a backend with JWT tokens.

---

## How Trip Saving Works

Trips are saved in `localStorage` so they stay even after you close the browser.
When you click "Save Trip" on the search page it stores the city name, country, flag and temperature.

---

## Things I Would Add With More Time

- Real authentication with a backend
- Foursquare API for real attractions data
- Better error handling
- Unit tests
- Map integration to show the destination
- Trip notes - ability to add notes to each saved trip

---

## Tech Stack

- React 18
- React Router v6
- Plain CSS (no frameworks)
- wttr.in API
- REST Countries API
