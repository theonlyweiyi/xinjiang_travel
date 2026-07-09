import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MapPin,
  Clock,
  Car,
  Hotel,
  Utensils,
  Lightbulb,
  Ticket,
} from 'lucide-react';
import { MOCK_TRAVEL_GUIDE, type ITravelDay } from '@/data/travelguide';
import { Image } from '@/components/ui/image';

// 景点图片映射 - AI生成
const SPOT_IMAGES: Record<string, string> = {
  // Day 1 - S101
  's1-1': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆硫磺沟七彩丹霞地貌红色层叠山体风光摄影&image_size=landscape_4_3', // 硫磺沟
  's1-2': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆S101百里丹霞观景台千里江山图式丹霞地貌&image_size=landscape_4_3', // 百里丹霞
  's1-3': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆肯斯瓦特水库蒂芙尼蓝湖面丹霞环绕风光&image_size=landscape_4_3', // 肯斯瓦特水库
  's1-4': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆鹿角湾草原牧场雪山风光摄影&image_size=landscape_4_3', // 鹿角湾
  's1-5': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆安集海大峡谷红黑相间震撼峡谷地貌风光&image_size=landscape_4_3', // 安集海大峡谷
  // Day 2 - 赛里木湖
  's2-1': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆赛里木湖环湖公路大西洋最后一滴眼泪蓝湖雪山&image_size=landscape_4_3', // 赛里木湖环湖
  's2-2': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆果子沟大桥远景雄伟斜拉桥自然风光&image_size=landscape_4_3', // 果子沟大桥远景
  's2-3': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆赛里木湖克勒涌珠湖边草原天鹅栖息地&image_size=landscape_4_3', // 克勒涌珠
  's2-4': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆赛里木湖松树头俯瞰全景蓝天白云&image_size=landscape_4_3', // 松树头
  // Day 3 - 伊宁
  's3-1': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆赛里木湖日出晨雾金光照雪山湖面&image_size=landscape_4_3', // 赛里木湖日出
  's3-2': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆果子沟大桥伊犁第一景工程奇迹风光摄影&image_size=landscape_4_3', // 果子沟大桥
  's3-3': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆伊宁喀赞其民俗村蓝色小镇维吾尔族风情&image_size=landscape_4_3', // 喀赞其
  's3-4': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆伊宁六星街八卦形街区手风琴博物馆&image_size=landscape_4_3', // 六星街
  // Day 4 - 唐布拉
  's4-1': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆唐布拉百里画廊原生态草原花海风光&image_size=landscape_4_3', // 唐布拉百里画廊
  's4-2': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆唐布拉喀什河雪山融水蜿蜒流淌草原河流&image_size=landscape_4_3', // 喀什河
  's4-3': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆天山北坡原始云杉林森林景观&image_size=landscape_4_3', // 原始云杉林
  's4-4': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆唐布拉哈萨克毡房游牧生活草原景观&image_size=landscape_4_3', // 哈萨克毡房
  // Day 5 - 孟克特
  's5-1': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆孟克特古道河谷溪流野花遍地自然风光&image_size=landscape_4_3', // 河谷溪流
  's5-2': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆孟克特古道原始森林云杉松树参天&image_size=landscape_4_3', // 原始森林
  's5-3': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆孟克特古道双子树独木桥网红打卡点&image_size=landscape_4_3', // 双子树独木桥
  's5-4': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆孟克特古道野温泉冰川融水温泉自然景观&image_size=landscape_4_3', // 野温泉
  's5-5': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆孟克特古道冰川石林遗迹自然景观&image_size=landscape_4_3', // 冰川石林
  // Day 6 - 独库
  's6-1': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆乔尔玛烈士陵园纪念筑路英雄纪念碑&image_size=landscape_4_3', // 乔尔玛烈士陵园
  's6-2': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆独库公路哈希勒根达坂海拔3400米防雪长廊&image_size=landscape_4_3', // 哈希勒根达坂
  's6-3': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆独库公路天瀑高山瀑布公路旁风景&image_size=landscape_4_3', // 天瀑
  's6-4': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆独山子大峡谷独库起点震撼峡谷地貌&image_size=landscape_4_3', // 独山子大峡谷
  // Day 7
  's7-1': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=新疆沙湾大盘鸡美食摄影特色菜肴&image_size=landscape_4_3', // 沙湾大盘鸡
};

