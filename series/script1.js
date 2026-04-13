// ========== СЦЕНАРИЙ 1 СЕРИИ ==========

// АВАТАРКИ
const avatars = {
    default: "images/default.jpg",
    gangster: "images/gangster.jpg",
    lera: "images/lera.jpg",
    liza: "images/liza.jpg",
    teacher: "images/teacher.jpg",
    snusar: "images/snusar.jpg",
    director: "images/dirrector.jpeg",
    polina: "images/polina.jpg",
    classroom: "images/classroom.jpg"
};

function getAvatar(speaker) {
    const name = speaker.toLowerCase();
    if (name.includes("александр") || name.includes("саша") || name.includes("гангстер") || name.includes("alexander") || name.includes("sasha") || name.includes("gangster")) return avatars.gangster;
    if (name.includes("лера") || name.includes("lera")) return avatars.lera;
    if (name.includes("лиза") || name.includes("мами легенда") || name.includes("liza") || name.includes("mama legend")) return avatars.liza;
    if (name.includes("учительница") || name.includes("песковская") || name.includes("teacher") || name.includes("peskovskaya")) return avatars.teacher;
    if (name.includes("снюсарь") || name.includes("snusar")) return avatars.snusar;
    if (name.includes("директор") || name.includes("principal")) return avatars.director;
    if (name.includes("полина") || name.includes("polina")) return avatars.polina;
    if (name.includes("класс") || name.includes("вся школа") || name.includes("толпа") || name.includes("class") || name.includes("school") || name.includes("crowd")) return avatars.classroom;
    return avatars.default;
}

