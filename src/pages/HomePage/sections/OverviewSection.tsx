import { motion } from 'framer-motion';
import { MOCK_TRAVEL_GUIDE } from '@/data/travelguide';
import RouteMapSection from './RouteMapSection';

export default function OverviewSection() {
  const { overview } = MOCK_TRAVEL_GUIDE;

  // 路线站点坐标（SVG 示意图，相对位置）
  const stops = overview.routeStops;
  // 生成路线点的坐标（环形布局）
  const routePoints = [
    { x: 50, y: 180, name: stops[0] },   // 乌鲁木齐 - 左
    { x: 150, y: 120, name: stops[1] },  // S101 - 左上
    { x: 280, y: 80, name: stops[2] },   // 赛里木湖 - 上左
    { x: 420, y: 100, name: stops[3] },  // 伊宁 - 上中
    { x: 560, y: 140, name: stops[4] },  // 唐布拉 - 上右
    { x: 650, y: 220, name: stops[5] },  // 孟克特 - 右中
    { x: 600, y: 320, name: stops[6] },  // 独库 - 右下
    { x: 150, y: 300, name: stops[7] },  // 乌鲁木齐 - 左下
  ];

  // 生成曲线路径
  const generatePath = () => {
    let d = `M ${routePoints[0].x} ${routePoints[0].y}`;
    for (let i = 1; i < routePoints.length; i++) {
      const prev = routePoints[i - 1];
      const curr = routePoints[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` Q ${prev.x + (curr.x - prev.x) * 0.5} ${prev.y + (curr.y - prev.y) * 0.3}, ${cpx} ${(prev.y + curr.y) / 2}`;
      d += ` T ${curr.x} ${curr.y}`;
    }
    return d;
  };

  return (
    <section id="overview" className="relative w-full overflow-hidden py-16 md:py-24">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-10 size-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 top-40 size-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 size-80 -translate-x-1/2 rounded-full bg-warning/5 blur-3xl" />
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
            Trip Overview
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            行程概览
          </h2>
          {/* 民族风装饰线 */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
            <svg viewBox="0 0 24 24" className="size-5 text-primary/60" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            一条环线，看遍新疆最精华的丹霞、湖泊、草原、森林与峡谷
          </p>
        </motion.div>

        {/* 交互式路线地图 */}
        <RouteMapSection />

        {/* 路线文字描述 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center text-sm text-muted-foreground md:text-base"
        >
          <span className="font-medium text-foreground">路线环线：</span>
          {overview.routeDescription}
        </motion.div>

        {/* 亮点标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            '丹霞地貌', '高山湖泊', '草原花海', '原始森林',
            '古道探险', '峡谷奇观', '公路旅行', '民族风情',
          ].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="rounded-full bg-secondary/50 px-4 py-1.5 text-sm font-medium text-secondary-foreground ring-1 ring-secondary-foreground/10"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
