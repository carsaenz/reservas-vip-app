import Image from "next/image";

export default function NextImageBg() {
  return (
    <Image
      src="/turismo-bg.jpg"
      alt="Fondo turístico"
      fill
      style={{ objectFit: "cover" }}
      priority
      sizes="100vw"
    />
  );
}
