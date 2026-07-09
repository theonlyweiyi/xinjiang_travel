import { motion } from 'framer-motion';
import {
  Fuel,
  CalendarDays,
  Backpack,
  Wallet,
  MapPin,
  AlertTriangle,
  Sun,
  Moon,
  Car,
  Shirt,
  Sun as SunIcon,
  Pill,
  Wrench,
  Hotel,
  Ticket,
  Utensils,
  TrendingUp,
  Star,
  IdCard,
  Thermometer,
  Sparkles,
  ChevronRight,
  Droplets,
  Mountain,
  Leaf,
  Flame,
  Route,
} from 'lucide-react';

// ========== 一、沿途加油指南 ==========
const fuelSections = [
  {
    title: 'S101沿线',
    icon: Mountain,
    color: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    stops: [
      { name: '西山农牧场加油站', desc: '硫磺沟入口附近，出发前加满', important: true },
      { name: '塔西河加油站', desc: '康家石门子附近，小型油站', important: false },
      { name: '沙湾县加油站', desc: '鹿角湾附近，建议补油', important: false },
      { name: '独山子加油站', desc: '终点，多个大型加油站', important: true },
    ],
  },
  {
    title: '赛里木湖-伊宁线',
    icon: Droplets,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    stops: [
      { name: '精河县服务区', desc: '连霍高速必加', important: true },
      { name: '霍城县加油站', desc: '充足加油站', important: false },
      { name: '清水河镇加油站', desc: '赛里木湖附近', important: false },
      { name: '伊宁市加油站', desc: '加油站密集', important: false },
    ],
  },
  {
    title: '独库公路沿线',
    icon: Route,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
    stops: [
      { name: '独山子', desc: '出发前加满（独库起点）', important: true },
      { name: '乔尔玛', desc: '独库上唯一加油站，关键补给', important: true },
      { name: '那拉提镇', desc: '加油站', important: false },
      { name: '库车', desc: '终点多个加油站', important: false },
    ],
  },
  {
    title: '唐布拉-孟克特',
    icon: Leaf,
    color: 'from-green-500/20 to-lime-500/20',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-500/10',
    stops: [
      { name: '尼勒克县城', desc: '进入唐布拉前加满', important: true },
      { name: '蜜蜂小镇', desc: '小型私人加油站，油品有限', important: false },
      { name: '乔尔玛', desc: '返回独库时加油', important: true },
    ],
  },
];

const fuelTips = [
  '见到县城就加满，不要等油表亮灯',
  '独库公路只有乔尔玛一个加油站，务必加满',
  '部分偏远地区只收现金，备少量现金',
  '建议92号及以上汽油',
];

// ========== 二、最佳季节详解 ==========
const seasons = [
  {
    period: '5月下旬-6月上旬',
    tag: '初开季',
    tagColor: 'bg-green-500',
    gradient: 'from-green-400/25 to-emerald-400/15',
    temp: '5-20℃',
    pros: ['野花盛开', '人少价低', '独库刚开通'],
    cons: ['山区可能有残雪', '部分草还没绿'],
    recommended: false,
  },
  {
    period: '6月中旬-7月上旬',
    tag: '推荐',
    tagColor: 'bg-emerald-500',
    gradient: 'from-emerald-400/35 to-teal-400/25',
    temp: '10-28℃',
    pros: ['草原全绿', '野花盛放', '游客相对不多'],
    cons: ['价格开始上涨'],
    recommended: true,
  },
  {
    period: '7月中旬-8月中旬',
    tag: '旺季',
    tagColor: 'bg-blue-500',
    gradient: 'from-blue-400/35 to-cyan-400/25',
    temp: '15-32℃',
    pros: ['景色最佳', '天气最稳定', '所有景点全开'],
    cons: ['人最多', '价格最贵', '独库可能堵车'],
    recommended: false,
  },
  {
    period: '8月下旬-9月中旬',
    tag: '推荐',
    tagColor: 'bg-amber-500',
    gradient: 'from-amber-400/35 to-orange-400/25',
    temp: '5-25℃',
    pros: ['游客减少', '价格回落', '秋景开始出现'],
    cons: ['独库可能因雪关闭', '昼夜温差极大'],
    recommended: true,
  },
  {
    period: '9月下旬-10月上旬',
    tag: '金秋',
    tagColor: 'bg-orange-500',
    gradient: 'from-orange-400/35 to-red-400/20',
    temp: '0-15℃',
    pros: ['金秋景色绝美', '人极少'],
    cons: ['独库大概率关闭', '天气转冷，需冬装'],
    recommended: false,
  },
];

