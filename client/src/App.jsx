import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Palette,
  Layout,
  BookOpenText,
  Sparkles,
  Menu,
  X,
  Send,
  PenTool,
  Globe2,
  Layers,
  Compass,
} from "lucide-react";

const companyEmail = "contato@studion.com.br";
const phoneDisplay = "(11) 98888-7777";
const phoneNumber = "5511988887777";
const instagramUrl = "https://www.instagram.com/studion";
const behanceUrl = "https://www.behance.net/";
const linkedinUrl = "https://www.linkedin.com/company/studio-n";

const sections = ["sobre", "servicos", "trabalhos", "contato"];

const stats = [
  { value: "140+", label: "Projetos" },
  { value: "8", label: "Anos" },
  { value: "98%", label: "Satisfação" },
];

const services = [
  { num: "01", name: "Identidade Visual", tags: ["Branding", "Logo"], Icon: Palette },
  { num: "02", name: "Design de Sites", tags: ["UI/UX", "Web"], Icon: Layout },
  { num: "03", name: "Design Editorial", tags: ["Print", "Digital"], Icon: BookOpenText },
  { num: "04", name: "Estratégia de Marca", tags: ["Consultoria", "Naming"], Icon: Compass },
];

const works = [
  {
    num: "001 / Branding",
    title: "Café",
    emphasis: "Atlântico",
    description: "Identidade visual completa para rede de cafeterias premium no litoral paulista.",
    Icon: PenTool,
  },
  {
    num: "002 / Web Design",
    title: "Arq",
    emphasis: "Studio",
    description: "Site institucional para escritório de arquitetura com portfólio interativo.",
    Icon: Globe2,
  },
  {
    num: "003 / Editorial",
    title: "Voga",
    emphasis: "Magazine",
    description: "Redesign editorial completo de revista de moda e lifestyle brasileira.",
    Icon: BookOpenText,
  },
  {
    num: "004 / Branding",
    title: "Norte",
    emphasis: "Ventures",
    description: "Brand identity para fundo de investimento com atuação em startups tecnológicas.",
    Icon: Layers,
  },
];

