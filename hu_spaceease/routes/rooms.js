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
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A fully equipped computer science lab with all necessary tech for lectures and labs.",
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
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A quiet study room with basic facilities for individual or group study sessions.",
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
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A large auditorium equipped with a stage, lighting, and sound system, perfect for events and shows.",
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
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A well-equipped chemistry lab for practical sessions and experiments.",
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
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A small, yet well-equipped conference room for meetings and discussions.",
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
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A meeting room with a large screen, ideal for presentations and video conferences.",
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

router.get("/unapproved-rooms", async (req, res) => {
  try {
    // Fetch rooms where the booking approval is pending (null)
    const unapprovedRooms = await Room.find({ "booking.approved": null });

    res.status(200).json({ success: true, rooms: unapprovedRooms });
  } catch (error) {
    console.error("Error fetching unapproved rooms:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Approve a room
router.put("/approve-room/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      {
        "booking.approved": true,
        "booking.approval_date": new Date().toISOString(),
      },
      { new: true }
    );
    res.status(200).json({ success: true, room });
  } catch (error) {
    console.error("Error approving room:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Reject a room
router.put("/reject-room/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { "booking.approved": false },
      { new: true }
    );
    res.status(200).json({ success: true, room });
  } catch (error) {
    console.error("Error rejecting room:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.delete("/remove-all-rooms", async (req, res) => {
  try {
    const result = await Room.deleteMany({}); // Deletes all rooms from the database
    res.status(200).json({
      message: "All rooms have been removed successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API to fetch all rooms
router.get("/all", async (req, res) => {
  try {
    const rooms = await Room.find(); // Fetch all room details from the database
    res.status(200).json({
      message: "Rooms fetched successfully",
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching rooms",
      error: error.message,
    });
  }
});

// Export the router
export default router;