// ========== 三、装备清单 ==========
const gearCategories = [
  {
    title: '证件类',
    icon: IdCard,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    items: [
      '身份证（必带，检查站多次查验）',
      '驾驶证、行驶证',
      '车辆保险单',
      '少量现金（部分偏远地区）',
    ],
  },
  {
    title: '衣物类',
    icon: Shirt,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    items: [
      '短袖T恤 3-4件',
      '长袖薄外套 2件',
      '厚冲锋衣/薄羽绒服 1件（必带！山区随时下雪）',
      '长裤 2-3条（防蚊防晒）',
      '舒适运动鞋/徒步鞋',
      '拖鞋（毡房用）',
      '内衣袜子若干',
      '帽子（防晒+保暖各一）',
    ],
  },
  {
    title: '防晒护肤',
    icon: SunIcon,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    items: [
      '防晒霜 SPF50+ PA++++（新疆紫外线极强）',
      '墨镜（必带，雪地也防雪盲）',
      '润唇膏（干燥）',
      '保湿面霜',
      '补水面膜',
    ],
  },
  {
    title: '药品类',
    icon: Pill,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    items: [
      '感冒药、肠胃药',
      '晕车药（盘山路多）',
      '创可贴、碘伏',
      '驱蚊液（草原蚊虫多）',
      '高原安（预防高反，最高3400米）',
      '个人常用药',
    ],
  },
  {
    title: '车辆装备',
    icon: Wrench,
    color: 'text-slate-600',
    bgColor: 'bg-slate-500/10',
    items: [
      '备胎、千斤顶、扳手',
      '车载充气泵',
      '拖车绳',
      '防滑链（春秋季独库必备）',
      '车载手机支架',
      '车载充电器/充电宝',
    ],
  },
  {
    title: '其他物品',
    icon: Sparkles,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    items: [
      '保温杯（喝热水很重要）',
      '雨伞/雨衣',
      '垃圾袋（环保）',
      '离线地图（提前下载）',
      '无人机（大部分景区可飞，注意禁飞区）',
    ],
  },
];

// ========== 四、费用参考 ==========
const costCategories = [
  {
    title: '交通费用',
    icon: Car,
    color: 'text-blue-500',
    items: [
      { label: '租车（SUV）', value: '700-1050元', note: '400-600元/天，4人平摊' },
      { label: '油费', value: '约360元', note: '1800km，SUV约0.8元/km' },
      { label: '过路费', value: '约50元', note: '主要连霍高速' },
      { label: '停车费', value: '约100元', note: '各景区停车' },
    ],
  },
  {
    title: '住宿费用',
    icon: Hotel,
    color: 'text-emerald-500',
    items: [
      { label: '经济型', value: '1200-2400元', note: '200-400元/晚标间' },
      { label: '舒适型', value: '2400-4800元', note: '400-800元/晚' },
      { label: '景区毡房/房车', value: '600-1200元/晚', note: '赛里木湖/唐布拉' },
    ],
  },
  {
    title: '门票费用',
    icon: Ticket,
    color: 'text-amber-500',
    items: [
      { label: '赛里木湖', value: '145元', note: '自驾车可进入' },
      { label: '孟克特古道', value: '约50元', note: '自驾200元/车平摊' },
      { label: '其余景点', value: '免费', note: '独库/唐布拉/安集海等' },
    ],
    total: '约200元/人',
  },
  {
    title: '餐饮费用',
    icon: Utensils,
    color: 'text-rose-500',
    items: [
      { label: '正餐', value: '50-80元/顿', note: '大盘鸡、手抓饭、烤包子' },
      { label: '早餐', value: '15-30元', note: '奶茶、馕、包子' },
      { label: '7天总计', value: '500-800元/人', note: '推荐：架子肉、奶茶、手抓肉' },
    ],
  },
];

const budgetLevels = [
  {
    level: '穷游版',
    desc: '拼车 + 经济型住宿',
    price: '3,000 - 4,000',
    unit: '元/人',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    level: '舒适版',
    desc: 'SUV租车 + 舒适酒店',
    price: '5,000 - 7,000',
    unit: '元/人',
    color: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    level: '豪华版',
    desc: '包车 + 高端住宿',
    price: '8,000 - 12,000',
    unit: '元/人',
    color: 'from-amber-500 to-orange-500',
  },
];

const savingTips = [
  '4人拼车最划算',
  '避开7-8月旺季，6月或9月去便宜30%',
  '县城吃饭比景区便宜很多',
  '提前预订住宿有早鸟价',
];

