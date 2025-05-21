import ContentSection from "@/Parts/Content/ContentSection";
import ImageUpload from "@/Parts/ImageUpload";
import Navigation from "@/Parts/Navigation";

const nav = [
  /*{ link: "/#vorstellung", label: "Vorstellung" },*/
  { link: "/", id: "", label: "< Back" },
  { link: "#fotos", id: "fotos", label: "Foto Upload" },
];

export default function Page() {
  return (
    <Navigation links={nav}>
      <ContentSection id="fotos" title="Bilder hochladen">
        <ImageUpload />
      </ContentSection>
    </Navigation>
  );
}
