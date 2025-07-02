import fs from "fs";
import path from "path";
// import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const reserva = req.body;
    const filePath = path.join(process.cwd(), "reservas.json");
    let reservas = [];
    if (fs.existsSync(filePath)) {
      reservas = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    reservas.push({ ...reserva, fecha: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(reservas, null, 2));

    // Aquí podrías enviar un correo de confirmación si lo deseas
    res.status(200).json({ message: "Reserva guardada correctamente" });
    return;
  }
  res.status(405).json({ message: "Método no permitido" });
}

