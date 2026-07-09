import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MapPin, ChevronUp } from 'lucide-react';

const navLinks = [
  { id: 'hero', label: '首页' },
  { id: 'overview', label: '行程概览' },
  { id: 'itinerary', label: '每日行程' },
  { id: 'tips', label: '实用贴士' },
];

export default function NavbarSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-xl shadow-md ring-1 ring-border/30'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo 区域 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2"
            >
              {/* 新疆特色图标 - 结合天山和湖泊 */}
              <div className={`flex size-10 items-center justify-center rounded-xl transition-all ${
                isScrolled ? 'bg-primary text-primary-foreground' : 'bg-white/20 text-white backdrop-blur-sm'
              }`}>
                <svg viewBox="0 0 32 32" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 16 L16 4 L30 16" />
                  <path d="M16 4 L16 28" />
                  <ellipse cx="16" cy="24" rx="10" ry="4" strokeWidth="1.5" />
                  <circle cx="16" cy="24" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold leading-tight ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  新疆自驾
                </span>
                <span className={`text-[10px] tracking-wider ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/70'
                }`}>
                  伊犁环线
                </span>
              </div>
            </motion.button>

            {/* 桌面端导航 */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isScrolled
                      ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex size-10 items-center justify-center rounded-xl transition-all md:hidden ${
                isScrolled
                  ? 'text-foreground hover:bg-muted/50'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <motion.div
          initial={false}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-card/98 backdrop-blur-xl border-t border-border/30 md:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-foreground hover:bg-muted/50 transition-colors"
                >
                  <MapPin className="size-4 text-primary" />
                  <span className="font-medium">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* 回到顶部按钮 */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 20 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-110 md:bottom-8 md:right-8"
        aria-label="回到顶部"
      >
        <ChevronUp className="size-5" />
      </motion.button>
    </>
  );
}