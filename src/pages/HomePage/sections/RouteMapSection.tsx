import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, ZoomIn, ZoomOut, Move, X } from 'lucide-react';

// ========== 路线站点数据 ==========
interface RouteStop {
  id: string;
  name: string;
  desc: string;
  lng: number; // 经度
  lat: number; // 纬度
  day: string;
  color: string;
  important: boolean;
}

const routeStops: RouteStop[] = [
  {
    id: 'urumqi',
    name: '乌鲁木齐',
    desc: '起点/终点，新疆首府',
    lng: 87.6168, lat: 43.8256,
    day: 'Day 1 / Day 7',
    color: '#0ea5e9',
    important: true,
  },
  {
    id: 'liuhuanggou',
    name: '硫磺沟 S101起点',
    desc: 'S101国防公路入口，七彩丹霞地貌',
    lng: 87.3, lat: 43.7,
    day: 'Day 1',
    color: '#f97316',
    important: false,
  },
  {
    id: 'kensiwate',
    name: '肯斯瓦特水库',
    desc: '蒂芙尼蓝湖面，丹霞环绕',
    lng: 86.3, lat: 43.95,
    day: 'Day 1',
    color: '#06b6d4',
    important: false,
  },
  {
    id: 'lujiaowan',
    name: '鹿角湾',
    desc: '雪山下的草原牧场',
    lng: 85.6, lat: 43.85,
    day: 'Day 1',
    color: '#10b981',
    important: false,
  },
  {
    id: 'anjihai',
    name: '安集海大峡谷',
    desc: '红黑相间的震撼峡谷',
    lng: 85.25, lat: 44.28,
    day: 'Day 1',
    color: '#ef4444',
    important: false,
  },
  {
    id: 'dushanzi',
    name: '独山子',
    desc: 'S101终点，独库公路北起点',
    lng: 84.85, lat: 44.3333,
    day: 'Day 1 / Day 6',
    color: '#0ea5e9',
    important: true,
  },
  {
    id: 'sayram',
    name: '赛里木湖',
    desc: '大西洋最后一滴眼泪',
    lng: 81.2, lat: 44.65,
    day: 'Day 2 / Day 3',
    color: '#0ea5e9',
    important: true,
  },
  {
    id: 'guozigou',
    name: '果子沟大桥',
    desc: '伊犁第一景，工程奇迹',
    lng: 80.95, lat: 44.55,
    day: 'Day 3',
    color: '#8b5cf6',
    important: false,
  },
  {
    id: 'yining',
    name: '伊宁',
    desc: '伊犁州首府，民族风情浓郁',
    lng: 81.3167, lat: 43.9167,
    day: 'Day 3 / Day 4',
    color: '#0ea5e9',
    important: true,
  },
  {
    id: 'nilke',
    name: '尼勒克',
    desc: '进入唐布拉前的补给县城',
    lng: 82.5333, lat: 43.8,
    day: 'Day 4',
    color: '#64748b',
    important: false,
  },
  {
    id: 'tangbula',
    name: '唐布拉百里画廊',
    desc: '免费的原生态草原，比那拉提人少',
    lng: 83.5, lat: 43.85,
    day: 'Day 4 / Day 5 / Day 6',
    color: '#10b981',
    important: true,
  },
  {
    id: 'mengkete',
    name: '孟克特古道入口',
    desc: '独库公路625km处拐入S315',
    lng: 83.9, lat: 43.75,
    day: 'Day 5',
    color: '#f59e0b',
    important: true,
  },
  {
    id: 'qiaoerma',
    name: '乔尔玛',
    desc: '独库公路唯一加油站，筑路英雄纪念地',
    lng: 84.75, lat: 43.55,
    day: 'Day 6',
    color: '#ef4444',
    important: true,
  },
  {
    id: 'hashilegen',
    name: '哈希勒根达坂',
    desc: '海拔3400米，防雪长廊',
    lng: 84.55, lat: 43.6667,
    day: 'Day 6',
    color: '#06b6d4',
    important: false,
  },
];

// ========== 路线分段 ==========
interface RouteSegment {
  day: number;
  color: string;
  name: string;
  points: [number, number][]; // [lng, lat]
}

