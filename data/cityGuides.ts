export interface CityEntry {
  name: string;
  role: "Municipality" | "Provincial Capital" | "Second City";
  description: string;
  image: string;
  universities: string[];
}

export interface ProvinceGuide {
  province: string;
  isMunicipality?: boolean;
  cities: CityEntry[];
}

// Curated to the ~23 provinces/municipalities that host the large majority of
// international CSC-scholarship students. Each city's landmark photo is a
// verified, freely-licensed Wikimedia Commons image (checked for a live 200
// response before being added here).
export const provinceCityGuides: ProvinceGuide[] = [
  {
    province: "Beijing",
    isMunicipality: true,
    cities: [
      {
        name: "Beijing",
        role: "Municipality",
        description:
          "China's capital and political heart, where imperial history meets the country's top research institutions.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Tiananmen_Square_%2854137047250%29.jpg",
        universities: ["Tsinghua University", "Peking University", "Renmin University of China"],
      },
    ],
  },
  {
    province: "Shanghai",
    isMunicipality: true,
    cities: [
      {
        name: "Shanghai",
        role: "Municipality",
        description:
          "China's most international city — a global finance and business hub with a fast-paced, cosmopolitan lifestyle.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Bund_2.jpg/3840px-The_Bund_2.jpg",
        universities: ["Fudan University", "Shanghai Jiao Tong University", "Tongji University"],
      },
    ],
  },
  {
    province: "Tianjin",
    isMunicipality: true,
    cities: [
      {
        name: "Tianjin",
        role: "Municipality",
        description:
          "A major port city just outside Beijing, blending colonial-era architecture with modern industry and research.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/%E5%A4%A9%E6%B4%A5%E4%B9%8B%E7%9C%BC%E5%8C%971.jpg",
        universities: ["Nankai University", "Tianjin University"],
      },
    ],
  },
  {
    province: "Chongqing",
    isMunicipality: true,
    cities: [
      {
        name: "Chongqing",
        role: "Municipality",
        description:
          "A dramatic mountain-and-river megacity in the southwest, famous for its skyline, spicy hotpot, and rapid growth.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/64/202308_Hongya_Cave_at_night_from_Qiansimen_Bridge.jpg",
        universities: ["Chongqing University", "Southwest University"],
      },
    ],
  },
  {
    province: "Guangdong",
    cities: [
      {
        name: "Guangzhou",
        role: "Provincial Capital",
        description:
          "A booming southern trade gateway with a 2,000-year commercial history, incredible dim sum, and major industry fairs.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Canton_Tower_20241027_%28cropped%29.jpg",
        universities: ["Sun Yat-sen University", "South China University of Technology"],
      },
      {
        name: "Shenzhen",
        role: "Second City",
        description:
          "China's tech capital — a young, futuristic megacity built in four decades next to Hong Kong.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Pingan_International_Finance_Center2020.jpg",
        universities: ["Shenzhen University", "Southern University of Science and Technology"],
      },
    ],
  },
  {
    province: "Sichuan",
    cities: [
      {
        name: "Chengdu",
        role: "Provincial Capital",
        description:
          "Famous for pandas, spicy hotpot, and a famously relaxed lifestyle — now also a rising tech hub.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/74/%E9%9B%AA%E5%B1%B1%E4%B8%8B%E7%9A%84%E6%88%90%E9%83%BD%E5%B8%82%E5%A4%A9%E9%99%85%E7%BA%BF_Chengdu_skyline_with_snow_capped_mountains.jpg",
        universities: ["Sichuan University", "University of Electronic Science and Technology of China"],
      },
      {
        name: "Mianyang",
        role: "Second City",
        description:
          "Sichuan's science-and-technology city, home to national research institutes and a growing manufacturing base.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Mianyang_montage.jpg",
        universities: ["Southwest University of Science and Technology"],
      },
    ],
  },
  {
    province: "Zhejiang",
    cities: [
      {
        name: "Hangzhou",
        role: "Provincial Capital",
        description:
          "Home to West Lake's ancient scenery and Alibaba's headquarters — where tradition meets e-commerce innovation.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/West_Lake%2C_Hangzhou_2025.jpg/3840px-West_Lake%2C_Hangzhou_2025.jpg",
        universities: ["Zhejiang University"],
      },
      {
        name: "Ningbo",
        role: "Second City",
        description: "A historic port city with a strong manufacturing economy and a growing international student community.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ningbo_City_God_Temple%2C_2021-10-23_06.jpg/3840px-Ningbo_City_God_Temple%2C_2021-10-23_06.jpg",
        universities: ["Ningbo University"],
      },
    ],
  },
  {
    province: "Jiangsu",
    cities: [
      {
        name: "Nanjing",
        role: "Provincial Capital",
        description:
          "A former imperial capital rich in history, now one of China's leading education and research centers.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Sun_Yat-sen_Mausoleum_-_54400198691.jpg",
        universities: ["Nanjing University", "Southeast University"],
      },
      {
        name: "Suzhou",
        role: "Second City",
        description:
          "Known as the \"Venice of the East\" for its canals and classical gardens, and a major industrial and tech park hub.",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/%E4%B8%9C%E6%96%B9%E4%B9%8B%E9%97%A81.jpg",
        universities: ["Soochow University", "Xi'an Jiaotong-Liverpool University"],
      },
    ],
  },
  {
    province: "Hubei",
    cities: [
      {
        name: "Wuhan",
        role: "Provincial Capital",
        description:
          "A tri-city metropolis on the Yangtze River and one of China's largest hubs for higher education.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/CN_-_Hubei_-_Wuhan_-_Kranichpagode.jpg",
        universities: ["Wuhan University", "Huazhong University of Science and Technology"],
      },
      {
        name: "Yichang",
        role: "Second City",
        description: "Gateway to the Three Gorges, with a growing profile in hydropower engineering and research.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/ThreeGorgesDam-China2009.jpg",
        universities: ["China Three Gorges University"],
      },
    ],
  },
  {
    province: "Shaanxi",
    cities: [
      {
        name: "Xi'an",
        role: "Provincial Capital",
        description:
          "Home to the Terracotta Army and the eastern end of the ancient Silk Road, with a strong engineering and aerospace tradition.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/City_wall_of_Xi%27an_51550-Xian_%2827959363326%29.jpg",
        universities: ["Xi'an Jiaotong University", "Northwestern Polytechnical University"],
      },
      {
        name: "Xianyang",
        role: "Second City",
        description: "An ancient former capital just northwest of Xi'an, steeped in Qin- and Han-dynasty history.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Maoling_10.jpg/3840px-Maoling_10.jpg",
        universities: ["Xianyang Normal University"],
      },
    ],
  },
  {
    province: "Liaoning",
    cities: [
      {
        name: "Shenyang",
        role: "Provincial Capital",
        description: "A historic Manchu capital and industrial powerhouse in China's northeast.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/Mukden_Palace_drone_view_5_%28cropped_%26_rotated%29.jpg",
        universities: ["Northeastern University", "Liaoning University"],
      },
      {
        name: "Dalian",
        role: "Second City",
        description: "A coastal city known for its clean streets, seafood, and strong engineering programs.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Xinghai_Square_.jpg/3840px-Xinghai_Square_.jpg",
        universities: ["Dalian University of Technology", "Dalian Maritime University"],
      },
    ],
  },
  {
    province: "Heilongjiang",
    cities: [
      {
        name: "Harbin",
        role: "Provincial Capital",
        description: "China's northernmost major city, famous for Russian-influenced architecture and its Ice Festival.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/West_facade_of_St._Sophia_Cathedral%2C_Harbin_%2820230721150450%29.jpg/3840px-West_facade_of_St._Sophia_Cathedral%2C_Harbin_%2820230721150450%29.jpg",
        universities: ["Harbin Institute of Technology", "Harbin Engineering University"],
      },
      {
        name: "Daqing",
        role: "Second City",
        description: "China's oil-industry city, built around one of the country's largest petroleum fields.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/%E4%B8%89%E6%B0%B8%E6%B9%96%E7%81%AF%E5%A1%942017%E5%A4%8F.jpg/3840px-%E4%B8%89%E6%B0%B8%E6%B9%96%E7%81%AF%E5%A1%942017%E5%A4%8F.jpg",
        universities: ["Northeast Petroleum University"],
      },
    ],
  },
  {
    province: "Fujian",
    cities: [
      {
        name: "Fuzhou",
        role: "Provincial Capital",
        description: "A coastal capital with a long history as a trading port, now home to a growing university district.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fuzhou_Taixi_CBD.jpg",
        universities: ["Fuzhou University", "Fujian Normal University"],
      },
      {
        name: "Xiamen",
        role: "Second City",
        description: "A laid-back island city with beaches, colonial architecture, and one of China's most attractive campuses.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/df/2018%E5%B9%B4%E7%9A%84%E9%BC%93%E6%B5%AA%E5%B1%BF.jpg",
        universities: ["Xiamen University"],
      },
    ],
  },
  {
    province: "Shandong",
    cities: [
      {
        name: "Jinan",
        role: "Provincial Capital",
        description: "Known as the \"City of Springs\" for its natural artesian springs and pleasant, walkable center.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/China_Jinan_5196975.jpg/3840px-China_Jinan_5196975.jpg",
        universities: ["Shandong University"],
      },
      {
        name: "Qingdao",
        role: "Second City",
        description: "A breezy coastal city with German colonial architecture, beaches, and strong marine science programs.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Qingdao_Harbour_51341-Qingdao_%2849055637186%29.jpg",
        universities: ["Ocean University of China", "China University of Petroleum"],
      },
    ],
  },
  {
    province: "Yunnan",
    cities: [
      {
        name: "Kunming",
        role: "Provincial Capital",
        description: "The \"City of Eternal Spring\" — a mild-climate gateway to Southeast Asia and Yunnan's ethnic diversity.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Shilin%2C_Yunnan_24740.jpg",
        universities: ["Yunnan University", "Kunming University of Science and Technology"],
      },
      {
        name: "Dali",
        role: "Second City",
        description: "A scenic lakeside town beloved for its old town, mountains, and relaxed pace of life.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Erhai_lake%2C_Yunnan%2C_China.jpg",
        universities: ["Dali University"],
      },
    ],
  },
  {
    province: "Hunan",
    cities: [
      {
        name: "Changsha",
        role: "Provincial Capital",
        description: "A vibrant, youthful capital known for its nightlife, media industry, and fiery cuisine.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Orange_Isle%2C_Changsha_8.jpg/3840px-Orange_Isle%2C_Changsha_8.jpg",
        universities: ["Hunan University", "Central South University"],
      },
      {
        name: "Zhuzhou",
        role: "Second City",
        description: "An industrial city known for rail-transit manufacturing, a short ride from Changsha.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mausoleum_of_Emperor_Yan%2C_Hunan_%2820250123134405%29.jpg/3840px-Mausoleum_of_Emperor_Yan%2C_Hunan_%2820250123134405%29.jpg",
        universities: ["Hunan University of Technology"],
      },
    ],
  },
  {
    province: "Anhui",
    cities: [
      {
        name: "Hefei",
        role: "Provincial Capital",
        description: "A rapidly rising science and innovation hub, home to one of China's top research universities.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/%E5%A4%A9%E9%B9%85%E6%B9%96.jpg",
        universities: ["University of Science and Technology of China", "Hefei University of Technology"],
      },
      {
        name: "Wuhu",
        role: "Second City",
        description: "A Yangtze River port city with a growing manufacturing and automotive industry.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Wuhu_Skyline%2C_December_2019.jpg",
        universities: ["Anhui Normal University"],
      },
    ],
  },
  {
    province: "Jiangxi",
    cities: [
      {
        name: "Nanchang",
        role: "Provincial Capital",
        description: "A historic revolutionary city on the Gan River, now home to a growing student population.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Nanchang_Skyline.jpg/3840px-Nanchang_Skyline.jpg",
        universities: ["Nanchang University"],
      },
      {
        name: "Ganzhou",
        role: "Second City",
        description: "Southern Jiangxi's largest city, known for its well-preserved Song-dynasty city walls.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Yugutai.JPG",
        universities: ["Jiangxi University of Science and Technology"],
      },
    ],
  },
  {
    province: "Hebei",
    cities: [
      {
        name: "Shijiazhuang",
        role: "Provincial Capital",
        description: "A major rail hub encircling Beijing, with an increasingly modern city center.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Zhuangli_Commercial_Street_5.jpg/3840px-Zhuangli_Commercial_Street_5.jpg",
        universities: ["Hebei Normal University", "Hebei University of Science and Technology"],
      },
      {
        name: "Tangshan",
        role: "Second City",
        description: "An industrial port city rebuilt after the 1976 earthquake into a modern steel and energy hub.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/be/%E5%94%90%E5%B1%B1center.jpg",
        universities: ["North China University of Science and Technology"],
      },
    ],
  },
  {
    province: "Henan",
    cities: [
      {
        name: "Zhengzhou",
        role: "Provincial Capital",
        description: "A major transport and logistics hub in central China, close to the ancient capital of Luoyang.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Zhengzhou_CBDcity.jpg",
        universities: ["Zhengzhou University"],
      },
      {
        name: "Luoyang",
        role: "Second City",
        description: "One of China's ancient capitals, home to the UNESCO-listed Longmen Grottoes.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/27427-Luoyang_%2849067744628%29.jpg",
        universities: ["Henan University of Science and Technology"],
      },
    ],
  },
  {
    province: "Shanxi",
    cities: [
      {
        name: "Taiyuan",
        role: "Provincial Capital",
        description: "A 2,500-year-old city and historic coal-industry center in China's north.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Taiyuan_xiquinhosilva.jpg",
        universities: ["Taiyuan University of Technology", "Shanxi University"],
      },
      {
        name: "Datong",
        role: "Second City",
        description: "Home to the UNESCO-listed Yungang Grottoes, one of China's great Buddhist cave art sites.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/90/61292-Yungang-Grottoes_%2828498548881%29.jpg",
        universities: ["Shanxi Datong University"],
      },
    ],
  },
  {
    province: "Guangxi",
    cities: [
      {
        name: "Nanning",
        role: "Provincial Capital",
        description: "A green, subtropical capital and China's gateway to ASEAN Southeast Asia.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/72/Skyline_of_China-ASEAN_Business_Center_in_Qingxiu_District.jpg",
        universities: ["Guangxi University"],
      },
      {
        name: "Guilin",
        role: "Second City",
        description: "World-famous for its karst mountain scenery along the Li River.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Xiangshan_Scenic_Area_89468-Guilin_%2831130832628%29.jpg",
        universities: ["Guilin University of Technology", "Guilin University of Electronic Technology"],
      },
    ],
  },
  {
    province: "Jilin",
    cities: [
      {
        name: "Changchun",
        role: "Provincial Capital",
        description: "China's automotive-industry cradle, and home to one of the country's largest universities.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/%E9%81%A5%E6%9C%9B%E5%8D%97%E6%B9%96%E5%8C%97%E5%B2%B8_nan_hu_-_panoramio.jpg",
        universities: ["Jilin University", "Northeast Normal University"],
      },
      {
        name: "Jilin City",
        role: "Second City",
        description: "A scenic riverside city famous for its winter rime-ice (wusong) scenery.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dragon_Light_2.jpg/3840px-Dragon_Light_2.jpg",
        universities: ["Beihua University"],
      },
    ],
  },
];
