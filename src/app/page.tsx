'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Sparkles, FlaskConical, ArrowRight, ArrowDownRight,
  ChevronDown, ChevronUp, Zap, BarChart3, Shield,
  Activity, Globe, MessageSquare, GitBranch, Mic,
  Camera, FileText, LayoutGrid, Workflow, Code2,
  Cloud, MessageCircle, PencilRuler, Hammer, Rocket,
  Check, ShieldCheck, Send, Menu, X, Linkedin, Twitter, Github,
  Mail
} from 'lucide-react'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const isInView = rect.top < window.innerHeight && rect.bottom > 0
    if (isInView) {
      setTimeout(() => setVisible(true), 0)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05, rootMargin: '50px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function TagBadge({ label, color = 'primary' }: { label: string; color?: string }) {
  const colorMap: Record<string, string> = {
    primary: 'text-primary bg-primary/10 border border-primary/20',
    accent: 'text-accent bg-accent/10 border border-accent/20',
    green: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
    yellow: 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20',
  }
  return (
    <span className={`tag-badge ${colorMap[color] || colorMap.primary} mb-4 inline-block`}>
      {label}
    </span>
  )
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'id'>('en') // Default is English
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [activeDemoTab, setActiveDemoTab] = useState('command')

  const bosDemoPages = [
    { 
      id: 'command', 
      name: 'Command Center', 
      img: '/images/bos-command.png', 
      url: 'http://localhost:3033/command-center', 
      desc: lang === 'en' 
        ? 'Dashboard summarizing key operational metrics, real-time financial analysis, weekly performance charts, and AI Copilot module integration.' 
        : 'Dashboard ringkasan metrik utama operasional, analisis finansial real-time, grafik performa mingguan, dan integrasi modul AI Copilot.' 
    },
    { 
      id: 'projects', 
      name: 'Project On Going', 
      img: '/images/bos-projects.png', 
      url: 'http://localhost:3033/projects', 
      desc: lang === 'en' 
        ? 'Modular project tracking system. Monitoring targets per division, detailed milestone progress status, and team performance.' 
        : 'Sistem pelacakan proyek modular. Memonitor target per-divisi, detail status pengerjaan milestone, dan performa tim.' 
    },
    { 
      id: 'openclaw', 
      name: 'OpenClaw Gateway', 
      img: '/images/bos-openclaw.png', 
      url: 'http://localhost:3033/openclaw', 
      desc: lang === 'en' 
        ? 'Visual console for multi-agent gateway management. Configuring webhooks, agent workflows, and external API controls.' 
        : 'Konsol visual manajemen gateway multi-agent. Mengatur webhook, alur kerja (workflow) agen, dan kontrol API eksternal.' 
    },
    { 
      id: 'hermes', 
      name: 'Hermes Engine', 
      img: '/images/bos-hermes.png', 
      url: 'http://localhost:3033/hermes', 
      desc: lang === 'en' 
        ? 'Intelligent LLM router module. Monitoring token usage, API response latency, estimated model cost savings, and routing performance.' 
        : 'Modul router LLM cerdas. Memantau penggunaan token, latensi respon API, estimasi penghematan biaya model, dan performa routing.' 
    },
  ]

  const products = [
    {
      id: 'navi',
      name: 'Navi AI',
      desc: lang === 'en'
        ? 'Modular personal assistant and intelligent chat companion designed for daily productivity, supporting modular agents, smart memory, and API integrations.'
        : 'Modular personal assistant dan chat companion cerdas yang dirancang untuk produktivitas harian, mendukung modular agent, memori cerdas, dan integrasi API.',
      status: 'ready',
      icon: <MessageCircle className="h-5 w-5 text-blue-400" />,
      gradient: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
      tags: ['AI Assistant', 'Modular Agents', 'Production-Ready'],
      tagColor: 'text-blue-400',
      link: 'https://navi.imagents-ai.com',
    },
    {
      id: 'navicoach',
      name: 'NaviCoach',
      desc: lang === 'en'
        ? 'Co-pilot and interactive AI Coach built on structured curriculum to accelerate business growth, career development, and self-paced learning.'
        : 'Co-pilot dan AI Coach bimbingan interaktif berbasis kurikulum terstruktur untuk mempercepat pertumbuhan bisnis, karir, dan pembelajaran mandiri.',
      status: 'ready',
      icon: <Sparkles className="h-5 w-5 text-purple-400" />,
      gradient: 'from-purple-500/20 to-purple-600/10 border-purple-500/20',
      tags: ['AI Coaching', 'Business Co-Pilot', 'Interactive Coach'],
      tagColor: 'text-purple-400',
      link: 'https://navicoach.imagents-ai.com',
    },
    {
      id: 'pabrikkonten',
      name: 'Pabrik Konten',
      desc: lang === 'en'
        ? 'AI-powered automation platform to instantly mass-produce promotional videos, affiliate content, marketing copywriting, and digital advertising materials.'
        : 'Platform otomatisasi berbasis AI untuk memproduksi massal video promosi, konten affiliate, copywriting marketing, dan materi periklanan digital secara instan.',
      status: 'ready',
      icon: <Camera className="h-5 w-5 text-emerald-400" />,
      gradient: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20',
      tags: ['Affiliate Automation', 'Creative AI', 'Bulk Generation'],
      tagColor: 'text-emerald-400',
      link: 'https://pabrikkonten.vercel.app',
    },
    {
      id: 'webnaviclipper',
      name: 'WebNaviClipper',
      desc: lang === 'en'
        ? 'Smart content clipper and video highlight generator. Extract essential information from webpages and engaging clips from long videos in seconds.'
        : 'Smart content clipper dan video highlight generator. Ekstrak informasi penting dari halaman web dan cuplikan menarik dari video panjang dalam hitungan detik.',
      status: 'ready',
      icon: <FileText className="h-5 w-5 text-cyan-400" />,
      gradient: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20',
      tags: ['Smart Clipping', 'Video Highlights', 'Knowledge Base'],
      tagColor: 'text-cyan-400',
      link: 'https://webnaviclipper.vercel.app',
    },
    {
      id: 'nevgoinstitute',
      name: 'Nevgo Institute',
      desc: lang === 'en'
        ? 'EdTech Platform & Professional Learning Portal. Providing technology courses, practical AI-based training, and certifications for modern professionals.'
        : 'Platform EdTech & Portal Pembelajaran Profesional. Menyediakan kursus teknologi, pelatihan praktis berbasis AI, dan sertifikasi untuk profesional modern.',
      status: 'ready',
      icon: <Globe className="h-5 w-5 text-orange-400" />,
      gradient: 'from-orange-500/20 to-orange-600/10 border-orange-500/20',
      tags: ['LMS Platform', 'AI EdTech', 'Professional Training'],
      tagColor: 'text-orange-400',
      link: 'https://app.nevgoinstitute.com',
    },
    {
      id: 'bos',
      name: 'BOS (Business Operating System)',
      desc: lang === 'en'
        ? 'Unified AI-powered Business Operating System. Internal dashboard automating financial data analysis, operational data sync, and performance reports.'
        : 'Sistem Operasi Bisnis terpadu berbasis AI. Dashboard internal yang mengotomatiskan analisis data keuangan, sinkronisasi data operasional, dan laporan performa.',
      status: 'beta',
      icon: <BarChart3 className="h-5 w-5 text-pink-400" />,
      gradient: 'from-pink-500/20 to-pink-600/10 border-pink-500/20',
      tags: ['Enterprise OS', 'Business Intelligence', 'Local Dev Demo'],
      tagColor: 'text-pink-400',
      link: '',
    },
    {
      id: 'openclaw',
      name: 'Openclaw & Hermes',
      desc: lang === 'en'
        ? 'Advanced multi-agent orchestration engines. Open-source gateway (Openclaw) and intermediary engine (Hermes) to design secure distributed AI workflows.'
        : 'Mesin orkestrasi multi-agent tingkat lanjut. Gateway open-source (Openclaw) dan engine perantara (Hermes) untuk merancang alur kerja AI terdistribusi yang aman.',
      status: 'engine',
      icon: <GitBranch className="h-5 w-5 text-indigo-400" />,
      gradient: 'from-indigo-500/20 to-purple-600/10 border-indigo-500/20',
      tags: ['Agent Gateway', 'Workflow Orchestrator', 'Hermes Engine'],
      tagColor: 'text-indigo-400',
      link: '',
    },
  ]

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.status === activeFilter)

  const statusBadge = (status: string) => {
    if (status === 'ready') return <span className="tag-badge text-emerald-400 bg-emerald-400/10">{lang === 'en' ? 'Live SaaS' : 'Siap Pakai / Live'}</span>
    if (status === 'beta') return <span className="tag-badge text-yellow-400 bg-yellow-400/10">{lang === 'en' ? 'Beta / Dev' : 'Beta / Dev'}</span>
    return <span className="tag-badge text-indigo-400 bg-indigo-400/10">{lang === 'en' ? 'Core Engine' : 'Core Engine'}</span>
  }

  const processSteps = [
    { num: 1, title: lang === 'en' ? 'Discussion' : 'Diskusi', desc: lang === 'en' ? 'Tell us your problems and needs. We listen and analyze.' : 'Ceritakan masalah dan kebutuhan Anda. Kami dengarkan dan analisis.', icon: <MessageCircle className="h-5 w-5 text-blue-400" />, gradient: 'from-blue-500 to-purple-500' },
    { num: 2, title: lang === 'en' ? 'Design' : 'Desain', desc: lang === 'en' ? 'We design the solution — agent architecture, workflows, or SaaS setup.' : 'Kami rancang solusi — arsitektur agent, workflow, atau konfigurasi SaaS.', icon: <PencilRuler className="h-5 w-5 text-purple-400" />, gradient: 'from-purple-500 to-cyan-500' },
    { num: 3, title: lang === 'en' ? 'Build' : 'Build', desc: lang === 'en' ? 'We develop with rapid iterations. You review, we refine.' : 'Kami kembangkan dengan iterasi cepat. Anda review, kami sempurnakan.', icon: <Hammer className="h-5 w-5 text-cyan-400" />, gradient: 'from-cyan-500 to-emerald-400' },
    { num: 4, title: lang === 'en' ? 'Deploy' : 'Deploy', desc: lang === 'en' ? 'Launch to production. We ensure it runs smoothly and provide ongoing support.' : 'Launching ke production. Kami pastikan berjalan smooth dan support terus.', icon: <Rocket className="h-5 w-5 text-emerald-400" />, gradient: 'from-emerald-400 to-emerald-500' },
  ]

  const whyUsPoints = [
    { 
      icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />, 
      title: lang === 'en' ? 'Data Privacy & Self-Hosted' : 'Privasi Data & Self-Hosted', 
      desc: lang === 'en' 
        ? 'Full support for local/private cloud deployment. With Openclaw, 100% of your business data remains secure on your own internal servers.' 
        : 'Dukungan penuh deployment lokal/private cloud. Dengan Openclaw, 100% data bisnis Anda tetap aman di server internal Anda sendiri.' 
    },
    { 
      icon: <Globe className="h-4 w-4 text-blue-400" />, 
      title: lang === 'en' ? 'Flexible & Modular Integration' : 'Integrasi Fleksibel & Modular', 
      desc: lang === 'en' 
        ? 'Our smart agents connect seamlessly to chat platforms (WhatsApp, Slack, Telegram), emails, company databases, and custom APIs.' 
        : 'Agen cerdas kami terhubung mulus ke platform chat (WhatsApp, Slack, Telegram), email, database perusahaan, dan API custom.' 
    },
    { 
      icon: <Zap className="h-4 w-4 text-purple-400" />, 
      title: lang === 'en' ? 'API Cost Efficiency (Hermes)' : 'Efisiensi Biaya API (Hermes)', 
      desc: lang === 'en' 
        ? 'The Hermes engine routes intelligently to the most cost-effective language models without sacrificing accuracy, cutting API costs by up to 60%.' 
        : 'Engine Hermes melakukan routing pintar ke model bahasa terhemat tanpa mengurangi akurasi, menekan pengeluaran API hingga 60%.' 
    },
    { 
      icon: <FlaskConical className="h-4 w-4 text-cyan-400" />, 
      title: lang === 'en' ? 'Dogfooding — We Use It Ourselves' : 'Dogfooding — Kami Pakai Sendiri', 
      desc: lang === 'en' 
        ? 'Every product and agent module is used internally by us first before we offer them to our strategic partners.' 
        : 'Setiap produk dan modul agen kami gunakan secara internal terlebih dahulu sebelum kami tawarkan kepada mitra strategis kami.' 
    },
  ]

  const integrationItems = [
    { name: 'WhatsApp', desc: lang === 'en' ? 'Customer Chat' : 'Chat Customer' },
    { name: 'Telegram', desc: lang === 'en' ? 'Secure Chat' : 'Secure Chat' },
    { name: 'Slack / Discord', desc: lang === 'en' ? 'Team Collaboration' : 'Kolaborasi Tim' },
    { name: 'Gmail / Outlook', desc: lang === 'en' ? 'Email & Notifications' : 'Email & Notifikasi' },
    { name: 'HubSpot / CRM', desc: lang === 'en' ? 'Sales & Database' : 'Sales & Database' },
    { name: 'PostgreSQL / SQL', desc: lang === 'en' ? 'Data Pipeline' : 'Data Pipeline' },
    { name: 'Shopify / Webhook', desc: lang === 'en' ? 'E-Commerce & API' : 'E-Commerce & API' },
  ]

  const faqItems = [
    { 
      q: lang === 'en' ? 'What is ImAgents AI?' : 'Apa itu ImAgents AI?', 
      a: lang === 'en' 
        ? 'We are a technology startup actively developing AI Agent products. We use every product internally first before offering it to clients.' 
        : 'Kami adalah startup teknologi yang aktif mengembangkan produk-produk AI Agent. Setiap produk kami gunakan sendiri dulu sebelum ditawarkan kepada klien.' 
    },
    { 
      q: lang === 'en' ? 'Is there a free trial?' : 'Apakah ada free trial?', 
      a: lang === 'en' 
        ? 'Several of our products offer free trials. For SaaS products, we provide a trial period. Self-hosted products can be run locally without licensing fees.' 
        : 'Beberapa produk kami memiliki free trial. Untuk produk SaaS, kami menyediakan periode trial. Untuk produk self-hosted, bisa dijalankan secara lokal tanpa biaya lisensi.' 
    },
    { 
      q: lang === 'en' ? 'Is my data secure?' : 'Apakah data saya aman?', 
      a: lang === 'en' 
        ? 'For self-hosted products, 100% of your data remains on your own machine. For cloud products, data is encrypted and we never share it with third parties.' 
        : 'Untuk produk self-hosted, 100% data Anda tetap di mesin sendiri. Untuk produk cloud, data dienkripsi dan kami tidak pernah membagikannya ke pihak ketiga.' 
    },
  ]

  const showToast = (msg: string) => {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3500)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error('Error submitting form to Google Sheet:', error);
      }
    }

    setTimeout(() => {
      setFormSubmitting(false)
      setFormData({ name: '', email: '', service: '', message: '' })
      showToast(lang === 'en' ? 'Message sent! We will contact you shortly.' : 'Pesan terkirim! Kami akan menghubungi Anda segera.')
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#070403]">
      {/* Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Toast */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{lang === 'en' ? 'Message sent!' : 'Pesan terkirim!'}</span>
        </div>
      </div>

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center copper-glow">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <span className="font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide">ImAgents AI</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{lang === 'en' ? 'About' : 'Tentang'}</a>
            <a href="#products" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{lang === 'en' ? 'Products' : 'Produk'}</a>
            <a href="#services" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{lang === 'en' ? 'Services' : 'Layanan'}</a>
            <a href="#process" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{lang === 'en' ? 'Process' : 'Proses'}</a>
            <a href="#contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">{lang === 'en' ? 'Contact' : 'Kontak'}</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle Switch */}
            <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-0.5 shrink-0">
              <button 
                onClick={() => setLang('en')} 
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${lang === 'en' ? 'bg-primary text-background copper-glow' : 'text-foreground/60 hover:text-foreground hover:bg-white/5'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('id')} 
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${lang === 'id' ? 'bg-primary text-background copper-glow' : 'text-foreground/60 hover:text-foreground hover:bg-white/5'}`}
              >
                ID
              </button>
            </div>

            <a href="#contact" className="bg-primary hover:bg-primary/80 text-background text-xs font-medium px-5 py-2.5 rounded-full transition-all copper-glow inline-flex items-center gap-2">
              {lang === 'en' ? 'Get Started' : 'Mulai Diskusi'}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-0.5 shrink-0">
              <button 
                onClick={() => setLang('en')} 
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${lang === 'en' ? 'bg-primary text-background' : 'text-foreground/60'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('id')} 
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${lang === 'id' ? 'bg-primary text-background' : 'text-foreground/60'}`}
              >
                ID
              </button>
            </div>
            <button onClick={() => setMobileMenuOpen(true)} className="text-foreground/70 hover:text-foreground transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 bottom-0 w-72 z-50 bg-[#0a0b14]/95 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          {/* Mobile Menu Language Selector */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            <button 
              onClick={() => { setLang('en'); setMobileMenuOpen(false); }} 
              className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${lang === 'en' ? 'bg-primary text-background' : 'text-foreground/60 hover:text-foreground hover:bg-white/5'}`}
            >
              EN
            </button>
            <button 
              onClick={() => { setLang('id'); setMobileMenuOpen(false); }} 
              className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${lang === 'id' ? 'bg-primary text-background' : 'text-foreground/60 hover:text-foreground hover:bg-white/5'}`}
            >
              ID
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-foreground/60 hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg text-foreground/70 hover:text-foreground transition-colors">{lang === 'en' ? 'About' : 'Tentang'}</a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-lg text-foreground/70 hover:text-foreground transition-colors">{lang === 'en' ? 'Products' : 'Produk'}</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg text-foreground/70 hover:text-foreground transition-colors">{lang === 'en' ? 'Services' : 'Layanan'}</a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-lg text-foreground/70 hover:text-foreground transition-colors">{lang === 'en' ? 'Process' : 'Proses'}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg text-foreground/70 hover:text-foreground transition-colors">{lang === 'en' ? 'Contact' : 'Kontak'}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-primary hover:bg-primary/80 text-background text-sm font-medium px-6 py-3 rounded-full text-center mt-4 transition-all">
            {lang === 'en' ? 'Get Started' : 'Mulai Diskusi'}
          </a>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 relative z-10 flex flex-col scroll-smooth">

        {/* ─── HERO ─── */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
          {/* Orbit Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[300px] h-[300px] border border-primary/5 rounded-full absolute -top-[150px] -left-[150px] animate-[spin_25s_linear_infinite]"></div>
            <div className="w-[500px] h-[500px] border border-accent/5 rounded-full absolute -top-[250px] -left-[250px] animate-[spin_35s_linear_infinite_reverse]"></div>
            <div className="w-[700px] h-[700px] border border-primary/5 rounded-full absolute -top-[350px] -left-[350px] animate-[spin_45s_linear_infinite]"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
                <div className="status-dot bg-emerald-400"></div>
                <span className="text-xs font-medium text-foreground/60">
                  {lang === 'en' ? 'Growing Startup — Ready to Collaborate' : 'Startup yang Berkembang — Siap Berkolaborasi'}
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-[family-name:var(--font-display)] font-medium text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-6">
                <span className="text-gradient-copper">{lang === 'en' ? 'We Build' : 'Kami Bangun'}</span><br />
                <span className="shimmer-text">{lang === 'en' ? 'Smart Agents' : 'Agent Cerdas'}</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg font-light text-foreground/50 max-w-3xl mx-auto mb-10 leading-relaxed">
                {lang === 'en' 
                  ? 'ImAgents AI is an integrated AI Agent technology startup. We design, build, and distribute an ecosystem of production-ready LLM-based smart agent products to boost business efficiency — ranging from live SaaS platforms to enterprise multi-agent orchestration infrastructure.' 
                  : 'ImAgents AI adalah startup teknologi AI Agent terintegrasi. Kami merancang, membangun, dan mendistribusikan ekosistem produk agen cerdas berbasis LLM yang siap pakai guna mendongkrak efisiensi bisnis — mulai dari platform SaaS Live hingga infrastruktur orkestrasi multi-agent enterprise.'}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#products" className="bg-primary hover:bg-primary/80 text-background text-sm font-medium px-8 py-3.5 rounded-full transition-all copper-glow inline-flex items-center gap-2">
                  {lang === 'en' ? 'View Our Products' : 'Lihat Produk Kami'} <ArrowDownRight className="w-4 h-4" />
                </a>
                <a href="#services" className="text-sm font-medium px-8 py-3.5 rounded-full text-foreground/70 border border-primary/10 hover:bg-primary/5 hover:text-foreground transition-all inline-flex items-center gap-2">
                  {lang === 'en' ? 'Explore Services' : 'Jelajahi Layanan'}
                </a>
              </div>
            </Reveal>

            {/* Quick Stats */}
            <Reveal delay={400}>
              <div className="flex items-center justify-center gap-8 md:gap-12 mt-16">
                <div className="text-center">
                  <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium shimmer-text">5+</div>
                  <div className="text-xs text-foreground/40 mt-1">{lang === 'en' ? 'AI Products' : 'Produk AI'}</div>
                </div>
                <div className="w-px h-8 bg-primary/10"></div>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium shimmer-text">3</div>
                  <div className="text-xs text-foreground/40 mt-1">{lang === 'en' ? 'Ready to Use' : 'Siap Pakai'}</div>
                </div>
                <div className="w-px h-8 bg-primary/10"></div>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium shimmer-text">∞</div>
                  <div className="text-xs text-foreground/40 mt-1">{lang === 'en' ? 'Possibilities' : 'Kemungkinan'}</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/30 to-transparent"></div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <Reveal>
                <TagBadge label={lang === 'en' ? 'About Us' : 'Tentang Kami'} color="primary" />
                <h2 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-5xl tracking-tighter leading-tight mb-6">
                  <span className="text-gradient-copper">{lang === 'en' ? 'A Fast-Growing' : 'Startup yang Sedang'}</span><br />
                  <span className="shimmer-text">{lang === 'en' ? 'Tech Startup' : 'Berkembang Pesat'}</span>
                </h2>
                <p className="text-foreground/50 font-light leading-relaxed mb-6">
                  {lang === 'en' ? 'ImAgents AI is not just a vendor. We are a ' : 'ImAgents AI bukan sekadar vendor. Kami adalah '}
                  <strong className="text-foreground/80">{lang === 'en' ? 'technology startup' : 'startup teknologi'}</strong>
                  {lang === 'en' 
                    ? ' actively developing and launching production-ready AI Agent products. As developers and builders, we practice dogfooding — using what we build ourselves before bringing it to market to guarantee the reliability of our systems.' 
                    : ' yang aktif mengembangkan dan meluncurkan produk-produk AI Agent siap pakai. Sebagai developer dan builder, kami menerapkan metode dogfooding — menggunakan sendiri apa yang kami bangun sebelum menawarkannya ke market untuk menjamin keandalan sistem kami.'}
                </p>
                <p className="text-foreground/50 font-light leading-relaxed">
                  {lang === 'en' ? 'We understand the challenges of adopting artificial intelligence effectively. Therefore, we provide three strategic collaboration options: ' : 'Kami mengerti tantangan adopsi kecerdasan buatan secara efektif. Oleh karena itu, kami menyediakan tiga opsi kolaborasi strategis: '}
                  <strong className="text-foreground/80">{lang === 'en' ? 'subscribing to our Live SaaS products' : 'berlangganan produk SaaS Live kami'}</strong>
                  {lang === 'en' ? ' for instant productivity, ' : ' untuk produktivitas instan, '}
                  <strong className="text-foreground/80">{lang === 'en' ? 'ordering custom solutions (bespoke agency)' : 'memesan jasa kustom (bespoke agency)'}</strong>
                  {lang === 'en' ? ' for specific needs, or ' : ' untuk solusi spesifik, atau '}
                  <strong className="text-foreground/80">{lang === 'en' ? 'partnering long-term (co-development / joint-venture)' : 'berpartner jangka panjang (co-development / joint-venture)'}</strong>
                  {lang === 'en' ? ' to scale AI infrastructure together.' : ' untuk menskalakan infrastruktur AI bersama.'}
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="glassmorphism rounded-2xl p-8 relative overflow-hidden">
                  {/* Terminal-like header */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                    <span className="text-xs text-foreground/30 ml-3 font-mono">imagents-ai-cluster</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-accent">→</span>
                      <span className="text-foreground/70">Navi & NaviCoach (SaaS Live)</span>
                      <span className="tag-badge text-emerald-400 bg-emerald-400/10 ml-auto">{lang === 'en' ? 'active' : 'aktif'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">→</span>
                      <span className="text-foreground/70">Pabrik Konten & Clipper (SaaS Live)</span>
                      <span className="tag-badge text-emerald-400 bg-emerald-400/10 ml-auto">{lang === 'en' ? 'active' : 'aktif'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">→</span>
                      <span className="text-foreground/70">Nevgo Institute Platform</span>
                      <span className="tag-badge text-emerald-400 bg-emerald-400/10 ml-auto">{lang === 'en' ? 'active' : 'aktif'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">→</span>
                      <span className="text-foreground/70">BOS Dashboard (Next.js)</span>
                      <span className="tag-badge text-yellow-400 bg-yellow-400/10 ml-auto">:3033</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">→</span>
                      <span className="text-foreground/70">Openclaw Orchestration Gateway</span>
                      <span className="tag-badge text-indigo-400 bg-indigo-400/10 ml-auto">:18789</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">→</span>
                      <span className="text-foreground/70">Hermes Agent Routing Engine</span>
                      <span className="tag-badge text-indigo-400 bg-indigo-400/10 ml-auto">{lang === 'en' ? 'active' : 'aktif'}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-primary/10 flex items-center gap-2">
                      <div className="w-2 h-4 bg-accent/70 animate-[typing_1s_infinite]"></div>
                      <span className="text-foreground/30 text-xs">
                        {lang === 'en' ? 'cluster sync active...' : 'cluster sinkronisasi aktif...'}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── PRODUCTS ─── */}
        <section id="products" className="py-24 px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <TagBadge label={lang === 'en' ? 'Our Ecosystem' : 'Ekosistem Kami'} color="accent" />
                <h2 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-5xl tracking-tighter text-gradient-copper mb-4">
                  {lang === 'en' ? 'AI Applications We Have Built' : 'Aplikasi AI yang Telah Kami Kembangkan'}
                </h2>
                <p className="text-foreground/50 font-light max-w-2xl mx-auto">
                  {lang === 'en' 
                    ? 'From modular assistant SaaS platforms to advanced multi-agent orchestration infrastructure — this is our active portfolio ready for demonstration.' 
                    : 'Dari platform SaaS asisten modular hingga infrastruktur orkestrasi multi-agent tingkat lanjut — ini adalah portofolio aktif yang siap kami demontrasikan.'}
                </p>
              </div>
            </Reveal>

            {/* Filter Tabs */}
            <Reveal>
              <div className="flex items-center justify-center gap-2 mb-12">
                {[
                  { key: 'all', label: lang === 'en' ? 'All' : 'Semua' },
                  { key: 'ready', label: lang === 'en' ? 'Live Apps' : 'Aplikasi Live' },
                  { key: 'beta', label: lang === 'en' ? 'Beta / Dev' : 'Uji Coba / Dev' },
                  { key: 'engine', label: lang === 'en' ? 'Core Engine' : 'Core Engine' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`tag-badge px-4 py-2 cursor-pointer transition-all ${
                      activeFilter === f.key
                        ? 'text-foreground bg-primary/15 border border-primary/20'
                        : 'text-foreground/50 bg-transparent border border-primary/5 hover:bg-primary/5'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Product Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <div className="product-card glassmorphism rounded-2xl p-6 border-t border-primary/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                        {p.icon}
                      </div>
                      {statusBadge(p.status)}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight mb-2">{p.name}</h3>
                    <p className="text-foreground/50 text-sm font-light leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-primary/5 text-foreground/40">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {p.link ? (
                        <>
                          <a href={p.link} target="_blank" rel="noopener noreferrer" className={`text-xs font-medium ${p.tagColor} hover:opacity-80 transition-opacity inline-flex items-center gap-1 cursor-pointer`}>
                            {lang === 'en' ? 'Visit App' : 'Kunjungi Aplikasi'} <ArrowRight className="w-3 h-3" />
                          </a>
                          <span className="text-foreground/20">•</span>
                          <span className="text-xs text-foreground/40">{lang === 'en' ? 'Live SaaS' : 'SaaS Live'}</span>
                        </>
                      ) : (
                        <>
                          {p.status === 'beta' && (
                            <>
                              <button 
                                onClick={() => {
                                  setActiveDemoTab('command');
                                  setDemoModalOpen(true);
                                }}
                                className="text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none p-0"
                              >
                                {lang === 'en' ? 'Open Virtual Demo' : 'Buka Demo Virtual'} <ArrowRight className="w-3 h-3" />
                              </button>
                              <span className="text-foreground/20">•</span>
                              <span className="text-xs text-foreground/40">{lang === 'en' ? 'Local Dev (BOS)' : 'Local Dev (BOS)'}</span>
                            </>
                          )}
                          {p.status === 'engine' && (
                            <>
                              <a href="#contact" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1">
                                {lang === 'en' ? 'Integrate Engine' : 'Integrasikan Engine'} <ArrowRight className="w-3 h-3" />
                              </a>
                              <span className="text-foreground/20">•</span>
                              <span className="text-xs text-foreground/40">{lang === 'en' ? 'Orchestrator' : 'Orchestrator'}</span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INTEGRATIONS / KONEKTIVITAS ─── */}
        <section className="py-12 border-t border-b border-primary/5 relative overflow-hidden bg-primary/2">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="shrink-0 max-w-md text-center lg:text-left">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight mb-2 text-gradient-copper">
                    {lang === 'en' ? 'Integrated with Your Ecosystem' : 'Terintegrasi dengan Ekosistem Anda'}
                  </h3>
                  <p className="text-xs text-foreground/40 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                    {lang === 'en' 
                      ? 'Our smart agents can be seamlessly connected to communication platforms, internal databases, and business CRMs via modular API integrations.' 
                      : 'Agen cerdas kami dapat dihubungkan ke berbagai platform komunikasi, database internal, dan CRM bisnis lewat integrasi API modular.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                  {integrationItems.map((integration) => (
                    <div 
                      key={integration.name}
                      className="glassmorphism px-4 py-2.5 rounded-xl border border-primary/10 flex flex-col items-start min-w-[140px] text-left hover:border-primary/30 transition-colors"
                    >
                      <span className="text-xs font-semibold text-foreground/80 tracking-tight">{integration.name}</span>
                      <span className="text-[9px] text-foreground/30 font-light mt-0.5">{integration.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section id="services" className="py-24 px-6 relative">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <TagBadge label={lang === 'en' ? 'Collaboration' : 'Kolaborasi'} color="accent" />
                <h2 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-5xl tracking-tighter text-gradient-copper mb-4">
                  {lang === 'en' ? 'Three Business & Collaboration Paths' : 'Tiga Jalur Kolaborasi & Bisnis'}
                </h2>
                <p className="text-foreground/50 font-light max-w-2xl mx-auto">
                  {lang === 'en' 
                    ? 'We open doors for various strategic partnership models to accelerate AI adoption in your business.' 
                    : 'Kami membuka pintu untuk berbagai model kemitraan strategis guna mengakselerasi adopsi AI di bisnis Anda.'}
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1: Bangun Bersama */}
              <Reveal>
                <div className="glassmorphism rounded-2xl p-8 border-t border-primary/20 product-card group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Workflow className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight mb-3">
                    {lang === 'en' ? 'Build Together' : 'Bangun Bersama'}
                  </h3>
                  <p className="text-foreground/50 font-light leading-relaxed mb-6">
                    {lang === 'en' 
                      ? 'Strategic partnership (Joint-Venture) to scale and integrate AI agent systems into your core business workflows using our tech foundation.' 
                      : 'Kemitraan strategis (Joint-Venture) untuk menskalakan dan mengintegrasikan sistem agen AI ke dalam alur bisnis inti Anda menggunakan fondasi teknologi kami.'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Long-term partnership & Joint-Venture model' : 'Model kemitraan & Joint-Venture jangka panjang'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Robust infrastructure powered by Openclaw & Hermes' : 'Infrastruktur tangguh berbasis Openclaw & Hermes'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Resource sharing, IP development, & business optimization' : 'Sharing resource, IP development, & optimasi bisnis'}
                    </li>
                  </ul>
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    {lang === 'en' ? 'Start Partnership' : 'Mulai Kemitraan'} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>

              {/* Service 2: Jasa Pembuatan */}
              <Reveal delay={100}>
                <div className="glassmorphism rounded-2xl p-8 border-t border-accent/20 product-card group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code2 className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight mb-3">
                    {lang === 'en' ? 'Custom Development' : 'Jasa Pembuatan'}
                  </h3>
                  <p className="text-foreground/50 font-light leading-relaxed mb-6">
                    {lang === 'en' 
                      ? 'Develop custom AI solutions, modular assistants, automatic clippers, or BOS dashboards tailored to your unique requirements and workflows.' 
                      : 'Kembangkan solusi AI kustom, asisten modular, clipper otomatis, atau dashboard BOS yang dirancang khusus untuk kebutuhan dan alur kerja unik Anda.'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Custom agent development & RAG pipeline' : 'Pengembangan custom agent & RAG pipeline'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Full integration to internal APIs & company databases' : 'Integrasi penuh ke API internal & database perusahaan'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Full ownership of source code & documentation' : 'Kepemilikan penuh atas source code & dokumentasi'}
                    </li>
                  </ul>
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                    {lang === 'en' ? 'Project Consultation' : 'Konsultasi Proyek'} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>

              {/* Service 3: Langganan SaaS */}
              <Reveal delay={200}>
                <div className="glassmorphism rounded-2xl p-8 border-t border-emerald-400/20 product-card group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 border border-emerald-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Cloud className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight mb-3">
                    {lang === 'en' ? 'SaaS Subscription' : 'Langganan SaaS'}
                  </h3>
                  <p className="text-foreground/50 font-light leading-relaxed mb-6">
                    {lang === 'en' 
                      ? 'Instantly use our ready-to-go AI platforms (Navi, NaviCoach, Pabrik Konten, WebNaviClipper) to boost your team\'s operational performance today.' 
                      : 'Gunakan langsung platform AI siap pakai kami (Navi, NaviCoach, Pabrik Konten, WebNaviClipper) untuk mendongkrak performa operasional tim Anda hari ini.'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Quick onboarding to our suite of live applications' : 'Onboarding cepat ke suite aplikasi live kami'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Secure cloud hosting & full maintenance from us' : 'Cloud hosting aman & pemeliharaan penuh dari kami'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {lang === 'en' ? 'Instant scalability with regular feature updates' : 'Skalabilitas instan dengan update fitur berkala'}
                    </li>
                  </ul>
                  <a href="#products" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-400/80 transition-colors">
                    {lang === 'en' ? 'Explore Products' : 'Eksplorasi Produk'} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section id="process" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <TagBadge label={lang === 'en' ? 'How It Works' : 'Cara Kerja'} color="green" />
                <h2 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-5xl tracking-tighter text-gradient-copper mb-4">
                  {lang === 'en' ? 'From Discussion to Deployment' : 'Dari Diskusi ke Deploy'}
                </h2>
                <p className="text-foreground/50 font-light max-w-2xl mx-auto">
                  {lang === 'en' ? 'Our simple and transparent collaboration process.' : 'Proses kolaborasi kami yang simple dan transparan.'}
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 100}>
                  <div className="glassmorphism rounded-2xl p-6 text-center product-card relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-background">
                      {step.num}
                    </div>
                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/5 flex items-center justify-center mb-4 mt-3">
                      {step.icon}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] font-medium text-lg mb-2">{step.title}</h3>
                    <p className="text-foreground/40 text-sm font-light">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY US ─── */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <Reveal>
                <TagBadge label={lang === 'en' ? 'Why Choose Us' : 'Kenapa Kami'} color="primary" />
                <h2 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-5xl tracking-tighter leading-tight mb-6">
                  <span className="text-gradient-copper">{lang === 'en' ? 'We Are Not Just Vendors,' : 'Kami Bukan Vendor,'}</span><br />
                  <span className="shimmer-text">{lang === 'en' ? 'We Are Builders' : 'Kami Sesama Builder'}</span>
                </h2>
                <p className="text-foreground/50 font-light leading-relaxed mb-8">
                  {lang === 'en' 
                    ? 'We build products for ourselves first. This means every solution we offer has undergone real-world iteration — not just theory. We know what it feels like to build from scratch, and we know how to make it run in production.' 
                    : 'Kami membangun produk untuk diri kami sendiri dulu. Artinya, setiap solusi yang kami tawarkan sudah melalui proses iterasi nyata — bukan teori. Kami tahu rasanya membangun dari nol, dan kami tahu cara membuatnya berjalan di production.'}
                </p>
              </Reveal>

              <div className="space-y-4">
                {whyUsPoints.map((point, i) => (
                  <Reveal key={point.title} delay={i * 100}>
                    <div className="glassmorphism rounded-xl p-5 flex items-start gap-4 product-card">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        {point.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">{point.title}</h4>
                        <p className="text-foreground/40 text-xs font-light leading-relaxed">{point.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA / CONTACT ─── */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <Reveal>
              <div className="glassmorphism rounded-3xl p-8 md:p-12 border-t border-primary/10">
                <div className="text-center mb-10">
                  <TagBadge label={lang === 'en' ? "Let's Talk" : 'Mari Bicara'} color="accent" />
                  <h2 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-4xl tracking-tighter text-gradient-copper mb-3">
                    {lang === 'en' ? 'Ready to Get Started?' : 'Siap Memulai?'}
                  </h2>
                  <p className="text-foreground/50 font-light max-w-lg mx-auto">
                    {lang === 'en' 
                      ? 'Tell us about your needs. Whether it\'s orchestration, custom apps, or SaaS — we\'re ready to discuss.' 
                      : 'Ceritakan kebutuhan Anda. Baik itu orchestration, custom app, atau SaaS — kami siap diskusi.'}
                  </p>
                  
                  {/* Direct Contact Links */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs mt-6">
                    <a 
                      href="mailto:infoimagent.ai@gmail.com" 
                      className="glassmorphism px-4 py-2.5 rounded-full border border-primary/10 flex items-center gap-2 text-foreground/60 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span>infoimagent.ai@gmail.com</span>
                    </a>
                    <a 
                      href="https://wa.me/628989221700" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="glassmorphism px-4 py-2.5 rounded-full border border-primary/10 flex items-center gap-2 text-foreground/60 hover:text-emerald-400 hover:border-emerald-400/30 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>+62 898-9221-700 (WhatsApp)</span>
                    </a>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5 max-w-xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-foreground/40 mb-1.5 block">{lang === 'en' ? 'Name' : 'Nama'}</label>
                      <input
                        type="text"
                        placeholder={lang === 'en' ? 'Your Name' : 'Nama Anda'}
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-foreground/40 mb-1.5 block">{lang === 'en' ? 'Email' : 'Email'}</label>
                      <input
                        type="email"
                        placeholder={lang === 'en' ? 'email@company.com' : 'email@perusahaan.com'}
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-foreground/40 mb-1.5 block">{lang === 'en' ? 'Service Needed' : 'Layanan yang Dibutuhkan'}</label>
                    <select
                      required
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0a0b14]/80 border border-primary/10 rounded-xl px-4 py-3 text-sm text-foreground/75 focus:outline-none focus:border-primary/30 transition-colors cursor-pointer"
                    >
                      <option value="" disabled>{lang === 'en' ? 'Select a service...' : 'Pilih layanan...'}</option>
                      <option value="jv">{lang === 'en' ? 'Build Together (Joint-Venture)' : 'Bangun Bersama (Joint-Venture)'}</option>
                      <option value="bespoke">{lang === 'en' ? 'Custom Development (Bespoke)' : 'Jasa Pembuatan (Bespoke)'}</option>
                      <option value="saas">{lang === 'en' ? 'SaaS Subscription (SaaS)' : 'Langganan SaaS (SaaS Subscription)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-foreground/40 mb-1.5 block">{lang === 'en' ? 'Message' : 'Pesan'}</label>
                    <textarea
                      placeholder={lang === 'en' ? 'Write your project details or questions here...' : 'Tulis detail proyek atau pertanyaan Anda di sini...'}
                      rows={4}
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="bg-primary hover:bg-primary/80 text-background w-full text-sm font-medium px-8 py-3.5 rounded-full transition-all copper-glow inline-flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {formSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-spin">⟳</span> {lang === 'en' ? 'Sending...' : 'Mengirim...'}
                      </span>
                    ) : (
                      <>{lang === 'en' ? 'Send Message' : 'Kirim Pesan'} <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-24 px-6 relative border-t border-primary/10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <TagBadge label={lang === 'en' ? 'FAQ' : 'FAQ'} color="primary" />
                <h2 className="font-[family-name:var(--font-display)] font-medium text-3xl md:text-4xl tracking-tighter text-gradient-copper">
                  {lang === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum'}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="glassmorphism rounded-xl border border-primary/10 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
                      {openFaq === i ? <ChevronUp className="h-4 w-4 text-primary shrink-0" /> : <ChevronDown className="h-4 w-4 text-foreground/40 shrink-0" />}
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 pt-1 border-t border-primary/10">
                        <p className="text-xs text-foreground/50 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="py-16 px-6 border-t border-primary/10 mt-auto relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <a href="#" className="flex items-center gap-2.5 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center copper-glow">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                  <span className="font-[family-name:var(--font-display)] font-semibold text-sm tracking-wide">ImAgents AI</span>
                </a>
                <p className="text-foreground/40 text-sm font-light leading-relaxed max-w-sm mb-6">
                  {lang === 'en' 
                    ? 'AI startup building smart agents. From ready-to-use products to custom solutions — we are ready to help you innovate.' 
                    : 'Startup AI yang membangun agent cerdas. Dari produk siap pakai hingga solusi custom — kami siap membantu Anda berinovasi.'}
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
                <div className="mt-6 space-y-2.5">
                  <a 
                    href="mailto:infoimagent.ai@gmail.com" 
                    className="flex items-center gap-2 text-xs text-foreground/50 hover:text-primary transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>infoimagent.ai@gmail.com</span>
                  </a>
                  <a 
                    href="https://wa.me/628989221700" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-xs text-foreground/50 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>+62 898-9221-700</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-4 text-foreground/70">{lang === 'en' ? 'Products' : 'Produk'}</h4>
                <ul className="space-y-2.5">
                  <li><a href="#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">Navi AI</a></li>
                  <li><a href="#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">NaviCoach</a></li>
                  <li><a href="#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">Pabrik Konten</a></li>
                  <li><a href="#products" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">WebNaviClipper</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-4 text-foreground/70">{lang === 'en' ? 'Services' : 'Layanan'}</h4>
                <ul className="space-y-2.5">
                  <li><a href="#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{lang === 'en' ? 'Build Together' : 'Bangun Bersama'}</a></li>
                  <li><a href="#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{lang === 'en' ? 'Custom Development' : 'Jasa Pembuatan'}</a></li>
                  <li><a href="#services" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{lang === 'en' ? 'SaaS' : 'SaaS'}</a></li>
                  <li><a href="#contact" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">{lang === 'en' ? 'Contact' : 'Kontak'}</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-foreground/30">&copy; 2025 ImAgents AI. All rights reserved.</p>
              <p className="text-xs text-foreground/20">
                {lang === 'en' ? 'Built with passion by builders, for builders.' : 'Built with passion by builders, for builders.'}
              </p>
            </div>
          </div>
        </footer>

        {/* ─── VIRTUAL DEMO MODAL ─── */}
        {demoModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-opacity duration-300"
            onClick={() => setDemoModalOpen(false)}
          >
            <div 
              className="relative max-w-6xl w-full bg-[#0e0b0a]/95 border border-primary/20 rounded-2xl overflow-hidden glassmorphism flex flex-col md:flex-row shadow-2xl h-[90vh] md:h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Sidebar menu */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-primary/10 bg-black/30 p-4 flex flex-col justify-between shrink-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-2 py-1.5 border-b border-primary/10">
                    <div className="w-6 h-6 rounded-lg bg-primary text-background font-bold text-xs flex items-center justify-center">B</div>
                    <span className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                      {lang === 'en' ? 'BOS Virtual Demo' : 'BOS Virtual Demo'}
                    </span>
                  </div>
                  <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
                    {bosDemoPages.map(page => (
                      <button
                        key={page.id}
                        onClick={() => setActiveDemoTab(page.id)}
                        className={`whitespace-nowrap w-full text-left px-4 py-2.5 rounded-xl transition-all text-xs font-medium cursor-pointer ${
                          activeDemoTab === page.id 
                            ? 'bg-primary/25 text-primary border border-primary/30' 
                            : 'text-foreground/50 hover:text-foreground hover:bg-primary/5 border border-transparent'
                        }`}
                      >
                        {page.name}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="hidden md:block p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-[10px] text-foreground/40 leading-relaxed">
                    {lang === 'en' 
                      ? 'BOS (Business Operating System) is designed to integrate internal company dashboards with automated AI pipelines.' 
                      : 'BOS (Business Operating System) dirancang untuk mengintegrasikan dashboard internal perusahaan dengan pipeline AI terotomatisasi.'}
                  </p>
                </div>
              </div>

              {/* Content pane */}
              <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto min-w-0">
                {/* Header */}
                <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
                    <span className="text-xs text-foreground/60 font-mono">
                      {bosDemoPages.find(p => p.id === activeDemoTab)?.url}
                    </span>
                  </div>
                  <button 
                    onClick={() => setDemoModalOpen(false)}
                    className="text-foreground/40 hover:text-foreground hover:bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Description */}
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-xs text-foreground/60 leading-relaxed font-light">
                    <strong className="text-primary">{bosDemoPages.find(p => p.id === activeDemoTab)?.name}: </strong>
                    {bosDemoPages.find(p => p.id === activeDemoTab)?.desc}
                  </p>
                </div>

                {/* Browser mockup body */}
                <div className="flex-1 bg-black/20 rounded-xl border border-primary/10 overflow-hidden flex items-center justify-center relative min-h-[300px]">
                  <img 
                    src={bosDemoPages.find(p => p.id === activeDemoTab)?.img} 
                    alt={bosDemoPages.find(p => p.id === activeDemoTab)?.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
