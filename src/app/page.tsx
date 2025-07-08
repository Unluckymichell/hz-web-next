import ContentSection from "@/Parts/Content/ContentSection";
import Header from "@/Parts/Header/Header";
import HeaderContent from "@/Parts/Header/HeaderContent";
import { getImages } from "@/Parts/Header/homeImages";
import Navigation, { NavigationProps } from "@/Parts/Navigation";
import Countdown from "@/Parts/Countdown";
import Footer from "@/Parts/Footer/Footer";
import ABC from "@/Parts/ABC";
import Locations from "@/Parts/Locations";
import Ablauf from "@/Parts/Ablauf";
import Begruesung from "@/Parts/Begruesung";
import GalerieLink, { GalerieLinkFallback } from "@/Parts/GalerieLink";
import PhotoUploadLink from "@/Parts/PhotoUploadLink";
import Vorstellung from "@/Parts/Vorstellung";
import { Suspense } from "react";

const nav: NavigationProps["links"] = [
  { link: "#einladung", id: "einladung", label: "Einladung" },
  { link: "#vorstellung", id: "vorstellung", label: "Vorstellung" },
  { link: "#galerie", id: "galerie", label: "Galerie", preloadOnclick: "/galery" },
  { link: "#fotos", id: "fotos", label: "Foto Upload", preloadOnclick: "/photoupload" },
  { link: "#locations", id: "locations", label: "Location" },
  { link: "#ablauf", id: "ablauf", label: "Tagesablauf" },
  { link: "#abc", id: "abc", label: "Hochzeits-ABC" },
  { link: "#countdown", id: "countdown", label: "Countdown" },
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
        <ContentSection title="Galerie" id="galerie">
          <Suspense fallback={<GalerieLinkFallback/>}>
            <GalerieLink />
          </Suspense>
        </ContentSection>
        <ContentSection title="Foto Upload" id="fotos">
          <PhotoUploadLink />
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
        <ContentSection title="Countdown" id="countdown">
          <Countdown />
        </ContentSection>
        <Footer />
      </Navigation>
    </>
  );
}
