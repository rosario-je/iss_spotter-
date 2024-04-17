# ISS Spotter

ISS Spotter is a Node.js application designed to track the International Space Station (ISS) and provide users with information about its upcoming passes over their location. This project utilizes the ISS API to retrieve real-time data about the ISS location and its flyover times.

## Features

- Fetches the user's IP address to determine their location.
- Retrieves geographical coordinates based on the user's IP address.
- Determines the upcoming ISS flyover times for the user's location.
- Presents the upcoming pass times in a user-friendly format.

## Installation

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/rosario-je/ISS-Spotter.git
    ```

2. Navigate to the project directory:

    ```
    cd ISS-Spotter
    ```

3. Install dependencies using npm:

    ```
    npm install
    ```

## Usage

To use the ISS Spotter application:

1. Run the `index2.js` file:

    ```
    node index2.js
    ```

2. The application will fetch your IP address, determine your geographical coordinates, and provide you with the upcoming ISS flyover times for your location.

## Dependencies

- `request`: Used to make HTTP requests to the ISS API.
- `request-promise-native`: A promise-based version of the `request` library.
