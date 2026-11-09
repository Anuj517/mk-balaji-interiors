import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  ExternalLink,
  Layers3,
  MapPin,
  Menu,
  Sparkles,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { business, cataloguePages, projects, projectCategories, services, type ProjectCategory } from "./data";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Products", href: "#products", id: "products" },
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Contact", href: "#contact", id: "contact" },
];

type GalleryImage = {
  src: string;
  title: string;
  alt: string;
};

const projectImages: GalleryImage[] = projects.map((project) => ({
  src: project.imageSrc ?? `/images/projects/${String(project.page).padStart(2, "0")}.webp`,
  title: project.title,
  alt: project.imageAlt,
}));

const catalogueImages: GalleryImage[] = cataloguePages.map((page) => ({
  src: `/images/catalogue/${String(page).padStart(2, "0")}.webp`,
  title: `Polygranite design sheet ${String(page).padStart(2, "0")}`,
  alt: `Page ${page} from the supplied Polygranite catalogue, showing sheet designs and interior applications`,
}));

type ActiveGallery =
  | { kind: "project"; index: number }
  | { kind: "catalogue"; index: number };

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand-lockup${footer ? " brand-lockup--footer" : ""}`} href="#home" aria-label="MK Balaji Interiors home">
      <img
        className="brand-logo-image"
        src="/assets/mk-balaji-interiors-logo.jpg"
        alt="Official MK Balaji Interiors logo"
        width="768"
        height="768"
      />
      <span className="brand-copy">
        <span className="brand-name">MK Balaji Interiors</span>
        <span className="brand-tagline">INTERIOR <i aria-hidden="true">•</i> POLYGRANITE</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.35] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.id} className={activeSection === item.id ? "is-active" : ""} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-phone" href={`tel:${business.phones[0].replaceAll(" ", "")}`}>
          <Phone size={16} aria-hidden="true" />
          <span>{business.phones[0]}</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                className={activeSection === item.id ? "is-active" : ""}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.035 }}
              >
                {item.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </motion.a>
            ))}
            <a className="mobile-nav-call" href={`tel:${business.phones[0].replaceAll(" ", "")}`} onClick={closeMenu}>
              <Phone size={16} aria-hidden="true" /> Call {business.phones[0]}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-photo" aria-hidden="true">
        <img src="/assets/hero-living-room.png" alt="" fetchPriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content page-width">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
          }}
        >
          <motion.p
            className="eyebrow eyebrow--accent"
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            EST. IN CHAKAN, PUNE <span /> INTERIOR · POLYGRANITE
          </motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8 }}>
            All Types of<br />Interior Work
            <em>at Fine Rate.</em>
          </motion.h1>
          <motion.p
            className="hero-description"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
          >
            Serving Pune, Chakan and the Nashik Highway corridor with Polygranite Sheets, ceiling work,
            TV units, kitchen trolleys, WPC panels and complete interiors.
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
          >
            <a className="button button--accent" href="#contact">
              Get a free quote <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button button--outline-light" href={`tel:${business.phones[0].replaceAll(" ", "")}`}>
              <Phone size={17} aria-hidden="true" />
              Call now: {business.phones[0]}
            </a>
          </motion.div>
        </motion.div>
        <div className="hero-benefits" data-reveal>
          <span><CircleCheck size={18} /> Free site visit</span>
          <span><CircleCheck size={18} /> 10–15 year Polygranite colour guarantee</span>
          <span><CircleCheck size={18} /> On-time delivery</span>
        </div>
      </div>
      <a className="hero-scroll" href="#about" aria-label="Scroll to about MK Balaji Enterprises">
        <span>Scroll to discover</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}

function SectionHeading({
  label,
  title,
  description,
  light = false,
  align = "left",
}: {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}${align === "center" ? " section-heading--center" : ""}`} data-reveal>
      <p className="eyebrow"><span className="eyebrow-line" />{label}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-grid page-width">
        <div className="about-visual" data-reveal>
          <div className="about-photo">
            <img
              src="/images/projects/01.webp"
              alt="A completed living room with decorative wall panels and custom interior details"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-photo-inset">
            <img
              src="/images/projects/08.webp"
              alt="Fitted dining and display furniture in a completed interior"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-index"><span>MK</span><span>Interior design<br />concepts</span></div>
        </div>
        <div className="about-copy">
          <SectionHeading label="A little about us" title="Spaces that feel like yours." />
          <p>
            MK Balaji Enterprises brings interior work and Polygranite Sheet solutions together for
            homes, shops and commercial spaces around Chakan, Pune and the Nashik Highway.
          </p>
          <p>
            From a considered wall finish to a complete interior, we help shape practical spaces with
            materials and details chosen to suit the room.
          </p>
          <div className="about-signoff">
            <span className="signature-rule" />
            <div><strong>M.K. Joshi</strong><span>Interior design concepts</span></div>
          </div>
          <a className="text-link" href="#services">Explore what we do <ArrowDownRight size={18} /></a>
        </div>
      </div>
      <div className="service-ribbon" aria-label="Interior services">
        <div className="page-width service-ribbon-inner">
          <span>Polygranite</span><i /><span>Ceilings</span><i /><span>TV units</span><i /><span>Kitchens</span><i /><span>Furniture</span><i /><span>Interiors</span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="page-width">
        <div className="services-intro">
          <SectionHeading
            label="Made for your space"
            title="Services & products"
            description="Everything your home or commercial space needs — sourced, designed and executed by one team."
          />
          <a className="text-link services-all-link" href="#contact">Talk through your project <ArrowUpRight size={17} /></a>
        </div>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a className="service-card" href="#contact" key={service.title} data-reveal>
                <div className="service-card-top">
                  <span className="service-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
                  <span className="service-number">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-card-arrow"><ArrowUpRight size={18} /></span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProduct() {
  return (
    <section className="featured-product" id="polygranite">
      <div className="featured-copy" data-reveal>
        <p className="eyebrow"><span className="eyebrow-line" />Featured product</p>
        <h2>Redefine your walls with <em>Polygranite Sheets.</em></h2>
        <p className="featured-description">
          A distinctive finish for wall decoration, TV backdrops and commercial interiors. Explore
          marble-inspired, wood-look and other sheet designs in the catalogue.
        </p>
        <ul className="feature-points">
          <li><Check size={17} /> Marble, wood, plain and textured finishes</li>
          <li><Check size={17} /> Wall decoration and TV backdrop ideas</li>
          <li><Check size={17} /> See the supplied catalogue for more designs</li>
        </ul>
        <div className="featured-actions">
          <a className="button button--burgundy" href="#products">Browse the catalogue <ArrowRight size={17} /></a>
          <a className="button button--outline-burgundy" href="#contact">Request a price</a>
        </div>
        <img className="polygranite-mark" src="/images/brand/polygranite-logo.webp" alt="Polygranite Sheet logo" loading="lazy" />
      </div>
      <div className="featured-visual">
        <img
          src="/images/catalogue/01.webp"
          alt="Marble-inspired Polygranite Sheet designs and example wall applications from the supplied catalogue"
          loading="lazy"
          decoding="async"
        />
        <div className="featured-stamp"><span>Explore</span><strong>11</strong><span>catalogue<br />sheets</span></div>
      </div>
    </section>
  );
}