const routeSegments: RouteSegment[] = [
  {
    day: 1, color: '#f97316', name: 'Day 1: S101丹霞线',
    points: [
      [87.6168, 43.8256], [87.3, 43.7], [86.8, 43.85],
      [86.3, 43.95], [86.0, 43.9], [85.6, 43.85],
      [85.4, 44.1], [85.25, 44.28], [84.85, 44.3333],
    ],
  },
  {
    day: 2, color: '#0ea5e9', name: 'Day 2: 连霍高速',
    points: [
      [84.85, 44.3333], [83.5, 44.5], [82.5, 44.6], [81.2, 44.65],
    ],
  },
  {
    day: 3, color: '#8b5cf6', name: 'Day 3: 果子沟-伊宁',
    points: [
      [81.2, 44.65], [80.95, 44.55], [81.0, 44.2], [81.3167, 43.9167],
    ],
  },
  {
    day: 4, color: '#10b981', name: 'Day 4: 唐布拉草原',
    points: [
      [81.3167, 43.9167], [81.8, 43.85], [82.5333, 43.8],
      [83.0, 43.82], [83.5, 43.85],
    ],
  },
  {
    day: 5, color: '#f59e0b', name: 'Day 5: 孟克特古道',
    points: [
      [83.5, 43.85], [83.7, 43.8], [83.9, 43.75], [84.1, 43.72],
    ],
  },
  {
    day: 6, color: '#ef4444', name: 'Day 6: 独库公路北段',
    points: [
      [83.5, 43.85], [84.2, 43.7], [84.75, 43.55],
      [84.55, 43.6667], [84.7, 44.0], [84.85, 44.3333],
    ],
  },
  {
    day: 7, color: '#06b6d4', name: 'Day 7: 返回乌鲁木齐',
    points: [
      [84.85, 44.3333], [85.5, 44.2], [86.5, 44.1],
      [87.2, 43.95], [87.6168, 43.8256],
    ],
  },
];

// ========== 坐标映射 ==========
// 地图显示范围（经纬度）
const MAP_BOUNDS = {
  minLng: 80.5,
  maxLng: 88.0,
  minLat: 43.2,
  maxLat: 45.0,
};

const SVG_WIDTH = 900;
const SVG_HEIGHT = 560;

