import React from 'react';
import { useParams } from 'react-router-dom';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import { 
  Monitor, 
  UtensilsCrossed, 
  ShoppingBag, 
  Stethoscope, 
  Car, 
  GraduationCap,
  Home,
  Wrench
} from 'lucide-react';

const categories = {
  'it-internet': { 
    name: 'IT и интернет', 
    icon: Monitor,
    description: 'Отзывы о IT-компаниях, веб-студиях, разработчиках и интернет-сервисах'
  },
  'restaurants': { 
    name: 'Рестораны', 
    icon: UtensilsCrossed,
    description: 'Отзывы о ресторанах, кафе, службах доставки еды и общественном питании'
  },
  'shops': { 
    name: 'Магазины', 
    icon: ShoppingBag,
    description: 'Отзывы об интернет-магазинах, торговых центрах и розничных сетях'
  },
  'medicine': { 
    name: 'Медицина', 
    icon: Stethoscope,
    description: 'Отзывы о медицинских центрах, клиниках, врачах и медицинских услугах'
  },
  'automotive': { 
    name: 'Автомобили', 
    icon: Car,
    description: 'Отзывы об автосалонах, автосервисах, страховых компаниях и автоуслугах'
  },
  'education': { 
    name: 'Образование', 
    icon: GraduationCap,
    description: 'Отзывы об учебных заведениях, курсах, тренингах и образовательных услугах'
  },
  'real-estate': { 
    name: 'Недвижимость', 
    icon: Home,
    description: 'Отзывы о риелторских агентствах, застройщиках и услугах по недвижимости'
  },
  'services': { 
    name: 'Услуги', 
    icon: Wrench,
    description: 'Отзывы о различных услугах: ремонт, клининг, юридические и другие'
  },
};

