"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
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


// --- Componente principal ---

export default function Home() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState<any>(null);
  const [mostrarCiudades, setMostrarCiudades] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [reservaFinalizada, setReservaFinalizada] = useState(false);
  const [hoteles, setHoteles] = useState<any[]>([]);
  const [habitaciones, setHabitaciones] = useState<any[]>([]);
  const [carrito, setCarrito] = useState<any[]>([]);
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

  // Cuando se selecciona una ciudad desde la UI principal
  function handleSeleccionCiudad(ciudadId: string) {
    setCiudadSeleccionada(ciudadId);
    setHoteles(hotelesPorCiudad[ciudadId as keyof typeof hotelesPorCiudad] || []);
    setHabitaciones([]);
    setHotelSeleccionado(null);
  }

  // Cuando se selecciona un hotel desde la UI principal
  function handleSeleccionHotel(hotelId: string) {
    setHotelSeleccionado(hotelId);
    setHabitaciones(habitacionesPorHotel[hotelId as keyof typeof habitacionesPorHotel] || []);
  }

  // Agregar habitación al carrito (requiere ciudad y hotel seleccionados)
  function agregarAlCarrito(habitacion: any) {
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
    // Minimiza el chatbot si se muestran hoteles o habitaciones
    if (hoteles.length > 0 || habitaciones.length > 0) {
      setShowChatbot(false);
    }
  }, [hoteles, habitaciones]);
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
  <div
  className="absolute top-4 left-4 text-2xl font-bold"
  style={{
    color: "#FFD700",
    textShadow: "2px 2px 8px #333, 0 0 2px #FFD700",
    fontFamily: "Perpetua Titling MT" // Cambia aquí por la fuente que prefieras
  }}
>
  RESERVAS.VIP
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
          // Extraer precio numérico
          const precioNoche = Number(hab.precio.replace(/[^\d]/g, ""));
          // Calcular días (incluye ambos extremos)
          const dias = hab.fechaInicio && hab.fechaFin
            ? Math.ceil((new Date(hab.fechaFin).getTime() - new Date(hab.fechaInicio).getTime()) / (1000 * 60 * 60 * 24)) + 1
            : 1;
          const total = precioNoche * dias;
          return (
            <li key={idx} className="flex flex-col mb-4 border-b pb-2">
              <div className="flex items-center gap-2">
                <img src={hab.imagen} alt={hab.nombre} className="w-16 h-12 object-cover rounded" />
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

      {/* Ciudades */}
      {mostrarCiudades && (
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        {ciudades.map(ciudad => (
          <div key={ciudad.id} className="bg-white/90 rounded-xl shadow-lg p-4 flex flex-col items-center max-w-xs border border-blue-200">
            <img src={ciudad.imagen} alt={ciudad.nombre} className="rounded-lg w-40 h-24 object-cover mb-2" />
            <h3 className="text-lg font-bold mb-1">{ciudad.nombre}</h3>
            <p className="text-gray-700">{ciudad.descripcion}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => handleSeleccionCiudad(ciudad.id)}
            >
              Ver hoteles
            </button>
          </div>
        ))}
      </div>
)}

      {/* Hoteles */}
      {hoteles.length > 0 && (
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          {hoteles.map(hotel => (
            <div key={hotel.id} className="bg-white/90 rounded-xl shadow-lg p-4 flex flex-col items-center max-w-xs border border-blue-200">
              <img src={hotel.imagen} alt={hotel.nombre} className="rounded-lg w-40 h-24 object-cover mb-2" />
              <h3 className="text-lg font-bold mb-1">{hotel.nombre}</h3>
              <p className="text-gray-700">{hotel.descripcion}</p>
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleSeleccionHotel(hotel.id)}
              >
                Ver habitaciones
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Habitaciones */}
      {habitaciones.length > 0 && (
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          {habitaciones.map(hab => (
            <div key={hab.id} className="bg-white/90 rounded-xl shadow-lg p-4 flex flex-col items-center max-w-xs border border-blue-200">
              <img src={hab.imagen} alt={hab.nombre} className="rounded-lg w-40 h-24 object-cover mb-2" />
              <h3 className="text-lg font-bold mb-1">{hab.nombre}</h3>
              <p className="text-gray-700">{hab.descripcion}</p>
              <p className="text-blue-700 font-semibold">{hab.precio}</p>
              <p className="text-gray-600">{hab.capacidad}</p>
              {hab.servicios && (
                <ul className="text-xs text-gray-500 mt-1">
                  {hab.servicios.map((servicio: string, idx: number) => (
                    <li key={idx}>• {servicio}</li>
                  ))}
                </ul>
              )}
              <button
  className="mt-3 flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
  onClick={() => {
    setHabitacionSeleccionada(hab);
    setMostrarCalendario(true);
  }}
>
  <FaShoppingCart /> Agregar al carrito
</button>
            </div>
          ))}
        </div>
      )}

{mostrarCalendario && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col gap-4">
      <h3 className="font-bold text-lg mb-2">Selecciona las fechas de tu reserva</h3>
      <DatePicker
        selected={fechaInicio}
        onChange={(dates: [Date | null, Date | null]) => {
          setFechaInicio(dates[0]);
          setFechaFin(dates[1]);
        }}
        startDate={fechaInicio}
        endDate={fechaFin}
        selectsRange
        inline
        minDate={new Date()}
      />
      <div className="flex gap-2 justify-end">
        <button
          className="bg-gray-300 px-3 py-1 rounded"
          onClick={() => {
            setMostrarCalendario(false);
            setFechaInicio(null);
            setFechaFin(null);
            setHabitacionSeleccionada(null);
          }}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          disabled={!fechaInicio || !fechaFin}
          onClick={() => {
            if (habitacionSeleccionada && ciudadSeleccionada && hotelSeleccionado) {
              agregarAlCarrito(habitacionSeleccionada);
            }
            setMostrarCalendario(false);
            setFechaInicio(null);
            setFechaFin(null);
            setHabitacionSeleccionada(null);
          }}
        >
          Confirmar reserva
        </button>
      </div>
    </div>
  </div>
)}

      {/* Botón flotante del chatbot */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
        onClick={() => setShowChatbot(!showChatbot)}
        aria-label={showChatbot ? "Minimizar chatbot" : "Abrir chatbot"}
      >
        {showChatbot ? (
          <span style={{ fontSize: 24 }}>×</span>
        ) : (
          <img src="/chatbot-icon.png" alt="Chatbot" style={{ width: 32, height: 32 }} />
        )}
      </button>

      <div
  className={`fixed bottom-20 right-6 z-50 w-70 max-w-full ${showChatbot ? "block" : "hidden"}`}
>
  <div className="bg-white rounded-xl shadow-2xl border border-blue-200 relative">
    {/* Botón cerrar */}
    <button
      className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-2xl text-red-600 hover:bg-red-100 z-50"
      onClick={() => setShowChatbot(false)}
      aria-label="Cerrar chatbot"
      type="button"
    >
      ×
    </button>
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