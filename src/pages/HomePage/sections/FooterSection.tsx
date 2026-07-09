import { motion } from 'framer-motion';
import { Heart, Share2, Bookmark, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const STORAGE_KEY = '__travel_guide_favorite';

export default function FooterSection() {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setIsFavorited(saved === 'true');
  }, []);

  const handleFavorite = () => {
    const newValue = !isFavorited;
    setIsFavorited(newValue);
    localStorage.setItem(STORAGE_KEY, String(newValue));
    toast.success(newValue ? '已收藏攻略' : '已取消收藏');
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success('链接已复制到剪贴板');
    } catch {
      toast.info('复制失败，请手动复制链接');
    }
  };

  return (
    <footer id="footer" className="w-full bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background">
      {/* 顶部 CTA 区 */}
      <div className="relative overflow-hidden">
        {/* 装饰背景 */}
        <div className="absolute inset-0">
          <div className="absolute left-10 top-10 size-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 size-60 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warning/10 blur-3xl" />
        </div>

        {/* 顶部民族纹样 */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/60 via-secondary/60 to-warning/60" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center md:px-6 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MapPin className="mx-auto mb-4 size-10 text-primary" />
            <h2 className="text-2xl font-bold md:text-3xl">
              准备好开启你的新疆之旅了吗？
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-background/70">
              收藏这份攻略，出发前随时查看。也别忘了分享给同行的伙伴～
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFavorite}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                  isFavorited
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground hover:bg-background/90'
                }`}
              >
                <Heart className={`size-4 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? '已收藏' : '收藏攻略'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-transparent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-background/10"
              >
                <Share2 className="size-4" />
                分享给朋友
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 民族纹样分隔 */}
      <div className="flex items-center justify-center gap-2 py-4 text-background/20">
        <div className="h-px w-20 bg-background/10" />
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
        <div className="h-px w-20 bg-background/10" />
      </div>

      {/* 底部版权 */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-background/50 md:flex-row">
            <div className="flex items-center gap-2">
              <Bookmark className="size-4" />
              <span>新疆7天自驾游攻略 · 伊犁环线</span>
            </div>
            <div>
              总里程约1800公里 · 最佳季节 6-9月
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
