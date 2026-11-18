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
  ChefHat
} from 'lucide-react';

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Truffle Angus Burger',
    category: 'Burgers',
    price: 12.50,
    originalPrice: 15.00,
    rating: 4.9,
    time: '15-20 min',
    calories: '650 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Black Angus mol go\'shti, truffle sousi, brioche noni, karamellangan piyoz va cheddar pishlog\'i.',
    badge: 'Xit Sotuv'
  },
  {
    id: 2,
    name: 'Neapolitan Quattro Formaggi',
    category: 'Pizza',
    price: 14.90,
    originalPrice: 17.50,
    rating: 4.8,
    time: '20-25 min',
    calories: '820 kcal',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    description: 'Mozzarella, Gorgonzola, Parmesan va Fontina pishloqlari, o\'tin pechida pishirilgan nozik xamir.',
    badge: 'Chef Tavsiyasi'
  },
  {
    id: 3,
    name: 'Dragon Roll Salmon & Avocado',
    category: 'Sushi',
    price: 16.00,
    originalPrice: 19.00,
    rating: 5.0,
    time: '20-30 min',
    calories: '480 kcal',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    description: 'Yangi losos balig\'i, avokado, unagi sousi, qovurilgan kunjut va xirillagan tempura qisqichbaqasi.',
    badge: 'Premium'
  },
  {
    id: 4,
    name: 'To‘y Oshi (Maxsus Toshkent Palov)',
    category: 'National',
    price: 9.50,
    originalPrice: 11.00,
    rating: 5.0,
    time: '15-20 min',
    calories: '720 kcal',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
    description: 'Lazer guruchi, sarxil lahm qo\'zi go\'shti, sariq sabzi, noxat, mayiz va bedana tuxumlari bilan.',
    badge: 'An\'anaviy'
  },
  {
    id: 5,
    name: 'Steak Ribeye Prime Cut',
    category: 'Burgers',
    price: 24.00,
    originalPrice: 28.00,
    rating: 4.9,
    time: '25-30 min',
    calories: '780 kcal',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=80',
    description: 'Marmar mol go\'shti, bibariya (rosemary) va sarimsoqli sariyog\' bilan grilda qovurilgan.',
    badge: 'Premium'
  },
  {
    id: 6,
    name: 'Philadelphia Deluxe Roll',
    category: 'Sushi',
    price: 13.50,
    originalPrice: 15.50,
    rating: 4.8,
    time: '15-25 min',
    calories: '510 kcal',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop&q=80',
    description: 'Kremsimon Philadelphia pishlog\'i, norveg lososi, bodring va tobiko ikrasi.',
    badge: 'Mashhur'
  },
  {
    id: 7,
    name: 'San Sebastian Cheesecake',
    category: 'Desserts',
    price: 6.50,
    originalPrice: 8.00,
    rating: 4.9,
    time: '10-15 min',
    calories: '420 kcal',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
    description: 'Ispancha karamellangan kremsimon pishloqli desert, eritilgan Belgiya shokoladi bilan.',
    badge: 'Yangi'
  },
  {
    id: 8,
    name: 'Berry Basil Craft Limonad',
    category: 'Drinks',
    price: 4.20,
    originalPrice: 5.00,
    rating: 4.7,
    time: '5-10 min',
    calories: '110 kcal',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    description: 'Yangi uzilgan qulupnay, rayhon, ohak (lime) va gazlangan muzdek tog\' buloq suvi.',
    badge: 'Muzdek'
  }
];

