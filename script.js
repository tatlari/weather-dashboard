// ۱. کلید API خودت رو اینجا بذار (حتماً داخل کوتیشن باشه)
const API_KEY = 'e26e64022439cf46849a0d96ce3da578'; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message'); // متغیر جدید
const weatherIcon = document.getElementById('weather-icon'); // متغیر جدید

async function getWeather(city) {
    try {
        // مخفی کردن ارور قبلی در شروع جستجوی جدید
        errorMessage.style.display = 'none';
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('شهر پیدا نشد! لطفا املای شهر رو بررسی کن.');
        }

        const data = await response.json();
        updateUI(data);

    } catch (error) {
        // به جای آلرت، ارور رو توی خود صفحه نشون می‌دیم
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

function updateUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    // گرفتن کلمه کلیدی وضعیت هوا (مثل Clear, Clouds, Rain)
    const weatherCondition = data.weather[0].main;
    
    // یک دیکشنری می‌سازیم که وضعیت هوا رو به اسم عکس‌های سه‌بعدی شما وصل کنه
    const iconMap = {
        'Clear': 'clear.png',
        'Clouds': 'clouds.png',
        'Rain': 'rain.png',
        'Drizzle': 'rain.png',
        'Snow': 'snow.png'
    };

    // اگر وضعیت هوا تو لیست ما بود، عکس مربوطه رو بذار، وگرنه عکس پیش‌فرض رو نشون بده
    const selectedIcon = iconMap[weatherCondition] || 'clouds.png';

    // آدرس عکس رو روی تگ img تنظیم می‌کنیم
    weatherIcon.src = `images/${selectedIcon}`;
    weatherIcon.style.display = 'block';
    
    // تنظیم اندازه آیکون سه‌بعدی برای اینکه خیلی بزرگ نشه
    weatherIcon.style.width = '150px'; 
}
// گوش دادن به کلیک روی دکمه
searchBtn.addEventListener('click', () => {
    if (cityInput.value) getWeather(cityInput.value);
});

// قابلیت حرفه‌ای: گوش دادن به دکمه Enter در کیبورد
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (cityInput.value) getWeather(cityInput.value);
    }
});