function DayCard({ day, isOpen, onToggle }: { day: ITravelDay; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-2xl bg-card ring-1 ring-border/50 shadow-sm"
    >
      {/* 头部 - 可点击展开 */}
      <motion.button
        layout
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/30 md:p-6"
      >
        {/* Day 编号圆 */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground shadow-md md:size-14 md:text-base">
          D{day.day}
        </div>

        {/* 标题信息 */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-foreground md:text-lg">
            {day.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground md:text-sm">
            <span className="inline-flex items-center gap-1">
              <Car className="size-3.5" />
              {day.mileage}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {day.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {day.spots.length} 个景点
            </span>
          </div>
        </div>

        {/* 展开箭头 */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.button>

      {/* 展开内容 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.div layout className="border-t border-border/50 px-5 pb-6 pt-4 md:px-6">
              {/* 路线描述 */}
              <div className="mb-5 rounded-xl bg-muted/30 p-4">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  今日路线
                </div>
                <p className="text-sm leading-relaxed text-foreground md:text-base">
                  {day.route}
                </p>
              </div>

              {/* 核心景点 */}
              <div className="mb-5">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground md:text-base">
                  <MapPin className="size-4 text-primary" />
                  核心景点
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {day.spots.map((spot, i) => {
                    const imgUrl = SPOT_IMAGES[spot.id];
                    return (
                      <motion.div
                        key={spot.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="group overflow-hidden rounded-xl border border-border/60 bg-background transition-all hover:border-primary/30 hover:shadow-md"
                      >
                        {imgUrl ? (
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-auto sm:w-28">
                              <Image
                                src={imgUrl}
                                alt={spot.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute left-2 top-2 flex size-5 items-center justify-center rounded-full bg-black/40 text-[10px] font-bold text-white backdrop-blur-sm">
                                {i + 1}
                              </div>
                            </div>
                            <div className="flex-1 p-3">
                              <div className="text-sm font-medium text-foreground">{spot.name}</div>
                              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                {spot.description}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                {i + 1}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-foreground">{spot.name}</div>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                                  {spot.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* 底部信息网格 */}
              <div className="grid gap-3 sm:grid-cols-2">
                {/* 住宿 */}
                <div className="rounded-xl bg-secondary/20 p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-secondary-foreground">
                    <Hotel className="size-4" />
                    住宿推荐
                  </div>
                  <p className="text-sm text-foreground">{day.accommodation}</p>
                </div>

                {/* 美食 */}
                <div className="rounded-xl bg-primary/10 p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-primary">
                    <Utensils className="size-4" />
                    美食推荐
                  </div>
                  <p className="text-sm text-foreground">{day.food}</p>
                </div>

                {/* 门票 */}
                {day.ticketInfo && (
                  <div className="rounded-xl bg-warning/10 p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-warning">
                      <Ticket className="size-4" />
                      门票信息
                    </div>
                    <p className="text-sm text-foreground">{day.ticketInfo}</p>
                  </div>
                )}

                {/* 贴士 */}
                {day.tips && (
                  <div className="rounded-xl bg-accent/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-accent-foreground">
                      <Lightbulb className="size-4" />
                      今日贴士
                    </div>
                    <p className="text-sm text-foreground">{day.tips}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ItinerarySection() {
  const { days } = MOCK_TRAVEL_GUIDE;
  const [openDay, setOpenDay] = useState<string | null>('d1'); // 默认展开第一天

  const toggleDay = (dayId: string) => {
    setOpenDay(openDay === dayId ? null : dayId);
  };

  return (
    <section id="itinerary" className="relative w-full overflow-hidden py-16 md:py-24">
      {/* 背景装饰 - 草原绿渐变 + 丹霞橙点缀 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div className="absolute left-0 top-1/4 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-3/4 size-80 rounded-full bg-warning/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Day by Day
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            每日详细行程
          </h2>
          {/* 民族风装饰 */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-primary/40" />
            <svg viewBox="0 0 32 16" className="h-4 w-8 text-primary/50" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 8 Q 4 2 8 8 T 16 8 T 24 8 T 32 8" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-primary/30 to-primary/40" />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            点击每一天展开查看详细路线、景点、住宿与美食推荐
          </p>
        </motion.div>

        {/* 时间轴容器 */}
        <div className="relative">
          {/* 时间轴线 */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 md:left-7" />

          {/* 每日卡片列表 */}
          <div className="space-y-6">
            {days.map((day, i) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative pl-16 md:pl-20"
              >
                {/* 时间轴节点 */}
                <div className="absolute left-4 top-6 z-10 flex size-5 items-center justify-center rounded-full bg-primary ring-4 ring-background md:left-5 md:size-6">
                  <div className="size-2 rounded-full bg-primary-foreground" />
                </div>

                <DayCard
                  day={day}
                  isOpen={openDay === day.id}
                  onToggle={() => toggleDay(day.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 全部展开/收起按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => setOpenDay(openDay ? null : 'd1')}
            className="inline-flex items-center gap-2 rounded-full bg-muted px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
          >
            {openDay ? '收起全部' : '展开第一天'}
            <ChevronDown className={`size-4 transition-transform ${openDay ? 'rotate-180' : ''}`} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
