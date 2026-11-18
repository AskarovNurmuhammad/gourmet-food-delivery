import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UtensilsCrossed,
  ShoppingBag,
  Heart,
  Search,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Trash2,
  Check,
  X,
  CreditCard,
  Truck,
  Bike,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  ShieldCheck,
  Tag,
  ChefHat,
  Calendar,
  Users,
  Award,
  History,
  MessageSquarePlus,
  SlidersHorizontal,
  FlameKindling,
  Smartphone,
  Wallet
} from 'lucide-react';
import { MenuItem, CartItem, TableBooking, UserReview, PastOrder } from './types';

const INITIAL_MENU: MenuItem[] = [
  {
    id: 1,
    name: 'Truffle Angus Burger',
    category: 'Burgers',
    price: 12.50,
    originalPrice: 15.00,
    rating: 4.9,
    reviewsCount: 142,
    time: '15-20 min',
    calories: '650 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Black Angus mol go\'shti, truffle sousi, brioche noni, karamellangan piyoz va cheddar pishlog\'i.',
    badge: 'Xit Sotuv',
    spicyLevel: 1,
    isHalal: true,
    isVegetarian: false
  },
  {
    id: 2,
    name: 'Neapolitan Quattro Formaggi',
    category: 'Pizza',
    price: 14.90,
    originalPrice: 17.50,
    rating: 4.8,
    reviewsCount: 98,
    time: '20-25 min',
    calories: '820 kcal',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    description: 'Mozzarella, Gorgonzola, Parmesan va Fontina pishloqlari, o\'tin pechida pishirilgan nozik xamir.',
    badge: 'Chef Tavsiyasi',
    spicyLevel: 0,
    isHalal: true,
    isVegetarian: true
  },
  {
    id: 3,
    name: 'Dragon Roll Salmon & Avocado',
    category: 'Sushi',
    price: 16.00,
    originalPrice: 19.00,
    rating: 5.0,
    reviewsCount: 215,
    time: '20-30 min',
    calories: '480 kcal',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    description: 'Yangi losos balig\'i, avokado, unagi sousi, qovurilgan kunjut va xirillagan tempura qisqichbaqasi.',
    badge: 'Premium',
    spicyLevel: 1,
    isHalal: true,
    isVegetarian: false
  },
  {
    id: 4,
    name: 'To‘y Oshi (Maxsus Toshkent Palov)',
    category: 'National',
    price: 9.50,
    originalPrice: 11.00,
    rating: 5.0,
    reviewsCount: 380,
    time: '15-20 min',
    calories: '720 kcal',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
    description: 'Lazer guruchi, sarxil lahm qo\'zi go\'shti, sariq sabzi, noxat, mayiz va bedana tuxumlari bilan.',
    badge: 'An\'anaviy',
    spicyLevel: 0,
    isHalal: true,
    isVegetarian: false
  },
  {
    id: 5,
    name: 'Steak Ribeye Prime Cut',
    category: 'Burgers',
    price: 24.00,
    originalPrice: 28.00,
    rating: 4.9,
    reviewsCount: 76,
    time: '25-30 min',
    calories: '780 kcal',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=80',
    description: 'Marmar mol go\'shti, bibariya (rosemary) va sarimsoqli sariyog\' bilan grilda qovurilgan.',
    badge: 'Premium',
    spicyLevel: 2,
    isHalal: true,
    isVegetarian: false
  },
  {
    id: 6,
    name: 'Philadelphia Deluxe Roll',
    category: 'Sushi',
    price: 13.50,
    originalPrice: 15.50,
    rating: 4.8,
    reviewsCount: 165,
    time: '15-25 min',
    calories: '510 kcal',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop&q=80',
    description: 'Kremsimon Philadelphia pishlog\'i, norveg lososi, bodring va tobiko ikrasi.',
    badge: 'Mashhur',
    spicyLevel: 0,
    isHalal: true,
    isVegetarian: false
  },
  {
    id: 7,
    name: 'San Sebastian Cheesecake',
    category: 'Desserts',
    price: 6.50,
    originalPrice: 8.00,
    rating: 4.9,
    reviewsCount: 89,
    time: '10-15 min',
    calories: '420 kcal',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
    description: 'Ispancha karamellangan kremsimon pishloqli desert, eritilgan Belgiya shokoladi bilan.',
    badge: 'Yangi',
    spicyLevel: 0,
    isHalal: true,
    isVegetarian: true
  },
  {
    id: 8,
    name: 'Berry Basil Craft Limonad',
    category: 'Drinks',
    price: 4.20,
    originalPrice: 5.00,
    rating: 4.7,
    reviewsCount: 54,
    time: '5-10 min',
    calories: '110 kcal',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    description: 'Yangi uzilgan qulupnay, rayhon, ohak (lime) va gazlangan muzdek tog\' buloq suvi.',
    badge: 'Muzdek',
    spicyLevel: 0,
    isHalal: true,
    isVegetarian: true
  }
];