// Mock data для каждой категории - по 10 отзывов
const mockReviewsByCategory: Record<string, Review[]> = {
  'it-internet': [
    {
      id: '1',
      companyName: 'TechCorp',
      rating: 4,
      title: 'Отличный сервис разработки',
      content: 'Компания предоставляет качественные услуги веб-разработки. Персонал вежливый и профессиональный. Проект выполнили в срок, все требования учли. Рекомендую для создания корпоративных сайтов.',
      authorId: 'sample-user-1',
      authorName: 'Иван Петров',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '2',
      companyName: 'WebStudio',
      rating: 5,
      title: 'Превосходная работа над мобильным приложением',
      content: 'Заказывал разработку мобильного приложения для iOS и Android. Результат превзошел все ожидания. Работа выполнена в срок, качество на высшем уровне. Приложение работает стабильно, дизайн современный.',
      authorId: 'sample-user-2',
      authorName: 'Мария Сидорова',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '3',
      companyName: 'DataSoft',
      rating: 3,
      title: 'Неплохо, но есть недочеты',
      content: 'Заказывали систему управления базами данных. В целом работу выполнили, но были задержки по срокам. Техподдержка отвечает не всегда быстро. Качество кода среднее.',
      authorId: 'sample-user-3',
      authorName: 'Александр Козлов',
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '4',
      companyName: 'CloudTech Solutions',
      rating: 5,
      title: 'Лучшие специалисты по облачным решениям',
      content: 'Помогли перенести всю IT-инфраструктуру компании в облако. Процесс прошел без сбоев, все данные сохранены. Команда профессионалов, которые знают свое дело. Поддержка работает 24/7.',
      authorId: 'sample-user-4',
      authorName: 'Елена Волкова',
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '5',
      companyName: 'DigitalAgency Pro',
      rating: 4,
      title: 'Качественное продвижение сайта',
      content: 'Заказывали SEO-продвижение интернет-магазина. За 3 месяца сайт поднялся в топ-10 по основным запросам. Трафик увеличился в 2 раза. Отчеты предоставляют регулярно, все прозрачно.',
      authorId: 'sample-user-5',
      authorName: 'Дмитрий Смирнов',
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '6',
      companyName: 'CyberSecurity Plus',
      rating: 5,
      title: 'Надежная защита от киберугроз',
      content: 'Установили комплексную систему защиты для нашего офиса. Антивирус, файрвол, мониторинг сети - все работает идеально. Ни одной успешной атаки за полгода. Рекомендую всем.',
      authorId: 'sample-user-6',
      authorName: 'Анна Петрова',
      createdAt: new Date(Date.now() - 518400000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '7',
      companyName: 'GameDev Studio',
      rating: 4,
      title: 'Интересная мобильная игра',
      content: 'Разработали для нас казуальную мобильную игру. Графика красивая, геймплей затягивающий. Немного затянули с релизом, но результат стоил ожидания. Игра уже в топе App Store.',
      authorId: 'sample-user-7',
      authorName: 'Сергей Иванов',
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '8',
      companyName: 'AI Solutions Lab',
      rating: 5,
      title: 'Внедрили ИИ в бизнес-процессы',
      content: 'Помогли автоматизировать обработку заявок с помощью машинного обучения. Теперь 80% запросов обрабатывается автоматически. Сэкономили кучу времени и денег. Технологии будущего уже здесь!',
      authorId: 'sample-user-8',
      authorName: 'Ольга Николаева',
      createdAt: new Date(Date.now() - 691200000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '9',
      companyName: 'BlockChain Experts',
      rating: 3,
      title: 'Блокчейн-решение работает, но сложно',
      content: 'Разработали систему на блокчейне для отслеживания поставок. Технически все работает, но интерфейс сложноват для обычных пользователей. Нужно больше обучения персонала.',
      authorId: 'sample-user-9',
      authorName: 'Дмитрий Волков',
      createdAt: new Date(Date.now() - 777600000).toISOString(),
      category: 'it-internet'
    },
    {
      id: '10',
      companyName: 'UX/UI Design House',
      rating: 5,
      title: 'Потрясающий дизайн интерфейса',
      content: 'Полностью переделали дизайн нашего веб-приложения. Пользователи в восторге от нового интерфейса! Конверсия выросла на 40%. Дизайнеры учли все наши пожелания и добавили свои креативные идеи.',
      authorId: 'sample-user-10',
      authorName: 'Михаил Федоров',
      createdAt: new Date(Date.now() - 864000000).toISOString(),
      category: 'it-internet'
    }
  ],
  'restaurants': [
    {
      id: '11',
      companyName: 'Вкусная Пицца',
      rating: 5,
      title: 'Лучшая пицца в городе!',
      content: 'Заказываю здесь уже полгода. Пицца всегда свежая, горячая, доставляют быстро. Особенно нравится "Маргарита" и "Пепперони". Цены адекватные, персонал вежливый.',
      authorId: 'sample-user-11',
      authorName: 'Елена Волкова',
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '12',
      companyName: 'Суши Мастер',
      rating: 4,
      title: 'Качественные суши',
      content: 'Суши свежие, рис правильно приготовлен, рыба качественная. Доставка работает хорошо, упаковка надежная. Единственный минус - иногда долго готовят в выходные.',
      authorId: 'sample-user-12',
      authorName: 'Дмитрий Смирнов',
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '13',
      companyName: 'Бургер Кинг',
      rating: 3,
      title: 'Обычный фастфуд',
      content: 'Стандартное качество для сети быстрого питания. Бургеры вкусные, но иногда остывшие. Обслуживание быстрое, но персонал не всегда дружелюбный. Цены нормальные.',
      authorId: 'sample-user-13',
      authorName: 'Анна Петрова',
      createdAt: new Date(Date.now() - 518400000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '14',
      companyName: 'Ресторан "Белые Ночи"',
      rating: 5,
      title: 'Изысканная русская кухня',
      content: 'Отмечали юбилей компании. Кухня превосходная, подача блюд на высшем уровне. Интерьер стильный, атмосфера уютная. Официанты профессиональные. Цены соответствуют качеству.',
      authorId: 'sample-user-14',
      authorName: 'Сергей Иванов',
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '15',
      companyName: 'Кофейня "Зерно"',
      rating: 4,
      title: 'Отличный кофе и атмосфера',
      content: 'Хожу сюда каждое утро за кофе. Зерна качественные, бариста знают свое дело. Десерты тоже вкусные. Wifi быстрый, можно поработать. Единственный минус - мало места в час пик.',
      authorId: 'sample-user-15',
      authorName: 'Ольга Николаева',
      createdAt: new Date(Date.now() - 691200000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '16',
      companyName: 'Доставка "Еда24"',
      rating: 2,
      title: 'Проблемы с доставкой',
      content: 'Заказывал несколько раз, но качество нестабильное. То еда холодная приезжает, то курьер опаздывает на час. Ассортимент большой, но исполнение хромает. Не рекомендую.',
      authorId: 'sample-user-16',
      authorName: 'Дмитрий Волков',
      createdAt: new Date(Date.now() - 777600000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '17',
      companyName: 'Пекарня "Хлебный Дом"',
      rating: 5,
      title: 'Свежая выпечка каждый день',
      content: 'Покупаю здесь хлеб и выпечку постоянно. Все всегда свежее, ароматное. Особенно нравятся круассаны и багеты. Цены демократичные, персонал приветливый. Работают с раннего утра.',
      authorId: 'sample-user-17',
      authorName: 'Михаил Федоров',
      createdAt: new Date(Date.now() - 864000000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '18',
      companyName: 'Стейк-хаус "Мясо"',
      rating: 4,
      title: 'Хорошие стейки, но дорого',
      content: 'Мясо действительно качественное, стейки прожарены идеально. Гарниры тоже вкусные. Интерьер в стиле лофт. Но цены кусаются - ужин на двоих обошелся в 5000 рублей.',
      authorId: 'sample-user-18',
      authorName: 'Татьяна Морозова',
      createdAt: new Date(Date.now() - 950400000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '19',
      companyName: 'Азиатская кухня "Дракон"',
      rating: 4,
      title: 'Аутентичная азиатская еда',
      content: 'Готовят действительно как в Азии - острые, ароматные блюда. Лапша удон и том-ям особенно хороши. Порции большие, цены средние. Интерьер стилизованный, музыка подходящая.',
      authorId: 'sample-user-19',
      authorName: 'Владимир Кузнецов',
      createdAt: new Date(Date.now() - 1036800000).toISOString(),
      category: 'restaurants'
    },
    {
      id: '20',
      companyName: 'Семейное кафе "Уют"',
      rating: 5,
      title: 'Идеально для семейного отдыха',
      content: 'Отличное место для похода с детьми. Есть детское меню, игровая зона, аниматоры по выходным. Кухня домашняя, вкусная. Цены приемлемые. Персонал очень дружелюбный к детям.',
      authorId: 'sample-user-20',
      authorName: 'Екатерина Лебедева',
      createdAt: new Date(Date.now() - 1123200000).toISOString(),
      category: 'restaurants'
    }
  ],
  'shops': [
    {
      id: '21',
      companyName: 'МегаМаркет',
      rating: 4,
      title: 'Хороший интернет-магазин',
      content: 'Большой выбор товаров, удобный сайт, быстрая доставка. Цены конкурентные. Иногда бывают проблемы с наличием товара, но в целом все отлично.',
      authorId: 'sample-user-21',
      authorName: 'Анна Петрова',
      createdAt: new Date(Date.now() - 518400000).toISOString(),
      category: 'shops'
    },
    {
      id: '22',
      companyName: 'ТехноМир',
      rating: 3,
      title: 'Средний магазин электроники',
      content: 'Выбор техники неплохой, но цены завышены. Консультанты не всегда компетентны. Гарантийное обслуживание работает нормально.',
      authorId: 'sample-user-22',
      authorName: 'Сергей Иванов',
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      category: 'shops'
    },
    {
      id: '23',
      companyName: 'Модный Бутик',
      rating: 5,
      title: 'Стильная одежда высокого качества',
      content: 'Покупаю здесь одежду уже несколько лет. Качество тканей отличное, фасоны современные. Консультанты помогают подобрать образ. Цены выше среднего, но оно того стоит.',
      authorId: 'sample-user-23',
      authorName: 'Ольга Николаева',
      createdAt: new Date(Date.now() - 691200000).toISOString(),
      category: 'shops'
    },
    {
      id: '24',
      companyName: 'Спорт Экипировка',
      rating: 4,
      title: 'Все для спорта и фитнеса',
      content: 'Широкий ассортимент спортивных товаров. Качество хорошее, цены адекватные. Консультанты разбираются в товаре. Есть программа лояльности со скидками.',
      authorId: 'sample-user-24',
      authorName: 'Дмитрий Волков',
      createdAt: new Date(Date.now() - 777600000).toISOString(),
      category: 'shops'
    },
    {
      id: '25',
      companyName: 'Книжный Мир',
      rating: 5,
      title: 'Рай для книголюбов',
      content: 'Огромный выбор книг всех жанров. Есть редкие издания и новинки. Персонал очень эрудированный, всегда посоветуют что-то интересное. Уютная атмосфера, можно полистать перед покупкой.',
      authorId: 'sample-user-25',
      authorName: 'Михаил Федоров',
      createdAt: new Date(Date.now() - 864000000).toISOString(),
      category: 'shops'
    },
    {
      id: '26',
      companyName: 'Детский Мир Плюс',
      rating: 4,
      title: 'Хороший магазин детских товаров',
      content: 'Большой выбор игрушек, одежды и товаров для детей. Качество в основном хорошее. Цены средние по рынку. Есть игровая зона, дети не скучают пока родители выбирают.',
      authorId: 'sample-user-26',
      authorName: 'Татьяна Морозова',
      createdAt: new Date(Date.now() - 950400000).toISOString(),
      category: 'shops'
    },
    {
      id: '27',
      companyName: 'Дом и Сад',
      rating: 3,
      title: 'Товары для дома, но дорого',
      content: 'Хороший выбор товаров для дома и дачи. Качество неплохое, но цены завышены по сравнению с конкурентами. Консультанты знающие, помогают с выбором.',
      authorId: 'sample-user-27',
      authorName: 'Владимир Кузнецов',
      createdAt: new Date(Date.now() - 1036800000).toISOString(),
      category: 'shops'
    },
    {
      id: '28',
      companyName: 'Автозапчасти Про',
      rating: 4,
      title: 'Надежный поставщик автозапчастей',
      content: 'Покупаю здесь запчасти для своего авто. Большой выбор, есть оригинал и аналоги. Цены конкурентные. Консультанты разбираются в автомобилях, помогут подобрать нужную деталь.',
      authorId: 'sample-user-28',
      authorName: 'Екатерина Лебедева',
      createdAt: new Date(Date.now() - 1123200000).toISOString(),
      category: 'shops'
    },
    {
      id: '29',
      companyName: 'Косметика и Парфюм',
      rating: 5,
      title: 'Отличный выбор косметики',
      content: 'Покупаю здесь косметику и парфюмерию. Только оригинальная продукция, широкий выбор брендов. Консультанты помогают подобрать подходящие средства. Есть программа лояльности.',
      authorId: 'sample-user-29',
      authorName: 'Алексей Попов',
      createdAt: new Date(Date.now() - 1209600000).toISOString(),
      category: 'shops'
    },
    {
      id: '30',
      companyName: 'Строительный Двор',
      rating: 4,
      title: 'Все для ремонта и стройки',
      content: 'Делал ремонт, покупал здесь материалы. Выбор большой, цены средние. Есть доставка, что очень удобно. Консультанты помогли рассчитать количество материалов.',
      authorId: 'sample-user-30',
      authorName: 'Игорь Соколов',
      createdAt: new Date(Date.now() - 1296000000).toISOString(),
      category: 'shops'
    }
  ],
  'medicine': [
    {
      id: '31',
      companyName: 'Медицинский Центр "Здоровье"',
      rating: 5,
      title: 'Отличные врачи и сервис',
      content: 'Обращался к кардиологу и терапевту. Врачи профессиональные, внимательные. Современное оборудование, чистые кабинеты. Запись онлайн работает удобно.',
      authorId: 'sample-user-31',
      authorName: 'Ольга Николаева',
      createdAt: new Date(Date.now() - 691200000).toISOString(),
      category: 'medicine'
    },
    {
      id: '32',
      companyName: 'Стоматология "Белый Зуб"',
      rating: 4,
      title: 'Качественное лечение зубов',
      content: 'Лечил кариес и делал чистку. Врач опытный, все объяснил и сделал без боли. Оборудование современное. Цены средние по городу. Рекомендую.',
      authorId: 'sample-user-32',
      authorName: 'Дмитрий Волков',
      createdAt: new Date(Date.now() - 777600000).toISOString(),
      category: 'medicine'
    },
    {
      id: '33',
      companyName: 'Лаборатория "Инвитро"',
      rating: 5,
      title: 'Быстрые и точные анализы',
      content: 'Сдаю анализы только здесь. Результаты готовы быстро, точность высокая. Персонал вежливый, процедуры безболезненные. Много филиалов по городу.',
      authorId: 'sample-user-33',
      authorName: 'Михаил Федоров',
      createdAt: new Date(Date.now() - 864000000).toISOString(),
      category: 'medicine'
    },
    {
      id: '34',
      companyName: 'Офтальмологическая Клиника',
      rating: 4,
      title: 'Хорошие окулисты',
      content: 'Проверял зрение и подбирал очки. Врач внимательный, оборудование современное. Большой выбор оправ. Цены чуть выше среднего, но качество соответствует.',
      authorId: 'sample-user-34',
      authorName: 'Татьяна Морозова',
      createdAt: new Date(Date.now() - 950400000).toISOString(),
      category: 'medicine'
    },
    {
      id: '35',
      companyName: 'Центр МРТ Диагностики',
      rating: 5,
      title: 'Качественная диагностика',
      content: 'Делал МРТ головного мозга. Процедура прошла комфортно, результаты готовы в тот же день. Врач подробно объяснил снимки. Оборудование новое, персонал профессиональный.',
      authorId: 'sample-user-35',
      authorName: 'Владимир Кузнецов',
      createdAt: new Date(Date.now() - 1036800000).toISOString(),
      category: 'medicine'
    },
    {
      id: '36',
      companyName: 'Детская Поликлиника "Малыш"',
      rating: 4,
      title: 'Хорошие детские врачи',
      content: 'Водим ребенка на плановые осмотры. Врачи умеют работать с детьми, не пугают. Игровая зона в холле. Единственный минус - иногда большие очереди.',
      authorId: 'sample-user-36',
      authorName: 'Екатерина Лебедева',
      createdAt: new Date(Date.now() - 1123200000).toISOString(),
      category: 'medicine'
    },
    {
      id: '37',
      companyName: 'Центр Косметологии',
      rating: 3,
      title: 'Косметологические процедуры',
      content: 'Делала чистку лица и мезотерапию. Результат есть, но не wow-эффект. Цены высокие. Косметолог опытная, но не очень общительная. В целом нормально.',
      authorId: 'sample-user-37',
      authorName: 'Алексей Попов',
      createdAt: new Date(Date.now() - 1209600000).toISOString(),
      category: 'medicine'
    },
    {
      id: '38',
      companyName: 'Реабилитационный Центр',
      rating: 5,
      title: 'Отличная реабилитация после травмы',
      content: 'Проходил восстановление после перелома. Программа реабилитации составлена грамотно, инструкторы профессиональные. Современные тренажеры. Полностью восстановился.',
      authorId: 'sample-user-38',
      authorName: 'Игорь Соколов',
      createdAt: new Date(Date.now() - 1296000000).toISOString(),
      category: 'medicine'
    },
    {
      id: '39',
      companyName: 'Психологический Центр',
      rating: 4,
      title: 'Помогли справиться со стрессом',
      content: 'Обращался к психологу из-за стресса на работе. Специалист помог разобраться с проблемой, дал практические советы. Атмосфера располагающая, конфиденциальность соблюдается.',
      authorId: 'sample-user-39',
      authorName: 'Марина Белова',
      createdAt: new Date(Date.now() - 1382400000).toISOString(),
      category: 'medicine'
    },
    {
      id: '40',
      companyName: 'Аптека "Здоровье Плюс"',
      rating: 4,
      title: 'Хорошая аптека с широким ассортиментом',
      content: 'Покупаю лекарства в этой аптеке. Большой выбор препаратов, есть редкие лекарства. Фармацевты консультируют по применению. Цены средние, есть система скидок.',
      authorId: 'sample-user-40',
      authorName: 'Николай Орлов',
      createdAt: new Date(Date.now() - 1468800000).toISOString(),
      category: 'medicine'
    }
  ],
  'automotive': [
    {
      id: '41',
      companyName: 'АвтоСервис Профи',
      rating: 5,
      title: 'Лучший автосервис в городе',
      content: 'Обслуживаюсь здесь уже несколько лет. Мастера профессионалы, цены адекватные, всегда выполняют работу качественно и в срок. Есть гарантия на все виды работ.',
      authorId: 'sample-user-41',
      authorName: 'Дмитрий Волков',
      createdAt: new Date(Date.now() - 777600000).toISOString(),
      category: 'automotive'
    },
    {
      id: '42',
      companyName: 'Автосалон "Премиум Авто"',
      rating: 4,
      title: 'Хороший выбор автомобилей',
      content: 'Покупал здесь новый автомобиль. Выбор большой, менеджеры не навязывают. Помогли с оформлением кредита. Цены конкурентные. Сервис после продажи работает хорошо.',
      authorId: 'sample-user-42',
      authorName: 'Михаил Федоров',
      createdAt: new Date(Date.now() - 864000000).toISOString(),
      category: 'automotive'
    },
    {
      id: '43',
      companyName: 'Шиномонтаж "Колесо"',
      rating: 4,
      title: 'Быстрая замена шин',
      content: 'Меняю здесь резину каждый сезон. Работают быстро и качественно. Цены нормальные. Есть балансировка и ремонт проколов. Работают без выходных.',
      authorId: 'sample-user-43',
      authorName: 'Татьяна Морозова',
      createdAt: new Date(Date.now() - 950400000).toISOString(),
      category: 'automotive'
    },
    {
      id: '44',
      companyName: 'Автомойка "Блеск"',
      rating: 3,
      title: 'Обычная автомойка',
      content: 'Мою машину здесь иногда. Моют неплохо, но не идеально. Цены средние. Персонал работает быстро, но не всегда внимательно. В целом сойдет.',
      authorId: 'sample-user-44',
      authorName: 'Владимир Кузнецов',
      createdAt: new Date(Date.now() - 1036800000).toISOString(),
      category: 'automotive'
    },
    {
      id: '45',
      companyName: 'Страховая "АвтоЗащита"',
      rating: 4,
      title: 'Надежная автостраховка',
      content: 'Страхую машину уже третий год. Выплаты по страховым случаям проходят без проблем. Менеджеры вежливые, все объясняют. Цены конкурентные.',
      authorId: 'sample-user-45',
      authorName: 'Екатерина Лебедева',
      createdAt: new Date(Date.now() - 1123200000).toISOString(),
      category: 'automotive'
    },
    {
      id: '46',
      companyName: 'Автошкола "Драйв"',
      rating: 5,
      title: 'Отличная подготовка водителей',
      content: 'Получал права в этой автошколе. Инструкторы опытные, терпеливые. Теория подается понятно, практика достаточная. Сдал экзамен с первого раза. Рекомендую!',
      authorId: 'sample-user-46',
      authorName: 'Алексей Попов',
      createdAt: new Date(Date.now() - 1209600000).toISOString(),
      category: 'automotive'
    },
    {
      id: '47',
      companyName: 'Техосмотр "Быстро и Просто"',
      rating: 4,
      title: 'Удобное прохождение техосмотра',
      content: 'Прохожу техосмотр здесь каждый год. Быстро, без очередей. Цены фиксированные. Если есть замечания, подсказывают где исправить недостатки.',
      authorId: 'sample-user-47',
      authorName: 'Игорь Соколов',
      createdAt: new Date(Date.now() - 1296000000).toISOString(),
      category: 'automotive'
    },
    {
      id: '48',
      companyName: 'Автозапчасти "Деталь"',
      rating: 3,
      title: 'Запчасти есть, но дорого',
      content: 'Покупаю здесь запчасти для ремонта. Выбор хороший, есть оригинал и аналоги. Но цены завышены по сравнению с интернет-магазинами. Консультанты знающие.',
      authorId: 'sample-user-48',
      authorName: 'Марина Белова',
      createdAt: new Date(Date.now() - 1382400000).toISOString(),
      category: 'automotive'
    },
    {
      id: '49',
      companyName: 'Эвакуатор "Помощь 24"',
      rating: 5,
      title: 'Быстрая помощь на дороге',
      content: 'Пользовался услугами эвакуатора после ДТП. Приехали очень быстро, работали аккуратно. Цена честная, без накруток. Диспетчер вежливый, все объяснил по телефону.',
      authorId: 'sample-user-49',
      authorName: 'Николай Орлов',
      createdAt: new Date(Date.now() - 1468800000).toISOString(),
      category: 'automotive'
    },
    {
      id: '50',
      companyName: 'Автосигнализация "Защита"',
      rating: 4,
      title: 'Качественная установка сигнализации',
      content: 'Устанавливал сигнализацию на новую машину. Мастера опытные, все сделали аккуратно. Объяснили как пользоваться. Гарантия год. Цена соответствует качеству.',
      authorId: 'sample-user-50',
      authorName: 'Андрей Козлов',
      createdAt: new Date(Date.now() - 1555200000).toISOString(),
      category: 'automotive'
    }
  ],
  'education': [
    {
      id: '51',
      companyName: 'Языковая Школа "Полиглот"',
      rating: 4,
      title: 'Хорошие курсы английского',
      content: 'Изучал английский язык 6 месяцев. Преподаватели квалифицированные, методика эффективная. Группы небольшие, много разговорной практики. Цена соответствует качеству.',
      authorId: 'sample-user-51',
      authorName: 'Михаил Федоров',
      createdAt: new Date(Date.now() - 864000000).toISOString(),
      category: 'education'
    },
    {
      id: '52',
      companyName: 'IT-Академия "Код"',
      rating: 5,
      title: 'Отличные курсы программирования',
      content: 'Прошел курс по веб-разработке. Программа актуальная, преподаватели практики из IT. Много практических заданий. После курса устроился программистом. Рекомендую!',
      authorId: 'sample-user-52',
      authorName: 'Татьяна Морозова',
      createdAt: new Date(Date.now() - 950400000).toISOString(),
      category: 'education'
    },
    {
      id: '53',
      companyName: 'Автошкола "Профи-Драйв"',
      rating: 4,
      title: 'Качественное обучение вождению',
      content: 'Училась водить здесь. Инструкторы терпеливые, машины в хорошем состоянии. Теория объясняется понятно. Сдала экзамен со второго раза. В целом довольна.',
      authorId: 'sample-user-53',
      authorName: 'Владимир Кузнецов',
      createdAt: new Date(Date.now() - 1036800000).toISOString(),
      category: 'education'
    },
    {
      id: '54',
      companyName: 'Центр Подготовки к ЕГЭ',
      rating: 5,
      title: 'Помогли поступить в вуз',
      content: 'Готовился к ЕГЭ по математике и физике. Преподаватели опытные, знают все тонкости экзамена. Результат - 85 баллов по математике! Поступил на бюджет.',
      authorId: 'sample-user-54',
      authorName: 'Екатерина Лебедева',
      createdAt: new Date(Date.now() - 1123200000).toISOString(),
      category: 'education'
    },
    {
      id: '55',
      companyName: 'Музыкальная Школа "Гармония"',
      rating: 4,
      title: 'Хорошее музыкальное образование',
      content: 'Ребенок учится играть на фортепиано. Преподаватель профессиональный, терпеливый с детьми. Есть концерты для учеников. Цены средние по городу.',
      authorId: 'sample-user-55',
      authorName: 'Алексей Попов',
      createdAt: new Date(Date.now() - 1209600000).toISOString(),
      category: 'education'
    },
    {
      id: '56',
      companyName: 'Курсы Бухгалтерии "Учет"',
      rating: 3,
      title: 'Базовые знания дают',
      content: 'Прошла курсы бухгалтерского учета. Программа стандартная, ничего особенного. Преподаватель знающий, но подача материала скучная. Для начинающих подойдет.',
      authorId: 'sample-user-56',
      authorName: 'Игорь Соколов',
      createdAt: new Date(Date.now() - 1296000000).toISOString(),
      category: 'education'
    },
    {
      id: '57',
      companyName: 'Художественная Студия "Палитра"',
      rating: 5,
      title: 'Развивают творческие способности',
      content: 'Хожу на курсы рисования для взрослых. Преподаватель талантливый художник, умеет объяснить технику. Атмосфера творческая, группа дружная. Очень нравится!',
      authorId: 'sample-user-57',
      authorName: 'Марина Белова',
      createdAt: new Date(Date.now() - 1382400000).toISOString(),
      category: 'education'
    },
    {
      id: '58',
      companyName: 'Центр Развития Детей "Умка"',
      rating: 4,
      title: 'Хорошая подготовка к школе',
      content: 'Водили ребенка на подготовку к школе. Программа разнообразная: чтение, математика, творчество. Педагоги опытные, умеют работать с детьми. Ребенок ходил с удовольствием.',
      authorId: 'sample-user-58',
      authorName: 'Николай Орлов',
      createdAt: new Date(Date.now() - 1468800000).toISOString(),
      category: 'education'
    },
    {
      id: '59',
      companyName: 'Курсы Кройки и Шитья',
      rating: 4,
      title: 'Научилась шить красивые вещи',
      content: 'Прошла базовый курс кройки и шитья. Преподаватель опытная швея, все показывает на практике. Теперь могу сшить простые вещи для себя. Планирую продолжить обучение.',
      authorId: 'sample-user-59',
      authorName: 'Андрей Козлов',
      createdAt: new Date(Date.now() - 1555200000).toISOString(),
      category: 'education'
    },
    {
      id: '60',
      companyName: 'Школа Танцев "Ритм"',
      rating: 5,
      title: 'Отличные танцевальные курсы',
      content: 'Хожу на латиноамериканские танцы. Инструкторы профессиональные танцоры, атмосфера дружелюбная. Есть группы разного уровня. Регулярно проводят вечеринки и конкурсы.',
      authorId: 'sample-user-60',
      authorName: 'Светлана Петрова',
      createdAt: new Date(Date.now() - 1641600000).toISOString(),
      category: 'education'
    }
  ],
  'real-estate': [
    {
      id: '61',
      companyName: 'Риелторское Агентство "Дом"',
      rating: 4,
      title: 'Помогли найти квартиру',
      content: 'Искал квартиру для покупки. Риелтор показал несколько вариантов, помог с оформлением документов. Процесс прошел гладко, без скрытых комиссий.',
      authorId: 'sample-user-61',
      authorName: 'Татьяна Морозова',
      createdAt: new Date(Date.now() - 950400000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '62',
      companyName: 'Застройщик "Новый Город"',
      rating: 5,
      title: 'Качественное жилье в новостройке',
      content: 'Купили квартиру в новостройке. Дом сдали в срок, качество отделки хорошее. Инфраструктура развитая: школа, садик, магазины рядом. Довольны покупкой.',
      authorId: 'sample-user-62',
      authorName: 'Владимир Кузнецов',
      createdAt: new Date(Date.now() - 1036800000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '63',
      companyName: 'Агентство Аренды "Жилье+"',
      rating: 3,
      title: 'Помогли снять квартиру',
      content: 'Искал квартиру в аренду. Показали несколько вариантов, но не все соответствовали описанию. В итоге нашли подходящую. Комиссия стандартная.',
      authorId: 'sample-user-63',
      authorName: 'Екатерина Лебедева',
      createdAt: new Date(Date.now() - 1123200000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '64',
      companyName: 'Оценочная Компания "Эксперт"',
      rating: 4,
      title: 'Профессиональная оценка недвижимости',
      content: 'Заказывал оценку квартиры для ипотеки. Оценщик приехал вовремя, работал быстро и профессионально. Отчет готов в срок. Банк принял оценку без вопросов.',
      authorId: 'sample-user-64',
      authorName: 'Алексей Попов',
      createdAt: new Date(Date.now() - 1209600000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '65',
      companyName: 'Управляющая Компания "Комфорт"',
      rating: 2,
      title: 'Проблемы с обслуживанием дома',
      content: 'УК обслуживает наш дом. Постоянные проблемы: то отопление не работает, то лифт сломан. На заявки реагируют медленно. Нужно менять управляющую компанию.',
      authorId: 'sample-user-65',
      authorName: 'Игорь Соколов',
      createdAt: new Date(Date.now() - 1296000000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '66',
      companyName: 'Ипотечный Брокер "Кредит Дом"',
      rating: 5,
      title: 'Помогли получить выгодную ипотеку',
      content: 'Обращался за помощью в получении ипотеки. Брокер нашел банк с лучшими условиями, помог собрать документы. Ипотеку одобрили быстро. Сэкономил на процентах.',
      authorId: 'sample-user-66',
      authorName: 'Марина Белова',
      createdAt: new Date(Date.now() - 1382400000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '67',
      companyName: 'Юридическая Фирма "Право"',
      rating: 4,
      title: 'Помогли с оформлением сделки',
      content: 'Обращались за юридическим сопровождением покупки квартиры. Юристы проверили документы, провели сделку. Все прошло без проблем. Цены разумные.',
      authorId: 'sample-user-67',
      authorName: 'Николай Орлов',
      createdAt: new Date(Date.now() - 1468800000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '68',
      companyName: 'Дизайн-Студия "Интерьер"',
      rating: 5,
      title: 'Создали красивый интерьер',
      content: 'Заказывали дизайн-проект квартиры. Дизайнеры учли все наши пожелания, предложили интересные решения. Результат превзошел ожидания. Квартира стала уютной и стильной.',
      authorId: 'sample-user-68',
      authorName: 'Андрей Козлов',
      createdAt: new Date(Date.now() - 1555200000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '69',
      companyName: 'Строительная Компания "Мастер"',
      rating: 4,
      title: 'Качественный ремонт квартиры',
      content: 'Делали капитальный ремонт квартиры. Работы выполнены качественно, в срок. Мастера аккуратные, убирают за собой. Цены конкурентные. Есть гарантия на работы.',
      authorId: 'sample-user-69',
      authorName: 'Светлана Петрова',
      createdAt: new Date(Date.now() - 1641600000).toISOString(),
      category: 'real-estate'
    },
    {
      id: '70',
      companyName: 'Клининговая Служба "Чистый Дом"',
      rating: 4,
      title: 'Хорошая уборка после ремонта',
      content: 'Заказывали уборку после ремонта. Команда работала быстро и качественно. Использовали профессиональные средства. Квартира стала идеально чистой. Цена справедливая.',
      authorId: 'sample-user-70',
      authorName: 'Олег Морозов',
      createdAt: new Date(Date.now() - 1728000000).toISOString(),
      category: 'real-estate'
    }
  ],
  'services': [
    {
      id: '71',
      companyName: 'Клининговая Служба "Чистота"',
      rating: 5,
      title: 'Отличная уборка офиса',
      content: 'Заказываем регулярную уборку офиса. Работают качественно, используют профессиональные средства. Персонал аккуратный и пунктуальный. Цены разумные.',
      authorId: 'sample-user-71',
      authorName: 'Владимир Кузнецов',
      createdAt: new Date(Date.now() - 1036800000).toISOString(),
      category: 'services'
    },
    {
      id: '72',
      companyName: 'Ремонтная Служба "Мастер на час"',
      rating: 4,
      title: 'Быстрый ремонт сантехники',
      content: 'Вызывал мастера для ремонта крана. Приехал быстро, работу выполнил качественно. Цена честная, без накруток. Есть гарантия на работу. Рекомендую.',
      authorId: 'sample-user-72',
      authorName: 'Екатерина Лебедева',
      createdAt: new Date(Date.now() - 1123200000).toISOString(),
      category: 'services'
    },
    {
      id: '73',
      companyName: 'Юридическая Консультация "Закон"',
      rating: 4,
      title: 'Помогли решить правовой вопрос',
      content: 'Обращался за консультацией по трудовому спору. Юрист дал подробную консультацию, помог составить документы. Вопрос решили в мою пользу. Цены адекватные.',
      authorId: 'sample-user-73',
      authorName: 'Алексей Попов',
      createdAt: new Date(Date.now() - 1209600000).toISOString(),
      category: 'services'
    },
    {
      id: '74',
      companyName: 'Курьерская Служба "Быстро"',
      rating: 3,
      title: 'Доставка работает, но есть нюансы',
      content: 'Пользуюсь услугами курьерской службы для доставки документов. В целом работают нормально, но иногда опаздывают. Цены средние по рынку.',
      authorId: 'sample-user-74',
      authorName: 'Игорь Соколов',
      createdAt: new Date(Date.now() - 1296000000).toISOString(),
      category: 'services'
    },
    {
      id: '75',
      companyName: 'Бухгалтерские Услуги "Учет Плюс"',
      rating: 5,
      title: 'Профессиональное ведение учета',
      content: 'Ведут бухгалтерию для нашего ИП. Работают профессионально, все отчеты сдают вовремя. Консультируют по налоговым вопросам. Цены конкурентные.',
      authorId: 'sample-user-75',
      authorName: 'Марина Белова',
      createdAt: new Date(Date.now() - 1382400000).toISOString(),
      category: 'services'
    },
    {
      id: '76',
      companyName: 'Переводческое Агентство "Лингва"',
      rating: 4,
      title: 'Качественный перевод документов',
      content: 'Переводили документы для визы. Перевод выполнен качественно, нотариальное заверение оформили быстро. Цены стандартные. Консульство приняло документы без вопросов.',
      authorId: 'sample-user-76',
      authorName: 'Николай Орлов',
      createdAt: new Date(Date.now() - 1468800000).toISOString(),
      category: 'services'
    },
    {
      id: '77',
      companyName: 'Служба Грузоперевозок "Переезд"',
      rating: 4,
      title: 'Помогли с переездом',
      content: 'Заказывал услуги при переезде квартиры. Грузчики работали аккуратно, ничего не повредили. Машина чистая, водитель вежливый. Цена соответствует качеству.',
      authorId: 'sample-user-77',
      authorName: 'Андрей Козлов',
      createdAt: new Date(Date.now() - 1555200000).toISOString(),
      category: 'services'
    },
    {
      id: '78',
      companyName: 'Рекламное Агентство "Креатив"',
      rating: 5,
      title: 'Эффективная реклама для бизнеса',
      content: 'Заказывали рекламную кампанию для нашего магазина. Креативная команда, интересные идеи. Результат превзошел ожидания - продажи выросли на 30%. Рекомендую!',
      authorId: 'sample-user-78',
      authorName: 'Светлана Петрова',
      createdAt: new Date(Date.now() - 1641600000).toISOString(),
      category: 'services'
    },
    {
      id: '79',
      companyName: 'Служба Доставки Цветов "Букет"',
      rating: 4,
      title: 'Красивые букеты и быстрая доставка',
      content: 'Заказываю цветы для жены на праздники. Букеты всегда свежие и красивые. Доставляют точно в срок. Цены средние по городу. Есть большой выбор композиций.',
      authorId: 'sample-user-79',
      authorName: 'Олег Морозов',
      createdAt: new Date(Date.now() - 1728000000).toISOString(),
      category: 'services'
    },
    {
      id: '80',
      companyName: 'Фотостудия "Кадр"',
      rating: 5,
      title: 'Профессиональная фотосъемка',
      content: 'Делали семейную фотосессию. Фотограф профессиональный, умеет работать с детьми. Студия хорошо оборудована. Фотографии получились отличные. Цены справедливые.',
      authorId: 'sample-user-80',
      authorName: 'Елена Васильева',
      createdAt: new Date(Date.now() - 1814400000).toISOString(),
      category: 'services'
    }
  ]
};

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const category = categorySlug ? categories[categorySlug as keyof typeof categories] : null;
  const reviews = categorySlug ? mockReviewsByCategory[categorySlug] || [] : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Категория не найдена</h1>
          <p className="text-gray-600">Запрашиваемая категория не существует.</p>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-2">{category.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>{reviews.length} {reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'}</span>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-500 text-lg mb-2">Пока нет отзывов в этой категории</div>
              <div className="text-gray-400">
                Станьте первым, кто оставит отзыв о компании в категории "{category.name}"!
              </div>
            </div>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} compact />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;