const express = require("express");
const appointmentController = require("./appointmentController");
const router = express.Router();

// Appointment routes
router.get("/appointments", appointmentController.getAppointments);
router.post("/appointments", appointmentController.createAppointment);
router.patch(
  "/appointments/:id/confirm",
  appointmentController.confirmAppointment
);
router.patch(
  "/appointments/:id/cancel",
  appointmentController.cancelAppointment
);
router.get("/reserved-times", appointmentController.getAppointmentsByDate);

module.exports = router;
