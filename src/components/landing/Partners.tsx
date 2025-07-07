import Image from "next/image";

const partnerLogos = [
  { src: "https://placehold.co/120x40.png", alt: "Join Us", hint: "company logo" },
  { src: "https://placehold.co/120x40.png", alt: "Bloomberg", hint: "bloomberg logo" },
  { src: "https://placehold.co/120x40.png", alt: "TC", hint: "techcrunch logo" },
  { src: "https://placehold.co/120x40.png", alt: "Forbes", hint: "forbes logo" },
  { src: "https://placehold.co/120x40.png", alt: "TechRadar", hint: "techradar logo" },
];

export function Partners() {
  return (
    <section className="bg-[#F9FAFB] py-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-lg font-medium text-gray-600 mb-8">Join 100+ million users who trust Paymint for their financial needs</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {partnerLogos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              data-ai-hint={logo.hint}
              width={130}
              height={32}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
