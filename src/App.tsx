import { FormEvent, useEffect, useState } from "react";

type Page = "home" | "events" | "menu" | "about" | "contact" | "booking";

const images = {
  hero: "https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?auto=format&fit=crop&w=2000&q=88",
  crowd: "/images/kilowatts-crowd.jpg",
  dj: "/images/kilowatts-performance.jpg",
  event: "/images/kilowatts-crowd.jpg",
  concert: "/images/kilowatts-performance.jpg",
  drinks: "https://images.unsplash.com/photo-1690335008679-1e319b9fa3d8?auto=format&fit=crop&w=1200&q=85",
  friends: "/images/kilowatts-crowd.jpg",
  food: "https://images.unsplash.com/photo-1678684279246-96e6afb970f2?auto=format&fit=crop&w=1200&q=85",
  stage: "/images/kilowatts-performance.jpg",
  loungeLight: "/images/kilowatts-lounge-light.jpg",
  lounge: "/images/kilowatts-lounge.jpg",
  interior: "/images/kilowatts-interior.jpg",
  seating: "/images/kilowatts-seating.jpg",
};

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Events", page: "events" },
  { label: "Menu & Specials", page: "menu" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

function Icon({ name }: { name: "pin" | "music" | "glass" | "calendar" | "arrow" }) {
  const paths = {
    pin: <><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    music: <><path d="M9 18V5l10-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></>,
    glass: <><path d="M5 3h14l-2 8a5 5 0 0 1-10 0L5 3Z" /><path d="M12 16v5M8 21h8" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button className={`logo ${compact ? "logo-compact" : ""}`} onClick={() => navigateTo("home")} aria-label="Kilowatts home">
      <img className="logo-image" src="/images/kilowatts-logo.jpg" alt="" />
      <span><b>KILOWATTS</b><small>LIFESTYLE • DIEPSLOOT</small></span>
    </button>
  );
}

let navigateTo: (page: Page) => void = () => {};

function Header({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const go = (target: Page) => {
    setPage(target);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  navigateTo = go;
  return (
    <>
      <div className="announcement">YOUR NIGHT. YOUR PEOPLE. YOUR KILOWATTS.</div>
      <header className="header">
        <div className="shell nav-shell">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <button key={item.page} className={page === item.page ? "active" : ""} onClick={() => go(item.page)}>{item.label}</button>
            ))}
          </nav>
          <button className="btn btn-gold nav-book" onClick={() => go("booking")}>Book a table</button>
          <button className={`menu-toggle ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            <span /><span /><span />
          </button>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => <button key={item.page} onClick={() => go(item.page)}>{item.label}</button>)}
            <button className="btn btn-gold" onClick={() => go("booking")}>Book a table</button>
          </nav>
        )}
      </header>
    </>
  );
}

function Button({ children, page, outline = false }: { children: React.ReactNode; page: Page; outline?: boolean }) {
  return <button className={`btn ${outline ? "btn-outline" : "btn-gold"}`} onClick={() => navigateTo(page)}>{children}<Icon name="arrow" /></button>;
}

function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

const events = [
  { title: "Ladies Night", image: images.event, copy: "A night built around music, style and the energy of being together." },
  { title: "Freaky Fridays", image: images.dj, copy: "Turn up the weekend with a high-energy Friday atmosphere." },
  { title: "Sunday Chillers", image: images.concert, copy: "Soul sessions, good company and an easy Sunday rhythm." },
];

function EventsGrid({ limit = 3 }: { limit?: number }) {
  return (
    <div className="events-grid">
      {events.slice(0, limit).map((event, i) => (
        <article className="event-card" key={event.title}>
          <img src={event.image} alt="Representative nightlife atmosphere" />
          <div className="event-shade" />
          <span className="draft">DATE TO BE CONFIRMED</span>
          <div className="event-body"><span className="event-num">0{i + 1}</span><h3>{event.title}</h3><p>{event.copy}</p><button onClick={() => navigateTo("events")}>View event <Icon name="arrow" /></button></div>
        </article>
      ))}
    </div>
  );
}

function Home() {
  return (
    <main>
      <section className="hero" style={{ backgroundImage: `url(${images.hero})` }}>
        <div className="hero-overlay" />
        <div className="shell hero-content">
          <span className="eyebrow">KILOWATTS LIFESTYLE • DIEPSLOOT</span>
          <h1>THE HEARTBEAT OF<br /><em>DIEPSLOOT</em> NIGHTLIFE.</h1>
          <p>Good music. Great energy. Unforgettable nights.</p>
          <div className="actions"><Button page="events">View weekend lineup</Button><Button page="booking" outline>Book a table</Button></div>
        </div>
        <div className="scroll-cue"><span />SCROLL TO FEEL THE ENERGY</div>
      </section>

      <section className="highlights">
        <div className="shell highlight-grid">
          {[
            ["pin", "Diepsloot West Ext 9", "Right in the heart of the community"],
            ["music", "Music & DJs", "Nightlife and entertainment"],
            ["glass", "Drinks & Food", "Made for social gatherings"],
            ["calendar", "Table Enquiries", "Plan your next night out"],
          ].map(([icon, title, text]) => <div className="highlight" key={title}><Icon name={icon as "pin"} /><div><b>{title}</b><span>{text}</span></div></div>)}
        </div>
      </section>

      <section className="section shell">
        <SectionHead eyebrow="THE WEEKEND STARTS HERE" title="WHAT’S HAPPENING AT KILOWATTS?" copy="Recurring event concepts. Dates, times and lineups remain subject to venue confirmation." />
        <EventsGrid />
        <div className="center"><Button page="events" outline>View all events</Button></div>
      </section>

      <section className="sound section">
        <div className="shell split">
          <div className="feature-image"><img src={images.dj} alt="Representative DJ performing at a nightclub" /><span className="vertical-label">REPRESENTATIVE IMAGE</span></div>
          <div className="sound-copy">
            <SectionHead eyebrow="MUSIC • CULTURE • ENERGY" title="THE SOUND OF KILOWATTS" copy="From local selectors to crowd-moving performances, music is at the centre of the Kilowatts experience." />
            <div className="artist-list">
              {[
                ["ARTIST REFERENCE 01", "Slaga Malagosh • Princess Bee • Karilito Koffy G"],
                ["ARTIST REFERENCE 02", "Space Andza • Zuma • Skomota"],
                ["ARTIST REFERENCE 03", "Young Stunna • Sledge • Manyathi"],
              ].map(([artist, names], i) => <div className="artist" key={artist}><span>0{i + 1}</span><div><b>{artist}</b><small>{names} • APPEARANCES NOT CONFIRMED</small></div></div>)}
            </div>
            <Button page="events">Discover events</Button>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="split promo-split">
          <div>
            <SectionHead eyebrow="POUR • SHARE • CELEBRATE" title="GOOD DRINKS. BETTER COMPANY." copy="Make a toast, share the moment and settle into the rhythm of the night." />
            <div className="pending-card"><span className="draft">DRAFT • VENUE CONFIRMATION REQUIRED</span><h3>REPORTED R100<br />BUCKET SPECIAL</h3><p>Proposed six-pack promotion: Savanna, Brutal Fruit, Flying Fish or Corona. Price, products, conditions and availability must be confirmed before publication.</p></div>
            <Button page="menu" outline>Explore menu & specials</Button>
          </div>
          <div className="photo-stack"><img src={images.drinks} alt="Representative drinks at a bar" /><div className="gold-frame" /></div>
        </div>
      </section>

      <section className="food-section">
        <div className="shell split food-grid">
          <div className="food-photo"><img src={images.food} alt="Representative grilled meat platter" /></div>
          <div className="food-copy"><SectionHead eyebrow="FOOD • FRIENDS • FLAVOUR" title="MORE THAN JUST THE NIGHTLIFE" copy="Good food, great company and an atmosphere worth coming back for. Menu details and availability are subject to venue approval." /><div className="food-tags"><span>BRAAI</span><span>SHARING PLATTERS</span><span>LOCAL BAR FOOD</span></div><Button page="menu">View menu</Button></div>
        </div>
      </section>

      <section className="section shell">
        <SectionHead eyebrow="REAL MOMENTS • REAL ENERGY" title="FEEL THE KILOWATTS ENERGY" copy="Representative photography shown until approved venue imagery is supplied." />
        <div className="gallery">
          {[images.crowd, images.lounge, images.loungeLight, images.interior, images.seating].map((img, i) => <figure key={`${img}-${i}`} className={`gallery-${i + 1}`}><img src={img} alt={["Kilowatts crowd and social atmosphere", "Kilowatts lounge interior", "Kilowatts light lounge seating", "Kilowatts venue interior", "Branded Kilowatts seating"][i]} /></figure>)}
        </div>
      </section>

      <BookingBanner />
      <Location />
    </main>
  );
}

function BookingBanner() {
  return <section className="booking-banner" style={{ backgroundImage: `url(${images.crowd})` }}><div className="booking-overlay" /><div className="shell"><span className="eyebrow">YOUR TABLE • YOUR PEOPLE • YOUR NIGHT</span><h2>MAKE YOUR NEXT NIGHT<br /><em>UNFORGETTABLE.</em></h2><p>Planning a night out with friends? Send us your table enquiry.</p><Button page="booking">Book a table</Button></div></section>;
}

function Location() {
  return (
    <section className="section shell location-section">
      <div className="location-card">
        <SectionHead eyebrow="DIEPSLOOT • JOHANNESBURG" title="FIND US IN DIEPSLOOT" />
        <address><b>Kilowatts Lifestyle Diepsloot</b><br />Msakazo Street<br />Diepsloot West Extension 9<br />Diepsloot, Johannesburg, 2189<br />South Africa</address>
        <div className="hours"><span>REPORTED HOURS</span><b>10:00–02:00 DAILY</b><small>To be verified with the venue before publication.</small></div>
        <div className="venue-review">
          <span>VENUE DETAILS PENDING CONFIRMATION</span>
          <p>Reported amenities include table service, a full bar, restrooms and free parking. Card, debit-card and NFC payment acceptance must be verified directly with the venue.</p>
        </div>
        <div className="actions"><a className="btn btn-gold" href="https://www.google.com/maps/search/?api=1&query=Kilowatts+Lifestyle+Diepsloot" target="_blank" rel="noreferrer">Get directions <Icon name="arrow" /></a><Button page="contact" outline>Contact venue</Button></div>
      </div>
      <div className="map-embed">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3588.0656343359374!2d27.998423400000004!3d-25.933069600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95796d06071c6d%3A0x82ab6e7c22853111!2sKilowatts%20Lifestyle!5e0!3m2!1sen!2sza!4v1793118041658!5m2!1sen!2sza"
          title="Kilowatts Lifestyle location on Google Maps"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}

function EventsPage() {
  return <main><PageHero eyebrow="EVENTS & ENTERTAINMENT" title="THE NIGHT STARTS HERE" copy="Discover the recurring concepts and entertainment that shape Kilowatts. All dates and lineups shown are placeholders until confirmed." image={images.stage} /><section className="section shell"><div className="filter-row"><button className="active">All concepts</button><button>Fridays</button><button>Sundays</button><button>Special events</button></div><EventsGrid /><div className="empty-state"><span>WHEN NO EVENTS ARE ANNOUNCED</span><h3>THE NEXT NIGHT IS LOADING.</h3><p>Confirmed events will appear here. Follow the venue’s verified social channels once linked.</p></div></section><BookingBanner /></main>;
}

function MenuPage() {
  const categories = ["Drinks & beverages", "Cocktails", "Beers & ciders", "Wine & spirits", "Braai & platters", "Local bar food"];
  return <main><PageHero eyebrow="MENU & SPECIALS" title="POUR. SHARE. ENJOY." copy="A preview structure for the Kilowatts menu. Final items, prices and availability require venue approval." image={images.drinks} /><section className="section shell"><div className="menu-layout"><div className="menu-image"><img src={images.food} alt="Representative bar food" /></div><div className="menu-list">{categories.map((category) => <div className="menu-row" key={category}><div><h3>{category}</h3><p>Menu items and pricing to be supplied by the venue.</p></div><span>TBC</span></div>)}</div></div><div className="pending-card wide"><span className="draft">DRAFT • NOT A CONFIRMED OFFER</span><h3>REPORTED R100 BUCKET PROMOTION</h3><p>Product selection, price, conditions and availability are pending venue confirmation.</p></div></section><BookingBanner /></main>;
}

function AboutPage() {
  return <main><PageHero eyebrow="THE KILOWATTS EXPERIENCE" title="MORE THAN A NIGHT OUT." copy="A place shaped by music, connection, food and the unmistakable energy of Diepsloot." image={images.friends} /><section className="section shell about-grid">{[["01", "MUSIC & ENTERTAINMENT", "An atmosphere driven by DJs, local sounds and shared moments."],["02", "FOOD & DRINKS", "A social table made for gathering, sharing and staying a little longer."],["03", "COMMUNITY & CONNECTION", "A nightlife destination rooted in the people and energy of Diepsloot."],["04", "YOUR KILOWATTS", "Come as friends, leave with a night worth remembering."]].map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</section><BookingBanner /></main>;
}

function ContactPage() {
  return <main><PageHero eyebrow="CONTACT & LOCATION" title="LET’S CONNECT." copy="Visit Kilowatts in Diepsloot or connect through the supplied social channels. Phone and email details remain pending." image={images.concert} /><Location /><section className="section shell contact-placeholder"><h2>CONTACT CHANNELS</h2><div><span>PHONE NUMBER</span><b>TO BE CONFIRMED</b></div><div><span>EMAIL ADDRESS</span><b>TO BE CONFIRMED</b></div><div><span>INSTAGRAM DISCOVERY PAGE</span><a href="https://www.instagram.com/popular/kilowatt-lifestyle-diepsloot/" target="_blank" rel="noreferrer">OPEN INSTAGRAM →</a></div><div><span>FACEBOOK</span><b>SUPPLIED URL REQUIRES VENUE CONFIRMATION</b></div></section></main>;
}

function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, boolean> = {};
    ["name", "phone", "date", "time", "party", "consent"].forEach((field) => { if (!data.get(field)) next[field] = true; });
    setErrors(next);
    if (!Object.keys(next).length) setSubmitted(true);
  };
  if (submitted) return <main className="booking-page"><section className="success-card"><span>ENQUIRY CAPTURED IN PROTOTYPE</span><h1>THANK YOU.</h1><p>This prototype has validated your enquiry. No information was sent to the venue because a booking integration has not yet been connected.</p><button className="btn btn-gold" onClick={() => setSubmitted(false)}>Send another enquiry</button></section></main>;
  return <main><PageHero eyebrow="TABLE ENQUIRIES" title="RESERVE YOUR SPOT AT KILOWATTS" copy="Tell us about your night out and send us a table enquiry." image={images.event} /><section className="section shell booking-layout"><div><SectionHead eyebrow="PLAN YOUR NIGHT" title="BOOKING ENQUIRY" copy="Fields marked * are required. This form is a working prototype and does not send data to the venue." /><div className="notice">Submitting this form sends a booking enquiry only. Your table is not confirmed until the venue responds. Seating areas, minimum spend and arrival cut-offs are not confirmed.</div></div><form onSubmit={submit} noValidate>{[["name","Full name *","text"],["phone","Phone number *","tel"],["date","Preferred date *","date"],["time","Preferred time *","time"],["party","Party size *","number"]].map(([name,label,type]) => <label key={name} className={errors[name] ? "field error" : "field"}><span>{label}</span><input name={name} type={type} min={type === "number" ? "1" : undefined} placeholder={type === "tel" ? "e.g. 071 234 5678" : undefined} />{errors[name] && <small>Please complete this field.</small>}</label>)}<label className="field"><span>Preferred area</span><select name="area" defaultValue=""><option value="" disabled>Select a preference</option><option>General seating</option><option>Near the main dancefloor</option><option>VIP / DJ-booth area</option></select><small>Preferences are subject to venue confirmation and availability.</small></label><label className="field full"><span>Special requests</span><textarea name="requests" rows={4} placeholder="VIP seating near the DJ booth, if available" /></label><label className={`consent full ${errors.consent ? "error" : ""}`}><input type="checkbox" name="consent" value="yes" /><span>I consent to the venue contacting me about this enquiry.</span></label>{errors.consent && <small className="form-error">Consent is required before submitting.</small>}<button className="btn btn-gold full" type="submit">Send booking enquiry <Icon name="arrow" /></button></form></section></main>;
}

function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image: string }) {
  return <section className="page-hero" style={{ backgroundImage: `url(${image})` }}><div className="hero-overlay" /><div className="shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div></section>;
}

function Footer() {
  return <footer><div className="shell footer-grid"><div><Logo compact /><p>Music, connection and unforgettable nights in the heart of Diepsloot.</p></div><div><b>EXPLORE</b>{navItems.map((n) => <button key={n.page} onClick={() => navigateTo(n.page)}>{n.label}</button>)}</div><div><b>VISIT</b><p>Msakazo Street<br />Diepsloot West Ext 9<br />Johannesburg, 2189</p><a className="footer-link" href="https://www.google.com/maps/search/?api=1&query=Kilowatts+Lifestyle+Diepsloot" target="_blank" rel="noreferrer">OPEN IN MAPS →</a></div><div><b>CONNECT</b><a className="footer-link" href="https://www.instagram.com/popular/kilowatt-lifestyle-diepsloot/" target="_blank" rel="noreferrer">INSTAGRAM →</a><small className="social-note">Facebook link pending venue confirmation.</small><button className="footer-book" onClick={() => navigateTo("booking")}>BOOK A TABLE →</button></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Kilowatts Lifestyle Diepsloot. Draft website.</span><span>Website by <b>MN DEVS</b></span></div></footer>;
}

function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  return (
    <div className="whatsapp-wrap">
      {open && <div className="whatsapp-note"><b>CHAT WITH KILOWATTS</b><span>The venue’s verified WhatsApp number is still required. Use the booking enquiry in the meantime.</span><button onClick={() => navigateTo("booking")}>OPEN BOOKING ENQUIRY</button></div>}
      <button className="whatsapp-float" aria-label="Contact Kilowatts on WhatsApp" onClick={() => setOpen(!open)}>
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27.3 4.7A15.8 15.8 0 0 0 2.5 23.8L.3 31.7l8.1-2.1A15.8 15.8 0 0 0 27.3 4.7Zm-11.2 24a13 13 0 0 1-6.6-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5A13 13 0 1 1 16.1 28.7Zm7.1-9.7c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.5-.2.3-.5.3-.9.1-2.3-1.1-3.8-2-5.3-4.6-.4-.7.4-.7 1.1-2.2.1-.2.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.4s1.5 3.9 1.7 4.2c.2.3 2.9 4.4 7 6.2 2.6 1.1 3.6 1.2 4.9 1 .8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.2-.2-.5-.3-.9-.5Z" /></svg>
      </button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  useEffect(() => { document.title = "Kilowatts Lifestyle Diepsloot"; }, []);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const targets = document.querySelectorAll(
        "main > section:not(.hero):not(.page-hero), .event-card, .highlight, .artist, .gallery figure, .menu-row, .about-grid article",
      );
      targets.forEach((target) => target.classList.add("motion-item"));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
      );
      targets.forEach((target) => observer.observe(target));
      return () => observer.disconnect();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [page]);
  const content = page === "home" ? <Home /> : page === "events" ? <EventsPage /> : page === "menu" ? <MenuPage /> : page === "about" ? <AboutPage /> : page === "contact" ? <ContactPage /> : <BookingPage />;
  return <><Header page={page} setPage={setPage} /><div className="page-enter" key={page}>{content}</div><WhatsAppFloat /><Footer /></>;
}
