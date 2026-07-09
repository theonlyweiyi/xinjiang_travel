import { motion } from 'framer-motion';
import {
  Calendar,
  Car,
  Fuel,
  Shirt,
  Sun,
  Wifi,
  Hotel,
  Utensils,
} from 'lucide-react';
import { MOCK_TRAVEL_GUIDE, type ITravelTip } from '@/data/travelguide';

const iconMap: Record<ITravelTip['icon'], typeof Calendar> = {
  calendar: Calendar,
  car: Car,
  fuel: Fuel,
  clothes: Shirt,
  sun: Sun,
  wifi: Wifi,
  hotel: Hotel,
  food: Utensils,
};

export default function TipsSection() {
  const { tips } = MOCK_TRAVEL_GUIDE;

  return (
    <section id="tips" className="relative w-full overflow-hidden py-16 md:py-24">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute right-10 top-10 size-60 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-10 left-10 size-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Quick Tips
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            实用贴士速览
          </h2>
          {/* 民族风装饰 */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-primary/30" />
            <div className="size-2 rotate-45 bg-primary/40" />
            <div className="size-3 rounded-full bg-primary/50" />
            <div className="size-2 rotate-45 bg-primary/40" />
            <div className="h-px w-8 bg-primary/30" />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            8 条最关键的出行提醒，快速掌握新疆旅行要点
          </p>
        </motion.div>

        {/* 贴士卡片网格 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip, i) => {
            const Icon = iconMap[tip.icon];
            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border/50 shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* 背景装饰 */}
                <div className="absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 transition-transform duration-500 group-hover:scale-150" />

                {/* 图标 */}
                <div className="relative mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-md">
                  <Icon className="size-6" />
                </div>

                {/* 内容 */}
                <div className="relative">
                  <h3 className="text-base font-semibold text-foreground">
                    {tip.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tip.content}
                  </p>
                </div>

                {/* 序号 */}
                <div className="absolute bottom-4 right-4 text-3xl font-bold text-muted-foreground/10 transition-colors group-hover:text-primary/20">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
