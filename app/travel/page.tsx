import Link from "next/link";
import TravelGallery from "@/components/TravelGallery";

const photographs = [
  {"place":"Budapest, Hungary","image":"https://drive.google.com/thumbnail?id=1HPpUAYI0iHg2-YMlx0d0LZgjTxoVyx3d&sz=w1800"},
  {"place":"Amsterdam, Netherlands","image":"https://drive.google.com/thumbnail?id=17wChVpZROEgdiD9vpkYt3ogPOjpzGUBu&sz=w1800"},
  {"place":"Amsterdam, Netherlands","image":"https://drive.google.com/thumbnail?id=1dL1eT3JsfJeyjw0Q_r8KGqxrskq4dX2O&sz=w1800"},
  {"place":"Schwangau, Germany","image":"https://drive.google.com/thumbnail?id=1idJi3K7BwqVbNe06NIMFCbgPYGpC-ic3&sz=w1800"},
  {"place":"Schmalkalden, Germany","image":"https://drive.google.com/thumbnail?id=1Erhc9fq5PWG19GmBVdLz21PIQjVh1IPY&sz=w1800"},
  {"place":"Barcelona, Spain","image":"https://drive.google.com/thumbnail?id=1gFHa4GUnmj3VJrgzbWxr06ca4MEaPQW1&sz=w1800"},
  {"place":"Verona, Italy","image":"https://drive.google.com/thumbnail?id=1dXZeG98CIknlMqig8EN5NH1cKQ3gHDDW&sz=w1800"},
  {"place":"Adolf Munkel Trail, Italy","image":"https://drive.google.com/thumbnail?id=10hEuXTspdXyDFfAMTZEkkSpYcEprbTEJ&sz=w1800"},
  {"place":"Lago di Braies, Italy","image":"https://drive.google.com/thumbnail?id=1O4kpRXNiIwgR8KqSCwDqD53o664Ku4Ee&sz=w1800"},
  {"place":"Plitvice National Park, Croatia","image":"https://drive.google.com/thumbnail?id=18AqGPHV67GjKN6Wclgntxyblisjusyct&sz=w1800"},
  {"place":"Split, Croatia","image":"https://drive.google.com/thumbnail?id=1Ls9aDVjljnXM6vQwg87M9rCKFGBMBXYo&sz=w1800"},
  {"place":"Dolomites, Italy","image":"https://drive.google.com/thumbnail?id=1dUPvXb9sPhvt8GqvBskQ3dDrExkWTnQr&sz=w1800"},
  {"place":"Mostar, Bosnia and Herzegovina","image":"https://drive.google.com/thumbnail?id=1wemNJa1qLkZfRngMFgsFk2E4xCMz6eZ1&sz=w1800"}
];

export default function TravelPage() {
  return (
    <section className="travel-page page">
      <header className="travel-intro section-pad">
        <h1>Travel</h1>
        <p>Photographs from places I’ve passed through, stayed awhile, and wanted to remember.</p>
      </header>

      <TravelGallery photographs={photographs} />
      <nav className="related-paths section-pad" aria-label="Explore next"><Link href="/visual-references">Visual References →</Link><Link href="/art">Art Practice →</Link></nav>
    </section>
  );
}
