// ========== СЦЕНАРИЙ 1 СЕРИИ ==========

// AVATARS
const avatars = {
    default: "images/default.jpg",
    gangster: "images/gangster.jpg",
    lera: "images/lera.jpg",
    liza: "images/liza.jpg",
    teacher: "images/teacher.jpg",
    snusar: "images/snusar.jpg",
    director: "images/dirrector.jpeg",
    polina: "images/polina.jpg",
    classroom: "images/classroom.jpg",
    alona: "images/alonavedernikova.jpeg",
    peskovskaya: "images/teacher.jpg"
};

function getAvatar(speaker) {
    const name = speaker.toLowerCase();
    if (name.includes("александр") || name.includes("саша") || name.includes("гангстер")) return avatars.gangster;
    if (name.includes("лера")) return avatars.lera;
    if (name.includes("лиза") || name.includes("мами легенда")) return avatars.liza;
    if (name.includes("учительница") || name.includes("песковская")) return avatars.teacher;
    if (name.includes("снюсарь")) return avatars.snusar;
    if (name.includes("директор")) return avatars.director;
    if (name.includes("полина")) return avatars.polina;
    if (name.includes("класс") || name.includes("вся школа") || name.includes("толпа")) return avatars.classroom;
    return avatars.default;
}
// BACKGROUNDS
const backgrounds = {
    cafeteria: "images/cafeteria.jpg",
    corridor: "images/corridor.jpg",
    director_cabinet: "images/dirrectorcabinet.jpg",
    liza_room: "images/lizaroom.jpg",
    street: "images/street.jpg",
    classroom: "images/classroom2.jpg"
};
// ========== АВТОЧТЕНИЕ ==========
let autoReadEnabled = false;
let autoReadInterval = null;
let autoReadSpeed = 3000;
let autoReadPaused = false;
let pauseTimeout = null;

if (localStorage.getItem('autoReadEnabled') === 'true') {
    autoReadEnabled = true;
}
if (localStorage.getItem('autoReadSpeed')) {
    autoReadSpeed = parseInt(localStorage.getItem('autoReadSpeed'));
}

function startAutoRead() {
    if (autoReadInterval) clearInterval(autoReadInterval);
    autoReadInterval = setInterval(() => {
        if (!waitingForChoice && !autoReadPaused) {
            goToNextScene();
        }
    }, autoReadSpeed);
}

function stopAutoRead() {
    if (autoReadInterval) {
        clearInterval(autoReadInterval);
        autoReadInterval = null;
    }
}

function toggleAutoRead() {
    autoReadEnabled = !autoReadEnabled;
    if (autoReadEnabled) {
        startAutoRead();
        showNotification('⚡ Авточтение ВКЛ');
    } else {
        stopAutoRead();
        showNotification('⏹️ Авточтение ВЫКЛ');
    }
    localStorage.setItem('autoReadEnabled', autoReadEnabled);
}

function setAutoReadSpeed(speed) {
    autoReadSpeed = speed;
    if (autoReadEnabled) {
        startAutoRead();
    }
    localStorage.setItem('autoReadSpeed', speed);
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'auto-read-notification';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

document.addEventListener('click', () => {
    if (autoReadEnabled) {
        autoReadPaused = true;
        if (pauseTimeout) clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => {
            autoReadPaused = false;
        }, 3000);
    }
});

if (autoReadEnabled) {
    startAutoRead();
}
// ========== МУЗЫКА ДЛЯ СЕРИЙ ==========
let bgMusic = null;
let musicEnabled = true;
let musicVolume = 0.5;

if (localStorage.getItem('musicEnabled') !== null) {
    musicEnabled = localStorage.getItem('musicEnabled') === 'true';
}
if (localStorage.getItem('musicVolume') !== null) {
    musicVolume = parseFloat(localStorage.getItem('musicVolume')) / 100;
}

// СЮДА ВСТАВЬ СВОЮ ПЕСНЮ ↓↓↓
const MUSIC_URL = '../series/music/alena.mp3';  // ← ЗАМЕНИ НА СВОЮ ПЕСНЮ

function getBackgroundMusic() {
    if (!bgMusic) {
        bgMusic = new Audio(MUSIC_URL);
        bgMusic.loop = true;
        bgMusic.volume = musicVolume;
    }
    return bgMusic;
}

function updateMusicVolume(volume) {
    musicVolume = volume;
    if (bgMusic) bgMusic.volume = volume;
    localStorage.setItem('musicVolume', Math.round(volume * 100));
}

