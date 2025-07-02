"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
// Traducciones básicas
const translations = {
  es: {
    ciudad: "Ciudad",
    hotel: "Hotel",
    seleccionaCiudad: "Selecciona una ciudad",
    seleccionaHotel: "Selecciona un hotel",
    hotelesDisponibles: "Hoteles disponibles",
    habitacionesDisponibles: "Habitaciones disponibles",
    capacidad: "Capacidad",
    precio: "Precio",
    agregarAlCarrito: "Agregar al carrito",
    carritoReservas: "Carrito de reservas",
    noHasAgregado: "No has agregado habitaciones.",
    quitar: "Quitar",
    cerrar: "Cerrar",
    pagar: "Pagar",
    metodoPago: "Método de pago",
    nombre: "Nombre",
    tipoDocumento: "Tipo de documento",
    numeroDocumento: "Número de documento",
    telefono: "Número de teléfono",
    tipoCuenta: "Tipo de cuenta",
    numeroCuenta: "Número de cuenta",
    correo: "Correo",
    metodo: "Método de pago",
    confirmarPago: "Confirmar pago",
    cancelar: "Cancelar",
    reservaExitosa: "Reserva exitosa",
    gracias: "¡Gracias por usar nuestros servicios!",
    confirmarAgregar: "Confirmar y agregar",
    seleccionarFechas: "Selecciona fechas para reservar",
    fechaEntrada: "Fecha de entrada:",
    fechaSalida: "Fecha de salida:",
    precioPorNoche: "Precio por noche:",
    numeroDias: "Número de días:",
    precioTotal: "Precio total:",
    hotelSeleccionado: "Hotel seleccionado",
    verHabitaciones: "Ver habitaciones",
    reservasVip: "RESERVAS.VIP",
    regresar: "Regresar"
  },
  en: {
    ciudad: "City",
    hotel: "Hotel",
    seleccionaCiudad: "Select a city",
    seleccionaHotel: "Select a hotel",
    hotelesDisponibles: "Available hotels",
    habitacionesDisponibles: "Available rooms",
    capacidad: "Capacity",
    precio: "Price",
    agregarAlCarrito: "Add to cart",
    carritoReservas: "Booking cart",
    noHasAgregado: "You haven't added any rooms.",
    quitar: "Remove",
    cerrar: "Close",
    pagar: "Pay",
    metodoPago: "Payment method",
    nombre: "Name",
    tipoDocumento: "Document type",
    numeroDocumento: "Document number",
    telefono: "Phone number",
    tipoCuenta: "Account type",
    numeroCuenta: "Account number",
    correo: "Email",
    metodo: "Payment method",
    confirmarPago: "Confirm payment",
    cancelar: "Cancel",
    reservaExitosa: "Booking successful",
    gracias: "Thank you for using our services!",
    confirmarAgregar: "Confirm and add",
    seleccionarFechas: "Select dates to book",
    fechaEntrada: "Check-in date:",
    fechaSalida: "Check-out date:",
    precioPorNoche: "Price per night:",
    numeroDias: "Number of days:",
    precioTotal: "Total price:",
    hotelSeleccionado: "Hotel selected",
    verHabitaciones: "View rooms",
    reservasVip: "RESERVAS.VIP",
    regresar: "Back"
  }
};
import { FaShoppingCart } from "react-icons/fa";
import Chatbot from "./Chatbot";

// --- Estructura de datos ---

const ciudades = [
  { id: "ciudad-1", nombre: "Cartagena", imagen: "/productos/cartagena/cartagena.jpg", descripcion: "Cartagena es una ciudad costera en Colombia, famosa por su arquitectura colonial y playas." },
  { id: "ciudad-2", nombre: "Medellín", imagen: "/productos/medellin/medellin.jpg", descripcion: "Medellín es una ciudad innovadora en Colombia, conocida por su clima agradable y cultura vibrante." },
  { id: "ciudad-3", nombre: "San Andrés", imagen: "/productos/san-andres/san-andres.jpg", descripcion: "San Andrés es un archipiélago colombiano en el Caribe, famoso por sus playas de arena blanca y aguas cristalinas." },
  { id: "ciudad-4", nombre: "Santa Marta", imagen: "/productos/santa-marta/santa-marta.jpg", descripcion: "Santa Marta es una ciudad costera en Colombia, conocida por su cercanía al Parque Tayrona y su rica historia." }
];

