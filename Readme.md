# Hall Booking App API

This repository contains a simple Express.js API for a hall booking app. The API allows you to create rooms, book rooms, and retrieve booking-related information.

## Getting Started

Follow these steps to set up and run the API on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/hall-booking-app.git
   cd hall-booking-app

2. Install Dependencies:

   Make sure you have Node.js and npm installed. Then, install the project dependencies:

   npm install

3. Run the Server:

   Start the Express server:

   node index.js

   The server will run on port 3000 by default. You can change the port number in index.js if needed.

API Endpoints

Create a Room

- Endpoint: POST /create-room
- Request Body:

  {
    "seats": 50,
    "amenities": ["Projector", "Whiteboard", "WiFi"],
    "pricePerHour": 100
  }

Book a Room

- Endpoint: POST /book-room
- Request Body:

  {
    "customerName": "subaash",
    "date": "2023-09-01",
    "startTime": "09:00 AM",
    "endTime": "11:00 AM",
    "roomId": 1
  }

List all Rooms with Booked Data

- Endpoint: GET /rooms-with-bookings

List all Customers with Booked Data

- Endpoint: GET /customers-with-bookings

List Booking History for a Customer

- Endpoint: GET /booking-history/:customerName

Replace :customerName with the name of the customer you want to retrieve booking history for.

Example Requests

You can use tools like curl, Postman, or Insomnia to make requests to the API. See the provided examples in the above sections.