const TRANSLATIONS = {
  uz: {
    heroTag: 'GourmetCraft • Mualliflik oshxonasi & Tezkor yetkazib berish',
    heroTitle: 'Restoran Darajasidagi Taomlar Uyingizda',
    heroDesc: 'Eng sara ingredientlar, yetakchi oshpazlar mahorati va 30 daqiqa ichida issiq holatda tezkor kuryerlik.',
    orderNow: 'Buyurtma Berish',
    freeDeliveryBadge: '$25 dan oshgan barcha buyurtmalar uchun bepul yetkazib berish!',
    categories: { All: 'Barchasi', Burgers: 'Burgerlar', Pizza: 'Pitsa', Sushi: 'Sushi', National: 'Milliy Taomlar', Desserts: 'Desertlar', Drinks: 'Ichimliklar' },
    searchHolder: 'Taom yoki ingredient qidirish...',
    addToCart: 'Savatga',
    cartTitle: 'Sizning Savatingiz',
    emptyCart: 'Savatchangiz hozircha bo\'sh',
    subtotal: 'Taomlar narxi',
    deliveryFee: 'Yetkazib berish',
    discount: 'Chegirma',
    free: 'Bepul',
    total: 'Jami to\'lov',
    promoPlaceholder: 'Promokod (masalan: MAZZALI10)',
    applyPromo: 'Qo\'llash',
    checkoutBtn: 'Rasmiylashtirish',
    orderTracking: 'Buyurtma Holati',
    step1: 'Buyurtma qabul qilindi',
    step2: 'Oshpazlar tayyorlamoqda',
    step3: 'Kuryer yo\'lda kelmoqda',
    step4: 'Yetkazib berildi! Yoqimli ishtaha',
    close: 'Yopish'
  },
  en: {
    heroTag: 'GourmetCraft • Artisan Cuisine & Fast Delivery',
    heroTitle: 'Restaurant Quality Dishes Delivered Hot',
    heroDesc: 'Finest organic ingredients, crafted by master chefs, delivered to your door in under 30 minutes.',
    orderNow: 'Order Now',
    freeDeliveryBadge: 'Free delivery on all orders over $25!',
    categories: { All: 'All', Burgers: 'Burgers', Pizza: 'Pizza', Sushi: 'Sushi', National: 'Traditional', Desserts: 'Desserts', Drinks: 'Drinks' },
    searchHolder: 'Search food or ingredients...',
    addToCart: 'Add to Cart',
    cartTitle: 'Your Cart',
    emptyCart: 'Your cart is currently empty',
    subtotal: 'Dishes Subtotal',
    deliveryFee: 'Delivery Fee',
    discount: 'Discount',
    free: 'Free',
    total: 'Total Amount',
    promoPlaceholder: 'Promo code (e.g. MAZZALI10)',
    applyPromo: 'Apply',
    checkoutBtn: 'Proceed to Checkout',
    orderTracking: 'Live Order Tracker',
    step1: 'Order Confirmed',
    step2: 'Kitchen is Cooking',
    step3: 'Courier on the Way',
    step4: 'Delivered! Bon Appétit',
    close: 'Close'
  },
  ru: {
    heroTag: 'GourmetCraft • Авторская кухня и быстрая доставка',
    heroTitle: 'Блюда Ресторанного Уровня у Вас Дома',
    heroDesc: 'Отборные свежие ингредиенты от шеф-поваров, горячая доставка за 30 минут.',
    orderNow: 'Заказать сейчас',
    freeDeliveryBadge: 'Бесплатная доставка при заказе от $25!',
    categories: { All: 'Все', Burgers: 'Бургеры', Pizza: 'Пицца', Sushi: 'Суши', National: 'Национальные', Desserts: 'Десерты', Drinks: 'Напитки' },
    searchHolder: 'Поиск блюд или ингредиентов...',
    addToCart: 'В корзину',
    cartTitle: 'Ваша Корзина',
    emptyCart: 'Корзина пока пуста',
    subtotal: 'Стоимость блюд',
    deliveryFee: 'Доставка',
    discount: 'Скидка',
    free: 'Бесплатно',
    total: 'Итого к оплате',
    promoPlaceholder: 'Промокод (напр. MAZZALI10)',
    applyPromo: 'Применить',
    checkoutBtn: 'Оформить заказ',
    orderTracking: 'Статус Заказа',
    step1: 'Заказ принят',
    step2: 'Шеф-повар готовит',
    step3: 'Курьер уже в пути',
    step4: 'Доставлено! Приятного аппетита',
    close: 'Закрыть'
  }
};

