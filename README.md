# Веб-приложение "Чат"
Мессенджер для обмена сообщениями. Позволяет пользователям регистрироваться, создавать личные чаты, отправлять текст, изображения и файлы.

## Дизайн
Ссылка на Figma: https://www.figma.com/design/oW9jOZ8kIUI1DTVWubrKec/messenger?node-id=0-1&t=ejhzhgPyn3jBrDIj-1

## Установка
'npm install' - установить зависимости проекта  
'npm run build' - собрать проект  
'npm run start' - запустить проект на localhost  

## Ссылки
Netlify: https://reliable-licorice-e7bbd7.netlify.app/

## Страницы приложения
Переход между всеми страницами реализован через нижнее меню (Footer), где data-page содержит страницу, на которую необходимо перейти
```
{{> Link href="#" class='page-link' data-page="login" content="Авторизация"}}
{{> Link href="#" class='page-link' data-page="register" content="Регистрация"}}
{{> Link href="#" class='page-link' data-page="chat" content="Список чатов"}}
{{> Link href="#" class='page-link' data-page="profile" content="Профиль"}}
{{> Link href="#" class='page-link' data-page="error500" content="Ошибка 500"}}
{{> Link href="#" class='page-link' data-page="error404" content="Ошибка 404"}}
```
