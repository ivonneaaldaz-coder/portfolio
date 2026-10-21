import Link from "next/link";
const socials=[
  {label:"Instagram",href:"https://www.instagram.com/ivonnealdaz/"},
  {label:"Pinterest",href:"https://www.pinterest.com/ivonnealdaz/"},
  {label:"LinkedIn",href:"https://www.linkedin.com/in/ivonnealdaz/"},
  {label:"GitHub",href:"https://github.com/ivonneaaldaz-coder"},
  {label:"X",href:"https://x.com/ivonnealdazz"}
];
export default function SiteFooter(){
  return <footer className="footer-grid section-pad site-footer editorial-footer">
    <div className="footer-about"><h2>The world is my studio.</h2><a href="mailto:hello@ivonnealdaz.com">Get in touch →</a></div>
    <div className="footer-social"><p className="eyebrow">SOCIAL MEDIA</p><nav aria-label="Social profiles" className="footer-social-columns"><div>{socials.slice(0,2).map(s=><a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div><div>{socials.slice(2).map(s=><a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div></nav></div>
    <div className="footer-notes"><p className="eyebrow">OCCASIONAL NOTES</p><p className="muted">A little creativity in your inbox.</p><a className="footer-subscribe-link" href="https://substack.com/@ivonnealdaz" target="_blank" rel="noreferrer">Subscribe on Substack →</a></div>
  </footer>;
}
