import ContentSection from "@/Parts/Content/ContentSection";
import Header from "@/Parts/Header/Header";
import HeaderContent from "@/Parts/Header/HeaderContent";
import { getImages } from "@/Parts/Header/homeImages";
import Navigation from "@/Parts/Navigation";
import Countdown from "@/Parts/Countdown";
import Footer from "@/Parts/Footer/Footer";
import ABC from "@/Parts/ABC";
import Locations from "@/Parts/Locations";
import Ablauf from "@/Parts/Ablauf";
import Begruesung from "@/Parts/Begruesung";
import GalerieLink from "@/Parts/GalerieLink";
import PhotoUploadLink from "@/Parts/PhotoUploadLink";
import Vorstellung from "@/Parts/Vorstellung";

const nav = [
  /*{ link: "/#vorstellung", label: "Vorstellung" },*/
  { link: "#einladung", id: "einladung", label: "Einladung" },
  { link: "#vorstellung", id: "vorstellung", label: "Vorstellung" },
  { link: "#countdown", id: "countdown", label: "Countdown" },
  { link: "#locations", id: "locations", label: "Location" },
  { link: "#ablauf", id: "ablauf", label: "Tagesablauf" },
  { link: "#abc", id: "abc", label: "Hochzeits-ABC" },
  { link: "#galerie", id: "galerie", label: "Galerie" },
  { link: "#fotos", id: "fotos", label: "Foto Upload" },
];

export const dynamic = 'force-dynamic';

export default async function Home() {
  const images = await getImages();

  return (
    <>
      <Header images={images}>
        <HeaderContent />
      </Header>
      <Navigation links={nav}>
        <ContentSection id="einladung">
          <Begruesung />
        </ContentSection>
        <ContentSection title="Vorstellung" id="vorstellung">
          <Vorstellung />
        </ContentSection>
        <ContentSection title="Countdown" id="countdown">
          <Countdown />
        </ContentSection>
        <ContentSection
          title="Location"
          id="locations"
          subtitle="Hier findet ihr Details zu den einzelnen Locations sowie Anreise-Informationen."
        >
          <Locations />
        </ContentSection>
        <ContentSection title="Tagesablauf" id="ablauf">
          <Ablauf />
        </ContentSection>
        <ContentSection title="Unser Hochzeits-ABC" id="abc">
          <ABC />
        </ContentSection>
        <ContentSection title="Galerie" id="galerie">
          <GalerieLink />
        </ContentSection>
        <ContentSection title="Foto Upload" id="fotos">
          <PhotoUploadLink />
        </ContentSection>
        <Footer />
      </Navigation>
    </>
  );
}
