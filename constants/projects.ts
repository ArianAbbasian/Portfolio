export interface ProjectLangData {
  title: string;
  category: string;
  client: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string | null;
}

export interface Project {
  id: string;
  year: string;
  isCommercial: boolean;
  image: string;
  desktopImages: string[];
  mobileImage: string;
  en: ProjectLangData;
  fa: ProjectLangData;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "cafe-restaurant",
    year: "2026",
    isCommercial: true,
    image: "/public/images/shemroon-cafe/download (1).jpg",
    desktopImages: ["/public/images/shemroon-cafe/download (1).jpg", "/public/images/shemroon-cafe/download (2).jpg", "/public/images/shemroon-cafe/download (3).jpg"],
    mobileImage: "/public/images/shemroon-cafe/download (4).jpg",
    en: {
      title: "Shemroon Cafe",
      category: "Web Development / UI Design",
      client: "Shemroon Cafe",
      shortDescription: "A modern digital menu for a cozy Tehran café with scroll-synced categories, mobile-first design, and effortless updates via JSON data files.",
      challenge: "The client needed a lightweight, mobile-friendly online menu to replace printed menus and enable non-technical staff to update items without rebuilding the site.",
      solution: "Built a purely frontend React app with Vite and Tailwind CSS, using local JSON files for content and IntersectionObserver for real-time category sync while scrolling.",
      technologies: ["React", "Tailwind CSS", "Vite" , "React-Router-Dom" , "React-Icons"],
      liveUrl: "https://cafe-mitra.ir",
      githubUrl: null // برای حفظ حریم خصوصی تجاری حذف شد
    },
    fa: {
      title: "کافه شمرون",
      category: "توسعه وب / طراحی رابط کاربری",
      client: "کافه شمرون",
      shortDescription: "منوی دیجیتال مدرن برای یک کافه دنج تهرانی با همگام‌سازی دسته‌بندی‌ها هنگام اسکرول، طراحی واکنش‌گرا و ویرایش آسان از طریق فایل‌های JSON.",
      challenge: "کافه نیاز به یک منوی آنلاین ساده و سبک داشت تا جایگزین منوهای چاپی شود و پرسنل بتوانند بدون دانش فنی آیتم‌ها را بروز کنند.",
      solution: "یک وب‌اپ فرانت‌اند خالص با React، Vite و Tailwind CSS توسعه دادم که محتوا را از فایل‌های JSON می‌خواند و با IntersectionObserver همگام‌سازی اسکرول را مدیریت می‌کند.",
      technologies: ["React", "Tailwind CSS", "Vite" , "React-Router-Dom" , "React-Icons"],
      liveUrl: "https://cafe-mitra.ir",
      githubUrl: null
    }
  },
  {
    id: "cms-dashboard",
    year: "2026",
    isCommercial: false,
    image: "/public/images/CMS/download (1).jpg",
    desktopImages: ["/public/images/CMS/download (1).jpg", "/public/images/CMS/download (2).jpg", "/public/images/CMS/download (3).jpg"],
    mobileImage: "/public/images/CMS/download (4).jpg",
    en: {
      title: "CMS Dashboard",
      category: "Web Development / React Dashboard",
      client: "Digital Commerce Solutions",
      shortDescription: "A feature-rich admin dashboard for managing users, products, transactions, and automation workflows with dynamic charts and dark mode.",
      challenge: "The client needed a centralized platform to manage e-commerce operations, including user management, product inventory, and transaction tracking in one responsive interface.",
      solution: "Built a modular React application with reusable components, dynamic charts using Recharts, and a theme context for dark/light mode.",
      technologies: ["React", "Recharts", "Material-UI", "React Router", "Context API"],
      liveUrl: "https://arianabbasian.github.io/CMS",
      githubUrl: null
    },
    fa: {
      title: "داشبورد مدیریت محتوا",
      category: "توسعه وب / داشبورد React",
      client: "راهکارهای تجارت دیجیتال",
      shortDescription: "داشبورد مدیریت کامل برای کنترل کاربران، محصولات، تراکنش‌ها، بازخوردها و اتوماسیون با پشتیبانی از حالت تاریک.",
      challenge: "نیاز به یک پلتفرم متمرکز برای مدیریت عملیات فروشگاه اینترنتی شامل مدیریت کاربران، موجودی محصولات و پیگیری تراکنش‌ها در یک رابط کاربری واکنش‌گرا وجود داشت.",
      solution: "برنامه React مدولار با کامپوننت‌های قابل استفاده مجدد، نمودارهای پویا با Recharts، و زمینه تم برای حالت تاریک/روشن توسعه داده شد.",
      technologies: ["React", "Recharts", "Material-UI", "React Router", "Context API"],
      liveUrl: "https://arianabbasian.github.io/CMS",
      githubUrl: null
    }
  },
  {
    id: "sm-shop",
    year: "2026",
    isCommercial: false,
    image: "/public/images/sm-shop/download.jpg",
    desktopImages: ["/public/images/sm-shop/download (1).jpg", "/public/images/sm-shop/download (2).jpg", "/public/images/sm-shop/download (3).jpg"],
    mobileImage: "/public/images/sm-shop/download (4).jpg",
    en: {
      title: "SM-Shop",
      category: "E-Commerce / Admin Dashboard",
      client: "Personal Project",
      shortDescription: "Full-featured online store with real‑time product management, dark mode, and localStorage sync – no backend needed.",
      challenge: "Building a complete e‑commerce platform without a dedicated backend, while ensuring real‑time data synchronization across browser tabs and persistent dark mode.",
      solution: "Used React Context with localStorage as the data source, plus storage event listeners for cross‑tab sync. Redux Toolkit manages the theme, and Tailwind CSS delivers a fully responsive UI.",
      technologies: ["React", "React Router", "Redux Toolkit", "Tailwind CSS", "Swiper", "LocalStorage API"],
      liveUrl: "https://ArianAbbasian.github.io/SM-Shop",
      githubUrl: "https://github.com/ArianAbbasian/SM-Shop"
    },
    fa: {
      title: "اس‌ام شاپ",
      category: "فروشگاه آنلاین / پنل مدیریت",
      client: "پروژه شخصی",
      shortDescription: "فروشگاه آنلاین کامل با مدیریت لحظه‌ای محصولات، تم تاریک/روشن و همگام‌سازی با مرورگر – بدون نیاز به بک‌اند.",
      challenge: "چالش اصلی ساخت یک فروشگاه اینترنتی کامل بدون بک‌اند اختصاصی، همراه با همگام‌سازی داده‌ها بین تب‌های مختلف مرورگر و ذخیره‌سازی تم بود.",
      solution: "با استفاده از Context ری‌اکت و localStorage به عنوان منبع داده، رویدادهای storage برای همگام‌سازی بین تب‌ها پیاده‌سازی شدند. برای مدیریت تم از Redux Toolkit استفاده گردید.",
      technologies: ["ری‌اکت", "ری‌اکت روتر", "رداکس تولکیت", "تیلویند سی‌اس‌اس", "سوایپر", "LocalStorage API"],
      liveUrl: "https://ArianAbbasian.github.io/SM-Shop",
      githubUrl: "https://github.com/ArianAbbasian/SM-Shop"
    }
  },
  {
    id: "persian-speech-to-text",
    year: "2026",
    isCommercial: false,
    image: "/public/images/speech-toText/download.jpg",
    desktopImages: ["/public/images/speech-toText/download (1).jpg", "/public/images/speech-toText/download (2).jpg", "/public/images/speech-toText/download (3).jpg"],
    mobileImage: "/public/images/speech-toText/download (4).jpg",
    
    en: {
      title: "Persian Speech-to-Text",
      category: "Web Development / Speech Recognition",
      client: "Personal Project",
      shortDescription: "A React-based speech-to-text and text-to-speech web app supporting Persian, English, Arabic, and Turkish with advanced search.",
      challenge: "The project required accurate real-time speech recognition for Persian (Farsi) and other RTL languages with customizable voices.",
      solution: "Built with React and Web Speech API, using custom hooks for speech services, Context API for state management, and Tailwind CSS for responsive UI.",
      technologies: ["React", "Web Speech API", "Tailwind CSS", "Context API"],
      liveUrl: "https://arianabbasian.github.io/Speech-to-text",
      githubUrl: "https://github.com/arianabbasian/Speech-to-text"
    },
    fa: {
      title: "تبدیل گفتار به متن فارسی",
      category: "توسعه وب / تشخیص گفتار",
      client: "پروژه شخصی",
      shortDescription: "اپلیکیشنی مبتنی بر React برای تبدیل گفتار به متن و متن به گفتار با پشتیبانی از فارسی، انگلیسی، عربی و ترکی، همراه با جستجوی پیشرفته.",
      challenge: "نیاز به تشخیص گفتار دقیق و بلادرنگ برای زبان فارسی و سایر زبان‌های راست‌چین، همچنین تولید گفتار طبیعی با سرعت قابل تنظیم.",
      solution: "ساخته شده با React و Web Speech API، با استفاده از هوک‌های سفارشی، مدیریت state با Context API و استایل‌دهی با Tailwind CSS.",
      technologies: ["React", "Web Speech API", "Tailwind CSS", "Context API"],
      liveUrl: "https://arianabbasian.github.io/Speech-to-text",
      githubUrl: "https://github.com/arianabbasian/Speech-to-text"
    }
  }
];