import Link from "next/link";

const tiles = [
  ["TYPE","Typefaces, spacing, editorial systems","visual-tall"],
  ["INTERIORS","Rooms, materials, light","visual-wide"],
  ["COLOR","Palettes and unexpected combinations","visual-square"],
  ["ART","Work that changes how I see","visual-tall"],
  ["OBJECTS","Useful, strange, beautifully resolved","visual-square"],
  ["PLACES","Architecture, landscape, atmosphere","visual-wide"],
  ["INTERFACES","Digital details worth remembering","visual-square"],
  ["MATERIAL","Paper, clay, metal, texture","visual-tall"],
];

export default function VisualIndexPage() {
  return (
    <section className="page section-pad visual-index-page">
      <header className="collection-intro">
        <div>
          <h1>Visual Index</h1>
          <p>A visual collection of things I like enough to save.</p>
        </div>
        <Link href="/notes">Back to Notes ←</Link>
      </header>

      <div className="visual-filter-row">
        <span>All</span><span>Type</span><span>Interiors</span><span>Art</span><span>Objects</span><span>Color</span><span>Places</span>
      </div>

      <div className="visual-masonry">
        {tiles.map(([title,desc,size],index) => (
          <article className={"visual-tile " + size + " visual-tone-" + (index%6)} key={title}>
            <span>{String(index+1).padStart(2,"0")}</span>
            <div><h2>{title}</h2><p>{desc}</p></div>
          </article>
        ))}
      </div>

      <p className="collection-status">The visual archive is being assembled. Saved imagery from the collection will drop into this grid without changing the structure.</p>
    </section>
  );
}
