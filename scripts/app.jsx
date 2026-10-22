const { useState } = React;
const { business: BUSINESS, images: IMAGES, navigation: NAV, dishes: DISHES, features: FEATURES } = window.ClassiqueContent;
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(BUSINESS.mapsQuery);

const PATHS = {
  flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  smile: <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  menu: <><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></>,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  nav: <polygon points="3 11 22 2 13 21 11 13 3 11" />,
};

const Icon = ({ name, size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{PATHS[name]}</svg>
);
const Logo = ({ dark }) => (
  <a href="#home" className="flex items-center gap-2 rounded-lg font-poppins text-xl font-extrabold sm:text-2xl" aria-label="Classique Grills home">
    <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink"><Icon name="flame" size={20} /></span>
    <span><span className={dark ? 'text-white' : 'text-ink'}>{BUSINESS.name.first}</span> <span className="text-gold">{BUSINESS.name.second}</span></span>
  </a>
);
const btn = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-poppins text-sm font-semibold transition focus-visible:outline-offset-2 sm:text-base';
const btnGold = btn + ' bg-gold text-ink shadow-sm hover:bg-[#e5a700]';
const btnDark = btn + ' border-2 border-ink bg-white text-ink hover:bg-ink hover:text-white';
const Eyebrow = ({ children }) => <p className="mb-3 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">{children}</p>;

function Photo({ src, alt, label, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={'h-full w-full object-cover ' + className} />;
  return (
    <div role="img" aria-label={alt} className={'flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#2a1d0a] via-[#111] to-[#3a2800] p-6 text-center text-gold ' + className}>
      <Icon name="flame" size={56} />
      <span className="font-poppins text-sm font-semibold text-white/90">{label}</span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const link = 'rounded-md px-1 py-1 font-poppins text-sm font-medium text-ink transition hover:text-gold';
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map(([label, id]) => <li key={label}><a className={link} href={'#' + id}>{label}</a></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <a href={BUSINESS.phoneLink} className={btnGold + ' !px-5 !py-2.5'}>Order Now</a>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-black/5 lg:hidden">
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="border-t border-black/5 bg-white px-4 pb-4 lg:hidden">
          {NAV.map(([label, id]) => (
            <li key={label}><a href={'#' + id} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-poppins font-medium text-ink hover:bg-cream">{label}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <Eyebrow>Nigerian Grills &amp; More</Eyebrow>
          <h1 className="font-poppins text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            Good food.<br /><span className="text-gold">Great times.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-neutral-600 sm:text-lg">Freshly grilled favourites, made to bring people together.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#menu" className={btnGold}>Explore Our Menu</a>
            <a href="#visit" className={btnDark}><Icon name="pin" size={18} />Find Us</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-black/10 shadow-xl lg:aspect-[5/4]">
            <Photo src={IMAGES.hero} alt="Grilled chicken, grilled fish, ripe plantain, golden fries and pepper sauce" label="Grilled chicken, fish, bole & fries" />
          </div>
          <div className="absolute -bottom-5 left-4 grid h-24 w-24 place-items-center rounded-full bg-gold p-3 text-center font-poppins text-xs font-bold leading-tight text-ink shadow-lg ring-4 ring-white sm:left-auto sm:-right-4 sm:h-28 sm:w-28 sm:text-sm lg:right-6 lg:-top-6 lg:bottom-auto">
            Made fresh daily
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuCard({ dish }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-sm transition hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl"><Photo src={dish.image} alt={dish.alt} label={dish.name} /></div>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
        <h3 className="font-poppins text-xl font-bold text-ink">{dish.name}</h3>
        <p className="mt-2 text-neutral-600">{dish.text}</p>
        <span className="mt-5 block h-1 w-10 rounded-full bg-gold" aria-hidden="true" />
      </div>
    </article>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Our Menu</Eyebrow>
          <h2 className="font-poppins text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">Our <span className="text-gold">Favourites</span></h2>
          <p className="mt-4 text-neutral-600 sm:text-lg">The most loved dishes, always fresh, always delicious.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {DISHES.map((dish) => <MenuCard key={dish.name} dish={dish} />)}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 id="why-title" className="sr-only">Why choose Classique Grills</h2>
        <div className="grid gap-10 md:grid-cols-3 md:gap-0">
          {FEATURES.map((feature, index) => (
            <div key={feature.title} className={'text-center md:px-8 ' + (index > 0 ? 'md:border-l md:border-gold/40' : '')}>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-gold text-gold"><Icon name={feature.icon} size={30} /></div>
              <h3 className="mt-5 font-poppins text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-neutral-300">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Icon name={icon} size={22} /></span>
      <div><h3 className="font-poppins font-semibold text-ink">{title}</h3><div className="text-neutral-600">{children}</div></div>
    </li>
  );
}

function LocationSection() {
  return (
    <section id="visit" className="bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <div>
          <Eyebrow>Visit Us</Eyebrow>
          <h2 className="font-poppins text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">Visit <span className="text-gold">Classique Grills</span></h2>
          <ul className="mt-8 space-y-6">
            <InfoRow icon="pin" title="Address">{BUSINESS.address}</InfoRow>
            <InfoRow icon="phone" title="Phone"><a href={BUSINESS.phoneLink} className="font-medium underline decoration-gold decoration-2 underline-offset-4 hover:text-ink">{BUSINESS.phoneDisplay}</a></InfoRow>
            <InfoRow icon="clock" title="Business hours">{BUSINESS.hours}</InfoRow>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={BUSINESS.phoneLink} className={btnGold}><Icon name="phone" size={18} />Call to Order</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={btnDark}><Icon name="nav" size={18} />Get Directions</a>
          </div>
        </div>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="Open Classique Grills location in Google Maps" className="group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-black/10 bg-[#efeadc] shadow-lg">
          <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="400" height="300" fill="#efeadc" />
            <path d="M-10 220 L410 120" stroke="#fff" strokeWidth="18" /><path d="M120 -10 L180 310" stroke="#fff" strokeWidth="14" />
            <path d="M260 -10 L300 310" stroke="#fff" strokeWidth="10" /><path d="M-10 90 L410 60" stroke="#fff" strokeWidth="8" />
            <rect x="20" y="130" width="70" height="50" rx="8" fill="#dfe8cf" /><rect x="310" y="180" width="70" height="80" rx="8" fill="#dfe8cf" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-lg ring-4 ring-white"><Icon name="pin" size={28} /></span>
              <span className="mt-3 rounded-full bg-ink px-4 py-2 font-poppins text-sm font-semibold text-white group-hover:bg-gold group-hover:text-ink">View on Google Maps</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Logo dark />
          <p className="mt-3 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">Good food. Great times.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV.map(([label, id]) => <li key={label}><a href={'#' + id} className="font-medium text-neutral-200 hover:text-gold">{label}</a></li>)}
        </ul>
        {BUSINESS.socials.length > 0 && (
          <ul className="flex gap-3">{BUSINESS.socials.map((social) => <li key={social.name}><a href={social.href} className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">{social.name}</a></li>)}</ul>
        )}
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-neutral-400">© 2026 Classique Grills. All rights reserved.</div>
    </footer>
  );
}

function App() {
  return <><Navbar /><main><HeroSection /><MenuSection /><WhyChooseUs /><LocationSection /></main><Footer /></>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);