function ProductCatalogue({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section className="catalogue section-pad" id="products">
      <div className="page-width">
        <div className="catalogue-heading">
          <SectionHeading
            label="The product catalogue"
            title="Find the finish that feels right."
            description="Browse the supplied Polygranite catalogue and see each design sheet up close."
          />
          <a
            className="button button--outline-burgundy catalogue-download"
            href="/downloads/polygranite-catalogue.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Open full catalogue <ExternalLink size={16} />
          </a>
        </div>
        <div className="catalogue-grid">
          {cataloguePages.map((page, index) => (
            <button className="catalogue-card" key={page} type="button" onClick={() => onOpen(index)} data-reveal>
              <span className="catalogue-image">
                <img
                  src={`/images/catalogue/${String(page).padStart(2, "0")}.webp`}
                  alt={catalogueImages[index].alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="catalogue-zoom"><ArrowUpRight size={18} /></span>
              </span>
              <span className="catalogue-card-meta">
                <span><small>POLYGRANITE</small><strong>Design sheet {String(page).padStart(2, "0")}</strong></span>
                <span className="catalogue-card-number">/{String(page).padStart(2, "0")}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="catalogue-footnote">
          <span><CircleCheck size={17} /> Every sheet is from the supplied Polygranite catalogue.</span>
          <a href="#contact">Ask about a design <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpen }: { onOpen: (index: number) => void }) {
  const [category, setCategory] = useState<"All Projects" | ProjectCategory>("All Projects");
  const visibleProjects = useMemo(
    () => projects.map((project, index) => ({ ...project, index })).filter((project) => category === "All Projects" || project.category === category),
    [category],
  );

  return (
    <section className="portfolio section-pad" id="portfolio">
      <div className="page-width">
        <div className="portfolio-heading">
          <SectionHeading
            label="Completed projects"
            title="Crafted spaces. Beautifully completed."
            description="Explore completed interior projects by room, furniture and finish."
          />
          <a className="text-link portfolio-download" href="/downloads/completed-project-work.pdf" target="_blank" rel="noreferrer">
            Open project collection <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="portfolio-filters" role="group" aria-label="Filter completed projects">
          {projectCategories.map((item) => (
            <button
              className={category === item ? "is-selected" : ""}
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <motion.div layout className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.button
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="project-card"
                type="button"
                key={project.page}
                onClick={() => onOpen(project.index)}
              >
                <span className="project-image">
                  <img
                    src={projectImages[project.index].src}
                    alt={project.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="project-view"><ArrowUpRight size={20} /></span>
                </span>
                <span className="project-meta">
                  <span><small>{project.category}</small><strong>{project.title}</strong></span>
                  <span className="project-index">{String(project.index + 1).padStart(2, "0")}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="project-collection">
          <span><span className="collection-dot" /> More work in the completed-projects PDF</span>
          <a href="/downloads/completed-project-work.pdf" target="_blank" rel="noreferrer">View all projects <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    { title: "Quality materials", description: "A thoughtful selection of interior finishes and products.", icon: Layers3 },
    { title: "Creative solutions", description: "Ideas shaped around the room, its use and your style.", icon: Sparkles },
    { title: "Attention to detail", description: "Care taken across the visible finishes and finer touches.", icon: Check },
    { title: "Professional approach", description: "Clear conversations from the first site visit onward.", icon: Clock3 },
    { title: "Affordable solutions", description: "Practical choices to suit the space and scope of the work.", icon: CircleCheck },
    { title: "Customer-focused", description: "A considered process, with your needs guiding the project.", icon: ArrowRight },
  ];

  return (
    <section className="why section-pad">
      <div className="page-width why-grid">
        <div className="why-copy">
          <SectionHeading
            light
            label="The MK Balaji difference"
            title="Good work starts with listening."
            description="Interior choices should work beautifully and make sense for the people who use the space."
          />
          <a className="button button--accent" href="#contact">Let's talk about your space <ArrowRight size={17} /></a>
        </div>
        <div className="reasons-grid">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div className="reason" key={reason.title} data-reveal>
                <span className="reason-number">0{index + 1}</span>
                <span className="reason-icon"><Icon size={21} strokeWidth={1.7} /></span>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <section className="contact section-pad" id="contact">
      <div className="page-width">
        <div className="contact-banner" data-reveal>
          <div className="contact-banner-copy">
            <p className="eyebrow eyebrow--accent"><span className="eyebrow-line" />Your space, your ideas</p>
            <h2>Get a free consultation <em>today.</em></h2>
            <p>Tell us about your space. We'll visit, understand the work and share a clear quote — with no obligation.</p>
            <div className="contact-banner-actions">
              <a
                className="button button--accent"
                href={`https://wa.me/918484035027?text=${encodeURIComponent("Hello, I would like to enquire about interior work.")}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us <ArrowUpRight size={17} />
              </a>
              <a className="button button--outline-light" href={`tel:${business.phones[0].replaceAll(" ", "")}`}>
                <Phone size={16} /> Call {business.phones[0]}
              </a>
            </div>
          </div>
          <div className="contact-banner-mark" aria-hidden="true"><span>MK</span><i /></div>
        </div>

        <div className="contact-layout">
          <div className="contact-details">
            <div className="contact-heading">
              <p className="eyebrow"><span className="eyebrow-line" />Visit or get in touch</p>
              <h2>Let's make room<br />for something <em>good.</em></h2>
            </div>
            <div className="contact-detail-list">
              <div className="contact-detail">
                <span className="contact-detail-icon"><Phone size={18} /></span>
                <span><small>Call M.K. Joshi</small>{business.phones.map((phone) => <a key={phone} href={`tel:${phone.replaceAll(" ", "")}`}>{phone}</a>)}</span>
              </div>
              <div className="contact-detail contact-address">
                <span className="contact-detail-icon"><MapPin size={18} /></span>
                <span>
                  <small>Visit our studio</small>
                  <a className="address-link" href={business.mapUrl} target="_blank" rel="noreferrer">{business.address}</a>
                  <a className="directions-link" href={business.directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13} /></a>
                </span>
              </div>
              <a className="contact-detail" href={`mailto:${business.email}`}>
                <span className="contact-detail-icon"><ExternalLink size={18} /></span>
                <span><small>Email us</small>{business.email}</span>
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-heading">
              <h3>Tell us a little about your project.</h3>
              <p>We'll get back to you to talk through the next steps.</p>
            </div>
            <label>
              Your name
              <input autoComplete="name" name="name" placeholder="How should we address you?" required />
            </label>
            <label>
              Phone number
              <input autoComplete="tel" inputMode="tel" name="phone" placeholder="+91" required />
            </label>
            <label>
              What are you looking for?
              <span className="select-wrap">
                <select name="interest" defaultValue="">
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}
                </select>
                <ChevronDown size={16} />
              </span>
            </label>
            <button className="button button--burgundy form-submit" type="submit">Send an enquiry <ArrowRight size={17} /></button>
            <p className="form-note">Your email app will open with your enquiry ready to send.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <div className="footer-about">
          <Logo footer />
          <p>All types of interior work at fine rate. Serving Pune, Chakan and the Nashik Highway corridor.</p>
          <a className="footer-location" href={business.directionsUrl} target="_blank" rel="noreferrer"><MapPin size={15} /> Chakan, Pune <ArrowUpRight size={14} /></a>
        </div>
        <div className="footer-column">
          <h3>Quick links</h3>
          {navigation.map((item) => <a key={item.id} href={item.href}>{item.label}</a>)}
        </div>
        <div className="footer-column">
          <h3>Services</h3>
          {services.slice(0, 6).map((service) => <a key={service.title} href="#services">{service.title}</a>)}
        </div>
        <div className="footer-column footer-contact">
          <h3>Visit / contact</h3>
          <a href={business.directionsUrl} target="_blank" rel="noreferrer"><MapPin size={15} />{business.address}</a>
          {business.phones.map((phone) => <a key={phone} href={`tel:${phone.replaceAll(" ", "")}`}><Phone size={15} />{phone}</a>)}
          <a href={`mailto:${business.email}`}><ExternalLink size={15} />{business.email}</a>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {new Date().getFullYear()} MK Balaji Enterprises. All rights reserved.</span>
        <a href="#home">Back to top <ArrowUpRight size={14} /></a>
        <span>Interior · Polygranite</span>
      </div>
    </footer>
  );
}

function Lightbox({
  active,
  onClose,
  onNavigate,
}: {
  active: ActiveGallery;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
}) {
  const images = active.kind === "project" ? projectImages : catalogueImages;
  const image = images[active.index];
  const onCloseRef = useRef(onClose);
  const onNavigateRef = useRef(onNavigate);

  useEffect(() => {
    onCloseRef.current = onClose;
    onNavigateRef.current = onNavigate;
  }, [onClose, onNavigate]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowRight") onNavigateRef.current(1);
      if (event.key === "ArrowLeft") onNavigateRef.current(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={active.kind === "project" ? "Completed project photograph" : "Polygranite catalogue sheet"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close image viewer"><X size={23} /></button>
      <button className="lightbox-arrow lightbox-arrow--left" type="button" onClick={() => onNavigate(-1)} aria-label="Previous image"><ArrowLeft size={22} /></button>
      <motion.figure
        className="lightbox-content"
        key={`${active.kind}-${active.index}`}
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
      >
        <img src={image.src} alt={image.alt} />
        <figcaption><span>{image.title}</span><span>{String(active.index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span></figcaption>
      </motion.figure>
      <button className="lightbox-arrow lightbox-arrow--right" type="button" onClick={() => onNavigate(1)} aria-label="Next image"><ArrowRight size={22} /></button>
      <span className="lightbox-hint">Use ← → to browse · Esc to close</span>
    </motion.div>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [activeGallery, setActiveGallery] = useState<ActiveGallery | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false, smoothWheel: true, anchors: { offset: -82 } });
    const updateScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", updateScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      if (window.matchMedia("(min-width: 981px)").matches) {
        gsap.to(".hero-photo", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });
    });

    return () => {
      context.revert();
      lenis.off("scroll", updateScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  const closeGallery = useCallback(() => setActiveGallery(null), []);
  const navigateGallery = useCallback((direction: -1 | 1) => {
    setActiveGallery((current) => {
      if (!current) return current;
      const length = current.kind === "project" ? projectImages.length : catalogueImages.length;
      return { ...current, index: (current.index + direction + length) % length };
    });
  }, []);

  const handleInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Interior enquiry from ${fields.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${fields.get("name")}\nPhone: ${fields.get("phone")}\nLooking for: ${fields.get("interest") || "Interior work"}\n\nPlease contact me to discuss my project.`,
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <FeaturedProduct />
        <ProductCatalogue onOpen={(index) => setActiveGallery({ kind: "catalogue", index })} />
        <Projects onOpen={(index) => setActiveGallery({ kind: "project", index })} />
        <WhyChooseUs />
        <Contact onSubmit={handleInquiry} />
      </main>
      <Footer />
      <AnimatePresence>
        {activeGallery && (
          <Lightbox active={activeGallery} onClose={closeGallery} onNavigate={navigateGallery} />
        )}
      </AnimatePresence>
    </>
  );
}