const hotelesPorCiudad = {
  "ciudad-1": [
    { id: "hotel-capitol", nombre: "Hotel Capitol", imagen: "/productos/cartagena/hotel-capitol/hotel-capitol.jpg", descripcion: "este es uno de los mejores hoteles de la ciudad resaltandon por su elegancia y diceño" },
    { id: "hotel-lavande", nombre: "Hotel Lavande", imagen: "/productos/cartagena/hotel-lavande/hotel-lavande.jpg", descripcion: "Un confortable hotel que cumple con todas tus espectativas " },
    { id: "hotel-reesort", nombre: "Hotel Reesort", imagen: "/productos/cartagena/hotel-reesort/hotel-reesort.jpg", descripcion: "Un hotel con un ambiente relajante y acogedor, ideal para descansar" },
    { id: "hotel-velle-vue", nombre: "Hotel Velle Vue", imagen: "/productos/cartagena/hotel-velle-vue/hotel-velle-vue.jpg", descripcion: "Un hotel con una vista espectacular al mar, perfecto para disfrutar de la brisa marina" }
  ],
  "ciudad-2": [
    { id: "hotel-akyldiz", nombre: "Hotel Akyldiz", imagen: "/productos/medellin/hotel-akyldiz/hotel-akyldiz.jpg", descripcion: "Un hotel moderno y elegante, ideal para viajeros de negocios y placer" },
    { id: "hotel-concorde", nombre: "Hotel Concorde", imagen: "/productos/medellin/hotel-concorde/hotel-concorde.jpg", descripcion: "Un hotel con un ambiente acogedor y servicios de alta calidad, perfecto para una estancia agradable" },
    { id: "hotel-cravat", nombre: "Hotel Cravat", imagen: "/productos/medellin/hotel-cravat/hotel-cravat.jpg", descripcion: "Un hotel con un diseño contemporáneo y comodidades modernas, ideal para disfrutar de la ciudad" },
    { id: "hotel-golden-nugget", nombre: "Hotel Golden Nugget", imagen: "/productos/medellin/hotel-golden-nugget/hotel-golden-nugget.jpg", descripcion: "Un hotel con un ambiente lujoso y servicios exclusivos, perfecto para una experiencia inolvidable" }
  ],
  "ciudad-3": [
    { id: "hotel-create", nombre: "Hotel Create", imagen: "/productos/san-andres/hotel-create/hotel-create.jpg", descripcion: "Un hotel con un ambiente creativo y moderno, ideal para disfrutar de la belleza de San Andrés" },
    { id: "hotel-fly", nombre: "Hotel Fly", imagen: "/productos/san-andres/hotel-fly/hotel-fly.jpg", descripcion: "Un hotel con un ambiente relajante y acogedor, perfecto para descansar y disfrutar de la isla" },
    { id: "hotel-veruss", nombre: "Hotel Veruss", imagen: "/productos/san-andres/hotel-veruss/hotel-veruss.jpg", descripcion: "Un hotel con un diseño contemporáneo y comodidades modernas, ideal para disfrutar de la belleza de San Andrés" },
    { id: "hote-palma", nombre: "Hotel Palma", imagen: "/productos/san-andres/hote-palma/hote-palma.jpg", descripcion: "Un hotel con un ambiente acogedor y servicios de alta calidad, perfecto para una estancia agradable en la isla" }
  ],
  "ciudad-4": [
    { id: "hotel-chelsea", nombre: "Hotel Chelsea", imagen: "/productos/santa-marta/hotel-chelsea/chelsea-hotel.jpg", descripcion: "Un hotel con un ambiente elegante y servicios de alta calidad, ideal para disfrutar de Santa Marta" },
    { id: "hotel-dome", nombre: "Hotel Dome", imagen: "/productos/santa-marta/hotel-dome/hotel-dome.jpg", descripcion: "Un hotel con un diseño moderno y comodidades exclusivas, perfecto para una experiencia inolvidable" },
    { id: "hotel-linux", nombre: "Hotel Linux", imagen: "/productos/santa-marta/hotel-linux/hotel-linux.jpg", descripcion: "Un hotel con un ambiente acogedor y servicios de alta calidad, ideal para disfrutar de la belleza de Santa Marta" },
    { id: "hotel-shangrila", nombre: "Hotel Shangrila", imagen: "/productos/santa-marta/hotel-shangrila/hotel-changrila.jpg", descripcion: "Un hotel con un ambiente relajante y acogedor, perfecto para descansar y disfrutar de la ciudad" }
  ]
};

