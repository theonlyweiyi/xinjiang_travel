// EXPORTS: ITravelGuide, ITravelDay, ITravelSpot, ITravelTip, MOCK_TRAVEL_GUIDE
export interface ITravelSpot {
  id: string
  name: string
  description: string
}

export interface ITravelTip {
  id: string
  title: string
  content: string
  icon: 'calendar' | 'car' | 'fuel' | 'clothes' | 'sun' | 'wifi' | 'hotel' | 'food'
}

export interface ITravelDay {
  id: string
  day: number
  title: string
  route: string
  mileage: string
  duration: string
  spots: ITravelSpot[]
  accommodation: string
  food: string
  tips?: string
  ticketInfo?: string
}

export interface ITravelGuide {
  id: string
  title: string
  subtitle: string
  overview: {
    totalMileage: string
    totalDays: string
    bestSeason: string
    recommendedCar: string
    routeDescription: string
    routeStops: string[]
  }
  days: ITravelDay[]
  tips: ITravelTip[]
}

export const MOCK_TRAVEL_GUIDE: ITravelGuide = {
  id: '1',
  title: '新疆7天自驾游攻略',
  subtitle: '乌鲁木齐 · S101 · 赛里木湖 · 唐布拉 · 独库 环线',
  overview: {
    totalMileage: '约1800公里',
    totalDays: '7天6晚',
    bestSeason: '6月中旬-9月中旬',
    recommendedCar: 'SUV优先',
    routeDescription: '乌鲁木齐 → S101国防公路 → 赛里木湖 → 伊宁 → 唐布拉百里画廊 → 孟克特古道 → 独库公路 → 乌鲁木齐',
    routeStops: ['乌鲁木齐', 'S101', '赛里木湖', '伊宁', '唐布拉', '孟克特', '独库', '乌鲁木齐']
  },
  days: [
    {
      id: 'd1',
      day: 1,
      title: '乌鲁木齐 → S101国防公路 → 独山子',
      route: '乌鲁木齐出发 → 西山农牧场进入S101 → 硫磺沟 → 百里丹霞 → 肯斯瓦特水库 → 鹿角湾 → 安集海大峡谷 → 独山子',
      mileage: '约320km',
      duration: '行车+游玩约9小时',
      spots: [
        { id: 's1-1', name: '硫磺沟', description: '七彩丹霞地貌，红色层叠山体' },
        { id: 's1-2', name: '百里丹霞观景台', description: 'S101标志性景观，如千里江山图' },
        { id: 's1-3', name: '肯斯瓦特水库', description: '蒂芙尼蓝湖面，丹霞环绕' },
        { id: 's1-4', name: '鹿角湾', description: '雪山下的草原牧场' },
        { id: 's1-5', name: '安集海大峡谷', description: '红黑相间的震撼峡谷' }
      ],
      accommodation: '独山子区酒店',
      food: '架子肉、新疆大盘鸡'
    },
    {
      id: 'd2',
      day: 2,
      title: '独山子 → 赛里木湖',
      route: '独山子 → 连霍高速 → 赛里木湖',
      mileage: '约310km',
      duration: '行车约4.5小时',
      spots: [
        { id: 's2-1', name: '赛里木湖环湖自驾', description: '约90km环湖公路，大西洋最后一滴眼泪' },
        { id: 's2-2', name: '果子沟大桥远景', description: '雄伟的斜拉桥' },
        { id: 's2-3', name: '克勒涌珠', description: '湖边草原，天鹅栖息地' },
        { id: 's2-4', name: '松树头', description: '登高俯瞰赛湖全景' }
      ],
      accommodation: '赛里木湖景区内房车/毡房，或清水河镇酒店',
      food: '景区内餐饮或自备',
      tips: '建议下午入园，光线适合拍照',
      ticketInfo: '145元/人（自驾车可进入）'
    },
    {
      id: 'd3',
      day: 3,
      title: '赛里木湖 → 果子沟 → 伊宁',
      route: '赛里木湖日出 → 果子沟大桥观景台 → 伊宁市',
      mileage: '约150km',
      duration: '行车约2.5小时',
      spots: [
        { id: 's3-1', name: '赛里木湖日出', description: '湖面晨雾，金光照雪山' },
        { id: 's3-2', name: '果子沟大桥', description: '伊犁第一景，工程奇迹' },
        { id: 's3-3', name: '喀赞其民俗村', description: '蓝色小镇，维吾尔族风情' },
        { id: 's3-4', name: '六星街', description: '八卦形街区，手风琴博物馆' }
      ],
      accommodation: '伊宁市',
      food: '手抓饭、烤包子、古兰丹姆冰淇淋、格瓦斯'
    },
    {
      id: 'd4',
      day: 4,
      title: '伊宁 → 唐布拉百里画廊',
      route: '伊宁 → 尼勒克县 → 唐布拉草原',
      mileage: '约250km',
      duration: '行车约4.5小时',
      spots: [
        { id: 's4-1', name: '唐布拉百里画廊', description: '免费的原生态草原，比那拉提人少' },
        { id: 's4-2', name: '喀什河', description: '雪山融水蜿蜒流淌' },
        { id: 's4-3', name: '原始云杉林', description: '天山北坡森林景观' },
        { id: 's4-4', name: '哈萨克毡房', description: '体验游牧生活' }
      ],
      accommodation: '唐布拉草原毡房或蜜蜂小镇民宿',
      food: '哈萨克族奶茶、手抓肉',
      tips: '唐布拉全程免费，沿途都是观景台'
    },
    {
      id: 'd5',
      day: 5,
      title: '孟克特古道深度游',
      route: '独库公路625km处（乔尔玛附近）拐入S315',
      mileage: '往返约42km',
      duration: '全天6-8小时',
      spots: [
        { id: 's5-1', name: '河谷溪流段', description: '前6km柏油路，野花遍地' },
        { id: 's5-2', name: '原始森林', description: '云杉、松树参天' },
        { id: 's5-3', name: '双子树独木桥', description: '网红打卡点' },
        { id: 's5-4', name: '野温泉', description: '冰川融水温泉，可泡脚' },
        { id: 's5-5', name: '冰川石林', description: '古道深处的冰川遗迹' }
      ],
      accommodation: '返回唐布拉/蜜蜂小镇',
      food: '自备干粮',
      tips: '全程无手机信号，带足干粮和水；昼夜温差15℃以上，带厚外套',
      ticketInfo: '免费，自驾车200元/车（限5人），区间车30元/人'
    },
    {
      id: 'd6',
      day: 6,
      title: '唐布拉 → 乔尔玛 → 独库公路北段 → 独山子',
      route: '唐布拉 → S315 → 乔尔玛 → 独库公路北段 → 独山子',
      mileage: '约250km',
      duration: '行车+游玩约6小时',
      spots: [
        { id: 's6-1', name: '乔尔玛烈士陵园', description: '纪念筑路英雄' },
        { id: 's6-2', name: '哈希勒根达坂', description: '海拔3400米，防雪长廊' },
        { id: 's6-3', name: '天瀑', description: '公路旁的高山瀑布' },
        { id: 's6-4', name: '独山子大峡谷', description: '独库起点的震撼峡谷' }
      ],
      accommodation: '独山子区',
      food: '新疆拌面、烤串',
      tips: '独库公路仅限7座以下车辆通行，弯道多注意安全'
    },
    {
      id: 'd7',
      day: 7,
      title: '独山子 → 乌鲁木齐',
      route: '独山子 → 连霍高速 → 乌鲁木齐',
      mileage: '约250km',
      duration: '行车约3小时',
      spots: [
        { id: 's7-1', name: '沙湾大盘鸡', description: '推荐停留沙湾市吃正宗大盘鸡' }
      ],
      accommodation: '——',
      food: '沙湾大盘鸡',
      tips: '结束愉快的新疆自驾之旅'
    }
  ],
  tips: [
    { id: 't1', title: '出行时间', content: '独库公路每年6-9月通车，7-8月风景最佳但人多', icon: 'calendar' },
    { id: 't2', title: '车辆建议', content: 'SUV通过性更好，S101和孟克特碎石路更从容', icon: 'car' },
    { id: 't3', title: '加油攻略', content: '县城必加满，独库上只有乔尔玛一个加油站', icon: 'fuel' },
    { id: 't4', title: '衣物准备', content: '昼夜温差大，夏天也要带冲锋衣/薄羽绒服', icon: 'clothes' },
    { id: 't5', title: '防晒必备', content: '紫外线极强，防晒霜SPF50+、墨镜、帽子', icon: 'sun' },
    { id: 't6', title: '通讯问题', content: '山区多路段无信号，提前下载离线地图', icon: 'wifi' },
    { id: 't7', title: '住宿预订', content: '旺季（7-8月）务必提前预订，赛里木湖和唐布拉很紧张', icon: 'hotel' },
    { id: 't8', title: '饮食提示', content: '新疆分量大，点菜适量；多吃水果补充水分', icon: 'food' }
  ]
}