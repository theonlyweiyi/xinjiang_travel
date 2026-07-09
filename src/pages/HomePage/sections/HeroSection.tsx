import { motion } from 'framer-motion';
import { MapPin, Calendar, Car, Route, Mountain, Sparkles, Sun } from 'lucide-react';
import { MOCK_TRAVEL_GUIDE } from '@/data/travelguide';
import { Image } from '@/components/ui/image';

export default function HeroSection() {
  const { overview } = MOCK_TRAVEL_GUIDE;
  const heroImage = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆赛里木湖全景风光蓝天白云雪山草原湖泊公路旅行摄影广角&image_size=landscape_16_9';

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* 背景图 */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="新疆赛里木湖"
          className="h-full w-full object-cover"
        />
        {/* 渐变蒙层 - 新疆色彩渐变：蓝天蓝 → 草原绿 → 雪山白 */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-secondary/10 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-primary/20" />
        
        {/* 新疆民族风装饰 - 顶部纹样 */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        
        {/* 左上角民族风装饰 - 新疆艾德莱斯纹样 */}
        <div className="absolute left-4 top-24 size-20 text-white/15 md:left-8 md:top-32 md:size-28">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10 10 Q30 5 50 10 T90 10" />
            <path d="M10 30 Q30 25 50 30 T90 30" />
            <path d="M10 50 Q30 45 50 50 T90 50" />
            <circle cx="25" cy="25" r="8" strokeDasharray="3 2" />
            <circle cx="75" cy="25" r="8" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>
        
        {/* 右上角民族风装饰 */}
        <div className="absolute right-4 top-24 size-20 -scale-x-100 text-white/15 md:right-8 md:top-32 md:size-28">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10 10 Q30 5 50 10 T90 10" />
            <path d="M10 30 Q30 25 50 30 T90 30" />
            <path d="M10 50 Q30 45 50 50 T90 50" />
            <circle cx="25" cy="25" r="8" strokeDasharray="3 2" />
            <circle cx="75" cy="25" r="8" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>
        
        {/* 左下角装饰 - 草原元素 */}
        <div className="absolute bottom-20 left-4 size-16 text-secondary-foreground/10 md:left-8 md:size-24">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 50 Q16 40 32 45 T60 48" />
            <path d="M8 56 Q24 48 32 52 T56 54" />
            <path d="M32 50 L32 20" />
            <path d="M32 35 Q24 28 28 22" />
            <path d="M32 35 Q40 28 36 22" />
            <path d="M32 25 Q26 18 30 12" />
            <path d="M32 25 Q38 18 34 12" />
          </svg>
        </div>
        
        {/* 右下角装饰 - 太阳元素 */}
        <div className="absolute bottom-20 right-4 size-16 text-amber-400/10 md:right-8 md:size-24">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="32" cy="32" r="12" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1={32 + Math.cos((angle * Math.PI) / 180) * 18}
                y1={32 + Math.sin((angle * Math.PI) / 180) * 18}
                x2={32 + Math.cos((angle * Math.PI) / 180) * 26}
                y2={32 + Math.sin((angle * Math.PI) / 180) * 26}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* 内容 */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* 装饰小元素 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-3 text-white/50"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
            <Sparkles className="size-4" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/40" />
          </motion.div>

          {/* 标签 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-medium text-white backdrop-blur-md ring-1 ring-white/40 shadow-lg"
          >
            <MapPin className="size-4" />
            <span>新疆 · 伊犁环线</span>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0_0_0_0.5)] md:text-6xl lg:text-7xl"
          >
            新疆7天自驾游攻略
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/95 drop-shadow-[0_1px_4px_rgba(0_0_0_0.4)] md:text-xl"
          >
            {overview.routeDescription}
          </motion.p>

          {/* 核心数据卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          >
            {[
              { icon: Route, label: '总里程', value: overview.totalMileage, color: 'text-primary' },
              { icon: Calendar, label: '行程天数', value: overview.totalDays, color: 'text-secondary-foreground' },
              { icon: MapPin, label: '最佳季节', value: overview.bestSeason, color: 'text-amber-500' },
              { icon: Car, label: '建议车型', value: overview.recommendedCar, color: 'text-emerald-500' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                className="group rounded-2xl bg-white/90 p-5 backdrop-blur-xl ring-1 ring-white/60 shadow-xl transition-all hover:shadow-2xl hover:ring-primary/30"
              >
                <div className={`mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 ${item.color} transition-transform group-hover:scale-110`}>
                  <item.icon className="size-6" />
                </div>
                <div className="text-xs font-medium text-muted-foreground md:text-sm">{item.label}</div>
                <div className="mt-1 text-base font-bold text-foreground md:text-lg">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 底部波浪装饰 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-full text-background md:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
