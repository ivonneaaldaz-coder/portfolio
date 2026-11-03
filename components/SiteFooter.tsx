import Link from "next/link";
const socials=[
  {label:"Instagram",href:"https://www.instagram.com/ivonnealdaz/"},
  {label:"Pinterest",href:"https://www.pinterest.com/ivonnealdaz/"},
  {label:"LinkedIn",href:"https://www.linkedin.com/in/ivonnealdaz/"},
  {label:"GitHub",href:"https://github.com/ivonneaaldaz-coder"},
  {label:"X",href:"https://x.com/ivonnealdazz"}
];
export default function SiteFooter(){
  return <><style>{`@media(min-width:901px){footer.site-footer.editorial-footer{border-top:1px solid var(--line)!important}}`}</style><footer className="footer-grid section-pad site-footer editorial-footer">
    <div className="footer-about"><h2>The world is my studio.</h2><a href="mailto:hello@ivonnealdaz.com">Get in touch →</a></div>
    <div className="footer-social"><p className="eyebrow">SOCIAL MEDIA</p><nav aria-label="Social profiles" className="footer-social-columns"><div>{socials.slice(0,2).map(s=><a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} <span className="external-arrow" aria-hidden="true">↗</span></a>)}</div><div>{socials.slice(2).map(s=><a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} <span className="external-arrow" aria-hidden="true">↗</span></a>)}</div></nav></div>
    <div className="footer-notes"><p className="eyebrow">OCCASIONAL NOTES</p><p className="muted">A little creativity in your inbox.</p><a className="footer-subscribe-link" href="https://ivonnealdaz.substack.com/" target="_blank" rel="noreferrer">Subscribe</a></div>
  </footer></>;
}
