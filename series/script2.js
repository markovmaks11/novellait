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
alona: "images/alonavedernikova.jpg",
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
    schoolyard: "images/schoolyard.jpg",
    street: "images/street.jpg",
    street_evening: "images/streetevening.jpg",
    house: "images/house.jpg",
    lera_room: "images/leraroom.jpg",
    snusar_room: "images/snusarroom.jpg",
    school: "images/school.jpg"
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

// ========== RUSSIAN SCENES (Episode 2) ==========
const scenesRu = [
    { speaker: "...", text: "драка началась", bg: "schoolyard" },
    { speaker: "...", text: "снюсарь нападает на гангстера", bg: "schoolyard" },
    { speaker: "снюсарь", text: "НА ХА ПОЛУЧАЙ", bg: "schoolyard" },
    { speaker: "...", text: "снюсарь разбил губу гангстеру", bg: "schoolyard" },
    { speaker: "александр", text: "АУЧ СНЮСАРЬ СЛИШКОМ ЖЕСТКО", bg: "schoolyard" },
    { speaker: "Снюсарь", text: "сейчас ты будешь получать ПИЗДЫЫ, потому что ты натворил ХУЙНИ в столовой.", bg: "schoolyard" },
    { speaker: "Снюсарь", text: "в столовой были СЕЛЕБЫ, а ты вместо того, чтобы делать ПОСЕВЫ, украл у моего брата еду", bg: "schoolyard" },
    { speaker: "Александр", text: "это не драка... в противном случае еще раз обращаюсь ко всем..", bg: "schoolyard" },
    { speaker: "Александр", text: "я лучше соберу 300 человек, которые будут болеть за меня до потери пульса", bg: "schoolyard" },
    { speaker: "Александр", text: "потные уходить со стрелки, но болеть по полной, чем собирать всю школу", bg: "schoolyard" },
    { speaker: "Александр", text: "поэтому если вы прямо сейчас хотите болеть за меня", bg: "schoolyard" },
    { speaker: "Александр", text: "быть со мной одним целым", bg: "schoolyard" },
    { speaker: "Александр", text: "у нас еще есть время для того, чтобы все изменить", bg: "schoolyard" },
    { speaker: "Александр", text: "ведь скажите не кайфово смотреть на гангстера, который просто стоит, верно?", bg: "schoolyard" },
    { speaker: "Александр", text: "а гангстеру вдвойне не кайфовее смотреть на людей, которые просто смотрят в телефоны", bg: "schoolyard" },
    { speaker: "Александр", text: "чат, чат, я обиделся...", bg: "schoolyard" },
    { speaker: "Вся школа", text: "убирают телефоны", bg: "schoolyard" },
    { speaker: "...", text: "Снюсарь прослезился", bg: "schoolyard" },
    { speaker: "...", text: "Полина упала на колени в слезах", bg: "schoolyard" },
    { speaker: "Лиза мами легенда", text: "это очень трогательно", bg: "schoolyard" },
    { speaker: "Полина", text: "ГАНГСТЕР ТРОГАЙ МЕНЯ ВЕЗДЕ", bg: "schoolyard" },
    { speaker: "...", text: "Мами легенда начала аплодировать", bg: "schoolyard" },
    { speaker: "...", text: "вся толпа взорвалась в аплодисментах", bg: "schoolyard" },
    { speaker: "...", text: "из за спин резко выходят песковская и директор", bg: "schoolyard" },
    { speaker: "Песковская", text: "Молодцы ребята, я поражена, честно", bg: "schoolyard" },
    { speaker: "Директор", text: "А теперь миритесь и все по домам", bg: "schoolyard" },
    { speaker: "...", text: "Снюсарь и гангстер помирились", bg: "schoolyard" },
    { speaker: "...", text: "Полина и снюсарь пошли вместе домой", bg: "street" },
    { speaker: "Полина", text: "вот это у вас слово пацана было", bg: "street" },
    { speaker: "Снюсарь", text: "да и не говори..", bg: "street" },
    { speaker: "...", text: "тем временем гангстер и лера", bg: "street_evening" },
    { speaker: "Лера", text: "гангстер я в тебя влюбилась", bg: "street_evening" },
    { speaker: "александр", text: "ЧТО!?", bg: "street_evening" },
    { speaker: "Лера", text: "так и скажи что тебе понравилась эта сучка мами легенда", bg: "street_evening" },
    { speaker: "Александр", text: "фу никогда не упоминай имя этой фрикухи", bg: "street_evening" },
    { speaker: "Лера", text: "так что скажешь, я нравлюсь тебе..?", bg: "street_evening" },
    { speaker: "Александр", text: "Пора открыть тебе свою тайну..", bg: "street_evening" },
    { speaker: "Лера", text: "что, какую? неужели ты влюбился в меня?", bg: "street_evening" },
    { speaker: "Александр", text: "нет.. на самом деле, я влюбился...", bg: "street_evening" },
    { speaker: "...", text: "Лера перебивает", bg: "street_evening" },
    { speaker: "Лера", text: "ВСЕ ТАКИ В ЭТУ СУЧКУ МАМИ ЛЕГЕНДУ", bg: "street_evening" },
    { speaker: "Лера", text: "или может быть в нашу тихоню Алону Ведерникову?)))", bg: "street_evening" },
    { speaker: "Александр", text: "да тихо ты", bg: "street_evening" },
    { speaker: "Александр", text: "я влюбился...", bg: "street_evening" },
    { speaker: "Александр", text: "нуууууу фак я не знаю как сказать", bg: "street_evening" },
    { speaker: "Александр", text: "короче..", bg: "street_evening" },
    { speaker: "Александр", text: "В снюсаря", bg: "street_evening" },
    { speaker: "Лера", text: "что, что....? Мне не послышалось это?", bg: "street_evening" },
    { speaker: "Лера", text: "ты..", bg: "street_evening" },
    { speaker: "Лера", text: "ты.. ты гей?", bg: "street_evening" },
    { speaker: "Александр", text: "Не суди книгу по о боже..", bg: "street_evening" },
    { speaker: "Александр", text: "нет! я бишечка", bg: "street_evening" },
    { speaker: "Лера", text: "ну ты же знаешь, что снюсарь встречается с полиной чечевицей?", bg: "street_evening" },
    { speaker: "Александр", text: "знаю и планирую увести своего снюсярика у полины))", bg: "street_evening" },
    { speaker: "Лера", text: "но он натурал!", bg: "street_evening" },
    { speaker: "Александр", text: "еще ни один натурал не устоял перед моими 19 см..)", bg: "street_evening" },
    { speaker: "Лера", text: "так я тоже не смогу перед ними устоять))", bg: "street_evening" },
    { speaker: "Александр", text: "не извини, но ты не мой типаж", bg: "street_evening" },
    { speaker: "...", text: "они дошли до дома леры", bg: "house" },
    { speaker: "лера", text: "ну вот и мой дом, спасибо, что проводил и извини..", bg: "house" },
    { speaker: "Александр", text: "Ага, проваливай уже", bg: "house" },
    { speaker: "...", text: "Лера зашла домой", bg: "house" },
    { speaker: "...", text: "но гангстер еще не знал, что лера записала его признание на диктофон", bg: "lera_room" },
    { speaker: "Лера", text: "какая интересная запись) сейчас скину все снюсарю", bg: "lera_room" },
    { speaker: "...", text: "лера скидывает аудиозапись снюсарю", bg: "lera_room" },
    { speaker: "...", text: "ответ снюсаря приходит почти сразу", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "что.. я не верю своим ушам", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "в меня влюбился..", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "ГАНГСТЕР", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь скидывает эту запись в подслушано школы", bg: "snusar_room" },
    { speaker: "снюсарь", text: "вся школа взорвется от такой новости", bg: "snusar_room" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "snusar_room" }
];

// ========== ENGLISH TRANSLATION (Episode 2) ==========
const scenesEn = [
    { speaker: "...", text: "The fight has begun", bg: "schoolyard" },
    { speaker: "...", text: "Snusar attacks the Gangster", bg: "schoolyard" },
    { speaker: "Snusar", text: "TAKE THIS!", bg: "schoolyard" },
    { speaker: "...", text: "Snusar busts Gangster's lip", bg: "schoolyard" },
    { speaker: "Alexander", text: "OUCH, SNUSAR, THAT'S TOO ROUGH", bg: "schoolyard" },
    { speaker: "Snusar", text: "You're about to get your ass kicked, because you messed up big time in the cafeteria.", bg: "schoolyard" },
    { speaker: "Snusar", text: "There were celebs in the cafeteria, and instead of doing something cool, you stole my brother's food.", bg: "schoolyard" },
    { speaker: "Alexander", text: "This isn't a fight... otherwise, I'm addressing everyone again..", bg: "schoolyard" },
    { speaker: "Alexander", text: "I'd rather gather 300 people who will cheer for me until they lose their pulse.", bg: "schoolyard" },
    { speaker: "Alexander", text: "It's better to leave the showdown sweating but cheering hard, than to gather the whole school.", bg: "schoolyard" },
    { speaker: "Alexander", text: "So if you want to cheer for me right now...", bg: "schoolyard" },
    { speaker: "Alexander", text: "Be one with me.", bg: "schoolyard" },
    { speaker: "Alexander", text: "We still have time to change everything.", bg: "schoolyard" },
    { speaker: "Alexander", text: "Tell me, isn't it lame to just watch a gangster standing there, right?", bg: "schoolyard" },
    { speaker: "Alexander", text: "And it's twice as lame for the gangster to watch people just staring at their phones.", bg: "schoolyard" },
    { speaker: "Alexander", text: "Chat, chat, I'm offended...", bg: "schoolyard" },
    { speaker: "The whole school", text: "They put away their phones", bg: "schoolyard" },
    { speaker: "...", text: "Snusar gets teary-eyed", bg: "schoolyard" },
    { speaker: "...", text: "Polina falls to her knees in tears", bg: "schoolyard" },
    { speaker: "Lisa Mama Legend", text: "That's very touching", bg: "schoolyard" },
    { speaker: "Polina", text: "GANGSTER, TOUCH ME EVERYWHERE!", bg: "schoolyard" },
    { speaker: "...", text: "Mama Legend starts applauding", bg: "schoolyard" },
    { speaker: "...", text: "The whole crowd erupts in applause", bg: "schoolyard" },
    { speaker: "...", text: "Suddenly, Peskovskaya and the principal step out from behind", bg: "schoolyard" },
    { speaker: "Peskovskaya", text: "Good job, guys, I'm honestly impressed", bg: "schoolyard" },
    { speaker: "Principal", text: "Now make up and everyone go home", bg: "schoolyard" },
    { speaker: "...", text: "Snusar and Gangster make up", bg: "schoolyard" },
    { speaker: "...", text: "Polina and Snusar walk home together", bg: "street" },
    { speaker: "Polina", text: "That was some real 'word of a brother' stuff", bg: "street" },
    { speaker: "Snusar", text: "Yeah, tell me about it..", bg: "street" },
    { speaker: "...", text: "Meanwhile, Gangster and Lera", bg: "street_evening" },
    { speaker: "Lera", text: "Gangster, I've fallen in love with you", bg: "street_evening" },
    { speaker: "Alexander", text: "WHAT!?", bg: "street_evening" },
    { speaker: "Lera", text: "Just admit you liked that bitch Mama Legend", bg: "street_evening" },
    { speaker: "Alexander", text: "Ugh, never mention that freak's name again", bg: "street_evening" },
    { speaker: "Lera", text: "So what do you say? Do you like me..?", bg: "street_evening" },
    { speaker: "Alexander", text: "It's time to reveal my secret..", bg: "street_evening" },
    { speaker: "Lera", text: "What secret? Did you fall for me?", bg: "street_evening" },
    { speaker: "Alexander", text: "No.. actually, I've fallen for...", bg: "street_evening" },
    { speaker: "...", text: "Lera interrupts", bg: "street_evening" },
    { speaker: "Lera", text: "SO YOU DID FALL FOR THAT BITCH MAMA LEGEND!", bg: "street_evening" },
    { speaker: "Lera", text: "Or maybe for our quiet girl Alona Vedernikova?)))", bg: "street_evening" },
    { speaker: "Alexander", text: "Shut up", bg: "street_evening" },
    { speaker: "Alexander", text: "I've fallen for...", bg: "street_evening" },
    { speaker: "Alexander", text: "Uhhhhh, fuck, I don't know how to say it", bg: "street_evening" },
    { speaker: "Alexander", text: "Long story short..", bg: "street_evening" },
    { speaker: "Alexander", text: "For Snusar", bg: "street_evening" },
    { speaker: "Lera", text: "What, what...? Did I hear that right?", bg: "street_evening" },
    { speaker: "Lera", text: "You..", bg: "street_evening" },
    { speaker: "Lera", text: "You.. you're gay?", bg: "street_evening" },
    { speaker: "Alexander", text: "Don't judge a book by its cover, oh my god..", bg: "street_evening" },
    { speaker: "Alexander", text: "No! I'm bi!", bg: "street_evening" },
    { speaker: "Lera", text: "But you know Snusar is dating Polina Checherina, right?", bg: "street_evening" },
    { speaker: "Alexander", text: "I know, and I plan to steal my Snusarik from Polina))", bg: "street_evening" },
    { speaker: "Lera", text: "But he's straight!", bg: "street_evening" },
    { speaker: "Alexander", text: "Not a single straight guy has ever resisted my 7 inches..)", bg: "street_evening" },
    { speaker: "Lera", text: "Then I won't be able to resist either))", bg: "street_evening" },
    { speaker: "Alexander", text: "Sorry, but you're not my type", bg: "street_evening" },
    { speaker: "...", text: "They reach Lera's house", bg: "house" },
    { speaker: "Lera", text: "Well, here's my house, thanks for walking me, and sorry..", bg: "house" },
    { speaker: "Alexander", text: "Yeah, just go already", bg: "house" },
    { speaker: "...", text: "Lera goes inside", bg: "house" },
    { speaker: "...", text: "But Gangster didn't know that Lera recorded his confession on a voice recorder", bg: "lera_room" },
    { speaker: "Lera", text: "What an interesting recording) I'll send it to Snusar right now", bg: "lera_room" },
    { speaker: "...", text: "Lera sends the audio recording to Snusar", bg: "lera_room" },
    { speaker: "...", text: "Snusar's response comes almost immediately", bg: "snusar_room" },
    { speaker: "Snusar", text: "What.. I can't believe my ears", bg: "snusar_room" },
    { speaker: "Snusar", text: "Someone fell for me..", bg: "snusar_room" },
    { speaker: "Snusar", text: "GANGSTER", bg: "snusar_room" },
    { speaker: "...", text: "Snusar posts the recording to the school's 'Overheard' page", bg: "snusar_room" },
    { speaker: "Snusar", text: "The whole school is going to explode from this news", bg: "snusar_room" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "snusar_room" }
];

// ВЫБИРАЕМ ЯЗЫК (ЭТО СТРОКА, КОТОРАЯ БЫЛА ПРОПУЩЕНА!)
let scenes = isEnglish ? scenesEn : scenesRu;

// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
    localStorage.setItem(`progress_2`, percent);  // ← ЗДЕСЬ ДОЛЖЕН БЫТЬ progress_2 (НЕ progress_1!)
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_2`);
    if (saved) {
        console.log(`Сохранённый прогресс 2 серии: ${saved}%`);
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
