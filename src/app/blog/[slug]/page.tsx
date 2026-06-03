import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { 
  ArrowLeft, Calendar, User, Clock, Tag,
  Linkedin, Twitter, Github
} from 'lucide-react'

interface PostProps {
  params: Promise<{ slug: string }>;
}

// Generate static parameters for prerendering
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Estimate reading time
  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  // Dictionary translations based on current language
  const dict = {
    en: {
      backList: 'Back to Articles',
      authorBy: 'Written by',
      category: 'Category',
      share: 'Share this article',
      about: 'About',
      products: 'Products',
      services: 'Services',
      contact: 'Contact',
      footerDesc: 'AI startup building smart agents. From ready-to-use products to custom solutions — we are ready to help you innovate.',
      rights: 'All rights reserved.',
      builtBy: 'Built with passion by builders, for builders.'
    },
    id: {
      backList: 'Kembali ke Artikel',
      authorBy: 'Ditulis oleh',
      category: 'Kategori',
      share: 'Bagikan artikel ini',
      about: 'Tentang',
      products: 'Produk',
      services: 'Layanan',
      contact: 'Kontak',
      footerDesc: 'Startup AI yang membangun agent cerdas. Dari produk siap pakai hingga solusi custom — kami siap membantu Anda berinovasi.',
      rights: 'Hak cipta dilindungi.',
      builtBy: 'Built with passion by builders, for builders.'
    }
  }[post.lang];

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
            <Link 
              href={`/blog?lang=${post.lang}`} 
              className="bg-primary hover:bg-primary/80 text-background text-xs font-medium px-4 py-2 rounded-full transition-all copper-glow inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3 h-3" /> {dict.backList}
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── MAIN POST CONTAINER ─── */}
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 w-full relative z-10">
        {/* Back Link */}
        <Link 
          href={`/blog?lang=${post.lang}`} 
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mb-8 border border-primary/20 px-3 py-1 rounded-full bg-primary/5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {dict.backList}
        </Link>

        {/* Article Meta Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="tag-badge bg-primary/10 border border-primary/20 text-primary text-[9px] px-2 py-0.5 rounded-md">
              {post.category}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-5xl tracking-tighter text-gradient-copper leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs text-foreground/50 border-b border-primary/10 pb-6">
            <span className="flex items-center gap-1.5 font-mono">
              <User className="w-4 h-4 text-primary" /> {dict.authorBy} <strong className="text-foreground/80 font-normal">{post.author}</strong>
            </span>
            <span className="hidden sm:inline text-foreground/20">|</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" /> {post.date}
            </span>
            <span className="hidden sm:inline text-foreground/20">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> {getReadingTime(post.content)}
            </span>
          </div>
        </div>

        {/* Hero cover mockup (styled gradient) */}
        <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-primary/15 via-accent/5 to-primary/30 border border-primary/10 mb-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center opacity-80 scale-110">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Article Content Rendered via ReactMarkdown */}
        <article className="glassmorphism rounded-2xl p-6 md:p-12 border-t border-primary/10">
          <div className="prose-custom max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        {/* Footer/Share section */}
        <div className="mt-12 p-6 rounded-2xl border border-primary/10 bg-primary/2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-foreground/50">{dict.share}:</span>
          <div className="flex items-center gap-2">
            <a href="#" className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-primary/10 transition-all text-xs">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-primary/10 transition-all text-xs">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
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
              <h4 className="font-medium text-sm mb-4 text-foreground/70">{post.lang === 'en' ? 'Products' : 'Produk'}</h4>
              <ul className="space-y-2.5">
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">Navi AI</Link></li>
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">NaviCoach</Link></li>
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">Pabrik Konten</Link></li>
                <li><Link href="/#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">WebNaviClipper</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-4 text-foreground/70">{post.lang === 'en' ? 'Services' : 'Layanan'}</h4>
              <ul className="space-y-2.5">
                <li><Link href="/#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{post.lang === 'en' ? 'Build Together' : 'Bangun Bersama'}</Link></li>
                <li><Link href="/#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{post.lang === 'en' ? 'Custom Development' : 'Jasa Pembuatan'}</Link></li>
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
