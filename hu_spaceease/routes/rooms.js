import express from "express";
import Room from "../models/room.js";

const router = express.Router();

// Add multiple rooms (data provided)
router.get("/test", async (req, res) => {
  try {
    const rooms = [
      {
        room_id: "HU101",
        room_number: "101",
        room_name: "Computer Science Lab",
        building: "Main Academic Block",
        capacity: 30,
        floor: 1,
        features: ["Projector", "Whiteboard", "AC"],
        is_booked: true,
        booking: {
          booked_by_user_id: "U12345",
          date: "2024-11-02",
          time_slot: "10:00-12:00",
          event: "Computer Science Lecture",
          approved: true,
          approved_by_admin_id: "A56789",
          approval_date: "2024-10-30",
        },
        added_by: "Admin001",
        image: "https://example.com/images/hu101.jpg",
      },
      {
        room_id: "LIB202",
        room_number: "202",
        room_name: "Study Room",
        building: "Library Block",
        capacity: 20,
        floor: 2,
        features: ["Sound System", "Projector"],
        is_booked: false,
        booking: null,
        added_by: "Admin002",
        image: "https://example.com/images/lib202.jpg",
      },
      {
        room_id: "AUD500",
        room_number: "500",
        room_name: "Main Auditorium",
        building: "Auditorium Block",
        capacity: 200,
        floor: 5,
        features: ["Stage", "Lighting", "Sound System"],
        is_booked: true,
        booking: {
          booked_by_user_id: "U67890",
          date: "2024-11-05",
          time_slot: "18:00-20:00",
          event: "Student Cultural Show",
          approved: false,
          approved_by_admin_id: null,
          approval_date: null,
        },
        added_by: "Admin003",
        image: "https://example.com/images/aud500.jpg",
      },
      {
        room_id: "LAB302",
        room_number: "302",
        room_name: "Chemistry Lab",
        building: "Science Lab Block",
        capacity: 25,
        floor: 3,
        features: ["Fume Hood", "Chemical Storage", "Projector"],
        is_booked: true,
        booking: {
          booked_by_user_id: "U23456",
          date: "2024-11-03",
          time_slot: "14:00-16:00",
          event: "Chemistry Lab Session",
          approved: true,
          approved_by_admin_id: "A98765",
          approval_date: "2024-11-01",
        },
        added_by: "Admin004",
        image: "https://example.com/images/lab302.jpg",
      },
      {
        room_id: "MEET101",
        room_number: "101",
        room_name: "Conference Room",
        building: "Admin Block",
        capacity: 10,
        floor: 1,
        features: ["Conference Table", "Teleconferencing", "AC"],
        is_booked: false,
        booking: null,
        added_by: "Admin005",
        image: "https://example.com/images/meet101.jpg",
      },
      {
        room_id: "RM006",
        room_number: "006",
        room_name: "Horizon Meeting Room",
        building: "Horizon Block",
        capacity: 30,
        floor: 4,
        features: ["Screen"],
        is_booked: false,
        booking: null,
        added_by: "Admin006",
        image: "https://example.com/images/rm006.jpg",
      },
    ];

    // Add rooms to the database
    const savedRooms = await Room.insertMany(rooms);

    res.status(201).json({
      message: "Rooms added successfully",
      rooms: savedRooms,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Export the router
export default router;
