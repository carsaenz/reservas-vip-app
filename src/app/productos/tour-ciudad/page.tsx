import Image from "next/image";

export default function TourCiudad() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tour por la ciudad</h1>
      <Image src="/productos/tour-ciudad.jpg" alt="Tour por la ciudad" width={400} height={300} className="rounded" />
      <p className="mt-4">Descubre los mejores lugares y atracciones con nuestro Tour por la ciudad, guiado por expertos locales.</p>
    </div>
  );
}