function whatsappLink() {
  const message = "Olá, Studio N.! Tenho interesse em criar um projeto com vocês.";
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function Logo({ footer = false }) {
  return (
    <a
      href="#"
      className={`font-serif text-2xl font-light uppercase tracking-[.28em] ${
        footer ? "text-cream" : "text-ink"
      }`}
    >
      Studio <span className="text-gold">N.</span>
    </a>
  );
}

function NavItem({ id, children, active, onClick }) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      className={`relative font-mono text-xs uppercase tracking-[.22em] transition ${
        active === id ? "text-ink" : "text-mutedStudio hover:text-ink"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-2 left-0 h-px bg-gold transition-all ${
          active === id ? "w-full" : "w-0"
        }`}
      />
    </a>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("sobre");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = "sobre";

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section && window.scrollY + 180 >= section.offsetTop) {
          current = sectionId;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const project = data.get("project")?.trim();
    const message = data.get("message")?.trim();

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, project, message }),
    }).catch(() => {});

    const subject = `Novo projeto Studio N. - ${name || "Cliente"}`;
    const body = `Olá, Studio N.%0D%0A%0D%0ANome: ${name || ""}%0D%0AE-mail: ${email || ""}%0D%0AProjeto: ${project || ""}%0D%0A%0D%0AMensagem:%0D%0A${message || ""}`;

    window.location.href = `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  return (
    <main className="min-h-screen bg-cream text-studioText">
      <nav className="fixed top-0 z-50 w-full border-b border-gold/20 bg-cream/90 px-6 py-6 backdrop-blur-xl md:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-12 lg:flex">
            <NavItem id="sobre" active={activeSection}>Sobre</NavItem>
            <NavItem id="servicos" active={activeSection}>Serviços</NavItem>
            <NavItem id="trabalhos" active={activeSection}>Trabalhos</NavItem>
          </div>

          <a
            href="#contato"
            className="hidden border-b border-gold pb-1 font-mono text-xs uppercase tracking-[.22em] text-gold transition hover:opacity-70 md:block"
          >
            Contato
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center border border-gold/30 text-gold lg:hidden"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="mt-6 grid gap-5 border-t border-gold/20 pt-6 lg:hidden">
            <NavItem id="sobre" active={activeSection} onClick={closeMenu}>Sobre</NavItem>
            <NavItem id="servicos" active={activeSection} onClick={closeMenu}>Serviços</NavItem>
            <NavItem id="trabalhos" active={activeSection} onClick={closeMenu}>Trabalhos</NavItem>
            <NavItem id="contato" active={activeSection} onClick={closeMenu}>Contato</NavItem>
          </div>
        )}
      </nav>

      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-24 pt-32 md:px-20">
        <div className="absolute left-1/2 top-0 h-28 w-px bg-gradient-to-b from-transparent to-gold" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[38vw] font-semibold leading-none tracking-[-.06em] text-black/[.03]">
          N
        </div>

        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-xs uppercase tracking-[.35em] text-mutedStudio [writing-mode:vertical-rl] md:right-20 md:block">
          2024 / São Paulo
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="fade-up mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[.35em] text-gold">
            <span className="h-px w-12 bg-gold" />
            Estúdio de Design & Criação
          </p>

          <h1 className="fade-up max-w-5xl font-serif text-7xl font-light leading-[.96] tracking-[-.03em] text-ink md:text-9xl">
            Criamos
            <br />
            <em className="text-gold">experiências</em>
            <br />
            visuais únicas.
          </h1>

          <div className="fade-up mt-12 flex flex-wrap items-end justify-between gap-10">
            <p className="max-w-md text-xl font-light leading-9 text-mutedStudio">
              Design estratégico para marcas que querem ser lembradas. Do conceito à execução com precisão.
            </p>

            <a
              href="#sobre"
              className="group flex items-center gap-4 font-mono text-xs uppercase tracking-[.28em] text-mutedStudio transition hover:text-gold"
            >
              <span className="hero-line-anim h-12 w-px bg-gold" />
              Explorar
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-ink px-6 py-28 text-cream md:px-20">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div>
            <p className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[.35em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Sobre o estúdio
            </p>
            <h2 className="font-serif text-5xl font-light leading-tight tracking-[-.02em] md:text-7xl">
              Arte com <em className="text-gold2">propósito</em>, design com{" "}
              <em className="text-gold2">intenção.</em>
            </h2>
          </div>

          <div>
            <p className="mb-8 text-xl font-light leading-9 text-cream/70">
              O Studio N. nasceu da crença de que um bom design vai além da estética: ele comunica,
              emociona e transforma negócios. Com mais de 8 anos de experiência, trabalhamos com marcas
              nacionais e internacionais.
            </p>
            <p className="text-xl font-light leading-9 text-cream/70">
              Nossa abordagem é colaborativa: cada projeto começa com uma escuta profunda para entender
              a essência da marca e seus objetivos.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-[2px]">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t border-gold/20 bg-cream/[.04] p-6">
                  <div className="font-serif text-5xl font-light leading-none text-gold2">{stat.value}</div>
                  <div className="mt-3 font-mono text-xs uppercase tracking-[.22em] text-cream/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-7xl px-6 py-28 md:px-20">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-serif text-6xl font-light leading-[1.05] tracking-[-.02em] md:text-7xl">
            O que
            <br />
            <em className="text-gold">fazemos</em>
          </h2>
          <p className="max-w-sm text-lg leading-8 text-mutedStudio">
            Soluções completas de design e comunicação visual para sua marca crescer.
          </p>
        </div>

        <div className="border-t border-black/10">
          {services.map(({ num, name, tags, Icon }) => (
            <a
              key={name}
              href="#contato"
              className="group flex flex-wrap items-center justify-between gap-5 border-b border-black/10 py-9 transition-all duration-300 hover:pl-6"
            >
              <span className="w-12 font-mono text-xs tracking-[.22em] text-black/20 transition group-hover:text-gold">
                {num}
              </span>

              <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/20 text-gold transition group-hover:bg-gold group-hover:text-cream">
                <Icon size={22} />
              </div>

              <span className="flex-1 font-serif text-4xl font-light text-ink">{name}</span>

              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-black/15 px-4 py-2 font-mono text-[.65rem] uppercase tracking-[.2em] text-mutedStudio transition group-hover:border-gold group-hover:text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ArrowRight className="text-gold opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </section>

      <section id="trabalhos" className="bg-ink px-6 py-28 md:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-16 flex items-center gap-3 font-mono text-xs uppercase tracking-[.35em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Portfólio selecionado
          </p>

          <div className="grid gap-[2px] md:grid-cols-2">
            {works.map(({ num, title, emphasis, description, Icon }) => (
              <article
                key={num}
                className="group relative min-h-[320px] overflow-hidden bg-cream/[.04] p-10 transition hover:bg-gold/10 md:p-14"
              >
                <div className="absolute right-10 top-10 text-gold/10 transition group-hover:scale-110 group-hover:text-gold/20">
                  <Icon size={86} strokeWidth={1} />
                </div>

                <p className="mb-10 font-mono text-xs uppercase tracking-[.28em] text-gold/50">{num}</p>
                <h3 className="font-serif text-5xl font-light leading-tight text-cream">
                  {title} <em className="text-gold2">{emphasis}</em>
                </h3>
                <p className="mt-5 max-w-sm leading-8 text-cream/50">{description}</p>

                <a
                  href="#contato"
                  className="absolute bottom-10 right-10 grid h-14 w-14 place-items-center border border-gold/30 text-gold transition group-hover:bg-gold group-hover:text-ink"
                  aria-label={`Ver projeto ${title} ${emphasis}`}
                >
                  <ExternalLink size={20} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="px-6 py-28 md:px-20">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div>
            <h2 className="font-serif text-6xl font-light leading-[1.05] tracking-[-.02em] text-ink md:text-7xl">
              Vamos criar algo <em className="text-gold">extraordinário</em> juntos?
            </h2>
            <p className="mt-8 max-w-lg text-xl font-light leading-9 text-mutedStudio">
              Estamos abertos a novos projetos, colaborações e conversas. Conte-nos sobre sua ideia.
            </p>

            <div className="mt-10 grid gap-4">
              <a href={`mailto:${companyEmail}`} className="group flex items-center gap-4 font-mono text-sm tracking-[.08em] text-ink transition hover:text-gold">
                <Mail className="text-gold" size={20} />
                {companyEmail}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 font-mono text-sm tracking-[.08em] text-ink transition hover:text-gold">
                <Phone className="text-gold" size={20} />
                {phoneDisplay}
              </a>
              <div className="flex items-center gap-4 font-mono text-sm tracking-[.08em] text-ink">
                <MapPin className="text-gold" size={20} />
                São Paulo, SP / Brasil
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-[2px]">
            <input name="name" required className="border-0 border-b border-black/10 bg-warm px-6 py-5 font-serif text-lg text-ink outline-none transition placeholder:text-mutedStudio focus:bg-white focus:border-gold" placeholder="Seu nome" />
            <input name="email" required type="email" className="border-0 border-b border-black/10 bg-warm px-6 py-5 font-serif text-lg text-ink outline-none transition placeholder:text-mutedStudio focus:bg-white focus:border-gold" placeholder="Seu e-mail" />
            <input name="project" required className="border-0 border-b border-black/10 bg-warm px-6 py-5 font-serif text-lg text-ink outline-none transition placeholder:text-mutedStudio focus:bg-white focus:border-gold" placeholder="Sobre o projeto" />
            <textarea name="message" required className="min-h-32 resize-none border-0 border-b border-black/10 bg-warm px-6 py-5 font-serif text-lg text-ink outline-none transition placeholder:text-mutedStudio focus:bg-white focus:border-gold" placeholder="Conte-nos mais..." />
            <button className="mt-2 inline-flex items-center justify-center gap-3 bg-ink px-10 py-5 font-mono text-xs uppercase tracking-[.25em] text-cream transition hover:bg-gold">
              Enviar mensagem <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-ink px-6 py-12 md:px-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8">
          <Logo footer />
          <p className="font-mono text-xs uppercase tracking-[.22em] text-cream/30">
            © 2024 Studio N. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[.22em] text-cream/40 transition hover:text-gold">
              <Instagram className="inline" size={15} /> Instagram
            </a>
            <a href={behanceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[.22em] text-cream/40 transition hover:text-gold">
              Behance
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[.22em] text-cream/40 transition hover:text-gold">
              <Linkedin className="inline" size={15} /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