export default function App() {
  const [lang, setLang] = useState('uz');
  const [theme, setTheme] = useState('dark');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [trackingModal, setTrackingModal] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });

  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  // Saralash va filtrlash
  const filteredMenu = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCat = category === 'All' || item.category === category;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  // Savat amallari
  const addToCart = (food) => {
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

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Savat hisob-kitoblari
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 25 || subtotal === 0 ? 0 : 3.50;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = Math.max(0, subtotal + delivery - discountAmount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MAZZALI10') {
      setAppliedDiscount(10);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } else {
      alert(lang === 'uz' ? 'Noto\'g\'ri promokod! Sinab ko\'ring: MAZZALI10' : 'Invalid promo! Try: MAZZALI10');
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setCheckoutModal(false);
    setIsCartOpen(false);
    setTrackingModal(true);
    setOrderStep(1);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#22c55e', '#3b82f6', '#ec4899']
    });

    // Simulyatsiya: Bosqichma-bosqich status o'zgaradi
    setTimeout(() => setOrderStep(2), 3000);
    setTimeout(() => setOrderStep(3), 6500);
    setTimeout(() => setOrderStep(4), 10000);
  };

  const categoryKeys = ['All', 'Burgers', 'Pizza', 'Sushi', 'National', 'Desserts', 'Drinks'];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f141c] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      {/* Yuqori aksiyalar satri */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
        <span>{t.freeDeliveryBadge}</span>
      </div>

      {/* NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors px-4 lg:px-12 py-3.5 ${
        isDark ? 'bg-[#0f141c]/85 border-slate-800' : 'bg-white/85 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCategory('All')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                GourmetCraft
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                Bistro & Delivery
              </span>
            </div>
          </div>

          {/* Qidiruv */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchHolder}
                className={`w-full py-2 pl-10 pr-4 text-sm rounded-xl outline-none border transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 focus:border-orange-500 text-white placeholder-slate-500'
                    : 'bg-slate-100 border-slate-200 focus:border-orange-500 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Controls: Til, Tema, Wishlist, Savat */}
          <div className="flex items-center gap-2.5">
            {/* Til */}
            <div className={`flex p-1 rounded-xl border text-xs font-bold ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {['uz', 'en', 'ru'].map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={`px-2 py-1 rounded-lg uppercase transition-all ${
                    lang === item ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-orange-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Tema */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => alert(`Sevimlilarda ${wishlist.length} ta taom bor!`)}
              className={`p-2 rounded-xl border relative transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Savat */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{cartCount > 0 ? `$${total.toFixed(2)}` : 'Savat'}</span>
              <span className="bg-white/25 px-1.5 py-0.5 rounded-md text-[11px]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-4 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className={`rounded-3xl p-8 sm:p-14 relative overflow-hidden border shadow-xl ${
          isDark
            ? 'bg-gradient-to-r from-[#171f2c] via-[#1a2332] to-[#251f22] border-slate-800'
            : 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 border-orange-200'
        }`}>
          <div className="max-w-xl z-10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-bold mb-4 border border-orange-500/30">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{t.heroTag}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              {t.heroTitle}
            </h1>

            <p className={`text-sm sm:text-base mb-8 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 480, behavior: 'smooth' })}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span>{t.orderNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className={`flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl border backdrop-blur ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white/80 border-orange-200 text-slate-700'
              }`}>
                <Clock className="w-4 h-4 text-orange-400" />
                <span>O'rtacha yetkazish: <b>25-35 min</b></span>
              </div>
            </div>
          </div>

          {/* Orqa fon dekoratsiyasi */}
          <div className="absolute right-[-5%] top-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* KATEGORIYALAR */}
      <section className="px-4 lg:px-12 max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryKeys.map((catKey) => {
            const isActive = category === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setCategory(catKey)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                    : isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
                }`}
              >
                {t.categories[catKey]}
              </button>
            );
          })}
        </div>
      </section>

      {/* TAOMLAR RO'YXATI */}
      <main className="px-4 lg:px-12 max-w-7xl mx-auto mb-20 flex-1">
        {filteredMenu.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold">Ushbu turkumda hozircha taomlar mavjud emas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenu.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              const isWished = wishlist.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`food-card rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 ${
                    !isDark && 'bg-white border-slate-200 shadow-sm hover:border-orange-400'
                  }`}
                >
                  {/* Rasm va teglari */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                    <span className="absolute top-3 left-3 bg-orange-500/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full z-10 backdrop-blur shadow">
                      {item.badge}
                    </span>

                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur z-10 transition-colors ${
                        isDark ? 'bg-slate-900/70 hover:bg-slate-900' : 'bg-white/80 hover:bg-white shadow'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWished ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
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

                  {/* Tafsilotlar */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-200">{item.rating}</span>
                        <span className="text-slate-400 text-[11px]">• Chef Choice</span>
                      </div>

                      <h3 className="font-bold text-base mb-1.5 group-hover:text-orange-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      <p className={`text-xs line-clamp-2 mb-4 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-extrabold text-orange-400">${item.price.toFixed(2)}</span>
                        <span className="text-xs text-slate-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      </div>

                      {/* Savat counter yoki tugma */}
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
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{t.addToCart}</span>
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
                  <span>{t.cartTitle} ({cartCount})</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mahsulotlar ro'yxati */}
              <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold">{t.emptyCart}</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-2xl border ${
                        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate">{item.name}</h4>
                        <span className="text-xs text-orange-400 font-extrabold">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
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

            {/* Promokod va hisob-kitob */}
            {cart.length > 0 && (
              <div className="border-t border-inherit pt-4 space-y-3">
                {/* Promokod formasi */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={t.promoPlaceholder}
                    className={`flex-1 px-3 py-2 text-xs rounded-xl outline-none border ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                    }`}
                  />
                  <button type="submit" className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold">
                    {t.applyPromo}
                  </button>
                </form>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{t.subtotal}:</span>
                    <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{t.deliveryFee}:</span>
                    <span className="font-semibold text-emerald-400">{delivery === 0 ? t.free : `$${delivery.toFixed(2)}`}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-orange-400">
                      <span>{t.discount} (10%):</span>
                      <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold border-t border-inherit pt-2">
                    <span>{t.total}:</span>
                    <span className="text-xl text-orange-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutModal(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{t.checkoutBtn}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl ${isDark ? 'bg-[#151c28] border border-slate-800' : 'bg-white'}`}>
            <button onClick={() => setCheckoutModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1">Buyurtmani Rasmiylashtirish</h3>
            <p className="text-xs text-slate-400 mb-6">Manzil va telefon raqamingizni kiriting.</p>

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
                  placeholder="Toshkent sh., Amir Temur ko'chasi 45-uy"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex justify-between items-center text-xs">
                <span>To'lov summasi:</span>
                <span className="text-base font-extrabold text-orange-400">${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-500/30"
              >
                Buyurtmani Tasdiqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {/* JONLI KUZATUV (ORDER TRACKER MODAL) */}
      {trackingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl ${isDark ? 'bg-[#151c28] border border-slate-800' : 'bg-white'}`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3 border border-orange-500/30">
                <Bike className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold">{t.orderTracking}</h3>
              <p className="text-xs text-slate-400 mt-1">Buyurtma ID: #GC-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>

            {/* Stepper */}
            <div className="space-y-4 mb-8">
              {[
                { step: 1, label: t.step1, icon: Check },
                { step: 2, label: t.step2, icon: UtensilsCrossed },
                { step: 3, label: t.step3, icon: Bike },
                { step: 4, label: t.step4, icon: ChefHat }
              ].map((s) => {
                const Icon = s.icon;
                const isDone = orderStep >= s.step;
                const isCurrent = orderStep === s.step;

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
                        Hozir
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
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`border-t py-12 px-4 lg:px-12 text-xs transition-colors ${
        isDark ? 'border-slate-800/80 bg-[#0a0d13] text-slate-500' : 'border-slate-200 bg-white text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-orange-500" />
            <span className="font-extrabold tracking-wider text-slate-300">GOURMETCRAFT</span>
            <span>• © 2026 Barcha huquqlar himoyalangan</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Restoran menyusi</span>
            <span>Kuryerlar uchun</span>
            <span>Maxfiylik siyosati</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
