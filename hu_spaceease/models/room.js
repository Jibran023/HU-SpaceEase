import { Schema, model } from "mongoose";

// Define the Booking Schema
const BookingSchema = new Schema({
  booked_by_user_id: { type: String, required: false },
  date: { type: String, required: false },
  time_slot: { type: String, required: false },
  event: { type: String, required: false },
  approved: { type: Boolean, required: false },
  approved_by_admin_id: { type: String, required: false, default: null },
  approval_date: { type: String, required: false, default: null },
});

// Define the Room Schema
const RoomSchema = new Schema({
  room_id: { type: String, required: true },
  room_number: { type: String, required: true },
  room_name: { type: String, required: false },
  building: { type: String, required: true },
  capacity: { type: Number, required: true },
  floor: { type: Number, required: true },
  features: { type: [String], required: true },
  is_booked: { type: Boolean, required: true },
  // Changed this field to allow an array of bookings
  bookings: { type: [BookingSchema], required: false }, // Array of Booking Schema
  added_by: { type: String, required: false },
  image: { type: String, required: false },
  description: { type: String, required: false },
  request_id: { type: String, required: false },
  requested_by: { type: String, required: false },
  status: {
    type: String,
    required: false,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

// Create the Room model from the schema
export default model("Room", RoomSchema);