const habitacionesPorHotel = {
  "hotel-capitol": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/cartagena/hotel-capitol/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/cartagena/hotel-capitol/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "70.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/cartagena/hotel-capitol/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "80.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/cartagena/hotel-capitol/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "69.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-lavande": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/cartagena/hotel-lavande/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/cartagena/hotel-lavande/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/cartagena/hotel-lavande/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/cartagena/hotel-lavande/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-reesort": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/cartagena/hotel-reesort/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/cartagena/hotel-reesort/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/cartagena/hotel-reesort/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/cartagena/hotel-reesort/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-velle-vue": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/cartagena/hotel-velle-vue/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/cartagena/hotel-velle-vue/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/cartagena/hotel-velle-vue/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/cartagena/hotel-velle-vue/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],


  "hotel-akyldiz": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/medellin/hotel-akyldiz/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/medellin/hotel-akyldiz/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/medellin/hotel-akyldiz/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/medellin/hotel-akyldiz/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-concorde": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/medellin/hotel-concorde/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/medellin/hotel-concorde/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/medellin/hotel-concorde/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/medellin/hotel-concorde/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-cravat": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/medellin/hotel-cravat/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/medellin/hotel-cravat/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/medellin/hotel-cravat/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/medellin/hotel-cravat/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-golden-nugget": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/medellin/hotel-golden-nugget/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/medellin/hotel-golden-nugget/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/medellin/hotel-golden-nugget/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/medellin/hotel-golden-nugget/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],


  "hotel-create": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/san-andres/hotel-create/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/san-andres/hotel-create/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/san-andres/hotel-create/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/san-andres/hotel-create/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-fly": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/san-andres/hotel-fly/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/san-andres/hotel-fly/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/san-andres/hotel-fly/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/san-andres/hotel-fly/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hotel-veruss": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/san-andres/hotel-veruss/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/san-andres/hotel-veruss/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/san-andres/hotel-veruss/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/san-andres/hotel-veruss/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
  "hote-palma": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/san-andres/hote-palma/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/san-andres/hote-palma/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/san-andres/hote-palma/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/san-andres/hote-palma/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],


  "hotel-chelsea": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/santa-marta/hotel-chelsea/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/santa-marta/hotel-chelsea/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/santa-marta/hotel-chelsea/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/santa-marta/hotel-chelsea/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
   "hotel-dome": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/santa-marta/hotel-dome/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/santa-marta/hotel-dome/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/santa-marta/hotel-dome/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/santa-marta/hotel-dome/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
   "hotel-linux": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/santa-marta/hotel-linux/habitacion-1/1.jpg",
      descripcion: "Cómoda habitación estándar.",
      precio: "100.000 por noche",
      capacidad: "2 personas",
      servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"]},
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/santa-marta/hotel-linux/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/santa-marta/hotel-linux/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/santa-marta/hotel-linux/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ],
   "hotel-shangrila": [
    { id: "habitacion-1", nombre: "Habitación 1", imagen: "/productos/santa-marta/hotel-shangrila/habitacion-1/1.jpg", descripcion: "Cómoda habitación estándar.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-2", nombre: "Habitación 2", imagen: "/productos/santa-marta/hotel-shangrila/habitacion-2/2.jpg", descripcion: "Habitación doble con vista.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-3", nombre: "Habitación 3", imagen: "/productos/santa-marta/hotel-shangrila/habitacion-3/3.jpg", descripcion: "Suite familiar espaciosa.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] },
    { id: "habitacion-4", nombre: "Habitación 4", imagen: "/productos/santa-marta/hotel-shangrila/habitacion-4/4.jpg", descripcion: "Suite premium con balcón.", precio: "100.000 por noche", capacidad: "2 personas", servicios: ["WiFi gratis", "Desayuno incluido", "Aire acondicionado"] }
  ]
};