const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    author: 'Azizbek Qodirov',
    avatar: 'AQ',
    rating: 5,
    date: '2026-11-17',
    dishName: 'To‘y Oshi (Maxsus Toshkent Palov)',
    comment: 'Toshkentdagi eng mazali oshlardan biri! Go\'shti yumshoqqina, xushbo\'y va issiq holda yetkazib berildi.'
  },
  {
    id: 'rev-2',
    author: 'Elena Smirnova',
    avatar: 'ES',
    rating: 5,
    date: '2026-11-16',
    dishName: 'Dragon Roll Salmon & Avocado',
    comment: 'Losos judayam yangi va unagi sousi ideal darajada. 25 daqiqada yetkazib berishdi, rahmat!'
  },
  {
    id: 'rev-3',
    author: 'Bobur Mirzayev',
    avatar: 'BM',
    rating: 4,
    date: '2026-11-15',
    dishName: 'Truffle Angus Burger',
    comment: 'Truffle sousi ta\'mi ajoyib, kotleti sersuv. Faqat biroz kattaroq porsiya bo\'lsa nur ustiga a\'lo bo\'lardi.'
  }
];

const INITIAL_PAST_ORDERS: PastOrder[] = [
  {
    id: 'ORD-9841',
    date: '2026-11-16',
    items: [
      { name: 'Neapolitan Quattro Formaggi', qty: 1, price: 14.90 },
      { name: 'Berry Basil Craft Limonad', qty: 2, price: 8.40 }
    ],
    total: 23.30,
    paymentMethod: 'Payme',
    status: 'Delivered'
  },
  {
    id: 'ORD-9750',
    date: '2026-11-12',
    items: [
      { name: 'Truffle Angus Burger', qty: 2, price: 25.00 }
    ],
    total: 25.00,
    paymentMethod: 'Click',
    status: 'Delivered'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'reservation' | 'history' | 'reviews'>('menu');
  const [lang, setLang] = useState<'uz' | 'en' | 'ru'>('uz');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [halalOnly, setHalalOnly] = useState<boolean>(false);
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cashbackPoints, setCashbackPoints] = useState<number>(35.00); // Foydalanuvchi keshbek ballari
  const [usePoints, setUsePoints] = useState<boolean>(false);

  // Promokod
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // To'lov turi
  const [paymentMethod, setPaymentMethod] = useState<'Click' | 'Payme' | 'Uzum' | 'Card' | 'Cash'>('Payme');
  const [checkoutModal, setCheckoutModal] = useState<boolean>(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });

  // Buyurtmani kuzatish
  const [trackingModal, setTrackingModal] = useState<boolean>(false);
  const [orderStep, setOrderStep] = useState<number>(1);

  // Stol band qilish formasi
  const [bookingForm, setBookingForm] = useState<TableBooking>({
    id: '',
    name: '',
    phone: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    zone: 'VIP Lounge',
    notes: '',
    status: 'Confirmed'
  });
  const [bookingsList, setBookingsList] = useState<TableBooking[]>([]);

  // Sharhlar
  const [reviewsList, setReviewsList] = useState<UserReview[]>(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, dishName: 'Truffle Angus Burger', comment: '' });

  // Buyurtmalar tarixi
  const [pastOrders, setPastOrders] = useState<PastOrder[]>(INITIAL_PAST_ORDERS);

  const isDark = theme === 'dark';

  // Filtrlangan menyu
  const filteredMenu = useMemo(() => {
    return INITIAL_MENU.filter((item) => {
      const matchCat = category === 'All' || item.category === category;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
      const matchHalal = !halalOnly || item.isHalal;
      const matchVeg = !vegOnly || item.isVegetarian;
      return matchCat && matchSearch && matchHalal && matchVeg;
    });
  }, [category, search, halalOnly, vegOnly]);

  // Savat boshqaruvi
  const addToCart = (food: MenuItem) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === food.id);
      if (exist) {
        return prev.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...food, quantity: 1 }];
    });
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f97316', '#eab308', '#22c55e']
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Savat hisobi
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 25 || subtotal === 0 ? 0 : 3.50;
  const promoDiscountVal = (subtotal * appliedDiscount) / 100;
  const pointsDiscount = usePoints ? Math.min(cashbackPoints, subtotal * 0.5) : 0;
  const totalAmount = Math.max(0, subtotal + deliveryFee - promoDiscountVal - pointsDiscount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Promokod tekshirish
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MAZZALI10') {
      setAppliedDiscount(10);
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
    } else {
      alert(lang === 'uz' ? 'Noto\'g\'ri promokod! Sinab ko\'ring: MAZZALI10' : 'Invalid promo! Try: MAZZALI10');
    }
  };

  // Buyurtmani yakunlash
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrderRecord: PastOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(c => ({ name: c.name, qty: c.quantity, price: c.price })),
      total: totalAmount,
      paymentMethod,
      status: 'In Progress'
    };

    setPastOrders([newOrderRecord, ...pastOrders]);
    // 5% keshbek qo'shish
    setCashbackPoints(prev => +(prev + totalAmount * 0.05).toFixed(2));
    if (usePoints) {
      setCashbackPoints(prev => Math.max(0, +(prev - pointsDiscount).toFixed(2)));
    }

    setCheckoutModal(false);
    setIsCartOpen(false);
    setTrackingModal(true);
    setOrderStep(1);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f97316', '#22c55e', '#3b82f6', '#ec4899']
    });

    setTimeout(() => setOrderStep(2), 2500);
    setTimeout(() => setOrderStep(3), 5500);
    setTimeout(() => setOrderStep(4), 8500);
  };

  // Stol band qilishni topshirish
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: TableBooking = {
      ...bookingForm,
      id: `TB-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Confirmed'
    };
    setBookingsList([newBooking, ...bookingsList]);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    alert(lang === 'uz' ? `Tabriklaymiz! Siz uchun ${bookingForm.zone}da stol muvaffaqiyatli band qilindi.` : 'Table booked successfully!');
    setBookingForm({
      id: '',
      name: '',
      phone: '',
      guests: 2,
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      zone: 'VIP Lounge',
      notes: '',
      status: 'Confirmed'
    });
  };

  // Sharh qoldirish
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;
    const rev: UserReview = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      avatar: newReview.author.slice(0, 2).toUpperCase(),
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      dishName: newReview.dishName,
      comment: newReview.comment
    };
    setReviewsList([rev, ...reviewsList]);
    setNewReview({ author: '', rating: 5, dishName: 'Truffle Angus Burger', comment: '' });
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  const categoryKeys = ['All', 'Burgers', 'Pizza', 'Sushi', 'National', 'Desserts', 'Drinks'];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f141c] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
        <span>GourmetCraft 2026: <b>$25 dan yuqori buyurtmalarga bepul yetkazib berish</b> va har bir xarid uchun <b>5% keshbek!</b></span>
      </div>

      {/* NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors px-4 lg:px-12 py-3.5 ${
        isDark ? 'bg-[#0f141c]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('menu')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                GourmetCraft
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                TypeScript Edition
              </span>
            </div>
          </div>

          {/* Navigatsiya Tablari */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'menu' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Menyu</span>
            </button>
            <button
              onClick={() => setActiveTab('reservation')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'reservation' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Stol Band Qilish</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'history' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Buyurtmalarim</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'reviews' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Sharhlar ({reviewsList.length})</span>
            </button>
          </nav>

          {/* O'ng taraf boshqaruvi */}
          <div className="flex items-center gap-2.5">
            {/* Keshbek ko'rsatkichi */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>${cashbackPoints.toFixed(2)} Keshbek</span>
            </div>

            {/* Tema */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Savatcha tugmasi */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{cartCount > 0 ? `$${totalAmount.toFixed(2)}` : 'Savat'}</span>
              <span className="bg-white/25 px-1.5 py-0.5 rounded-md text-[11px] font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex md:hidden items-center justify-between gap-1 pt-3 border-t border-slate-800/60 mt-2 text-xs font-bold">
          <button onClick={() => setActiveTab('menu')} className={`flex-1 py-1.5 text-center rounded-lg ${activeTab === 'menu' ? 'bg-orange-500 text-white' : 'text-slate-400'}`}>Menyu</button>
          <button onClick={() => setActiveTab('reservation')} className={`flex-1 py-1.5 text-center rounded-lg ${activeTab === 'reservation' ? 'bg-orange-500 text-white' : 'text-slate-400'}`}>Stol</button>
          <button onClick={() => setActiveTab('history')} className={`flex-1 py-1.5 text-center rounded-lg ${activeTab === 'history' ? 'bg-orange-500 text-white' : 'text-slate-400'}`}>Tarix</button>
          <button onClick={() => setActiveTab('reviews')} className={`flex-1 py-1.5 text-center rounded-lg ${activeTab === 'reviews' ? 'bg-orange-500 text-white' : 'text-slate-400'}`}>Sharh</button>
        </div>
      </header>

      {/* 1-TAB: ASOSIY MENYU VA TAOMLAR */}
      {activeTab === 'menu' && (
        <>
          {/* HERO */}
          <section className="px-4 lg:px-12 py-8 max-w-7xl mx-auto">
            <div className={`rounded-3xl p-8 sm:p-12 relative overflow-hidden border shadow-xl ${
              isDark
                ? 'bg-gradient-to-r from-[#171f2c] via-[#1a2332] to-[#251f22] border-slate-800'
                : 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 border-orange-200'
            }`}>
              <div className="max-w-xl z-10 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-bold mb-4 border border-orange-500/30">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Artisan Restoran & Onlayn Buyurtma</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                  Eng Sara Taomlar va Tezkor Yetkazib Berish
                </h1>
                <p className={`text-sm sm:text-base mb-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Marmar mol go'shti, yapon sushisi, to'y oshi va Italiya pitsalari — barchasi issiq holatda uyingizgacha yetkaziladi.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('reservation')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Restorandan Stol Band Qilish</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-slate-300">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span>25-35 daqiqada kuryer eshigingizda</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-[-5%] top-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
            </div>
          </section>

          {/* QIDIRUV VA FILTRLAR */}
          <section className="px-4 lg:px-12 max-w-7xl mx-auto mb-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              {/* Kategoriyalar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categoryKeys.map((catKey) => (
                  <button
                    key={catKey}
                    onClick={() => setCategory(catKey)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      category === catKey
                        ? 'bg-orange-500 text-white shadow-md'
                        : isDark ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {catKey === 'All' ? 'Barchasi' : catKey}
                  </button>
                ))}
              </div>

              {/* Qidiruv & Maxsus filtrlar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Taom qidirish..."
                    className="py-1.5 pl-9 pr-3 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  onClick={() => setHalalOnly(!halalOnly)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    halalOnly ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  ✓ Halol
                </button>

                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    vegOnly ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  🌱 Vegetarian
                </button>
              </div>
            </div>
          </section>

          {/* TAOMLAR GRIDI */}
          <main className="px-4 lg:px-12 max-w-7xl mx-auto mb-20">
            {filteredMenu.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Mos taomlar topilmadi.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMenu.map((item) => {
                  const inCart = cart.find((c) => c.id === item.id);
                  const isWished = wishlist.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="food-card rounded-3xl overflow-hidden flex flex-col justify-between group"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                        <span className="absolute top-3 left-3 bg-orange-500/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full z-10 backdrop-blur shadow">
                          {item.badge}
                        </span>

                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 z-10 text-slate-300"
                        >
                          <Heart className={`w-4 h-4 ${isWished ? 'text-rose-500 fill-rose-500' : ''}`} />
                        </button>

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/90 bg-black/60 backdrop-blur px-2.5 py-1 rounded-xl">
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3 h-3 text-orange-400" />
                            {item.time}
                          </span>
                          <span className="flex items-center gap-1 font-semibold">
                            <Flame className="w-3 h-3 text-amber-400" />
                            {item.calories}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1 text-amber-400 text-xs">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span className="font-bold text-slate-200">{item.rating}</span>
                              <span className="text-slate-400 text-[11px]">({item.reviewsCount})</span>
                            </div>
                            {item.spicyLevel > 0 && (
                              <span className="text-[11px] text-rose-400 font-bold">
                                {'🌶️'.repeat(item.spicyLevel)}
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-base mb-1.5 group-hover:text-orange-400 transition-colors line-clamp-1">
                            {item.name}
                          </h3>

                          <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-xl font-extrabold text-orange-400">${item.price.toFixed(2)}</span>
                            <span className="text-xs text-slate-500 line-through">${item.originalPrice.toFixed(2)}</span>
                          </div>

                          {inCart ? (
                            <div className="flex items-center justify-between p-1 bg-orange-500/15 rounded-xl border border-orange-500/30">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-extrabold text-sm px-2">{inCart.quantity}</span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Savatga</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </>
      )}

      {/* 2-TAB: RESTORAN STOLI BAND QILISH (TABLE RESERVATION) */}
      {activeTab === 'reservation' && (
        <section className="px-4 lg:px-12 py-10 max-w-4xl mx-auto">
          <div className="food-card rounded-3xl p-8 sm:p-12 mb-8 border border-orange-500/20">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-7 h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Restorandan Stol Band Qilish</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Kechki ovqat, uchrashuv yoki oilaviy bayramlar uchun eng qulay joyni oldindan zaxiralang.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-300">Ism va Familiya</label>
                  <input
                    type="text"
                    required
                    placeholder="Sardor Aliyev"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-300">Telefon raqam</label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-300">Mehmonlar soni</label>
                  <select
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm({ ...bookingForm, guests: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                      <option key={n} value={n}>{n} kishi</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-300">Sana</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 font-semibold text-slate-300">Vaqt</label>
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  >
                    {['12:00', '13:30', '18:00', '19:00', '20:30', '22:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-slate-300">Restoran hududi / Zali</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Main Hall', 'VIP Lounge', 'Open Terrace'] as const).map(zone => (
                    <button
                      type="button"
                      key={zone}
                      onClick={() => setBookingForm({ ...bookingForm, zone })}
                      className={`p-3 rounded-xl border font-bold text-xs transition-all ${
                        bookingForm.zone === zone ? 'bg-orange-500 text-white border-orange-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-slate-300">Qo'shimcha istaklar (ixtiyoriy)</label>
                <textarea
                  rows={3}
                  placeholder="Masalan: Tushkun deraza yonidagi joy, shamlar va gullar bilan..."
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition-transform"
              >
                Stolni Zaxiralashni Tasdiqlash
              </button>
            </form>
          </div>

          {/* Faol band qilingan stollar */}
          {bookingsList.length > 0 && (
            <div className="food-card rounded-3xl p-6">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Band qilingan stollaringiz</span>
              </h3>
              <div className="space-y-3">
                {bookingsList.map(b => (
                  <div key={b.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-sm text-white">{b.name} ({b.guests} kishi)</p>
                      <p className="text-slate-400">{b.date} • soat {b.time} • <span className="text-orange-400 font-semibold">{b.zone}</span></p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      Tasdiqlangan
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 3-TAB: BUYURTMALAR TARIXI */}
      {activeTab === 'history' && (
        <section className="px-4 lg:px-12 py-10 max-w-4xl mx-auto">
          <div className="food-card rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
              <History className="w-6 h-6 text-orange-400" />
              <span>Avvalgi Buyurtmalarim</span>
            </h2>

            <div className="space-y-4">
              {pastOrders.map(order => (
                <div key={order.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-extrabold text-sm text-white">{order.id}</span>
                      <span className="text-xs text-slate-400 ml-3">{order.date}</span>
                    </div>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{it.qty}x {it.name}</span>
                        <span className="font-semibold text-slate-400">${(it.price * it.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">To'lov: <b className="text-white">{order.paymentMethod}</b></span>
                    <span className="text-base font-extrabold text-orange-400">Jami: ${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4-TAB: SHARHLAR VA REYTINLAR */}
      {activeTab === 'reviews' && (
        <section className="px-4 lg:px-12 py-10 max-w-4xl mx-auto space-y-8">
          {/* Yangi sharh yozish */}
          <div className="food-card rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-orange-400" />
              <span>Taomlar haqida sharh qoldiring</span>
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold text-slate-300">Ismingiz</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-slate-300">Qaysi taom haqida?</label>
                  <select
                    value={newReview.dishName}
                    onChange={(e) => setNewReview({ ...newReview, dishName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                  >
                    {INITIAL_MENU.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-300">Bahoingiz (Yulduzcha)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setNewReview({ ...newReview, rating: st })}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${st <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-300">Sharhingiz</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Taom ta'mi, yetkazish tezligi va xizmat sifati haqida yozing..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-xs shadow-lg"
              >
                Sharhni Chop Etish
              </button>
            </form>
          </div>

          {/* Sharhlar ro'yxati */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg">Mijozlarimiz fikrlari ({reviewsList.length})</h3>
            <div className="grid grid-cols-1 gap-4">
              {reviewsList.map(rev => (
                <div key={rev.id} className="food-card rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                        {rev.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{rev.author}</h4>
                        <p className="text-[11px] text-orange-400 font-semibold">{rev.dishName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {'★'.repeat(rev.rating)}
                      <span className="text-xs text-slate-500 ml-2">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SAVATCHA (CART DRAWER) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end" onClick={() => setIsCartOpen(false)}>
          <div
            className={`w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl transition-all ${
              isDark ? 'bg-[#131924] border-l border-slate-800' : 'bg-white border-l border-slate-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-inherit">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <ShoppingBag className="w-5 h-5 text-orange-500" />
                  <span>Sizning Savatingiz ({cartCount})</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mahsulotlar ro'yxati */}
              <div className="mt-4 space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold">Savatchangiz hozircha bo'sh</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl border bg-slate-900/60 border-slate-800"
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate text-white">{item.name}</h4>
                        <span className="text-xs text-orange-400 font-extrabold">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1 text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-rose-500 p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Promokod, Keshbek va hisob-kitob */}
            {cart.length > 0 && (
              <div className="border-t border-inherit pt-4 space-y-3">
                {/* Promokod formasi */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promokod (masalan: MAZZALI10)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl outline-none border bg-slate-900 border-slate-700 text-white"
                  />
                  <button type="submit" className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold">
                    Qo'llash
                  </button>
                </form>

                {/* Keshbek ishlatish toggle */}
                {cashbackPoints > 0 && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                    <span className="text-amber-300">Keshbek ballarini ishlatish (${cashbackPoints.toFixed(2)})</span>
                    <input
                      type="checkbox"
                      checked={usePoints}
                      onChange={(e) => setUsePoints(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 cursor-pointer"
                    />
                  </div>
                )}

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Taomlar narxi:</span>
                    <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Yetkazib berish:</span>
                    <span className="font-semibold text-emerald-400">{deliveryFee === 0 ? 'Bepul' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-orange-400">
                      <span>Promokod chegirmasi (10%):</span>
                      <span className="font-bold">-${promoDiscountVal.toFixed(2)}</span>
                    </div>
                  )}
                  {usePoints && (
                    <div className="flex justify-between text-amber-400">
                      <span>Keshbek chegirmasi:</span>
                      <span className="font-bold">-${pointsDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold border-t border-inherit pt-2">
                    <span>Jami to'lov:</span>
                    <span className="text-xl text-orange-400">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutModal(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Rasmiylashtirish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL: TO'LOV VA MANZIL */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl bg-[#151c28] border border-slate-800">
            <button onClick={() => setCheckoutModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1">Buyurtmani Yakunlash</h3>
            <p className="text-xs text-slate-400 mb-5">To'lov usuli va yetkazish manzilini tanlang.</p>

            <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block mb-1 font-semibold text-slate-300">Ismingiz</label>
                <input
                  type="text"
                  required
                  placeholder="Sardor Aliyev"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-300">Telefon raqam</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-300">Yetkazib berish manzili</label>
                <input
                  type="text"
                  required
                  placeholder="Toshkent sh., Yunusobod tumani..."
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                />
              </div>

              {/* To'lov usuli tanlash */}
              <div>
                <label className="block mb-1.5 font-semibold text-slate-300">To'lov turi</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Payme', 'Click', 'Uzum', 'Card', 'Cash'] as const).map(pm => (
                    <button
                      type="button"
                      key={pm}
                      onClick={() => setPaymentMethod(pm)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        paymentMethod === pm ? 'bg-orange-500 text-white border-orange-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {pm === 'Card' ? 'Humo/Uzcard' : pm === 'Cash' ? '💵 Naqd pul' : pm}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex justify-between items-center text-xs">
                <span>Jami to'lov miqdori:</span>
                <span className="text-base font-extrabold text-orange-400">${totalAmount.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-500/30"
              >
                Tasdiqlash va Buyurtma Berish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* JONLI KUZATUV (ORDER TRACKER MODAL) */}
      {trackingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl bg-[#151c28] border border-slate-800">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3 border border-orange-500/30">
                <Bike className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold">Jonli Buyurtma Kuzatuvi</h3>
              <p className="text-xs text-slate-400 mt-1">To'lov qabul qilindi: <b>{paymentMethod}</b></p>
            </div>

            {/* Stepper */}
            <div className="space-y-4 mb-8">
              {[
                { step: 1, label: 'Buyurtma tasdiqlandi va qabul qilindi', icon: Check },
                { step: 2, label: 'Oshpazlar taomni tayyorlamoqda', icon: UtensilsCrossed },
                { step: 3, label: 'Kuryer yo\'lga chiqdi (Issiq termoboxda)', icon: Bike },
                { step: 4, label: 'Yetkazib berildi! Yoqimli ishtaha', icon: ChefHat }
              ].map((s) => {
                const isDone = orderStep >= s.step;
                const isCurrent = orderStep === s.step;
                const Icon = s.icon;

                return (
                  <div key={s.step} className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-800 text-slate-500'
                      } ${isCurrent && 'ring-4 ring-orange-500/30 animate-pulse'}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs sm:text-sm font-bold ${isDone ? 'text-white' : 'text-slate-500'}`}>
                        {s.label}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">
                        Hozirgi bosqich
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => { setTrackingModal(false); setCart([]); }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#0a0d13] text-slate-500 py-12 px-4 lg:px-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-orange-500" />
            <span className="font-extrabold tracking-wider text-slate-300">GOURMETCRAFT TS</span>
            <span>• © 2026 Barcha huquqlar himoyalangan</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Mualliflik menyusi</span>
            <span>Stol zaxiralash</span>
            <span>Yetkazib berish shartlari</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