// ФОНЫ
const backgrounds = {
    classroom: "images/classroom2.jpg",
    corridor: "images/corridor.jpg",
    cafeteria: "images/cafeteria.jpg",
    schoolyard: "images/schoolyard.jpg"
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
        showNotification('⚡ Auto-read ON');
    } else {
        stopAutoRead();
        showNotification('⏹️ Auto-read OFF');
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
// ========== РУССКИЕ СЦЕНЫ ==========
const scenesRu = [
    { speaker: "...", text: "в наш класс поступил новенький. это изменило мою жизнь..", bg: "classroom" },
    { speaker: "Учительница", text: "и так перед тем как начать наш урок хочу вам представить нашего новенького, его зовут Александр, поприветствуйте новенького.", bg: "classroom" },
    { speaker: "Александр", text: "Эй йоу лузеры, короче теперь учусь с вами. По имени меня не звать. Моя кликуха - гангстер.", bg: "classroom" },
    { speaker: "Класс", text: "... (все молчат и косо палят на александра)", bg: "classroom" },
    { speaker: "Александр", text: "и че вы молчите все? Скукотища..", bg: "classroom" },
    { speaker: "Лера", text: "Эй гангстер, садись ко мне, будем кентаврами, ты мне понравился.", bg: "classroom" },
    { speaker: "Александр", text: "Эй крошка, ну ты тоже не зазнавайся, но раз ты набралась смелости, то так и быть сяду.", bg: "classroom" },
    { speaker: "Лиза Мами Легенда", text: "(факин щит, он такой красавчик, мой гангстерито, как бы с ним замутить...)", bg: "classroom" },
    { speaker: "Учительница", text: "так всем тихо, начинаем урок.", bg: "classroom" },
    { speaker: "Учительница", text: "тема сегодняшнего урока 'Почему Я - Песковская, самая крутая и сваговая коровлева'.", bg: "classroom" },
    { speaker: "Учительница", text: "класс, пишем 10 причин на листочках и сдаем в конце урока.", bg: "classroom" },
    { speaker: "...", text: "где то после урока", bg: "corridor" },
    { speaker: "Лера", text: "Сашуль, а чем ты увлекаешься?", bg: "corridor" },
    { speaker: "Александр", text: "сучка, совсем оборзела, я попросил называть меня Гангстер.", bg: "corridor" },
    { speaker: "Лиза Мами Легенда", text: "Эй гангстер, ты играешь в пабг?", bg: "corridor" },
    { speaker: "Александр", text: "О телочка та в теме, не знаю как тебя зовут, но да - играю.", bg: "corridor" },
    { speaker: "Лиза мами легенда", text: "можешь звать меня просто Мами Легенда. Это моя кликуха.", bg: "corridor" },
    { speaker: "Александр", text: "АХХАХАХАХХАХАХХА, какая еще мами легенда, вы че все странные.", bg: "corridor" },
    { speaker: "Лера", text: "да не обращай внимания на эту фрикуху, она тик токи снимает, гангстер пошли в столовку, замочим по булке с повидлом.", bg: "corridor" },
    { speaker: "...", text: "Александр и Лера уходят в столовку.", bg: "corridor" },
    { speaker: "Лиза мами легенда", text: "КТО ИЗ НАС ФРИКУХА? Я отомщу еще этой дуре. Гангстер будет мой!", bg: "corridor" },
    { speaker: "...", text: "где то в столовке...", bg: "cafeteria" },
    { speaker: "Лера", text: "че покупать будем?", bg: "cafeteria" },
    { speaker: "Александр", text: "какой покупать, я здесь и рубля не оставлю, смотри и учись.", bg: "cafeteria" },
    { speaker: "...", text: "Александр подходит к первоклассникам", bg: "cafeteria" },
    { speaker: "Александр", text: "Эй пиздюки, это моя порция пюрэшки.", bg: "cafeteria" },
    { speaker: "...", text: "Александр вырывает тарелку у школьника и уходит.", bg: "cafeteria" },
    { speaker: "Лера", text: "Гангстер, но так же нельзя..", bg: "cafeteria" },
    { speaker: "Александр", text: "Иди помалкивай лера, а то щас к этой мами легенде вернусь.", bg: "cafeteria" },
    { speaker: "...", text: "Первоклассник чью порцию только что отжал александр оказался младшим бартом Ильи Снюсаря.", bg: "cafeteria" },
    { speaker: "...", text: "Илья снюсарь - одноклассник гангстера, мами легенды, леры и тд...", bg: "cafeteria" },
    { speaker: "Тот самый младшеклассник", text: "Снюсарь, там какой то чел с Лерой из твоего класса отжали мою пюрэху, разберись!", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "Малой щас все будет", bg: "cafeteria" },
    { speaker: "...", text: "снюсарь несется к лере и новенькому", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "эй новенький ты не совсем обнаглел? Схуев ты отбираешь еду у моего мл. брата?", bg: "cafeteria" },
    { speaker: "александр", text: "Я ГАНГСТЕР! ЗАПОМНИ РАЗ И НАВСЕГДА УТЫРОК. да и че ты мне сделаешь?", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "уеба, жду тебя после уроков за школой, покажешь какой ты гангстер.", bg: "cafeteria" },
    { speaker: "Александр", text: "хах, первый учебный день и уже стрела. Ну за школой так за школой.", bg: "cafeteria" },
    { speaker: "...", text: "Снюсарь вырывает тарелку у саши и уходит.", bg: "cafeteria" },
    { speaker: "александр", text: "эй громила ты куда поперся, это моя хавка.", bg: "cafeteria" },
    { speaker: "...", text: "АЛЕКСАНДР со всей дури толкает снюсаря.", bg: "cafeteria" },
    { speaker: "...", text: "снюсарь роняет тарелку", bg: "cafeteria" },
    { speaker: "снюсарь", text: "ух щас будет жарко...", bg: "cafeteria" },
    { speaker: "...", text: "снюсарь оборачивается к гангстеру и хуярит ему пощечину.", bg: "cafeteria" },
    { speaker: "Лера", text: "эй мальчики не ссорьтесь.", bg: "cafeteria" },
    { speaker: "гангстер и снюсарь", text: "заткнись!", bg: "cafeteria" },
    { speaker: "...", text: "начинается потасовка", bg: "cafeteria" },
    { speaker: "Саша", text: "Пошла игра АХАХХАХАХАХАХ", bg: "cafeteria" },
    { speaker: "снюсарь", text: "надеюсь ты приготовил баночку куда будешь собирать зубы", bg: "cafeteria" },
    { speaker: "...", text: "драка в самом разгаре. Саша сплевывает кровь.", bg: "cafeteria" },
    { speaker: "...", text: "в столовку врывается директор", bg: "cafeteria" },
    { speaker: "Директор", text: "эй вы оба, VSE, PROVALIVAYTE, U VAS NOGI VONYAUT", bg: "cafeteria" },
    { speaker: "Директор", text: "завтра оба с родителями в школу!", bg: "cafeteria" },
    { speaker: "Снюсарь", text: "мы не договорили, после уроков за школой.", bg: "cafeteria" },
    { speaker: "Александр", text: "ага..", bg: "cafeteria" },
    { speaker: "...", text: "саша и лера выходят из столовки", bg: "corridor" },
    { speaker: "...", text: "им на встречу идет мами легенда.", bg: "corridor" },
    { speaker: "мами легенда", text: "эй гангстер, здорово тебе наваляли, кто это?", bg: "corridor" },
    { speaker: "Александр", text: "тебе какая разница фрикуха?", bg: "corridor" },
    { speaker: "Лера", text: "Это был снюсарь!", bg: "corridor" },
    { speaker: "Саша", text: "Заткнись дура", bg: "corridor" },
    { speaker: "Мами легенда", text: "МОЙ БЫВШИЙ!?", bg: "corridor" },
    { speaker: "...", text: "после уроков за школой", bg: "schoolyard" },
    { speaker: "Снюсарь", text: "ну че псевдо гангстер, ответиишь за слова?", bg: "schoolyard" },
    { speaker: "Гангстер", text: "ну че громила, до первой крови?", bg: "schoolyard" },
    { speaker: "...", text: "Стрелка началась..", bg: "schoolyard" },
    { speaker: "Мами легенда", text: "блин надеюсь гангстер выиграет, он красавчик", bg: "schoolyard" },
    { speaker: "Лера", text: "ГАНГСТЕР ВПЕРЕД", bg: "schoolyard" },
    { speaker: "Полина Чечерина", text: "Снюсарь любимый давай!", bg: "schoolyard" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ..", bg: "schoolyard" }
];

// ========== АНГЛИЙСКИЙ ПЕРЕВОД ==========
const scenesEn = [
    { speaker: "...", text: "A new student joined our class. It changed my life..", bg: "classroom" },
    { speaker: "Teacher", text: "So, before we start our lesson, I want to introduce our new student. His name is Alexander. Please welcome him.", bg: "classroom" },
    { speaker: "Alexander", text: "Hey yo losers, I'm gonna be studying with you now. Don't call me by my name. My nickname is Gangster.", bg: "classroom" },
    { speaker: "Class", text: "... (everyone is silent and staring at Alexander)", bg: "classroom" },
    { speaker: "Alexander", text: "Why are you all quiet? So boring..", bg: "classroom" },
    { speaker: "Lera", text: "Hey Gangster, sit next to me. We'll be like buddies. I like you.", bg: "classroom" },
    { speaker: "Alexander", text: "Hey babe, don't get too cocky. But since you had the guts, fine, I'll sit.", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "(Fucking shit, he's so handsome. My little gangster. How can I hook up with him...)", bg: "classroom" },
    { speaker: "Teacher", text: "Everyone quiet, let's start the lesson.", bg: "classroom" },
    { speaker: "Teacher", text: "Today's topic is 'Why I, Peskovskaya, am the coolest and most swag queen'.", bg: "classroom" },
    { speaker: "Teacher", text: "Class, write down 10 reasons on a piece of paper and turn them in at the end of the lesson.", bg: "classroom" },
    { speaker: "...", text: "Sometime after the lesson...", bg: "corridor" },
    { speaker: "Lera", text: "Sashul, what are you into?", bg: "corridor" },
    { speaker: "Alexander", text: "Bitch, have you lost your mind? I asked you to call me Gangster.", bg: "corridor" },
    { speaker: "Lisa Mama Legend", text: "Hey Gangster, do you play PUBG?", bg: "corridor" },
    { speaker: "Alexander", text: "Oh, a chick who knows her stuff. I don't know your name, but yeah, I play.", bg: "corridor" },
    { speaker: "Lisa Mama Legend", text: "You can just call me Mama Legend. That's my nickname.", bg: "corridor" },
    { speaker: "Alexander", text: "HAHAHAHA, what kind of Mama Legend? Are you all freaks?", bg: "corridor" },
    { speaker: "Lera", text: "Don't pay attention to that freak. She makes TikToks. Gangster, let's go to the cafeteria, grab some buns with jam.", bg: "corridor" },
    { speaker: "...", text: "Alexander and Lera head to the cafeteria.", bg: "corridor" },
    { speaker: "Lisa Mama Legend", text: "WHO'S THE FREAK HERE? I'll get back at that idiot. Gangster will be mine!", bg: "corridor" },
    { speaker: "...", text: "Somewhere in the cafeteria...", bg: "cafeteria" },
    { speaker: "Lera", text: "What should we buy?", bg: "cafeteria" },
    { speaker: "Alexander", text: "Buy? I'm not leaving a single ruble here. Watch and learn.", bg: "cafeteria" },
    { speaker: "...", text: "Alexander approaches the first-graders.", bg: "cafeteria" },
    { speaker: "Alexander", text: "Hey little punks, this is my serving of mashed potatoes.", bg: "cafeteria" },
    { speaker: "...", text: "Alexander snatches the plate from the kid and leaves.", bg: "cafeteria" },
    { speaker: "Lera", text: "Gangster, you can't do that..", bg: "cafeteria" },
    { speaker: "Alexander", text: "Shut up, Lera, or I'll go back to that Mama Legend.", bg: "cafeteria" },
    { speaker: "...", text: "The first-grader whose plate Alexander just stole turned out to be the younger brother of Ilya Snusar.", bg: "cafeteria" },
    { speaker: "...", text: "Ilya Snusar is a classmate of Gangster, Mama Legend, Lera, and the others...", bg: "cafeteria" },
    { speaker: "The first-grader", text: "Snusar, some guy with Lera from your class stole my mashed potatoes, handle it!", bg: "cafeteria" },
    { speaker: "Snusar", text: "Kid, it's gonna be handled.", bg: "cafeteria" },
    { speaker: "...", text: "Snusar rushes towards Lera and the new kid.", bg: "cafeteria" },
    { speaker: "Snusar", text: "Hey newbie, have you lost your mind? You steal food from my little brother?", bg: "cafeteria" },
    { speaker: "Alexander", text: "I'M GANGSTER! REMEMBER THAT, YOU PUSSY. And what are you gonna do about it?", bg: "cafeteria" },
    { speaker: "Snusar", text: "Asshole, I'll wait for you after school. Show me what kind of gangster you are.", bg: "cafeteria" },
    { speaker: "Alexander", text: "Hah, first day of school and already a fight. After school it is.", bg: "cafeteria" },
    { speaker: "...", text: "Snusar snatches the plate from Sasha and leaves.", bg: "cafeteria" },
    { speaker: "Alexander", text: "Hey big guy, where do you think you're going? That's my food!", bg: "cafeteria" },
    { speaker: "...", text: "ALEXANDER shoves Snusar with all his might.", bg: "cafeteria" },
    { speaker: "...", text: "Snusar drops the plate.", bg: "cafeteria" },
    { speaker: "Snusar", text: "Oh, it's about to get heated...", bg: "cafeteria" },
    { speaker: "...", text: "Snusar turns to Gangster and slaps him hard.", bg: "cafeteria" },
    { speaker: "Lera", text: "Hey boys, don't fight.", bg: "cafeteria" },
    { speaker: "Gangster and Snusar", text: "SHUT UP!", bg: "cafeteria" },
    { speaker: "...", text: "A brawl breaks out.", bg: "cafeteria" },
    { speaker: "Sasha", text: "Let's go! HAHAHAHAHA", bg: "cafeteria" },
    { speaker: "Snusar", text: "I hope you brought a jar to collect your teeth.", bg: "cafeteria" },
    { speaker: "...", text: "The fight is in full swing. Sasha spits out blood.", bg: "cafeteria" },
    { speaker: "...", text: "The principal bursts into the cafeteria.", bg: "cafeteria" },
    { speaker: "Principal", text: "Hey you two, EVERYONE OUT, YOUR FEET STINK!", bg: "cafeteria" },
    { speaker: "Principal", text: "Both of you, bring your parents to school tomorrow!", bg: "cafeteria" },
    { speaker: "Snusar", text: "We're not done. After school.", bg: "cafeteria" },
    { speaker: "Alexander", text: "Yeah..", bg: "cafeteria" },
    { speaker: "...", text: "Sasha and Lera leave the cafeteria.", bg: "corridor" },
    { speaker: "...", text: "Mama Legend comes towards them.", bg: "corridor" },
    { speaker: "Mama Legend", text: "Hey Gangster, you got beaten up pretty bad. Who did this?", bg: "corridor" },
    { speaker: "Alexander", text: "Why do you care, freak?", bg: "corridor" },
    { speaker: "Lera", text: "It was Snusar!", bg: "corridor" },
    { speaker: "Sasha", text: "Shut up, idiot!", bg: "corridor" },
    { speaker: "Mama Legend", text: "MY EX-BOYFRIEND?!", bg: "corridor" },
    { speaker: "...", text: "After school...", bg: "schoolyard" },
    { speaker: "Snusar", text: "So, pseudo-gangster, you gonna answer for your words?", bg: "schoolyard" },
    { speaker: "Gangster", text: "So, big guy, first blood?", bg: "schoolyard" },
    { speaker: "...", text: "The showdown begins..", bg: "schoolyard" },
    { speaker: "Mama Legend", text: "Damn, I hope Gangster wins... He's so handsome.", bg: "schoolyard" },
    { speaker: "Lera", text: "GO GANGSTER!", bg: "schoolyard" },
    { speaker: "Polina Checherina", text: "Snusar, my love, let's go!", bg: "schoolyard" },
    { speaker: "...", text: "TO BE CONTINUED..", bg: "schoolyard" }
];

// Выбираем язык
let scenes = isEnglish ? scenesEn : scenesRu;

// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
    localStorage.setItem(`progress_1`, percent);
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
    scenes = isEnglish ? scenesEn : scenesRu;
    
    const currentScene = scenes[currentSceneIndex];
    if (currentScene) {
        if (speakerName) speakerName.innerText = currentScene.speaker;
        if (dialogueText) dialogueText.innerText = currentScene.text;
    }
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

updateUIText();
showScene(0);
if (choicesPanel) choicesPanel.classList.remove('active');
waitingForChoice = false;
loadProgress();