// --- Componente auxiliar para seleccionar fechas y agregar al carrito desde la página ---
type CalendarioReservaDesdePaginaProps = {
  habitacion: any;
  ciudad: string;
  hotel: string;
  onClose: () => void;
  setCarrito: React.Dispatch<React.SetStateAction<any[]>>;
  setShowCarrito: React.Dispatch<React.SetStateAction<boolean>>;
};
const CalendarioReservaDesdePagina = ({ habitacion, ciudad, hotel, onClose, setCarrito, setShowCarrito }: CalendarioReservaDesdePaginaProps) => {
  const [fechaEntrada, setFechaEntrada] = React.useState("");
  const [fechaSalida, setFechaSalida] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-80 flex flex-col gap-3">
        <button className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="font-bold text-lg mb-2">Selecciona fechas para reservar</div>
        <label className="text-sm">Fecha de entrada:
          <input type="date" className="block border rounded px-2 py-1 mt-1 w-full" value={fechaEntrada} onChange={e => setFechaEntrada(e.target.value)} min={new Date().toISOString().split('T')[0]} />
        </label>
        <label className="text-sm">Fecha de salida:
          <input type="date" className="block border rounded px-2 py-1 mt-1 w-full" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} min={fechaEntrada || new Date().toISOString().split('T')[0]} />
        </label>
        {error && <div className="text-red-500 text-xs">{error}</div>}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
          onClick={() => {
            if (!fechaEntrada || !fechaSalida) {
              setError("Selecciona ambas fechas");
              return;
            }
            if (fechaSalida <= fechaEntrada) {
              setError("La fecha de salida debe ser posterior a la de entrada");
              return;
            }
            setError("");
            setCarrito((prev: any[]) => [
              ...prev,
              {
                ...habitacion,
                ciudad,
                hotel,
                fechaInicio: new Date(fechaEntrada),
                fechaFin: new Date(fechaSalida)
              }
            ]);
            setShowCarrito(true);
            onClose();
          }}
          type="button"
        >
          Confirmar y agregar
        </button>
      </div>
    </div>
  );
};

