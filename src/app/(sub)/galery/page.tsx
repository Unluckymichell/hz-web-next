import ContentSection from "@/Parts/Content/ContentSection";
import Navigation from "@/Parts/Navigation";
import fs from "fs";
import path from "path";

const nav = [
  /*{ link: "/#vorstellung", label: "Vorstellung" },*/
  { link: "/", id: "", label: "< Back" },
  { link: "#galery", id: "galery", label: "Galerie" },
];

export const dynamic = 'force-dynamic';

export default function Galerie() {
  const uploadsDir = path.join(process.cwd(), "public/Uploads");
  const images = fs.readdirSync(uploadsDir);

  return (
    <Navigation links={nav}>
      <ContentSection id="galery" title="Galerie">
        <h1 className="text-2xl font-bold mb-4">Galerie</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img}
              src={`/uploads/${img}`}
              className="rounded shadow"
              alt="Galery Image"
            />
          ))}
        </div>
      </ContentSection>
    </Navigation>
  );
}
