import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { 
  ArrowLeft, Calendar, User, Clock, 
  ArrowRight, Linkedin, Twitter, Github, Mail, MessageCircle
} from 'lucide-react'

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentLang = (resolvedParams.lang === 'id' ? 'id' : 'en') as 'en' | 'id';

  // Fetch all posts and filter by selected language
  const allPosts = getBlogPosts();
  const filteredPosts = allPosts.filter(post => post.lang === currentLang);

  // Estimate reading time helper
  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  // Translation helpers
  const dict = {
    en: {
      title: 'Our Insights & Updates',
      subtitle: 'Deep dives into AI Agent orchestration, LLM cost optimization, self-hosted security, and the future of enterprise automation.',
      backHome: 'Back to Home',
      readMore: 'Read Article',
      noPosts: 'No articles found for this language.',
      about: 'About',
      products: 'Products',
      services: 'Services',
      contact: 'Contact',
      footerDesc: 'AI startup building smart agents. From ready-to-use products to custom solutions — we are ready to help you innovate.',
      rights: 'All rights reserved.',
      builtBy: 'Built with passion by builders, for builders.'
    },
    id: {
      title: 'Wawasan & Pembaruan',
      subtitle: 'Ulasan mendalam seputar orkestrasi AI Agent, optimalisasi biaya LLM, keamanan self-hosted, dan masa depan otomatisasi bisnis.',
      backHome: 'Kembali ke Beranda',
      readMore: 'Baca Artikel',
      noPosts: 'Belum ada artikel untuk bahasa ini.',
      about: 'Tentang',
      products: 'Produk',
      services: 'Layanan',
      contact: 'Kontak',
      footerDesc: 'Startup AI yang membangun agent cerdas. Dari produk siap pakai hingga solusi custom — kami siap membantu Anda berinovasi.',
      rights: 'Hak cipta dilindungi.',
      builtBy: 'Built with passion by builders, for builders.'
    }
  }[currentLang];

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#070403]">
      {/* Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center copper-glow">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <span className="font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide">ImAgents AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{dict.about}</Link>
            <Link href="/#products" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{dict.products}</Link>
            <Link href="/#services" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{dict.services}</Link>
            <Link href="/#contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{dict.contact}</Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Toggle Switch (Updates search parameter) */}
            <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-0.5 shrink-0">
              <Link 
                href="?lang=en" 
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${currentLang === 'en' ? 'bg-primary text-background copper-glow' : 'text-foreground/60 hover:text-foreground hover:bg-white/5'}`}
              >
                EN
              </Link>
              <Link 
                href="?lang=id" 
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${currentLang === 'id' ? 'bg-primary text-background copper-glow' : 'text-foreground/60 hover:text-foreground hover:bg-white/5'}`}
              >
                ID
              </Link>
            </div>

            <Link href="/" className="hidden sm:inline-flex bg-primary hover:bg-primary/80 text-background text-xs font-medium px-4 py-2 rounded-full transition-all copper-glow items-center gap-1.5">
              <ArrowLeft className="w-3 h-3" /> {dict.backHome}
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <header className="pt-32 pb-16 px-6 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mb-6 border border-primary/20 px-3 py-1 rounded-full bg-primary/5">
            <ArrowLeft className="w-3.5 h-3.5" /> {dict.backHome}
          </Link>
          <h1 className="font-[family-name:var(--font-display)] font-medium text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            <span className="text-gradient-copper">{dict.title}</span>
          </h1>
          <p className="text-base font-light text-foreground/50 max-w-2xl mx-auto leading-relaxed">
            {dict.subtitle}
          </p>
        </div>
      </header>

      {/* ─── BLOG LISTINGS ─── */}
      <main className="flex-1 max-w-7xl mx-auto px-6 pb-24 w-full relative z-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-primary/10 rounded-2xl bg-primary/2">
            <p className="text-foreground/40">{dict.noPosts}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="product-card glassmorphism rounded-2xl overflow-hidden border-t border-primary/10 flex flex-col h-full group">
                {/* Image Placeholder with Nice Gradient */}
                <div className="aspect-video w-full relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 border-b border-primary/5 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 mix-blend-multiply transition-opacity group-hover:opacity-20 duration-300" />
                  {/* Subtle graphical logo icon inside placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center opacity-60">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 tag-badge bg-primary/20 border border-primary/30 text-primary text-[9px] px-2 py-0.5 rounded-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-foreground/40 mb-3.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-accent" /> {getReadingTime(post.content)}
                    </span>
                  </div>

                  <h2 className="font-[family-name:var(--font-display)] text-lg font-medium tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-foreground/50 text-xs font-light leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] text-foreground/40 font-mono">
                      <User className="w-3.5 h-3.5 text-primary" /> {post.author}
                    </span>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="text-xs font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      {dict.readMore} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-16 px-6 border-t border-primary/10 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center copper-glow">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
                <span className="font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide">ImAgents AI</span>
              </Link>
              <p className="text-foreground/40 text-sm font-light leading-relaxed max-w-sm mb-6">
                {dict.footerDesc}
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-primary/10 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-primary/10 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-primary/10 transition-all">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-4 text-foreground/70">{currentLang === 'en' ? 'Products' : 'Produk'}</h4>
              <ul className="space-y-2.5">
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">Navi AI</Link></li>
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">NaviCoach</Link></li>
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">Pabrik Konten</Link></li>
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">WebNaviClipper</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-4 text-foreground/70">{currentLang === 'en' ? 'Services' : 'Layanan'}</h4>
              <ul className="space-y-2.5">
                <li><Link href="/#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{currentLang === 'en' ? 'Build Together' : 'Bangun Bersama'}</Link></li>
                <li><Link href="/#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{currentLang === 'en' ? 'Custom Development' : 'Jasa Pembuatan'}</Link></li>
                <li><Link href="/#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">SaaS</Link></li>
                <li><Link href="/#contact" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{dict.contact}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground/30">&copy; 2025 ImAgents AI. {dict.rights}</p>
            <p className="text-xs text-foreground/20">
              {dict.builtBy}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