function updateMusicEnabled(enabled) {
    musicEnabled = enabled;
    localStorage.setItem('musicEnabled', enabled);
    if (enabled) {
        getBackgroundMusic().play().catch(e => console.log("Нажмите на экран"));
    } else if (bgMusic) {
        bgMusic.pause();
    }
}

// Запуск музыки
document.addEventListener('click', function startMusic() {
    if (musicEnabled && (!bgMusic || bgMusic.paused)) {
        getBackgroundMusic().play().catch(e => console.log("Ошибка"));
    }
}, { once: false });
// ========== ЯЗЫК ==========
let isEnglish = localStorage.getItem('language') === 'en';

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const urlLang = getUrlParam('lang');
if (urlLang === 'en') {
    isEnglish = true;
    localStorage.setItem('language', 'en');
} else if (urlLang === 'ru') {
    isEnglish = false;
    localStorage.setItem('language', 'ru');
}

// ========== RUSSIAN SCENES (Episode 5) ==========
const scenesRu = [
    { speaker: "Лиза мами легенда", text: "да сейчас секунду, я сбегаю к директору", bg: "cafeteria" },
    { speaker: "Песковская", text: "давай быстрее", bg: "cafeteria" },
    { speaker: "...", text: "лиза побежала к директору", bg: "corridor" },
    { speaker: "Лиза", text: "боже а если он не поверит мне...", bg: "corridor" },
    { speaker: "Лиза", text: "ладно будь что будет", bg: "corridor" },
    { speaker: "...", text: "лиза зашла в кабинет директора", bg: "director_cabinet" },
    { speaker: "Лиза", text: "директор, срочно, там песковская упала в столовой и сломала спину", bg: "director_cabinet" },
    { speaker: "Директор", text: "опять врешь, да? иди отсюда", bg: "director_cabinet" },
    { speaker: "Лиза", text: "нет, пожалуйста, на этот раз серьезно", bg: "director_cabinet" },
    { speaker: "Директор", text: "ты уверена? а то опять скажешь, что над тобой пошутили", bg: "director_cabinet" },
    { speaker: "Лиза", text: "нет, клянусь, я сама стала свидетелем на этот раз", bg: "director_cabinet" },
    { speaker: "Директор", text: "ну пошли посмотрим, но если обманула, то пеняй на себя", bg: "director_cabinet" },
    { speaker: "Лиза", text: "идемте скорее", bg: "director_cabinet" },
    { speaker: "...", text: "лиза и директор вышли с кабинета", bg: "director_cabinet" },
    { speaker: "...", text: "весь спотевший саша вылез из шкафа", bg: "director_cabinet" },
    { speaker: "Александр", text: "боже наконец то", bg: "director_cabinet" },
    { speaker: "...", text: "саша в след побежал в столовую", bg: "corridor" },
    { speaker: "...", text: "через пару минут в столовой", bg: "cafeteria" },
    { speaker: "Директор", text: "о боже, что с вами случилось?", bg: "cafeteria" },
    { speaker: "Песковская", text: "помогите, умоляю, кто то разлил компот на пол, я поскользнулась и упала", bg: "cafeteria" },
    { speaker: "Директор", text: "сейчас я вызову скорую", bg: "cafeteria" },
    { speaker: "Алона Ведерникова", text: "песковская, давайте руку, я вам помогу", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "отойди соплячка, я сам ей помогу", bg: "cafeteria" },
    { speaker: "Полина", text: "а ты не приофигел?", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "полина, заткнись, ты не видишь, что человеку нужна помощь", bg: "cafeteria" },
    { speaker: "Полина", text: "вот с ней и оставайся, а я пошла", bg: "cafeteria" },
    { speaker: "...", text: "полина ушла", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "чокнутая", bg: "cafeteria" },
    { speaker: "Лера", text: "алона, хватит снимать, это тебе не шоу представление", bg: "cafeteria" },
    { speaker: "Алона Ведерникова", text: "боже, ладно", bg: "cafeteria" },
    { speaker: "Директор", text: "я вызвал скорую, она скоро будет", bg: "cafeteria" },
    { speaker: "Песковская", text: "помогите мне уже", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "да, конечно, давайте руку", bg: "cafeteria" },
    { speaker: "...", text: "снюсарь и директор подняли песковскую", bg: "cafeteria" },
    { speaker: "...", text: "снюсарь и директор увели песковскую", bg: "cafeteria" },
    { speaker: "...", text: "все начали расходиться", bg: "cafeteria" },
    { speaker: "...", text: "через какое то время в коридоре", bg: "corridor" },
    { speaker: "Александр", text: "УРА, ЛИЗ, А НАМ ОТМЕНЯТ УРОКИ?", bg: "corridor" },
    { speaker: "Лиза", text: "а я откуда знаю? лучше скажи, ты забрал свой вейп?", bg: "corridor" },
    { speaker: "Александр", text: "очень эгоистично с твоей стороны, у нас только увезли в скорой песковскую, а тебе лишь вейп интересен", bg: "corridor" },
    { speaker: "Лиза", text: "а с твоей не менее эгоистично, у нас только что песковская спину сломала, а тебе лишь бы уроки отменили", bg: "corridor" },
    { speaker: "Лиза", text: "так что там по вейпу?", bg: "corridor" },
    { speaker: "Александр", text: "ццц, да забрал я свой вейп", bg: "corridor" },
    { speaker:"...", text: "в то же время где то в кабинете", bg: "classroom" },
    { speaker: "...", text: "снюсарь уже вернулся и нашел полину", bg: "classroom" },
    { speaker: "Снюсарь", text: "зайка ты серьезно меня бросаешь?", bg: "classroom" },
    { speaker: "Полина", text: "да я серьезно, проваливай козел", bg: "classroom" },
    { speaker: "...", text: "полина дала пощечину снюсарю и ушла", bg: "classroom" },
    { speaker: "Снюсарь", text: "боже, с мужиками и то проще, может к гангстеру подкатить", bg: "classroom" },
    { speaker: "...", text: "на улице после уроков", bg: "street" },
    { speaker: "Лиза", text: "ну что, гангстер, идем ко мне?) кое кто мой должник", bg: "street" },
    { speaker: "Александр", text: "будто у меня есть выбор", bg: "street" },
    { speaker: "...", text: "вдруг за их спинами раздаются торопливые шаги", bg: "street" },
    { speaker: "...", text: "кто то окликнул гангстера", bg: "street" },
    { speaker: "Лиза", text: "это же...", bg: "street" },
    { speaker: "Александр", text: "снюсарь", bg: "street" },
    { speaker: "Снюсарь", text: "извините, что отвлекаю вас, саш можно тебя на пару слов?", bg: "street" },
    { speaker: "Александр", text: "да, пошли отойдем, лиз жди здесь", bg: "street" },
    { speaker: "Лиза", text: "ага, оке", bg: "street" },
    { speaker: "...", text: "саша и снюсарь отходят", bg: "street" },
    { speaker: "Снюсарь", text: "саш, помнишь ты мне в любви признавался?", bg: "street" },
    { speaker: "Александр", text: "ну да и что? посмеяться хочешь?", bg: "street" },
    { speaker: "Снюсарь", text: "нет, я хотел сказать, что это взаимно...", bg: "street" },
    { speaker: "Александр", text: "с чего бы мне тебе верить? ты вообще с полиной встречаешься", bg: "street" },
    { speaker: "Снюсарь", text: "мы расстались уже, я понял, что бабы это не мое, мне нравишься ты", bg: "street" },
    { speaker: "Александр", text: "и с чего бы мне верить тебе?", bg: "street" },
    { speaker: "Снюсарь", text: "приходи завтра ко мне домой и сам все увидишь", bg: "street" },
    { speaker: "Александр", text: "до встречи тогда", bg: "street" },
    { speaker: "Снюсарь", text: "пока, любимый, до встречи", bg: "street" },
    { speaker: "...", text: "саша вернулся к лизе", bg: "street" },
    { speaker: "Александр", text: "ну что, идем", bg: "street" },
    { speaker: "Лиза", text: "идем", bg: "street" },
    { speaker: "...", text: "у лизы дома", bg: "liza_room" },
    { speaker: "Лиза", text: "что тебе сказал снюсарь?", bg: "liza_room" },
    { speaker: "Александр", text: "да так, там пустяки, неважно", bg: "liza_room" },
    { speaker: "Лиза", text: "ну ок, давай ложись", bg: "liza_room" },
    { speaker: "...", text: "саша лег на кровать", bg: "liza_room" },
    { speaker: "...", text: "лиза навалилась на сашу и они начали сосаться", bg: "liza_room" },
    { speaker: "Лиза", text: "боже саша ты шикарен", bg: "liza_room" },
    { speaker: "Александр", text: "лиза поспокойнее, ты сейчас меня съешь", bg: "liza_room" },
    { speaker: "Лиза", text: "оу мой гангстерито, у меня есть один фетиш, можешь взять мои волосы в кулак и натянуть", bg: "liza_room" },
    { speaker: "Александр", text: "ого щас", bg: "liza_room" },
    { speaker: "...", text: "саша натянул волосы лизы", bg: "liza_room" },
    { speaker: "Лиза", text: "*стонет* о-даа", bg: "liza_room" },
    { speaker: "Лиза", text: "саш.. это что.. у тебя встал?", bg: "liza_room" },
    { speaker: "Александр", text: "а ты проверь", bg: "liza_room" },
    { speaker: "...", text: "лиза снимает с саши штаны", bg: "liza_room" },
    { speaker: "Лиза", text: "ого, он такой огромный...", bg: "liza_room" },
    { speaker: "Александр", text: "а ты как хотела, моя сучка?) возьми его", bg: "liza_room" },
    { speaker: "...", text: "лиза начинает дрочить саше", bg: "liza_room" },
    { speaker: "Александр", text: "одаааа, быстрее", bg: "liza_room" },
    { speaker: "...", text: "лиза наращивает темп", bg: "liza_room" },
    { speaker: "Александр", text: "мами легенда, целуй меня", bg: "liza_room" },
    { speaker: "...", text: "лиза и саша сосутся", bg: "liza_room" },
    { speaker: "...", text: "саша кончает", bg: "liza_room" },
    { speaker: "Лиза", text: "ауч саша, слишком много спермы", bg: "liza_room" },
    { speaker: "Александр", text: "так слижи ее)", bg: "liza_room" },
    { speaker: "Лиза", text: "нет. дайте мне хоть 5 миллион долларов: нет.", bg: "liza_room" },
    { speaker: "...", text: "лиза делает сигма фейс", bg: "liza_room" },
    { speaker: "...", text: "саша вытирается", bg: "liza_room" },
    { speaker: "Лиза", text: "саш тебе пора идти, а то мама скоро вернется", bg: "liza_room" },
    { speaker: "Александр", text: "ладно, давай, пока", bg: "liza_room" },
    { speaker: "...", text: "саша целует лизу на прощание и уходит", bg: "liza_room" },
    { speaker: "Лиза", text: "боже, это были мои лучшие 15 минут..", bg: "liza_room" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "liza_room" }
];