// 经纬度转SVG坐标
function lngLatToXY(lng: number, lat: number): [number, number] {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * SVG_WIDTH;
  const y = SVG_HEIGHT - ((lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * SVG_HEIGHT;
  return [x, y];
}

// 生成平滑曲线路径
function generateSmoothPath(points: [number, number][]): string {
  if (points.length < 2) return '';
  const svgPoints = points.map(([lng, lat]) => lngLatToXY(lng, lat));
  let d = `M ${svgPoints[0][0]} ${svgPoints[0][1]}`;
  for (let i = 1; i < svgPoints.length; i++) {
    const prev = svgPoints[i - 1];
    const curr = svgPoints[i];
    const cpx = (prev[0] + curr[0]) / 2;
    d += ` Q ${prev[0] + (curr[0] - prev[0]) * 0.6} ${prev[1] + (curr[1] - prev[1]) * 0.3}, ${cpx} ${(prev[1] + curr[1]) / 2}`;
    d += ` T ${curr[0]} ${curr[1]}`;
  }
  return d;
}

// ========== 装饰性地理元素 ==========
// 天山山脉示意
const mountainRanges = [
  { x: 200, y: 180, w: 300, h: 80, color: 'rgba(100, 116, 139, 0.15)' },
  { x: 500, y: 220, w: 250, h: 60, color: 'rgba(100, 116, 139, 0.12)' },
];

// 赛里木湖示意
const sayramLake = { cx: 120, cy: 120, rx: 55, ry: 38 };

// 沙漠/戈壁区域
const desertAreas = [
  { x: 600, y: 350, w: 200, h: 120, color: 'rgba(251, 191, 36, 0.08)' },
];

export default function RouteMapSection() {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const importantStops = routeStops.filter((s) => s.important);

  // 拖拽处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleZoomIn = () => {
    setScale((s) => Math.min(s * 1.3, 3));
  };

  const handleZoomOut = () => {
    setScale((s) => Math.max(s / 1.3, 0.8));
  };

  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setSelectedStop(null);
    setActiveDay(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12 overflow-hidden rounded-3xl bg-card ring-1 ring-border/50 shadow-lg"
    >
      {/* 地图标题栏 */}
      <div className="flex flex-col gap-3 border-b border-border/50 bg-gradient-to-r from-primary/10 via-secondary/10 to-warning/10 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <MapPin className="size-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">路线地图</h3>
            <p className="text-xs text-muted-foreground">
              点击站点查看详情 · 可拖拽缩放
            </p>
          </div>
        </div>

        {/* 图例 + 控制按钮 */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {routeSegments.map((seg) => (
              <button
                key={seg.day}
                onClick={() => setActiveDay(activeDay === seg.day ? null : seg.day)}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all ${
                  activeDay === seg.day
                    ? 'bg-foreground text-background'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                <span
                  className="inline-block size-2 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                D{seg.day}
              </button>
            ))}
          </div>

          {/* 缩放控制 */}
          <div className="flex items-center gap-1 rounded-full bg-muted/50 p-1">
            <button
              onClick={handleZoomOut}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              aria-label="缩小"
            >
              <ZoomOut className="size-3.5" />
            </button>
            <span className="px-1 text-[10px] font-medium text-muted-foreground tabular-nums">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              aria-label="放大"
            >
              <ZoomIn className="size-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              aria-label="重置"
            >
              <Move className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 地图容器 */}
      <div
        ref={containerRef}
        className={`relative h-[420px] w-full overflow-hidden bg-gradient-to-br from-sky-50 via-emerald-50/60 to-amber-50/40 md:h-[480px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 装饰性网格线 */}
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="absolute inset-0 h-full w-full"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 背景纹理 - 网格 */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100, 116, 139, 0.06)" strokeWidth="1" />
            </pattern>
            {/* 山脉渐变 */}
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.3)" />
              <stop offset="100%" stopColor="rgba(148, 163, 184, 0.05)" />
            </linearGradient>
            {/* 湖泊渐变 */}
            <radialGradient id="lakeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(14, 165, 233, 0.4)" />
              <stop offset="70%" stopColor="rgba(14, 165, 233, 0.2)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0.05)" />
            </radialGradient>
            {/* 路线渐变 */}
            <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>

          {/* 网格背景 */}
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#grid)" />

          {/* 沙漠区域 */}
          {desertAreas.map((area, i) => (
            <ellipse
              key={i}
              cx={area.x + area.w / 2}
              cy={area.y + area.h / 2}
              rx={area.w / 2}
              ry={area.h / 2}
              fill={area.color}
            />
          ))}

          {/* 天山山脉示意 */}
          {mountainRanges.map((m, i) => (
            <g key={i}>
              <path
                d={`M ${m.x} ${m.y + m.h} 
                    Q ${m.x + m.w * 0.2} ${m.y + m.h * 0.3}, ${m.x + m.w * 0.4} ${m.y + m.h * 0.5}
                    T ${m.x + m.w * 0.7} ${m.y + m.h * 0.2}
                    T ${m.x + m.w} ${m.y + m.h * 0.6}
                    L ${m.x + m.w} ${m.y + m.h} Z`}
                fill="url(#mountainGrad)"
              />
              {/* 山峰雪顶 */}
              <path
                d={`M ${m.x + m.w * 0.35} ${m.y + m.h * 0.4}
                    L ${m.x + m.w * 0.4} ${m.y + m.h * 0.2}
                    L ${m.x + m.w * 0.45} ${m.y + m.h * 0.45} Z`}
                fill="rgba(255, 255, 255, 0.6)"
              />
              <path
                d={`M ${m.x + m.w * 0.65} ${m.y + m.h * 0.35}
                    L ${m.x + m.w * 0.7} ${m.y + m.h * 0.1}
                    L ${m.x + m.w * 0.75} ${m.y + m.h * 0.4} Z`}
                fill="rgba(255, 255, 255, 0.5)"
              />
            </g>
          ))}

          {/* 赛里木湖 */}
          <ellipse
            cx={sayramLake.cx}
            cy={sayramLake.cy}
            rx={sayramLake.rx}
            ry={sayramLake.ry}
            fill="url(#lakeGrad)"
            stroke="rgba(14, 165, 233, 0.3)"
            strokeWidth="1"
          />

          {/* 地名标签 - 装饰性 */}
          <text x="120" y="125" textAnchor="middle" className="fill-sky-600/60 text-xs font-semibold">
            赛里木湖
          </text>
          <text x="780" y="200" textAnchor="middle" className="fill-slate-500/50 text-xs">
            乌鲁木齐
          </text>
          <text x="450" y="150" textAnchor="middle" className="fill-slate-400/40 text-[10px]">
            天山山脉
          </text>

          {/* 路线分段 */}
          {routeSegments.map((seg) => (
            <g key={seg.day}>
              {/* 外发光 */}
              <path
                d={generateSmoothPath(seg.points)}
                fill="none"
                stroke={seg.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={activeDay === null || activeDay === seg.day ? 0.15 : 0.05}
              />
              {/* 主路线 */}
              <path
                d={generateSmoothPath(seg.points)}
                fill="none"
                stroke={seg.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 4"
                opacity={activeDay === null || activeDay === seg.day ? 1 : 0.3}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="24"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          ))}

          {/* 站点标记 */}
          {routeStops.map((stop) => {
            const [x, y] = lngLatToXY(stop.lng, stop.lat);
            const size = stop.important ? 14 : 10;
            return (
              <g
                key={stop.id}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStop(stop);
                }}
              >
                {/* 光晕 */}
                {stop.important && (
                  <circle cx={x} cy={y} r={size + 8} fill={stop.color} opacity="0.2">
                    <animate
                      attributeName="r"
                      values={`${size + 6};${size + 12};${size + 6}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0.1;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* 外圈 */}
                <circle
                  cx={x}
                  cy={y}
                  r={size}
                  fill="white"
                  stroke={stop.color}
                  strokeWidth="2.5"
                />
                {/* 内点 */}
                <circle cx={x} cy={y} r={size / 2.5} fill={stop.color} />
                {/* 站点名称 */}
                {stop.important && (
                  <text
                    x={x}
                    y={y - size - 6}
                    textAnchor="middle"
                    className="fill-foreground text-[11px] font-semibold"
                    style={{ paintOrder: 'stroke', stroke: 'white', strokeWidth: 3 }}
                  >
                    {stop.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 信息弹窗 */}
        <AnimatePresence>
          {selectedStop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-1/2 z-20 w-[280px] -translate-x-1/2 rounded-2xl bg-card p-4 shadow-xl ring-1 ring-border/50 md:w-[320px]"
            >
              <button
                onClick={() => setSelectedStop(null)}
                className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="关闭"
              >
                <X className="size-3.5" />
              </button>
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-white shadow-md"
                  style={{ backgroundColor: selectedStop.color }}
                >
                  <MapPin className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-foreground">{selectedStop.name}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{selectedStop.desc}</p>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {selectedStop.day}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 比例尺 */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] text-muted-foreground/70">
          <div className="h-0.5 w-12 bg-foreground/20" />
          <span>~100km</span>
        </div>

        {/* 指北针 */}
        <div className="absolute right-3 top-3 flex flex-col items-center text-[10px] text-muted-foreground/70">
          <div className="size-6">
            <svg viewBox="0 0 24 24" fill="none" className="size-full">
              <path d="M12 2 L14 12 L12 22 L10 12 Z" fill="rgba(239, 68, 68, 0.6)" />
              <path d="M12 2 L10 12 L12 22 L14 12 Z" fill="rgba(100, 116, 139, 0.3)" />
              <circle cx="12" cy="12" r="2" fill="white" stroke="rgba(100, 116, 139, 0.3)" strokeWidth="1" />
            </svg>
          </div>
          <span className="mt-0.5 font-semibold">N</span>
        </div>
      </div>

      {/* 底部信息条 */}
      <div className="border-t border-border/50 bg-muted/20 px-5 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Info className="size-3.5" />
            主要停靠点：
          </span>
          {importantStops.map((stop) => (
            <button
              key={stop.id}
              onClick={() => {
                setSelectedStop(stop);
              }}
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <span
                className="inline-block size-2 rounded-full ring-2 ring-white"
                style={{ backgroundColor: stop.color }}
              />
              {stop.name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
