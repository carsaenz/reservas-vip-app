import Image from "next/image";

export default function HabitacionDeluxe() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Habitación Deluxe</h1>
      <Image src="/productos/habitacion-deluxe.jpg" alt="Habitación Deluxe" width={400} height={300} className="rounded" />
      <p className="mt-4">Disfruta de una experiencia premium en nuestra Habitación Deluxe, equipada con todas las comodidades para tu descanso.</p>
    </div>
  );
}