// ========== ENGLISH TRANSLATION (Episode 5) ==========
const scenesEn = [
    { speaker: "Lisa Mama Legend", text: "Hold on a second, I'll run to the principal", bg: "cafeteria" },
    { speaker: "Peskovskaya", text: "Hurry up", bg: "cafeteria" },
    { speaker: "...", text: "Lisa runs to the principal", bg: "corridor" },
    { speaker: "Lisa", text: "God, what if he doesn't believe me...", bg: "corridor" },
    { speaker: "Lisa", text: "Alright, whatever happens, happens", bg: "corridor" },
    { speaker: "...", text: "Lisa enters the principal's office", bg: "director_cabinet" },
    { speaker: "Lisa", text: "Principal, hurry, Peskovskaya fell in the cafeteria and broke her back!", bg: "director_cabinet" },
    { speaker: "Principal", text: "Are you lying again? Get out of here", bg: "director_cabinet" },
    { speaker: "Lisa", text: "No, please, this time I'm serious", bg: "director_cabinet" },
    { speaker: "Principal", text: "Are you sure? Or will you say you were just joking again?", bg: "director_cabinet" },
    { speaker: "Lisa", text: "No, I swear, I witnessed it myself this time", bg: "director_cabinet" },
    { speaker: "Principal", text: "Alright, let's go check, but if you're lying, you'll regret it", bg: "director_cabinet" },
    { speaker: "Lisa", text: "Let's go quickly!", bg: "director_cabinet" },
    { speaker: "...", text: "Lisa and the principal leave the office", bg: "director_cabinet" },
    { speaker: "...", text: "A sweaty Sasha climbs out of the closet", bg: "director_cabinet" },
    { speaker: "Alexander", text: "God, finally", bg: "director_cabinet" },
    { speaker: "...", text: "Sasha runs after them to the cafeteria", bg: "corridor" },
    { speaker: "...", text: "A few minutes later in the cafeteria", bg: "cafeteria" },
    { speaker: "Principal", text: "Oh my god, what happened to you?", bg: "cafeteria" },
    { speaker: "Peskovskaya", text: "Help me, please, someone spilled compote on the floor, I slipped and fell", bg: "cafeteria" },
    { speaker: "Principal", text: "I'll call an ambulance right now", bg: "cafeteria" },
    { speaker: "Alona Vedernikova", text: "Peskovskaya, give me your hand, I'll help you", bg: "cafeteria" },
    { speaker: "Snusar", text: "Step aside, brat, I'll help her myself", bg: "cafeteria" },
    { speaker: "Polina", text: "Have you lost your mind?", bg: "cafeteria" },
    { speaker: "Snusar", text: "Polina, shut up, can't you see the person needs help?", bg: "cafeteria" },
    { speaker: "Polina", text: "Stay with her then, I'm leaving", bg: "cafeteria" },
    { speaker: "...", text: "Polina leaves", bg: "cafeteria" },
    { speaker: "Snusar", text: "Crazy", bg: "cafeteria" },
    { speaker: "Lera", text: "Alona, stop filming, this isn't a show", bg: "cafeteria" },
    { speaker: "Alona Vedernikova", text: "God, fine", bg: "cafeteria" },
    { speaker: "Principal", text: "I've called an ambulance, it'll be here soon", bg: "cafeteria" },
    { speaker: "Peskovskaya", text: "Just helpme already", bg: "cafeteria" },
    { speaker: "Snusar", text: "Yes, of course, give me your hand", bg: "cafeteria" },
    { speaker: "...", text: "Snusar and the principal lift Peskovskaya", bg: "cafeteria" },
    { speaker: "...", text: "Snusar and the principal lead Peskovskaya away", bg: "cafeteria" },
    { speaker: "...", text: "Everyone starts to disperse", bg: "cafeteria" },
    { speaker: "...", text: "Some time later in the hallway", bg: "corridor" },
    { speaker: "Alexander", text: "HURRAY, LIZA, ARE OUR CLASSES CANCELED?", bg: "corridor" },
    { speaker: "Lisa", text: "How should I know? Tell me, did you get your vape back?", bg: "corridor" },
    { speaker: "Alexander", text: "That's very selfish of you. Peskovskaya was just taken away in an ambulance, and all you care about is your vape.", bg: "corridor" },
    { speaker: "Lisa", text: "And it's no less selfish of you. Peskovskaya just broke her back, and all you care about is getting out of class.", bg: "corridor" },
    { speaker: "Lisa", text: "So, what about the vape?", bg: "corridor" },
    { speaker: "Alexander", text: "Tsk, yeah, I got my vape back", bg: "corridor" },
    { speaker: "...", text: "Meanwhile, somewhere in a classroom", bg: "classroom" },
    { speaker: "...", text: "Snusar has returned and found Polina", bg: "classroom" },
    { speaker: "Snusar", text: "Babe, are you seriously breaking up with me?", bg: "classroom" },
    { speaker: "Polina", text: "Yes, I'm serious. Get lost, you jerk", bg: "classroom" },
    { speaker: "...", text: "Polina slaps Snusar and leaves", bg: "classroom" },
    { speaker: "Snusar", text: "God, even with guys it's easier. Maybe I should hit on Gangster", bg: "classroom" },
    { speaker: "...", text: "Outside after school", bg: "street" },
    { speaker: "Lisa", text: "So, Gangster, are we going to my place?) Someone owes me", bg: "street" },
    { speaker: "Alexander", text: "As if I have a choice", bg: "street" },
    { speaker: "...", text: "Suddenly, hurried footsteps are heard behind them", bg: "street" },
    { speaker: "...", text: "Someone calls out to Gangster", bg: "street" },
    { speaker: "Lisa", text: "It's...", bg: "street" },
    { speaker: "Alexander", text: "Snusar", bg: "street" },
    { speaker: "Snusar", text: "Sorry to interrupt, Sash, can I have a word with you?", bg: "street" },
    { speaker: "Alexander", text: "Yeah, let's step aside. Liz, wait here", bg: "street" },
    { speaker: "Lisa", text: "Yeah, okay", bg: "street" },
    { speaker: "...", text: "Sasha and Snusar step aside", bg: "street" },
    { speaker: "Snusar", text: "Sash, remember when you confessed your love to me?", bg: "street" },
    { speaker: "Alexander", text: "Yeah, so what? Want to make fun of me?", bg: "street" },
    { speaker: "Snusar", text: "No, I wanted to say... it's mutual...", bg: "street" },
    { speaker: "Alexander", text: "Why should I believe you? You're dating Polina", bg: "street" },
    { speaker: "Snusar", text: "We broke up already. I realized that women aren't for me. I like you.", bg: "street" },
    { speaker: "Alexander", text: "And why should I believe you?", bg: "street" },
    { speaker: "Snusar", text: "Come to my place tomorrow and you'll see for yourself", bg: "street" },
    { speaker: "Alexander", text: "See you then", bg: "street" },
    { speaker: "Snusar", text: "Bye, my love, see you", bg: "street" },
    { speaker: "...", text: "Sasha returns to Lisa", bg: "street" },
    { speaker: "Alexander", text: "So, let's go", bg: "street" },
    { speaker: "Lisa", text: "Let's go", bg: "street" },
    { speaker: "...", text: "At Lisa's house", bg: "liza_room" },
    { speaker: "Lisa", text: "What did Snusar tell you?", bg: "liza_room" },
    { speaker: "Alexander", text: "Nothing important, forget it", bg: "liza_room" },
    { speaker: "Lisa", text: "Okay, just lie down", bg: "liza_room" },
    { speaker: "...", text: "Sasha lies down on the bed", bg: "liza_room" },
    { speaker: "...", text: "Lisa climbs on top of Sasha and they start making out", bg: "liza_room" },
    { speaker: "Lisa", text: "God, Sasha, you're amazing", bg: "liza_room" },
    { speaker: "Alexander", text: "Lisa, calm down, you're going to eat me alive", bg: "liza_room" },
    { speaker: "Lisa", text: "Oh my gangsterito, I have one fetish. You can grab my hair and pull it", bg: "liza_room" },
    { speaker: "Alexander", text: "Wow, okay", bg: "liza_room" },
    { speaker: "...", text: "Sasha pulls Lisa's hair", bg: "liza_room" },
    { speaker: "Lisa", text: "*moans* oh-yeah", bg: "liza_room" },
    { speaker: "Lisa", text: "Sash.. is that.. are you hard?", bg: "liza_room" },
    { speaker: "Alexander", text: "Check for yourself", bg: "liza_room" },
    { speaker: "...", text: "Lisa takes off Sasha's pants", bg: "liza_room" },
    { speaker: "Lisa", text: "Wow, it's so huge...", bg: "liza_room" },
    { speaker: "Alexander", text: "What did you expect, my bitch?) Take it", bg: "liza_room" },
    { speaker: "...", text: "Lisa starts jerking Sasha off", bg: "liza_room" },
    { speaker: "Alexander", text: "Oh yeah, faster", bg: "liza_room" },
    { speaker: "...", text: "Lisa speeds up", bg: "liza_room" },
    { speaker: "Alexander", text: "Mama Legend, kiss me", bg: "liza_room" },
    { speaker: "...", text: "Lisa and Sasha make out", bg: "liza_room" },
    { speaker: "...", text: "Sasha cums", bg: "liza_room" },
    { speaker: "Lisa", text: "Ow, Sasha, that's too much cum", bg: "liza_room" },
    { speaker: "Alexander", text: "So lick it off)", bg: "liza_room" },
    { speaker: "Lisa", text: "No. Even for 5 million dollars: no.", bg: "liza_room" },
    { speaker: "...", text: "Lisa makes a sigma face", bg: "liza_room" },
    { speaker: "...", text: "Sasha wipes himself off", bg: "liza_room" },
    { speaker: "Lisa", text: "Sash, you need to go, my mom will be back soon", bg: "liza_room" },
    { speaker: "Alexander", text: "Alright, see you later", bg: "liza_room" },
    { speaker: "...", text: "Sasha kisses Lisa goodbye and leaves", bg: "liza_room" },
    { speaker: "Lisa", text: "God, that was the best 15 minutes of my life..", bg: "liza_room" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "liza_room" }
];
// Выбираем язык
let scenes = isEnglish ? scenesEn : scenesRu;
// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
    localStorage.setItem(`progress_1`, percent);
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_1`);
    if (saved) {
        // Можно спросить пользователя, хочет ли он продолжить
        console.log(`Сохранённый прогресс 1 серии: ${saved}%`);
    }
}

// ========== КОД ДЛЯ РАБОТЫ НОВЕЛЛЫ ==========
let currentSceneIndex = 0;
let waitingForChoice = false;

const bgElement = document.getElementById('background');
const fadeOverlay = document.getElementById('fadeOverlay');
const speakerName = document.getElementById('speakerName');
const dialogueText = document.getElementById('dialogueText');
const dialogueBox = document.getElementById('dialogueBox');
const choicesPanel = document.getElementById('choicesPanel');
const choicesList = document.getElementById('choicesList');
const progressFill = document.getElementById('progressFill');
const backToMenu = document.getElementById('backToMenu');
const avatarImg = document.getElementById('avatarImg');
const statusBadge = document.getElementById('statusBadge');

if (backToMenu) {
    backToMenu.onclick = () => window.location.href = "../index.html";
}

function updateProgress() {
    if (scenes.length > 0 && progressFill) {
        const percent = (currentSceneIndex / (scenes.length - 1)) * 100;
        progressFill.style.width = percent + '%';
    }
    saveProgress();
}

function setBackground(bgKey) {
    const bgUrl = backgrounds[bgKey];
    if (bgUrl && bgElement) {
        bgElement.style.backgroundImage = `url('${bgUrl}')`;
        bgElement.style.backgroundSize = 'cover';
        bgElement.style.backgroundPosition = 'center';
    }
}

function updateAvatar(speaker) {
    if (avatarImg) {
        avatarImg.src = getAvatar(speaker);
        const container = document.querySelector('.avatar-container');
        if (container) {
            container.style.animation = 'none';
            setTimeout(() => { container.style.animation = 'avatarPop 0.4s ease-out'; }, 10);
        }
    }
}

function updateUIText() {
    if (statusBadge) {
        if (isEnglish) {
            statusBadge.textContent = "EPISODE 1: THE NEWBIE";
        } else {
            statusBadge.textContent = "СЕРИЯ 1: НОВЕНЬКИЙ";
        }
    }
}

function showScene(index) {
    if (index >= scenes.length) {
        if (speakerName) speakerName.innerText = isEnglish ? "END OF EPISODE" : "КОНЕЦ СЕРИИ";
        if (dialogueText) dialogueText.innerText = isEnglish ? "Moving to Episode 2..." : "Переход на 2 серию...";
        setTimeout(() => { window.location.href = "episode2.html" + (isEnglish ? '?lang=en' : ''); }, 2000);
        return;
    }
    const scene = scenes[index];
    if (speakerName) speakerName.innerText = scene.speaker;
    if (dialogueText) dialogueText.innerText = scene.text;
    setBackground(scene.bg);
    updateAvatar(scene.speaker);
    updateProgress();
}

function goToNextScene() {
    if (waitingForChoice) return;
    if (currentSceneIndex < scenes.length - 1) {
        currentSceneIndex++;
        showScene(currentSceneIndex);
    } else {
        if (dialogueBox) dialogueBox.style.cursor = "default";
        if (speakerName) speakerName.innerText = isEnglish ? "END OF EPISODE 1" : "КОНЕЦ 1 СЕРИИ";
        if (dialogueText) dialogueText.innerText = isEnglish ? "Moving to Episode 2..." : "Переход на 2 серию...";
        setTimeout(() => { window.location.href = "episode2.html" + (isEnglish ? '?lang=en' : ''); }, 2000);
    }
}

document.addEventListener('click', (e) => {
    if (waitingForChoice) return;
    if (e.target.closest('.back-to-menu')) return;
    if (e.target.closest('.choices-panel')) return;
    if (e.target.closest('.choice-btn')) return;
    if (e.target.closest('.settings-btn-series')) return;
    if (e.target.closest('.settings-panel-series')) return;
    if (e.target.closest('.close-settings-series')) return;
    if (e.target.closest('.toggle-switch-series')) return;
    if (e.target.closest('input[type="range"]')) return;
    if (e.target.closest('select')) return;
    goToNextScene();
});

// ========== НАСТРОЙКИ В СЕРИИ ==========
const settingsBtnSeries = document.getElementById('settingsBtnSeries');
const settingsPanelSeries = document.getElementById('settingsPanelSeries');
const closeSettingsBtnSeries = document.getElementById('closeSettingsBtnSeries');
const musicToggleSeries = document.getElementById('musicToggleSeries');
const volumeSliderSeries = document.getElementById('volumeSliderSeries');
const volumeValueSeries = document.getElementById('volumeValueSeries');
const languageToggleSeries = document.getElementById('languageToggleSeries');
const autoReadToggleSeries = document.getElementById('autoReadToggleSeries');
const autoReadSpeedSelect = document.getElementById('autoReadSpeedSeries');

function setLanguage(enabled) {
    isEnglish = enabled;
    localStorage.setItem('language', enabled ? 'en' : 'ru');
    updateUIText();
}

if (languageToggleSeries) {
    languageToggleSeries.checked = isEnglish;
    languageToggleSeries.addEventListener('change', (e) => {
        e.stopPropagation();
        setLanguage(e.target.checked);
    });
}

if (autoReadToggleSeries) {
    autoReadToggleSeries.checked = autoReadEnabled;
    autoReadToggleSeries.addEventListener('change', (e) => {
        e.stopPropagation();
        toggleAutoRead();
    });
}

if (autoReadSpeedSelect) {
    autoReadSpeedSelect.value = autoReadSpeed;
    autoReadSpeedSelect.addEventListener('change', (e) => {
        e.stopPropagation();
        setAutoReadSpeed(parseInt(e.target.value));
    });
}
// ========== НАСТРОЙКИ МУЗЫКИ ==========
if (musicToggleSeries) {
    musicToggleSeries.checked = musicEnabled;
    musicToggleSeries.addEventListener('change', (e) => {
        e.stopPropagation();
        updateMusicEnabled(e.target.checked);
    });
}

if (volumeSliderSeries) {
    volumeSliderSeries.value = musicVolume * 100;
    if (volumeValueSeries) volumeValueSeries.textContent = Math.round(musicVolume * 100) + '%';
    volumeSliderSeries.addEventListener('input', (e) => {
        e.stopPropagation();
        const volume = parseFloat(e.target.value) / 100;
        updateMusicVolume(volume);
        if (volumeValueSeries) volumeValueSeries.textContent = Math.round(volume * 100) + '%';
    });
}
if (settingsBtnSeries) {
    settingsBtnSeries.onclick = (e) => {
        e.stopPropagation();
        if (settingsPanelSeries) settingsPanelSeries.classList.add('active');
    };
}
if (closeSettingsBtnSeries) {
    closeSettingsBtnSeries.onclick = (e) => {
        e.stopPropagation();
        if (settingsPanelSeries) settingsPanelSeries.classList.remove('active');
    };
}
if (settingsPanelSeries) {
    settingsPanelSeries.onclick = (e) => {
        if (e.target === settingsPanelSeries) settingsPanelSeries.classList.remove('active');
    };
}
// ========== ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЯЗЫКА ==========
function setLanguage(enabled) {
    isEnglish = enabled;
    localStorage.setItem('language', enabled ? 'en' : 'ru');
    
    // ПЕРЕКЛЮЧАЕМ МАССИВ СЦЕН
    scenes = isEnglish ? scenesEn : scenesRu;
    
    // ОБНОВЛЯЕМ ТЕКУЩУЮ СЦЕНУ (чтобы текст сразу поменялся)
    const currentScene = scenes[currentSceneIndex];
    if (currentScene) {
        if (speakerName) speakerName.innerText = currentScene.speaker;
        if (dialogueText) dialogueText.innerText = currentScene.text;
    }
    
    // ОБНОВЛЯЕМ СТАТУС-БЕЙДЖ
    if (statusBadge) {
        if (isEnglish) {
            statusBadge.textContent = "EPISODE 2: CONFESSION";  // для 2 серии
            // для 3 серии: "EPISODE 3: CONSEQUENCES"
            // для 4 серии: "EPISODE 4: DISS ON GANGSTER"
            // для 5 серии: "EPISODE 5: RECIPROCITY"
            // для 6 серии: "EPISODE 6: LOVE AND PASSION"
        } else {
            statusBadge.textContent = "СЕРИЯ 2: ПРИЗНАНИЕ";  // для 2 серии
            // для 3 серии: "СЕРИЯ 3: ПОСЛЕДСТВИЯ"
            // для 4 серии: "СЕРИЯ 4: ДИСС НА ГАНГСТЕРА"
            // для 5 серии: "СЕРИЯ 5: ВЗАИМНОСТЬ"
            // для 6 серии: "СЕРИЯ 6: ЛЮБОВЬ И СТРАСТЬ"
        }
    }
}
updateUIText();
showScene(0);
if (choicesPanel) choicesPanel.classList.remove('active');
waitingForChoice = false;
loadProgress();
