// // Import the required modules
// const express = require('express');
// const app = express();
// const port = 4000;

// // Enable JSON request parsing
// app.use(express.json());

// // Store rooms and bookings data
// const rooms = [];
// const bookings = [];

// // Create a new room
// app.post('/create-room', (req, res) => {
//     const { seats, amenities, pricePerHour } = req.body;

//     // Create a room object
//     const room = {
//         id: rooms.length + 1,
//         seats,
//         amenities,
//         pricePerHour,
//     };

//     // Add the room to the rooms array
//     rooms.push(room);

//     // Respond with success and the created room
//     res.status(201).json({ message: 'Room created successfully', room });

//     // Log completion
//     console.log('Room creation completed');
// });

// // Book a room
// app.post('/book-room', (req, res) => {
//     const { customerName, date, startTime, endTime, roomId } = req.body;

//     // Find the requested room by its ID
//     const room = rooms.find(room => room.id === roomId);

//     if (!room) {
//         return res.status(404).json({ message: 'Room not found' });
//     }

//     // Create a booking object
//     const booking = {
//         id: bookings.length + 1,
//         customerName,
//         date,
//         startTime,
//         endTime,
//         roomId,
//     };

//     // Add the booking to the bookings array
//     bookings.push(booking);

//     // Respond with success and the created booking
//     res.status(201).json({ message: 'Room booked successfully', booking });
// });

// // Get rooms with associated booking data
// app.get('/rooms-with-bookings', (req, res) => {
//     // Map rooms to include their booking data
//     const roomBookings = rooms.map(room => {
//         const bookedData = bookings.filter(booking => booking.roomId === room.id);
//         return {
//             roomName: `Room ${room.id}`,
//             bookedData,
//         };
//     });

//     // Respond with the rooms and their booking data
//     res.json(roomBookings);
// });

// // Get customers with their booking data
// app.get('/customers-with-bookings', (req, res) => {
//     // Map bookings to include customer and room data
//     const customerBookings = bookings.map(booking => {
//         const room = rooms.find(room => room.id === booking.roomId);
//         return {
//             customerName: booking.customerName,
//             roomName: `Room ${booking.roomId}`,
//             date: booking.date,
//             startTime: booking.startTime,
//             endTime: booking.endTime,
//         };
//     });

//     // Respond with the customers and their booking data
//     res.json(customerBookings);
// });

// // Get booking history for a specific customer
// app.get('/booking-history/:customerName', (req, res) => {
//     const { customerName } = req.params;

//     // Filter bookings based on the requested customer's name
//     const customerHistory = bookings.filter(booking => booking.customerName === customerName);

//     // Respond with the booking history for the customer
//     res.json(customerHistory);
// });

// // Start the Express server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



// Import the required modules
const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

// Store rooms and bookings data
const rooms = [];
const bookings = [];

// Create a new room
app.post('/create-room', (req, res) => {
    const { seats, amenities, pricePerHour } = req.body;

    // Create a room object
    const room = {
        id: rooms.length + 1,
        seats,
        amenities,
        pricePerHour,
    };

    // Add the room to the rooms array
    rooms.push(room);

    // Respond with success and the created room
    res.status(201).json({ message: 'Room created successfully', room });

    // Log completion
    console.log('Room creation completed');
});

// Book a room
app.post('/book-room', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    // Find the requested room by its ID
    const room = rooms.find(room => room.id === roomId);

    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    // Check if the room is already booked for the requested date and time
    const conflictingBooking = bookings.find(booking =>
        booking.roomId === roomId &&
        booking.date === date &&
        ((booking.startTime <= startTime && startTime < booking.endTime) ||
         (booking.startTime < endTime && endTime <= booking.endTime))
    );

    // If a conflicting booking is found, return an error response
    if (conflictingBooking) {
        return res.status(400).json({ message: 'Room is already booked for the requested date and time' });
    }

    // Create a booking object
    const booking = {
        id: bookings.length + 1,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
    };

    // Add the booking to the bookings array
    bookings.push(booking);

    // Respond with success and the created booking
    res.status(201).json({ message: 'Room booked successfully', booking });
});

// Get rooms with associated booking data
app.get('/rooms-with-bookings', (req, res) => {
    // Map rooms to include their booking data
    const roomBookings = rooms.map(room => {
        const bookedData = bookings.filter(booking => booking.roomId === room.id);
        return {
            roomName: `Room ${room.id}`,
            bookedData,
        };
    });

    // Respond with the rooms and their booking data
    res.json(roomBookings);
});

// Get customers with their booking data
app.get('/customers-with-bookings', (req, res) => {
    // Map bookings to include customer and room data
    const customerBookings = bookings.map(booking => {
        const room = rooms.find(room => room.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: `Room ${booking.roomId}`,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
        };
    });

    // Respond with the customers and their booking data
    res.json(customerBookings);
});

// Get booking history for a specific customer
app.get('/booking-history/:customerName', (req, res) => {
    const { customerName } = req.params;

    // Filter bookings based on the requested customer's name
    const customerHistory = bookings.filter(booking => booking.customerName === customerName);

    // Respond with the booking history for the customer
    res.json(customerHistory);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
