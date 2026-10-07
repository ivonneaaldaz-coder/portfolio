import Link from "next/link";

export const metadata = {
  title: "Privacy — Ivonne Aldaz",
  description: "Privacy notice for ivonnealdaz.com.",
};

export default function PrivacyPage() {
  return (
    <section className="page section-pad privacy-page">
      <header className="collection-intro">
        <div>
          <h1>Privacy</h1>
          <p>How information is handled on this website.</p>
        </div>
        <Link href="/">Back to Overview ←</Link>
      </header>

      <div className="privacy-content">
        <p className="privacy-updated">Last updated October 3, 2026</p>

        <section>
          <h2>Information you choose to share</h2>
          <p>If you contact me or subscribe to updates, I may receive the information you provide, such as your name, email address, and message. I use it only to respond to you or send the updates you requested.</p>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>This site may use website analytics to understand general traffic, page views, and how visitors use the site. Analytics data is used to improve the website and is not sold to advertisers.</p>
        </section>

        <section>
          <h2>Third-party services</h2>
          <p>Some pages may display or link to content hosted by third-party services, including Pinterest, Google Drive, Spotify, and other external platforms. Those services may process information according to their own privacy policies when you interact with their content or visit their websites.</p>
        </section>

        <section>
          <h2>Pinterest integration</h2>
          <p>If the Pinterest integration is enabled, this site may use Pinterest&apos;s API to read Pins and Boards from my own authenticated Pinterest account and display selected visual references on this portfolio. The integration is read-only and is not used to access other users&apos; private Pinterest data.</p>
        </section>

        <section>
          <h2>Data sharing</h2>
          <p>I do not sell personal information. Information may be processed by service providers that help operate this website, subject to their own terms and privacy practices.</p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>You can ask about, update, or request deletion of personal information you have shared directly with me by emailing <a href="mailto:hello@ivonnealdaz.com">hello@ivonnealdaz.com</a>.</p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>This notice may be updated as the website or its integrations change. The date above reflects the latest revision.</p>
        </section>
      </div>
    </section>
  );
}