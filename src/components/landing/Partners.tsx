import Image from "next/image";

const partnerLogos = [
  { src: "https://placehold.co/120x40.png", alt: "Partner Logo 1", hint: "tech company logo" },
  { src: "https://placehold.co/120x40.png", alt: "Partner Logo 2", hint: "tech company logo" },
  { src: "https://placehold.co/120x40.png", alt: "Partner Logo 3", hint: "tech company logo" },
  { src: "https://placehold.co/120x40.png", alt: "Partner Logo 4", hint: "tech company logo" },
  { src: "https://placehold.co/120x40.png", alt: "Partner Logo 5", hint: "tech company logo" },
];

export function Partners() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {partnerLogos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              data-ai-hint={logo.hint}
              width={120}
              height={40}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
