const PRODUCTS = [
    {
        id: 1,
        name: 'Классический лён',
        price: 450,
        weight: '200 г',
        badge: 'Хит продаж',
        badgeColor: 'blaze',
        shortDesc: 'Омега-3, белок, клетчатка. Идеальная база для здорового завтрака.',
        fullDesc: 'Льняной урбеч - это концентрат пользы. Всего 2 столовые ложки в день покрывают суточную норму Омега-3 жирных кислот. Идеально добавлять в каши, смузи или намазывать на цельнозерновой хлеб.',
        composition: '100% семена льна холодного отжима. Без добавок, сахара и масел.',
        origin: 'Семена льна выращены на фермерских хозяйствах Алтайского края. Мы закупаем сырьё напрямую у проверенных поставщиков, которые не используют пестициды и ГМО.',
        benefits: [
            'Омега-3 (ALA) - 22 г на 100 г',
            'Растительный белок - 18 г',
            'Клетчатка - 27 г',
            'Лигнаны - мощные антиоксиданты'
        ],
        nutrition: {
            calories: 534,
            protein: 18,
            fat: 42,
            carbs: 1
        },
        image: 'img/product-flax.jpg'
    },
    {
        id: 2,
        name: 'Чёрный кунжут',
        price: 520,
        weight: '180 г',
        badge: 'Новый вкус',
        badgeColor: 'deep-sea',
        shortDesc: 'Кальций, железо, антиоксиданты. Для крепких костей и иммунитета.',
        fullDesc: 'Чёрный кунжут - рекордсмен по содержанию кальция среди растительных продуктов. В 100 г урбеча - в 7 раз больше кальция, чем в молоке. Тёмный цвет обусловлен высоким содержанием антоцианов - мощных антиоксидантов.',
        composition: '100% семена чёрного кунжута холодного отжима.',
        origin: 'Чёрный кунжут поставляется из экологически чистых регионов Индии и Эфиопии. Именно там сохраняются традиционные методы выращивания без химической обработки.',
        benefits: [
            'Кальций - 1450 мг на 100 г',
            'Железо - 14.5 мг',
            'Магний - 350 мг',
            'Антоцианы - антиоксиданты'
        ],
        nutrition: {
            calories: 573,
            protein: 17,
            fat: 49,
            carbs: 2
        },
        image: 'img/product-sesame.jpg'
    },
    {
        id: 3,
        name: 'Лесной фундук',
        price: 680,
        weight: '200 г',
        badge: 'Премиум',
        badgeColor: 'deep-sea',
        shortDesc: 'Нежный ореховый вкус. Витамин E, магний, фолиевая кислота.',
        fullDesc: 'Урбеч из отборного лесного фундука - это нежная кремовая текстура и насыщенный ореховый вкус. Идеален как самостоятельный десерт или добавка к утренней каше. Богат витамином E - главным антиоксидантом для кожи.',
        composition: '100% ядра лесного фундука холодного отжима.',
        origin: 'Фундук собирается в предгорьях Кавказа, где орех растёт в дикой природе без вмешательства человека. Дикий фундук содержит в 2 раза больше антиоксидантов, чем культурный.',
        benefits: [
            'Витамин E - 20 мг на 100 г',
            'Магний - 160 мг',
            'Фолиевая кислота - 68 мкг',
            'Мононенасыщенные жиры'
        ],
        nutrition: {
            calories: 628,
            protein: 15,
            fat: 61,
            carbs: 4
        },
        image: 'img/product-hazelnut.jpg'
    },
    {
        id: 4,
        name: 'Набор «Знакомство»',
        price: 750,
        weight: '3 × 100 г',
        badge: 'Выгода 15%',
        badgeColor: 'blaze',
        shortDesc: 'Лён + кунжут + фундук. Чтобы попробовать всё и выбрать любимое.',
        fullDesc: 'Идеальный стартовый набор для тех, кто хочет познакомиться с миром настоящего урбеча. Три банки по 100 г - хватит на 2-3 недели ежедневного употребления. Отличный подарок для тех, кто следит за здоровьем.',
        composition: 'Льняной урбеч 100 г + Чёрный кунжут 100 г + Лесной фундук 100 г.',
        origin: 'В набор входят орехи и семена из тех же регионов, что и наши основные продукты: Алтай, Индия/Эфиопия, Кавказ.',
        benefits: [
            'Три вкуса в одном наборе',
            'Экономия 15% vs покупка по отдельности',
            'Удобные банки по 100 г',
            'Крафтовая подарочная упаковка'
        ],
        nutrition: {
            calories: 578,
            protein: 17,
            fat: 51,
            carbs: 2
        },
        image: 'img/product-set.jpg'
    }
];

function cartStore() {
    return {
        cart: [],
        isCartOpen: false,
        
        init() {
            const savedCart = localStorage.getItem('zerne_cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }
            this.$watch('cart', (value) => {
                localStorage.setItem('zerne_cart', JSON.stringify(value));
            });
        },

        addToCart(product) {
            const existingItem = this.cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                // Добавляем image прямо в объект товара в корзине
                this.cart.push({ 
                    ...product, 
                    quantity: 1,
                    image: product.image || `img/product-${product.id === 1 ? 'flax' : product.id === 2 ? 'sesame' : product.id === 3 ? 'hazelnut' : 'set'}.jpg`
                });
            }
        },

        removeFromCart(id) {
            this.cart = this.cart.filter(item => item.id !== id);
        },

        updateQuantity(id, delta) {
            const item = this.cart.find(item => item.id === id);
            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) {
                    this.removeFromCart(id);
                }
            }
        },

        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        cartTotalItems() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },

        getProductImage(id) {
            const product = PRODUCTS.find(p => p.id === id);
            return product ? product.image : 'img/hero.jpg';
        },

        checkout() {
            if (this.cart.length === 0) return;

            let message = "Здравствуйте! Хочу оформить заказ:\n\n";
            this.cart.forEach(item => {
                message += `- ${item.name} (${item.weight}) x ${item.quantity} шт. = ${item.price * item.quantity} руб.\n`;
            });
            message += `\nИтого: ${this.cartTotal()} руб.\n\nПодскажите по доставке!`;

            const encodedMessage = encodeURIComponent(message);
            const telegramUrl = `https://t.me/urbeco_shop?text=${encodedMessage}`;
            
            window.open(telegramUrl, '_blank');
        }
    };
}