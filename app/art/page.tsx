import ArtGallery from "@/components/ArtGallery";

const works = [
  { title:"What I Didn’t Say", meta:"Acrylic on canvas / 60 × 48 in / Private collection", image:"https://drive.google.com/thumbnail?id=1eCnQkPPWiHQwzHHUeLwlDTgSJECXh1sk&sz=w1800" },
  { title:"Wish You Were Here", meta:"Lake Como, 2025 / Acrylic on canvas / 48 × 36 in / Private collection", image:"https://drive.google.com/thumbnail?id=1khGOB5ZV6yyy92U0DzFwC9O8-nRon4Ch&sz=w1800" },
  { title:"Beneath the Surface", meta:"Acrylic on canvas / 48 × 36 in / Private collection", image:"https://drive.google.com/thumbnail?id=1zTlpaI0hfx4AML75HP_lt9FsaOJoqFsu&sz=w1800" },
  { title:"Somewhere in Tequila", meta:"Watercolor on paper / 9 × 12 in", image:"https://drive.google.com/thumbnail?id=10FAb7uNKU-5TX_bpSKHL-q7yJvY0p4c0&sz=w1800" },
  { title:"The Time Beneath", meta:"Málaga, Spain / Watercolor on paper / 12 × 9 in", image:"https://drive.google.com/thumbnail?id=1sr0MTL15ZqKFWQryz5F3wv5w8wuyo9vi&sz=w1800" },
  { title:"The Last Light", meta:"St. Antonin Noble Val, France / Watercolor on paper / 12 × 9 in", image:"https://drive.google.com/thumbnail?id=181vXtR_MHtCPVQNi7fUfg5P9xclBxC7p&sz=w1800" },
  { title:"What the Wind Knows", meta:"St. Antonin Noble Val, France / Watercolor on paper / 9 × 12 in", image:"https://drive.google.com/thumbnail?id=1l-1HJUwXymw54g2Ynti2V4gWjJ1A1-dc&sz=w1800" },
];

const exhibitions = [
  ["2026","UTSA","Group exhibition / The Time Beneath"],
  ["2026","The Dominion","Abstract Expressionism + Small Landscape Works"],
  ["2024","Torre Delle Arti / Bellagio","Abstract Gradients"],
];

const residencies = [
  ["2025","Casa D’Arte","Lake Como, Italy"],
  ["2024","NG Art Residency","Provence, France"],
  ["2023","La Roane","St. Antonin-Noble-Val, France"],
];

export default function ArtPage() {
  return (
    <section className="art-page page">
      <header className="art-intro section-pad">
        <h1>Art Practice</h1>
        <div>
          <p>My work explores the spaces between memory and place — how color, light, and silence can hold emotion.</p>
          <p className="muted">Painting, watercolor, ceramics, and installation.</p>
        </div>
      </header>

      <ArtGallery works={works} />

      <section className="art-history section-pad">
        <div className="art-history-column">
          <div className="section-heading"><h2 className="section-title small-title">Exhibitions</h2></div>
          {exhibitions.map(([year,place,title]) => (
            <div className="art-history-row" key={year+place}><span>{year}</span><div><h3>{place}</h3><p>{title}</p></div></div>
          ))}
        </div>
        <div className="art-history-column">
          <div className="section-heading"><h2 className="section-title small-title">Residencies</h2></div>
          {residencies.map(([year,place,title]) => (
            <div className="art-history-row" key={year+place}><span>{year}</span><div><h3>{place}</h3><p>{title}</p></div></div>
          ))}
        </div>
      </section>

      <footer className="art-footer section-pad">
        <p>Selected works. Full archive in progress.</p>
        <a href="mailto:hello@ivonnealdaz.com">Exhibitions / inquiries ↗︎</a>
      </footer>
    </section>
  );
}