// 装饰性民族纹样 SVG
function EthnicPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 10 L20 0 L40 10 L60 20 L80 10 L100 0 L120 10 L140 20 L160 10 L180 0 L200 10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M0 10 L20 20 L40 10 L60 0 L80 10 L100 20 L120 10 L140 0 L160 10 L180 20 L200 10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
    </svg>
  );
}

function SectionHeader({ icon: Icon, number, title, subtitle, accent = 'primary' }: {
  icon: typeof Fuel;
  number: string;
  title: string;
  subtitle: string;
  accent?: 'primary' | 'secondary' | 'accent' | 'warning';
}) {
  const accentColors = {
    primary: 'from-primary to-blue-400',
    secondary: 'from-secondary-foreground to-emerald-500',
    accent: 'from-accent-foreground to-green-600',
    warning: 'from-warning to-orange-500',
  };

  return (
    <div className="mb-8 flex flex-col items-center text-center md:mb-10">
      <div className="mb-3 flex items-center gap-3">
        <div className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accentColors[accent]} text-white shadow-lg md:size-14`}>
          <Icon className="size-6 md:size-7" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            第 {number} 部分
          </div>
          <h3 className="text-xl font-bold text-foreground md:text-2xl">{title}</h3>
        </div>
      </div>
      <p className="max-w-xl text-sm text-muted-foreground md:text-base">{subtitle}</p>
      <EthnicPattern className="mt-4 h-5 w-48 text-primary/40" />
    </div>
  );
}

export default function PracticalInfoSection() {
  return (
    <section id="practical-info" className="relative w-full overflow-hidden py-16 md:py-24">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-0 top-20 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 size-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 size-80 rounded-full bg-warning/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* 板块大标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Practical Guide
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            实用信息大全
          </h2>
          <div className="mx-auto mt-4">
            <EthnicPattern className="mx-auto h-6 w-64 text-primary/50" />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            加油、季节、装备、费用 —— 出行前必读的完整指南，让你的新疆之旅从容无忧
          </p>
        </motion.div>

        {/* 一、沿途加油指南 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeader
            icon={Fuel}
            number="一"
            title="沿途加油站点指南"
            subtitle="新疆地广人稀，加油规划是自驾的重中之重，宁可多加不可少加"
            accent="warning"
          />

          {/* 4条路线加油 */}
          <div className="grid gap-5 md:grid-cols-2">
            {fuelSections.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.1, duration: 0.5 }}
                className={`overflow-hidden rounded-2xl bg-gradient-to-br ${section.color} ring-1 ring-border/50 backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3 border-b border-border/30 bg-white/60 px-5 py-4 backdrop-blur">
                  <div className={`flex size-9 items-center justify-center rounded-lg ${section.bgColor}`}>
                    <section.icon className={`size-4.5 ${section.iconColor}`} />
                  </div>
                  <h4 className="font-bold text-foreground">{section.title}</h4>
                </div>
                <div className="space-y-2 p-4">
                  {section.stops.map((stop, i) => (
                    <div
                      key={stop.name}
                      className="flex items-start gap-3 rounded-xl bg-white/70 px-4 py-3 ring-1 ring-white/50 backdrop-blur-sm"
                    >
                      <div
                        className={`mt-0.5 flex size-2.5 shrink-0 items-center justify-center rounded-full ${
                          stop.important ? 'bg-warning ring-4 ring-warning/20' : 'bg-border'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{stop.name}</span>
                          {stop.important && (
                            <span className="shrink-0 rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-bold text-warning-foreground">
                              必加
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{stop.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 加油贴士 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 rounded-2xl border border-warning/30 bg-gradient-to-r from-warning/15 via-warning/5 to-warning/15 p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="size-5 text-warning-foreground" />
              <h4 className="font-bold text-warning-foreground">加油贴士</h4>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {fuelTips.map((tip, i) => (
                <div key={i} className="flex gap-2 text-sm text-foreground/90">
                  <Flame className="mt-0.5 size-4 shrink-0 text-warning" />
                  {tip}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 二、最佳季节详解 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeader
            icon={CalendarDays}
            number="二"
            title="最佳季节详解"
            subtitle="不同季节的新疆有不同的美，选对时间遇见最美的风景"
            accent="primary"
          />

          {/* 季节卡片 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {seasons.map((s, i) => (
              <motion.div
                key={s.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} p-5 ring-1 ring-border/40 backdrop-blur-sm transition-all hover:shadow-xl ${
                  s.recommended ? 'ring-2 ring-primary/50 shadow-lg' : ''
                }`}
              >
                {s.recommended && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-md">
                    <Star className="size-3 fill-current" />
                    推荐
                  </div>
                )}

                <div className="mb-2">
                  <span className={`inline-block rounded-full ${s.tagColor} px-2.5 py-0.5 text-[10px] font-bold text-white`}>
                    {s.tag}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-foreground md:text-base">{s.period}</h4>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Thermometer className="size-3.5" />
                  {s.temp}
                </div>

                <div className="mt-3 space-y-2">
                  <div>
                    <div className="mb-1 text-[11px] font-semibold text-emerald-600">✓ 优势</div>
                    <ul className="space-y-0.5">
                      {s.pros.map((p, j) => (
                        <li key={j} className="flex gap-1.5 text-xs text-foreground/80">
                          <ChevronRight className="mt-0.5 size-3 shrink-0 text-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-semibold text-orange-500">✗ 劣势</div>
                    <ul className="space-y-0.5">
                      {s.cons.map((c, j) => (
                        <li key={j} className="flex gap-1.5 text-xs text-foreground/70">
                          <ChevronRight className="mt-0.5 size-3 shrink-0 text-orange-400" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 三、装备清单 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeader
            icon={Backpack}
            number="三"
            title="装备清单"
            subtitle="收拾行李前对照这份清单，确保万无一失，轻装上阵"
            accent="secondary"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gearCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08, duration: 0.5 }}
                className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border/50 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${cat.bgColor} transition-transform group-hover:scale-110`}>
                    <cat.icon className={`size-5 ${cat.color}`} />
                  </div>
                  <h4 className="font-bold text-foreground">{cat.title}</h4>
                  <span className="ml-auto text-xs font-medium text-muted-foreground">
                    {cat.items.length}项
                  </span>
                </div>
                <ul className="space-y-0 p-2">
                  {cat.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex size-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                      <span className="text-sm text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 四、费用参考 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeader
            icon={Wallet}
            number="四"
            title="费用参考（人均/7天）"
            subtitle="根据不同预算档位，合理规划你的新疆之旅花费"
            accent="accent"
          />

          {/* 费用分类 */}
          <div className="mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {costCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.5 }}
                className="overflow-hidden rounded-2xl bg-card ring-1 ring-border/50 shadow-sm"
              >
                <div className="flex items-center gap-2.5 border-b border-border/50 bg-muted/30 px-4 py-3">
                  <cat.icon className={`size-4.5 ${cat.color}`} />
                  <h4 className="text-sm font-bold text-foreground">{cat.title}</h4>
                </div>
                <div className="space-y-0 p-2">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-2 rounded-lg px-3 py-2.5"
                    >
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <div className="text-right">
                        <div className="text-xs font-bold text-foreground">{item.value}</div>
                        <div className="text-[10px] text-muted-foreground/80">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {cat.total && (
                  <div className="border-t border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3 text-center">
                    <span className="text-[11px] text-muted-foreground">门票总计</span>
                    <div className="text-sm font-bold text-primary">{cat.total}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* 预算总览 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="overflow-hidden rounded-3xl bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 p-6 text-background md:p-8"
          >
            <div className="mb-6 flex items-center justify-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              <h4 className="text-lg font-bold md:text-xl">总预算参考</h4>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {budgetLevels.map((b, i) => (
                <motion.div
                  key={b.level}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all ${
                    b.featured
                      ? 'bg-gradient-to-br from-primary/20 to-secondary/20 ring-2 ring-primary shadow-2xl'
                      : 'bg-white/5 ring-1 ring-white/10'
                  }`}
                >
                  {b.featured && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl bg-primary px-4 py-1 text-[10px] font-bold text-primary-foreground shadow-lg">
                      大多数人选
                    </div>
                  )}
                  <div className={`mx-auto mb-2 bg-gradient-to-r ${b.color} bg-clip-text text-lg font-bold text-transparent ${b.featured ? 'mt-2' : ''}`}>
                    {b.level}
                  </div>
                  <div className="text-xs text-background/60">{b.desc}</div>
                  <div className="mt-3 flex items-baseline justify-center gap-0.5">
                    <span className="text-xs text-background/50">¥</span>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${b.color} bg-clip-text text-transparent md:text-3xl`}>
                      {b.price}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-background/50">{b.unit}</div>
                </motion.div>
              ))}
            </div>

            {/* 省钱 Tips */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-warning" />
                <h5 className="text-sm font-bold">省钱小技巧</h5>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {savingTips.map((tip, i) => (
                  <div key={i} className="flex gap-2 text-xs text-background/80">
                    <span className="text-warning">✦</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
