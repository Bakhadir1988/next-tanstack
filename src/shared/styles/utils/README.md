# Fluid Typography Utils

Автоматизированная система для создания fluid typography с помощью SCSS функций (только px).

## Функция

### `fluid-size($min-size, $max-size)`

Универсальная функция для создания fluid размеров.

```scss
// Пример использования
h1 {
  font-size: fluid-size(32px, 48px);
  // Результат: clamp(32px, 32px + 1vw, 48px)
}

p {
  font-size: fluid-size(14px, 16px);
  // Результат: clamp(14px, 14px + 0.125vw, 16px)
}

.icon {
  width: fluid-size(20px, 28px);
  // Результат: clamp(20px, 20px + 0.5vw, 28px)
}
```

## Как это работает

1. **Автоматический расчет коэффициента vw** на основе разности размеров
2. **Учет viewport диапазона** (320px - 1920px)
3. **Единый алгоритм** для всех типов контента
4. **Простота** - одна функция для всего

## Примеры использования

### В токенах

```scss
// shared/styles/tokens/_typography.scss
:root {
  --font-size-h1: #{fluid-size(32px, 48px)};
  --font-size-h2: #{fluid-size(24px, 36px)};
  --font-size-p: #{fluid-size(14px, 16px)};
}
```

### В компонентах

```scss
// components/card.scss
.card-title {
  font-size: fluid-size(20px, 24px);
}

.card-text {
  font-size: fluid-size(14px, 16px);
}

.card-icon {
  width: fluid-size(24px, 32px);
}
```

### В утилитах

```scss
// utilities/typography.scss
.text-xs {
  font-size: fluid-size(12px, 14px);
}
.text-sm {
  font-size: fluid-size(14px, 16px);
}
.text-base {
  font-size: fluid-size(16px, 18px);
}
.text-lg {
  font-size: fluid-size(18px, 20px);
}
.text-xl {
  font-size: fluid-size(20px, 24px);
}
```

## Преимущества

✅ **Простота** - только px, никаких проблем с rem  
✅ **Понятность** - размеры в пикселях интуитивно понятны  
✅ **Точность** - математически точные расчеты vw  
✅ **Совместимость** - работает во всех браузерах  
✅ **Производительность** - быстрее компилируется  
✅ **Надежность** - единый алгоритм для всего  
✅ **Гибкость** - одна функция для любых размеров  
✅ **Чистота кода** - нет дублирования функций

## Настройка

Вы можете изменить базовые параметры в файле `_fluid-typography.scss`:

```scss
// Настраиваемые параметры
$fluid-min-vw: 320px; // Минимальная ширина viewport
$fluid-max-vw: 1920px; // Максимальная ширина viewport
$fluid-container-width: $fluid-max-vw - $fluid-min-vw; // 1600px

// Пример: изменить диапазон на 375px - 1440px
$fluid-min-vw: 375px;
$fluid-max-vw: 1440px;
$fluid-container-width: $fluid-max-vw - $fluid-min-vw; // 1065px
```

## Размеры по умолчанию

```scss
// Заголовки
--font-size-h1: clamp(32px, 32px + 1vw, 48px); // 32px → 48px
--font-size-h2: clamp(24px, 24px + 0.75vw, 36px); // 24px → 36px
--font-size-h3: clamp(20px, 20px + 0.625vw, 30px); // 20px → 30px
--font-size-h4: clamp(18px, 18px + 0.375vw, 24px); // 18px → 24px
--font-size-h5: clamp(16px, 16px + 0.25vw, 20px); // 16px → 20px
--font-size-h6: clamp(14px, 14px + 0.25vw, 18px); // 14px → 18px

// Текст
--font-size-p: clamp(14px, 14px + 0.125vw, 16px); // 14px → 16px
```

## Исправленные проблемы

### ❌ Проблема с дублированием:

- **Было:** Три функции (`fluid-size`, `fluid-heading`, `fluid-text`) делали одно и то же
- **Код:** Дублирование логики, сложность поддержки

### ✅ Решение:

- **Стало:** Одна функция `fluid-size` для всего
- **Код:** Простота, чистота, легкость поддержки

## Тестирование

Откройте страницы для проверки:

- `/px-demo` - демонстрация функции
- `/fluid-test` - полный тест системы
- `/functions-comparison` - сравнение (устарело, но показывает историю)
