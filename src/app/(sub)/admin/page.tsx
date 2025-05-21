import ContentSection from "@/Parts/Content/ContentSection";
import ImageUpload from "@/Parts/ImageUpload";

export default function Page() {
    return (
      <>
        <ContentSection id="admin" title="Administration">
          <ImageUpload />
        </ContentSection>
      </>
    );
  }