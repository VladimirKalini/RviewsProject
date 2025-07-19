# Исправление проблемы с отображением данных на VPS

## Проблема была исправлена!

**Основная причина:** Фронтенд обращался к статическому файлу `/server/data/reviews.json` вместо API эндпоинтов.

## Что было исправлено:

### 1. Заменены неправильные запросы на API эндпоинты:
- ❌ `fetch('/server/data/reviews.json')` 
- ✅ `fetch('/api/reviews')`

### 2. Обновлены файлы:
- `src/pages/Home.tsx` - использует `/api/reviews`
- `src/pages/CompanyPage.tsx` - использует `/api/reviews/company/{name}`
- `src/pages/CategoryPage.tsx` - использует `/api/reviews`
- `src/context/AuthContext.tsx` - использует реальные API для аутентификации
- `vite.config.ts` - добавлен прокси для разработки

### 3. Создана конфигурация API:
- `src/config/api.ts` - централизованное управление URL

## Настройка для VPS:

### 1. Создайте файл `.env` в корне проекта:
```bash
# Для VPS укажите полный URL к серверу
VITE_API_URL=http://your-vps-ip:3001
```

### 2. Пересоберите фронтенд:
```bash
npm run build
```

### 3. Убедитесь что сервер запущен:
```bash
cd server
node index.cjs
```

## Проверка работы:

### 1. Тестирование API напрямую:
```bash
# Базовый тест
curl http://your-vps-ip:3001/test

# Получение отзывов
curl http://your-vps-ip:3001/api/reviews

# Отзывы конкретной компании
curl "http://your-vps-ip:3001/api/reviews/company/TechNova"
```

### 2. Проверка в браузере:
- Откройте ваш сайт на VPS
- Отзывы и компании должны отображаться
- Проверьте Network tab в DevTools - запросы должны идти к `/api/...`

## Структура API:

- `GET /api/reviews` - все отзывы (отсортированы по дате)
- `GET /api/reviews/company/{name}` - отзывы конкретной компании
- `POST /api/auth/login` - авторизация
- `POST /api/auth/register` - регистрация
- `POST /api/reviews` - создание отзыва (требует авторизации)

## Если проблемы остались:

### 1. Проверьте логи сервера:
```bash
cd server
node index.cjs
# Должны появляться логи запросов
```

### 2. Проверьте Network в DevTools:
- Откройте F12 → Network
- Обновите страницу
- Должны быть запросы к `/api/reviews` со статусом 200

### 3. Проверьте CORS:
```bash
curl -H "Origin: http://your-frontend-domain" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://your-vps-ip:3001/api/reviews
```

### 4. Проверьте переменные окружения:
```bash
# В папке фронтенда
cat .env
# Должна быть: VITE_API_URL=http://your-vps-ip:3001
``` 