# Диагностика проблем на VPS

## 1. Проверка работы сервера

```bash
# Запуск сервера с логированием
cd server
node index.cjs
```

## 2. Тестирование API

```bash
# Тест базового маршрута
curl http://localhost:3001/test

# Тест API отзывов
curl http://localhost:3001/api/reviews

# Тест прямого доступа к файлу
curl http://localhost:3001/server/data/reviews.json
```

## 3. Проверка файлов

```bash
# Проверка существования файлов
ls -la server/data/
cat server/data/reviews.json | head -5

# Проверка прав доступа
chmod 644 server/data/reviews.json
chmod 644 server/data/users.json
```

## 4. Проверка портов

```bash
# Проверка что порт 3001 открыт
netstat -tlnp | grep 3001

# Проверка firewall
sudo ufw status
```

## 5. Проверка в браузере

Откройте в браузере:
- http://your-vps-ip:3001/test
- http://your-vps-ip:3001/api/reviews
- http://your-vps-ip:3001/server/data/reviews.json

## 6. Проверка логов

В консоли сервера должны появиться логи:
```
2025-01-XX - GET /test
Test route accessed
2025-01-XX - GET /api/reviews
GET /api/reviews - Request received
Found XXX reviews
```

## 7. Возможные проблемы

### Проблема: Файл не найден
**Решение:**
```bash
# Проверить путь к файлу
pwd
ls -la server/data/reviews.json
```

### Проблема: CORS ошибки
**Решение:**
Проверить что в коде есть:
```javascript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Проблема: Порт заблокирован
**Решение:**
```bash
# Открыть порт в firewall
sudo ufw allow 3001
```

## 8. Проверка фронтенда

```bash
# Сборка проекта
npm run build

# Проверка что dist папка создалась
ls -la dist/
```

## 9. Полная диагностика

```bash
# 1. Остановить сервер (Ctrl+C)
# 2. Запустить с подробным логированием
cd server
DEBUG=* node index.cjs

# 3. В другом терминале протестировать
curl -v http://localhost:3001/api/reviews
``` 