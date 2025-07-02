import Image from "next/image";

export default function SuiteEjecutiva() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Suite Ejecutiva</h1>
      <Image src="/productos/suite-ejecutiva.jpg" alt="Suite Ejecutiva" width={400} height={300} className="rounded" />
      <p className="mt-4">Nuestra Suite Ejecutiva ofrece lujo y confort para viajeros exigentes, con servicios exclusivos y ambiente elegante.</p>
    </div>
  );
}
