import { Schema, model } from "mongoose";

const BookingSchema = new Schema({
  booked_by_user_id: { type: String, required: false },
  date: { type: String, required: false },
  time_slot: { type: String, required: false },
  event: { type: String, required: false },
  approved: { type: Boolean, required: false },
  approved_by_admin_id: { type: String, required: false, default: null },
  approval_date: { type: String, required: false, default: null },
});

const RoomSchema = new Schema({
  room_id: { type: String, required: true },
  room_number: { type: String, required: true },
  room_name: { type: String, required: false }, // Optional field
  building: { type: String, required: true },
  capacity: { type: Number, required: true },
  floor: { type: Number, required: true },
  features: { type: [String], required: true },
  is_booked: { type: Boolean, required: true },
  booking: { type: BookingSchema, required: false }, // Nested booking schema
  added_by: { type: String, required: false }, // Optional field for admin tracking
  image: { type: String, required: false }, // New field to store room image
});

export default model("Room", RoomSchema);
