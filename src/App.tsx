import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Code2, Download, Menu, Moon, Send, Sun, X } from 'lucide-react'
import { experience, profile, projects, skillGroups, socialLinks, stats } from './data'
import './App.css'

const navigation = [['Men haqimda', '#about'], ['Ko‘nikmalar', '#skills'], ['Loyihalar', '#projects'], ['Tajriba', '#experience'], ['Aloqa', '#contact']]
const currentYear = new Date().getFullYear()

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormMessage('Ma’lumotlaringiz to‘g‘ri, ammo forma xabar yuborish xizmatiga ulanmagan. Iltimos, elektron pochta orqali bog‘laning.')
  }

  return <>
    <a className="skip-link" href="#main">Asosiy mazmunga o‘tish</a>
    <header className="site-header"><div className="nav-wrap">
      <a className="wordmark" href="#home" aria-label={`${profile.name}, bosh sahifa`}><span className="wordmark-icon"><Code2 size={17} /></span><span>{profile.name}<i>.</i></span></a>
      <nav className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Asosiy navigatsiya">{navigation.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <div className="nav-actions">
        <button className="icon-button" type="button" onClick={() => setDarkMode(!darkMode)} aria-label={`${darkMode ? 'Yorug‘' : 'Qorong‘i'} rejimga o‘tish`} title={`${darkMode ? 'Yorug‘' : 'Qorong‘i'} rejimga o‘tish`}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
        <a className="nav-cta" href="#contact">Bog‘lanish <ArrowUpRight size={15} /></a>
        <button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </div></header>

    <main id="main">
      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="availability"><span className="status-dot" /> YANGI IMKONIYATLARGA OCHIQMAN</div>
          <p className="eyebrow hero-eyebrow">MUSTAQIL DASTURCHI <span>·</span> {profile.location}</p>
          <h1>Salom, men <span className="name-highlight">{profile.name}</span>.<br />Raqamli <em>tajribalar</em><br className="desktop-break" /> yarataman<span className="period">.</span></h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Loyihalarimni ko‘rish <ArrowDownRight size={17} /></a><a className="button button-quiet" href="#contact">Bog‘lanish <ArrowRight size={16} /></a></div>
          <div className="hero-socials"><span>IJTIMOIY TARMOQLAR</span><SocialLink name="GitHub" href={socialLinks.github}><Code2 size={17} /></SocialLink><SocialLink name="LinkedIn" href={socialLinks.linkedin}><BriefcaseBusiness size={17} /></SocialLink><SocialLink name="Telegram" href={socialLinks.telegram}><Send size={16} /></SocialLink></div>
        </div>
        <a className="scroll-cue" href="#about"><span>KO‘PROQ KO‘RING</span><ArrowDown size={14} /></a>
      </section>

      <section className="intro-band"><div className="section-shell intro-band-inner"><span className="section-index">01 / QISQACHA</span><p>Puxta detallar. <span>Foydali texnologiyalar.</span><br className="band-break" /> Odamlar uchun yaratilgan tajribalar.</p><ArrowDownRight className="band-arrow" size={27} /></div></section>

      <section className="content-section about-section section-shell" id="about">
        <SectionHeading number="01" label="MEN HAQIMDA" title={<>Men haqimda<br /><em>qisqacha.</em></>} />
        <div className="about-content"><div className="about-lead"><p>{profile.biography}</p><p>{profile.approach}</p><a className="text-link" href="/cv-placeholder.txt" download="Rezyumeingiz-bilan-almashtiring.txt">Rezyumeni yuklab olish <Download size={15} /></a></div>
          <div className="stats-grid">{stats.map((stat, index) => <div className="stat-item" key={stat.label}><span className="stat-number">{stat.value}</span><span className="stat-label">{stat.label}</span><span className="stat-footnote">{index === 0 ? 'O‘ZGARTIRILADIGAN NAMUNA' : 'O‘Z MA’LUMOTINGIZNI KIRITING'}</span></div>)}</div>
        </div>
      </section>

      <section className="skills-section" id="skills"><div className="section-shell skills-inner">
        <SectionHeading number="02" label="MEN FOYDALANADIGAN VOSITALAR" title={<>Ish jarayonidagi<br /><em>vositalar.</em></>} />
        <div className="skills-groups">{skillGroups.map(group => <div className="skill-group" key={group.name}><div className="skill-group-heading"><span>{group.name}</span><span>{String(group.skills.length).padStart(2, '0')}</span></div><div className="skill-list">{group.skills.map(skill => <span className="skill-chip" key={skill}><span className="skill-mark"><Check size={12} /></span>{skill}</span>)}</div></div>)}</div>
      </div></section>

      <section className="content-section projects-section section-shell" id="projects">
        <div className="projects-heading"><SectionHeading number="03" label="BA’ZI ISHLARIM" title={<>Tanlangan<br /><em>loyihalar.</em></>} /><p className="projects-aside">Amalga oshirilgan ishlar, tajribalar va g‘oyalardan kichik to‘plam. Namunalarni o‘z loyihalaringiz bilan almashtiring.</p></div>
        <div className="project-grid">{projects.map((project, index) => <article className={`project-card project-card-${index + 1}`} key={project.name}>
          <ProjectImage project={project} index={index} />
          <div className="project-info"><div className="project-title-row"><div><span className="project-kicker">{project.type} <span>·</span> NAMUNA LOYIHA</span><h3>{project.name}</h3></div><ArrowUpRight className="project-title-arrow" size={18} /></div><p>{project.description}</p><div className="project-bottom"><div className="project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><div className="project-links"><ProjectLink label="Demo" href={project.liveUrl} /><ProjectLink label="Manba kodi" href={project.codeUrl} /></div></div></div>
        </article>)}</div>
      </section>

      <section className="experience-section" id="experience"><div className="section-shell experience-inner">
        <SectionHeading number="04" label="BUGUNGI KUNGA QADAR" title={<>Tajriba va<br /><em>ta’lim.</em></>} />
        <div className="timeline">{experience.map((item, index) => <article className="timeline-item" key={`${item.title}-${index}`}><span className="timeline-marker" /><div className="timeline-date">{item.date}</div><div className="timeline-main"><span className="timeline-type">{item.type}</span><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><p className="timeline-description">{item.description}</p></div><ArrowUpRight className="timeline-arrow" size={18} /></article>)}</div>
      </div></section>

      <section className="contact-section" id="contact"><div className="section-shell contact-inner">
        <div className="contact-copy"><span className="section-index">05 / NAVBATDAGI QADAM</span><h2>Birgalikda<br /><em>ishlaymizmi?</em></h2><p>Qiziqarli loyihalar va hamkorlik takliflarini mamnuniyat bilan ko‘rib chiqaman. Rejangiz haqida yozib yuboring.</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={17} /></a><div className="contact-socials"><SocialLink name="GitHub" href={socialLinks.github}><Code2 size={17} /></SocialLink><SocialLink name="LinkedIn" href={socialLinks.linkedin}><BriefcaseBusiness size={17} /></SocialLink><SocialLink name="Telegram" href={socialLinks.telegram}><Send size={16} /></SocialLink></div></div>
        <form className="contact-form" onSubmit={submitContact}><div className="form-heading"><span>XABAR QOLDIRING</span><span>BARCHA MAYDONLAR MAJBURIY</span></div>
          <label htmlFor="contact-name">Ismingiz<input id="contact-name" name="name" autoComplete="name" placeholder="Ism Familiya" required /></label>
          <label htmlFor="contact-email">Elektron pochta<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="ism@example.com" required /></label>
          <label htmlFor="contact-subject">Mavzu<input id="contact-subject" name="subject" placeholder="Loyihangiz haqida qisqacha" required /></label>
          <label htmlFor="contact-message">Xabaringiz<textarea id="contact-message" name="message" rows={3} placeholder="Nima haqida gaplashamiz?" required /></label>
          <button className="button button-primary form-submit" type="submit">Ma’lumotni tekshirish <ArrowUpRight size={16} /></button>
          <p className="form-feedback" role="status" aria-live="polite">{formMessage}</p><p className="form-note">Bu forma hozircha xabar yubormaydi; elektron pochta orqali bog‘laning.</p>
        </form>
      </div></section>
    </main>

    <footer className="site-footer"><div className="section-shell footer-inner"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-icon"><Code2 size={16} /></span><span>{profile.name}<i>.</i></span></a><span className="footer-credit">E’tibor bilan loyihalandi. Internet uchun yaratildi.</span><div className="footer-links">{navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div><span className="copyright">© {currentYear} {profile.name}. Barcha huquqlar himoyalangan.</span><a className="back-top" href="#home" aria-label="Sahifa boshiga qaytish"><ArrowUpRight size={17} /></a></div></footer>
  </>
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: ReactNode }) {
  return <div className="section-heading"><span className="section-index">{number} / {label}</span><h2>{title}</h2></div>
}
function SocialLink({ name, href, children }: { name: string; href: string; children: ReactNode }) {
  if (!href) return <span className="social-link social-unset" aria-label={`${name} havolasi qo‘shilmagan`} title={`src/data.ts fayliga ${name} havolasini kiriting`}>{children}<span className="sr-only">{name} havolasi kiritilmagan</span></span>
  return <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={name} title={name}>{children}</a>
}
function ProjectLink({ label, href }: { label: string; href: string }) {
  if (!href) return <span className="project-link is-unset" title="src/data.ts fayliga havola kiriting">{label} <span>keyinroq</span></span>
  return <a className="project-link" href={href} target="_blank" rel="noreferrer">{label} <ArrowUpRight size={13} /></a>
}
function ProjectImage({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const content = <><img className="project-image" src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-image-number">0{index + 1}</span>{project.liveUrl && <span className="project-image-arrow"><ArrowUpRight size={19} /></span>}</>
  if (!project.liveUrl) return <div className="project-image-link">{content}</div>
  return <a className="project-image-link" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} loyihasini ko‘rish`}>{content}</a>
}

export default App
