import ContentSection from "@/Parts/Content/ContentSection";
import Navigation from "@/Parts/Navigation";
// import fs from "fs";
// import path from "path";

const nav = [
  /*{ link: "/#vorstellung", label: "Vorstellung" },*/
  { link: "/", id: "", label: "< Back" },
  { link: "#galery", id: "galery", label: "Galerie" },
];

export const dynamic = "force-dynamic";

// function ImageGrid({ uploadsDir }: { uploadsDir: string }) {
//   const images = fs.readdirSync(uploadsDir);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {images.map((img) => (
//         // eslint-disable-next-line @next/next/no-img-element
//         <img
//           key={img}
//           src={`/Uploads/${img}`}
//           className="rounded shadow"
//           alt="Galery Image"
//         />
//       ))}
//     </div>
//   );
// }

export default function Galerie() {
  //const uploadsDir = path.join(process.cwd(), "public/Uploads");

  return (
    <Navigation links={nav}>
      <ContentSection id="galery" title="Galerie">
        <h1 className="text-2xl font-bold mb-4">Galerie</h1>
        {/*fs.existsSync(uploadsDir) ? (
          <ImageGrid uploadsDir={uploadsDir} />
        ) : (
          <p>Error: No Galerie Directory</p>
        )*/}
        <p>Noch nicht verfügbar. Wir werden die Bilder nach der Hochzeit hier hochladen.</p>
      </ContentSection>
    </Navigation>
  );
}
