const db = require("../db");

exports.getAppointments = async (req, res) => {
  console.log("Received request for appointments");
  try {
    const [results] = await db.query("SELECT * FROM appointments");
    res.json(results);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Error fetching appointments." });
  }
};

exports.createAppointment = (req, res) => {
  const { fullName, phoneNumber, date, selectedTime, service } = req.body;
  const sql =
    "INSERT INTO appointments (full_name, phone_number, date, selected_time, service) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [fullName, phoneNumber, date, selectedTime, service],
    (error, results) => {
      if (error) {
        console.error("Error inserting appointment:", error);
        return res.status(500).send(error);
      }
      res.status(201).send({ id: results.insertId });
    }
  );
};

exports.getAppointmentsByDate = (req, res) => {
  const { date, time } = req.params;
  const query =
    "SELECT * FROM appointments WHERE date = ? AND selected_time = ?";

  db.query(query, [date, time], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching appointments" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }
    res.status(200).json(results);
  });
};

exports.confirmAppointment = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE appointments SET isConfirmed = ? WHERE id = ?";

  db.query(sql, [1, id], (error, results) => {
    if (error) {
      console.error("Error updating appointment confirmation:", error);
      return res.status(500).json({ message: "Error updating appointment." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.json({ message: "Appointment confirmed successfully." });
  });
};
exports.cancelAppointment = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE appointments SET isConfirmed = ? WHERE id = ?";

  db.query(sql, [0, id], (error, results) => {
    if (error) {
      console.error("Error canceling appointment:", error);
      return res.status(500).json({ message: "Error canceling appointment." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.json({ message: "Appointment canceled successfully." });
  });
};
