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
        bookings: [
          // Changed from booking to bookings (array)
          {
            booked_by_user_id: "U12345",
            date: "2024-11-02",
            time_slot: "10:00-12:00",
            event: "Computer Science Lecture",
            approved: true,
            approved_by_admin_id: "A56789",
            approval_date: "2024-10-30",
          },
        ],
        added_by: "Admin001",
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A fully equipped computer science lab with all necessary tech for lectures and labs.",
        request_id: "REQ001",
        requested_by: "U-510", // Assigned student ID
        status: "Pending",
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
        bookings: [], // Changed to an empty array
        added_by: "Admin002",
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A quiet study room with basic facilities for individual or group study sessions.",
        request_id: "REQ002",
        requested_by: "U-87", // Assigned student ID
        status: "Pending",
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
        bookings: [
          // Changed from booking to bookings (array)
          {
            booked_by_user_id: "U67890",
            date: "2024-11-05",
            time_slot: "18:00-20:00",
            event: "Student Cultural Show",
            approved: false,
            approved_by_admin_id: null,
            approval_date: null,
          },
        ],
        added_by: "Admin003",
        image: "hu_spaceease\\public\\images\\audi4.jpg", // Updated image path
        description:
          "A large auditorium equipped with a stage, lighting, and sound system, perfect for events and shows.",
        request_id: "REQ003",
        requested_by: "U-133", // Assigned student ID
        status: "Pending",
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
        bookings: [
          // Changed from booking to bookings (array)
          {
            booked_by_user_id: "U23456",
            date: "2024-11-03",
            time_slot: "14:00-16:00",
            event: "Chemistry Lab Session",
            approved: true,
            approved_by_admin_id: "A98765",
            approval_date: "2024-11-01",
          },
        ],
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
        bookings: [], // Changed to an empty array
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
        bookings: [], // Changed to an empty array
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
    // Fetch rooms where the booking approval is pending
    const unapprovedRooms = await Room.find({ status: "Pending" });

    // Map the fetched data to a simplified format
    const formattedRooms = unapprovedRooms
      .map((room) => {
        // Check if there are multiple bookings
        const bookings = room.bookings || [];

        // Return multiple requests for each booking
        return bookings.map((booking) => ({
          id: room.room_id,
          room_name: room.room_name || room.room_number || "N/A",
          requester: booking.booked_by_user_id || "Unknown",
          event: booking.event || "N/A",
          booking_date: booking.date || "N/A",
          time_slot: booking.time_slot || "N/A",
          RoomStatus: room.status,
        }));
      })
      .flat(); // Flatten the array to ensure each booking is an individual object

    res.status(200).json({ success: true, rooms: formattedRooms });
  } catch (error) {
    console.error("Error fetching unapproved rooms:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put("/approve-room/:id", async (req, res) => {
  const { admin_id, user_id, room_id } = req.body; // Admin, user IDs, and room_id from request body
  const roomId = String(req.params.id); // Converts it to string if it's not

  // Check if admin_id, user_id, and room_id are provided
  if (!admin_id || !user_id || !room_id) {
    return res.status(400).json({
      success: false,
      message: "Admin ID, user ID, and room ID are required to approve a room.",
    });
  }

  try {
    // Find the room by room_id (use findOne for a single document)
    const room = await Room.findOne({ room_id: roomId });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }

    // Check if the room is already booked (if necessary)
    if (room.is_booked) {
      return res.status(400).json({
        success: false,
        message: "Room is already booked and cannot be approved again.",
      });
    }

    // Ensure booking is defined
    room.bookings = room.bookings || {}; // Ensure booking exists

    // Update room booking details
    room.bookings.booked_by_user_id = user_id; // Set the user who requested the booking
    room.bookings.approved = true; // Mark the booking as approved
    room.bookings.approved_by_admin_id = admin_id; // Store the admin ID who approved it
    room.bookings.approval_date = new Date().toISOString(); // Date when it was approved

    room.is_booked = true; // Mark the room as booked
    room.status = "Approved"; // Update room status to "Approved"

    // Save the updated room
    await room.save();

    // Respond with success message and updated room data
    res.status(200).json({
      success: true,
      message: "Room booking approved successfully.",
      room,
    });
  } catch (error) {
    console.error("Error approving room:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// Reject a room
router.put("/reject-room/:id", async (req, res) => {
  try {
    console.log("HI reached");
    const room = await Room.findOne({ room_id: req.params.id });
    console.log(room);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }

    // Update room status to rejected
    room.status = "Rejected";
    room.bookings = null; // Clear booking data if rejected
    room.is_booked = false;

    await room.save();

    res.status(200).json({
      success: true,
      message: "Room booking rejected successfully.",
      room,
    });
  } catch (error) {
    console.error("Error rejecting room:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
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

router.get("/:roomId", async (req, res) => {
  try {
    console.log("Hi I have reached here");
    const room = await Room.findOne({ room_id: req.params.roomId }); // Find the room by ID
    console.log(room);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/book-room", async (req, res) => {
  try {
    console.log("Finally here");

    const {
      userName,
      userEmail,
      userId,
      roomId,
      roomName,
      startDate,
      time_slot,
      reason,
    } = req.body;

    // Step 1: Find the room by room_id
    const room = await Room.findOne({ room_id: roomId });

    // If room is not found, return an error response
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Step 2: Create a new booking object
    const newBooking = {
      booked_by_user_id: userId,
      date: startDate,
      time_slot: time_slot,
      event: reason || "General Event", // Default to 'General Event' if no reason
      approved: false,
      approved_by_admin_id: null,
      approval_date: null,
    };

    // Step 3: Push the new booking into the bookings array
    room.bookings.push(newBooking);
    room.status = "Pending"; // Set room status to "Pending"
    room.requested_by = userId; // Set the user who requested the booking
    room.request_id = `A${Math.floor(Math.random() * 10000000)}`; // Generate a unique request ID

    // Step 4: Save the updated room document with the new booking
    await room.save();

    // Step 5: Respond with success
    res.status(200).json({
      success: true,
      message: "Room booking has been successfully added.",
      room,
    });
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Export the router
export default router;