// --- Componente principal ---
export default function Home() {
  // Tipos usados en el componente
  type Habitacion = {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
    precio: string;
    capacidad: string;
    servicios: string[];
  };
  // Estados necesarios para la lógica y el renderizado
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState<Habitacion | null>(null);
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  // Estado de idioma
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];
  // Eliminados estados y tipos no usados para cumplir ESLint
  const [showChatbot, setShowChatbot] = useState(false);
  const [reservaFinalizada, setReservaFinalizada] = useState(false);
  type Hotel = {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
  };
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  type CarritoItem = Habitacion & {
    ciudad: string | null;
    hotel: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
  };
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [showCarrito, setShowCarrito] = useState(false);
  const [showPago, setShowPago] = useState(false);
  const [pago, setPago] = useState({
    nombre: "",
    tipoCuenta: "",
    numeroCuenta: "",
    correo: "",
    metodo: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: ""
  });
  const [reservaExitosa, setReservaExitosa] = useState(false);
  // Estados agregados para ciudad y hotel seleccionados
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string | null>(null);
  const [hotelSeleccionado, setHotelSeleccionado] = useState<string | null>(null);

  // Cuando se selecciona una ciudad desde el bot
  // Eliminada función no usada para cumplir ESLint

  // Cuando se selecciona un hotel desde el bot
  function handleSeleccionHotel(hotelId: string) {
    setHotelSeleccionado(hotelId);
    setHabitaciones(habitacionesPorHotel[hotelId as keyof typeof habitacionesPorHotel] || []);
  }

  // No inicializar nada por defecto

  // Agregar habitación al carrito (requiere ciudad y hotel seleccionados)
  function agregarAlCarrito(habitacion: Habitacion) {
    setCarrito([
      ...carrito,
      {
        ...habitacion,
        ciudad: ciudadSeleccionada,
        hotel: hotelSeleccionado,
        fechaInicio,
        fechaFin
      }
    ]);
  }

  function quitarDelCarrito(idx: number) {
    setCarrito(carrito.filter((_, i) => i !== idx));
  }

  async function handlePago(e: React.FormEvent) {

  e.preventDefault();

  // Enviar reserva al backend
  await fetch("/api/reservas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      carrito,
      pago
    }),
  });

  setShowPago(false);
  setShowCarrito(false);
  setCarrito([]);
  setHoteles([]);
  setHabitaciones([]);
  setReservaExitosa(true);
  setReservaFinalizada(true); // Notifica al chatbot
  setTimeout(() => setReservaExitosa(false), 5000);
}

  useEffect(() => {
    // Ya no se minimiza el chatbot automáticamente
    // Escuchar evento personalizado del chatbot para agregar al carrito
    function handleAgregarAlCarrito(e: Event) {
      const habitacion = (e as CustomEvent).detail;
      // Si el evento ya trae ciudad y hotel, usarlos directamente
      let ciudad = habitacion.ciudad || null;
      let hotel = habitacion.hotel || null;
      // Si no vienen, intentar inferirlos
      if (!hotel) {
        for (const [hotelId, habitaciones] of Object.entries(habitacionesPorHotel)) {
          if (habitaciones.some(h => h.id === habitacion.id)) {
            hotel = hotelId;
            break;
          }
        }
      }
      if (!ciudad) {
        for (const [ciudadId, hoteles] of Object.entries(hotelesPorCiudad)) {
          if (hoteles.some(h => h.id === hotel)) {
            ciudad = ciudadId;
            break;
          }
        }
      }
      // Tomar fechas del evento si existen (del chatbot)
      let fechaInicio = null;
      let fechaFin = null;
      if (habitacion.fechaEntrada && habitacion.fechaSalida) {
        fechaInicio = new Date(habitacion.fechaEntrada);
        fechaFin = new Date(habitacion.fechaSalida);
      }
      setCarrito(prev => [
        ...prev,
        {
          ...habitacion,
          ciudad,
          hotel,
          fechaInicio,
          fechaFin
        }
      ]);
      setShowCarrito(true);
    }
    window.addEventListener("agregarAlCarrito", handleAgregarAlCarrito);
    return () => {
      window.removeEventListener("agregarAlCarrito", handleAgregarAlCarrito);
    };
  }, []);

  // --- ÚNICO RETURN LIMPIO Y BALANCEADO ---
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Selector de idioma */}
      <div
        className="absolute top-4 flex gap-2 z-[200]"
        style={{ right: 'calc(3cm + 0.25rem)' }}
      >
        <button
          className={`px-2 py-1 rounded ${lang === 'es' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setLang('es')}
        >ES</button>
        <button
          className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setLang('en')}
        >EN</button>
      </div>
      {/* Botón regresar */}
      {(hotelSeleccionado || ciudadSeleccionada) && (
        <div className="w-full max-w-3xl mx-auto mt-4 flex justify-start">
          <button
            className="bg-gray-200 hover:bg-blue-100 text-black px-4 py-2 rounded font-semibold border border-gray-300 shadow"
            onClick={() => {
              if (hotelSeleccionado) {
                setHotelSeleccionado(null);
                setHabitaciones([]);
              } else if (ciudadSeleccionada) {
                setCiudadSeleccionada(null);
                setHoteles([]);
                setHotelSeleccionado(null);
                setHabitaciones([]);
              }
            }}
          >
            ← {t.regresar}
          </button>
        </div>
      )}
      {/* Selectores de ciudad y hotel */}
      <div className="w-full max-w-3xl mx-auto mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
        {/* Selector de ciudad */}
        <div className="flex flex-col">
          <label htmlFor="ciudad-select" className="font-semibold mb-1">{t.ciudad}</label>
          <select
            id="ciudad-select"
            className="border rounded px-3 py-2"
            value={ciudadSeleccionada || ""}
            onChange={e => {
              const ciudadId = e.target.value;
              setCiudadSeleccionada(ciudadId);
              setHoteles(hotelesPorCiudad[ciudadId as keyof typeof hotelesPorCiudad] || []);
              setHotelSeleccionado(null);
              setHabitaciones([]);
            }}
          >
            <option value="">{t.seleccionaCiudad}</option>
            {ciudades.map(ciudad => (
              <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
            ))}
          </select>
        </div>
        {/* Selector de hotel */}
        <div className="flex flex-col">
          <label htmlFor="hotel-select" className="font-semibold mb-1">{t.hotel}</label>
          <select
            id="hotel-select"
            className="border rounded px-3 py-2"
            value={hotelSeleccionado || ""}
            onChange={e => {
              const hotelId = e.target.value;
              setHotelSeleccionado(hotelId);
              setHabitaciones(habitacionesPorHotel[hotelId as keyof typeof habitacionesPorHotel] || []);
            }}
            disabled={!hoteles.length}
          >
            <option value="">{t.seleccionaHotel}</option>
            {hoteles.map(hotel => (
              <option key={hotel.id} value={hotel.id}>{hotel.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Encabezado */}
      <div className="absolute top-4 left-4 text-2xl font-bold"
        style={{
          color: "#FFD700",
          textShadow: "2px 2px 8px #333, 0 0 2px #FFD700",
          fontFamily: "Perpetua Titling MT"
        }}>
        {t.reservasVip}
      </div>

      {/* Botón carrito */}
      <button
        className="fixed top-4 right-4 bg-blue-600 text-black p-3 rounded-full shadow-lg z-50 flex items-center"
        onClick={() => setShowCarrito(true)}
      >
        <FaShoppingCart size={24} />
        {carrito.length > 0 && (
          <span className="ml-2 bg-red-500 text-black rounded-full px-2 text-xs">{carrito.length}</span>
        )}
      </button>

      {/* Ventana carrito */}
      {showCarrito && (
        <div className="fixed top-16 right-4 bg-white rounded-xl shadow-2xl w-80 p-4 border border-blue-200 z-50">
          <h2 className="text-lg font-bold mb-2">Carrito de reservas</h2>
          {carrito.length === 0 ? (
            <p className="text-gray-500">No has agregado habitaciones.</p>
          ) : (
            <ul>
              {carrito.map((hab, idx) => {
                const precioNoche = Number(hab.precio.replace(/[^\d]/g, ""));
                const dias = hab.fechaInicio && hab.fechaFin
                  ? Math.ceil((new Date(hab.fechaFin).getTime() - new Date(hab.fechaInicio).getTime()) / (1000 * 60 * 60 * 24)) + 1
                  : 1;
                const total = precioNoche * dias;
                return (
                  <li key={idx} className="flex flex-col mb-4 border-b pb-2">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={hab.imagen} alt={hab.nombre} className="w-16 h-12 object-cover rounded" loading="lazy" decoding="async" />
                      <div>
                        <div className="font-semibold">{hab.nombre}</div>
                        <div className="text-xs text-gray-500">{hab.fechaInicio && hab.fechaFin ? `${new Date(hab.fechaInicio).toLocaleDateString()} - ${new Date(hab.fechaFin).toLocaleDateString()}` : ""}</div>
                      </div>
                      <button
                        className="text-red-500 text-xs ml-auto"
                        onClick={() => quitarDelCarrito(idx)}
                      >
                        Quitar
                      </button>
                    </div>
                    <div className="text-xs mt-1">
                      <div>Precio por noche: <b>${precioNoche.toLocaleString()}</b></div>
                      <div>Número de días: <b>{dias}</b></div>
                      <div>Precio total: <b>${total.toLocaleString()}</b></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => setShowCarrito(false)}
            >
              Cerrar
            </button>
            {carrito.length > 0 && (
              <button
                className="bg-blue-600 text-black px-3 py-1 rounded"
                onClick={() => { setShowPago(true); setShowCarrito(false); }}
              >
                Pagar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Listado de hoteles (solo si hay hoteles en el estado) */}
      {hoteles.length > 0 && (
        <div className="w-full max-w-3xl mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Hoteles disponibles</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hoteles.map((hotel) => (
              <li key={hotel.id} className={`border rounded-lg p-4 flex flex-col gap-2 bg-white shadow transition-all duration-200 ${hotelSeleccionado === hotel.id ? 'ring-2 ring-blue-500' : ''}`}>
                <img src={hotel.imagen} alt={hotel.nombre} className="w-full h-36 object-cover rounded mb-2" loading="lazy" decoding="async" />
                <div className="font-semibold text-lg">{hotel.nombre}</div>
                <div className="text-sm text-gray-500 mb-2">{hotel.descripcion}</div>
                <button
                  className={`px-3 py-1 rounded text-xs font-bold ${hotelSeleccionado === hotel.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black hover:bg-blue-100'}`}
                  onClick={() => handleSeleccionHotel(hotel.id)}
                  disabled={hotelSeleccionado === hotel.id}
                >
                  {hotelSeleccionado === hotel.id ? 'Hotel seleccionado' : 'Ver habitaciones'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Listado de habitaciones (solo si hay habitaciones en el estado) */}
      {habitaciones.length > 0 && (
        <div className="w-full max-w-2xl mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Habitaciones disponibles</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habitaciones.map((habitacion) => {
              const hotel = hotelSeleccionado || (Object.keys(habitacionesPorHotel) as (keyof typeof habitacionesPorHotel)[]).find((hid) => (habitacionesPorHotel[hid] as Habitacion[]).some((h: Habitacion) => h.id === habitacion.id)) || "";
              const ciudad = ciudadSeleccionada || (Object.keys(hotelesPorCiudad) as (keyof typeof hotelesPorCiudad)[]).find((cid) => (hotelesPorCiudad[cid] as {id: string}[]).some((h: {id: string}) => h.id === hotel)) || "";
              return (
                <li key={habitacion.id} className="border rounded-lg p-4 flex flex-col gap-2 bg-white shadow">
                  <img src={habitacion.imagen} alt={habitacion.nombre} className="w-full h-32 object-cover rounded" loading="lazy" decoding="async" />
                  <div className="font-semibold">{habitacion.nombre}</div>
                  <div className="text-xs text-gray-500">{habitacion.descripcion}</div>
                  <div className="text-xs">Capacidad: {habitacion.capacidad}</div>
                  <div className="text-xs">Precio: {habitacion.precio}</div>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs mt-2"
                    onClick={() => setHabitacionSeleccionada({ ...habitacion })}
                  >
                    Agregar al carrito
                  </button>
                  {/* Calendario modal para seleccionar fechas */}
                  {habitacionSeleccionada && habitacionSeleccionada.id === habitacion.id && (
                    <CalendarioReservaDesdePagina
                      habitacion={habitacion}
                      ciudad={ciudad}
                      hotel={hotel}
                      onClose={() => setHabitacionSeleccionada(null)}
                      setCarrito={setCarrito}
                      setShowCarrito={setShowCarrito}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* Ventana de pago */}
      {showPago && (
        <div className="fixed top-20 right-4 bg-white rounded-xl shadow-2xl w-70 p-6 border border-blue-200 z-50">
          <h2 className="text-lg font-bold mb-4">Método de pago</h2>
          <form onSubmit={handlePago} className="flex flex-col gap-3">
            <input
              className="border rounded px-2 py-1"
              placeholder="Nombre"
              required
              value={pago.nombre}
              onChange={e => setPago({ ...pago, nombre: e.target.value })}
            />
            <select
              className="border rounded px-2 py-1"
              required
              value={pago.tipoDocumento}
              onChange={e => setPago({ ...pago, tipoDocumento: e.target.value })}
            >
              <option value="">Tipo de documento</option>
              <option value="CC">Cédula de ciudadanía (CC)</option>
              <option value="NIT">NIT</option>
              <option value="PASSPORT">Pasaporte</option>
            </select>
            <input
              className="border rounded px-2 py-1"
              placeholder="Número de documento"
              required
              value={pago.numeroDocumento}
              onChange={e => setPago({ ...pago, numeroDocumento: e.target.value })}
            />
            <input
              className="border rounded px-2 py-1"
              placeholder="Número de teléfono"
              required
              value={pago.telefono}
              onChange={e => setPago({ ...pago, telefono: e.target.value })}
            />
            <select
              className="border rounded px-2 py-1"
              required
              value={pago.tipoCuenta}
              onChange={e => setPago({ ...pago, tipoCuenta: e.target.value })}
            >
              <option value="">Tipo de cuenta</option>
              <option value="ahorros">Ahorros</option>
              <option value="credito">Crédito</option>
              <option value="corriente">Corriente</option>
            </select>
            <input
              className="border rounded px-2 py-1"
              placeholder="Número de cuenta"
              required
              value={pago.numeroCuenta}
              onChange={e => setPago({ ...pago, numeroCuenta: e.target.value })}
            />
            <input
              className="border rounded px-2 py-1"
              placeholder="Correo"
              type="email"
              required
              value={pago.correo}
              onChange={e => setPago({ ...pago, correo: e.target.value })}
            />
            <select
              className="border rounded px-2 py-1"
              required
              value={pago.metodo}
              onChange={e => setPago({ ...pago, metodo: e.target.value })}
            >
              <option value="">Método de pago</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="nequi">Nequi</option>
              <option value="daviplata">Daviplata</option>
              <option value="pse">PSE</option>
              <option value="bancolombia">Bancolombia</option>
            </select>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowPago(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Confirmar pago
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mensaje de reserva exitosa */}
      {reservaExitosa && (
        <div className="fixed top-32 right-4 bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-xl shadow-2xl z-50">
          <b>Reserva exitosa</b><br />
          ¡Gracias por usar nuestros servicios!
        </div>
      )}

      {/* Botón flotante del chatbot */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-[100] flex items-center justify-center border-2 border-white"
        onClick={() => setShowChatbot(!showChatbot)}
        aria-label={showChatbot ? "Minimizar chatbot" : "Abrir chatbot"}
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
      >
        {showChatbot ? (
          <span style={{ fontSize: 32, color: '#e60000', fontWeight: 'bold', lineHeight: 1 }}>×</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/chatbot-icon.png" alt="Chatbot" style={{ width: 32, height: 32 }} loading="lazy" decoding="async" />
        )}
      </button>

      {/* Ventana del chatbot */}
      <div className={`fixed bottom-20 right-6 z-50 w-70 max-w-full ${showChatbot ? "block" : "hidden"}`}>
        <div className="bg-white rounded-xl shadow-2xl border border-blue-200 relative">
          <Chatbot
            ciudades={ciudades}
            hotelesPorCiudad={hotelesPorCiudad}
            habitacionesPorHotel={habitacionesPorHotel}
            onShowHoteles={setHoteles}
            onShowHabitaciones={setHabitaciones}
            reservaFinalizada={reservaFinalizada}
            onResetReserva={() => setReservaFinalizada(false)}
          />
        </div>
      </div>
    </main>
  );
}