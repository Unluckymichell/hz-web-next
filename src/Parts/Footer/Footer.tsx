import React from "react";

function Footer() {
  return (
    <footer className="w-full flex flex-col items-center py-5 bg-[var(--highlight)]">
      <p>Copyright © Michael Schlegel {new Date().getFullYear()}</p>
      <p>
        Kontakt: <a className="text-[var(--highlight2)] hover:underline" href="mailto:michael@schlegel.dev">michael@schlegel.dev</a>
      </p>
    </footer>
  );
}

export default Footer;
