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
    classroom: "images/classroom2.jpg",
    corridor: "images/corridor.jpg",
    cafeteria: "images/cafeteria.jpg",
    schoolyard: "images/schoolyard.jpg",
    street: "images/street.jpg",
    street_evening: "images/streetevening.jpg",
    house: "images/house.jpg",
    lera_room: "images/leraroom.jpg",
    snusar_room: "images/snusarroom.jpg",
    school: "images/school.jpg",
    director_cabinet: "images/dirrectorcabinet.jpg",
    liza_room: "images/lizaroom.jpg",
    alexander_room: "images/alexandrroom.jpg"
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
// ========== RUSSIAN SCENES (Episode 3) ==========
const scenesRu = [
    { speaker: "...", text: "на след день в школе", bg: "classroom" },
    { speaker: "Класс", text: "все косо пялят на александра", bg: "classroom" },
    { speaker: "Алона Ведерникова", text: "хахах все то думали ты гангстер, а ты голубенький", bg: "classroom" },
    { speaker: "Полина", text: "эй гангстер, даже не смей подходить к моему снюсарю", bg: "classroom" },
    { speaker: "Снюсарь", text: "я не ожидал от тебя такого гангстер.. не приближайся ко мне", bg: "classroom" },
    { speaker: "Лера", text: "хах.. гангстер теперь изгой", bg: "classroom" },
    { speaker: "Александр", text: "Что происходит? Откуда вы все узнали..? Лера это ты сучка всем сказала?", bg: "classroom" },
    { speaker: "Класс", text: "а ты зайди в подслушано нашей школы и все поймешь", bg: "classroom" },
    { speaker: "...", text: "Александр заходит в подслушано школы", bg: "classroom" },
    { speaker: "Александр", text: "ОТКУДА ЗДЕСЬ ЭТА ЗАПИСЬ, ЛЕРА Я ТЕБЯ ПРИБЬЮ", bg: "classroom" },
    { speaker: "...", text: "в класс заходит директор", bg: "classroom" },
    { speaker: "Директор", text: "Александр, снюсарь и лера - живо ко мне в кабинет!", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "(блин мне его даже жалко...)", bg: "classroom" },
    { speaker: "...", text: "в кабинете директора", bg: "director_cabinet" },
    { speaker: "Директор", text: "ну что рассказывайте по очереди", bg: "director_cabinet" },
    { speaker: "Директор", text: "Александр кого ты там убить собрался?", bg: "director_cabinet" },
    { speaker: "Директор", text: "лера, снюсарь, что за травля новенького и откуда эта чертова запись, вы же понимаете, что это уголовно наказуемо?", bg: "director_cabinet" },
    { speaker: "Александр", text: "да мне плевать, я не виноват! Эта чертовка лера слила мое признание в подслушано школы!", bg: "director_cabinet" },
    { speaker: "Снюсарь", text: "это была не лера!", bg: "director_cabinet" },
    { speaker: "Директор", text: "а кто тогда? Александр? Алона?", bg: "director_cabinet" },
    { speaker: "Снюсарь", text: "Лера скинула эту запись мне, а я слил ее в подслушано школы", bg: "director_cabinet" },
    { speaker: "Директор", text: "и зачем?", bg: "director_cabinet" },
    { speaker: "Снюсарь", text: "чтобы все посмеялись над александром", bg: "director_cabinet" },
    { speaker: "Директор", text: "короче, я не хочу выслушивать этот детский сад, живо удалили все записи", bg: "director_cabinet" },
    { speaker: "Директор", text: "и хоть еще одна надсмешка над александром, мигом всех выпру из школы", bg: "director_cabinet" },
    { speaker: "Директор", text: "а ты александр следи за словами!", bg: "director_cabinet" },
    { speaker: "...", text: "ребята вернулись в класс", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "сашенька, как все прошло?", bg: "classroom" },
    { speaker: "Александр", text: "отвали тупица", bg: "classroom" },
    { speaker: "...", text: "лиза расстроено ушла на свое место", bg: "classroom" },
    { speaker: "...", text: "урок прошел спокойно, но с александром никто больше не общался", bg: "classroom" },
    { speaker: "...", text: "после уроков по пути домой", bg: "street" },
    { speaker: "...", text: "лиза мами легенда нагоняет александра", bg: "street" },
    { speaker: "лиза мами легенда", text: "саша, постой!", bg: "street" },
    { speaker: "Александр", text: "че тебе?", bg: "street" },
    { speaker: "Лиза мами легенда", text: "почему ты меня отталкиваешь? что с тобой? почему ты такой холодный? я разве заслужила это?", bg: "street" },
    { speaker: "...", text: "лиза заплакала", bg: "street" },
    { speaker: "Александр", text: "ты правда так хочешь со мной общаться?", bg: "street" },
    { speaker: "Лиза мами легенда", text: "мне кажется я в тебя вообще влюбилась", bg: "street" },
    { speaker: "...", text: "саша потупился", bg: "street" },
    { speaker: "...", text: "спустя пару минут александрзасосал лизу мами легенду", bg: "street" },
    { speaker: "...", text: "лиза не оттолкнула сашу и они сосались минуты 3", bg: "street" },
    { speaker: "...", text: "лиза отходит от саши", bg: "street" },
    { speaker: "Лиза мами легенда", text: "ты чего? тебе же снюсарь нравится", bg: "street" },
    { speaker: "александр", text: "извини, я импульсивно", bg: "street" },
    { speaker: "Лиза мами легенда", text: "а пошли ко мне?)", bg: "street" },
    { speaker: "Александр", text: "что? зачем?", bg: "street" },
    { speaker: "Лиза мами легенда", text: "пошли, пошли, потом все узнаешь", bg: "street" },
    { speaker: "...", text: "они пришли к лизе домой", bg: "liza_room" },
    { speaker: "Александр", text: "ну и зачем мы пришли?", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ложись на кровать, буду смотреть на твои 19 см", bg: "liza_room" },
    { speaker: "александр", text: "ЧЕГО?", bg: "liza_room" },
    { speaker: "...", text: "мами легенда толкнула александра на кровать", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "заткнись и закрой глаза", bg: "liza_room" },
    { speaker: "...", text: "лиза легла у ног саши и начала снимать с него штаны", bg: "liza_room" },
    { speaker: "...", text: "саша перехватывает руку лизы", bg: "liza_room" },
    { speaker: "александр", text: "погоди, но мы не можем так...", bg: "liza_room" },
    { speaker: "лиза мами легенда", text: "но почему?", bg: "liza_room" },
    { speaker: "Александр", text: "мы одноклассники, видимся второй день и вообще мне нравится снюсарь!", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "но ты меня засосал!", bg: "liza_room" },
    { speaker: "Александр", text: "да я же сказал, это было импульсивно!", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "засоси меня тогда еще раз также импульсивно((", bg: "liza_room" },
    { speaker: "Александр", text: "ладно только быстро", bg: "liza_room" },
    { speaker: "...", text: "александр и лиза сосутся около 2 минут", bg: "liza_room" },
    { speaker: "Александр", text: "лиз извини, но мне пора", bg: "liza_room" },
    { speaker: "...", text: "александр спешно уходит", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "и что это сейчас было...", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ладно надо заняться учебой", bg: "liza_room" },
    { speaker: "...", text: "тем временем дома у саши", bg: "alexander_room" },
    { speaker: "александр", text: "фак и как мне добиться снюсаря...?", bg: "alexander_room" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "alexander_room" }
];

// ========== ENGLISH TRANSLATION (Episode 3) ==========
const scenesEn = [
    { speaker: "...", text: "The next day at school", bg: "classroom" },
    { speaker: "Class", text: "Everyone is staring at Alexander", bg: "classroom" },
    { speaker: "Alona Vedernikova", text: "Hahaha, everyone thought you were a gangster, but you're a little gay boy", bg: "classroom" },
    { speaker: "Polina", text: "Hey Gangster, don't you dare come near my Snusar", bg: "classroom" },
    { speaker: "Snusar", text: "I didn't expect this from you, Gangster.. Don't come near me", bg: "classroom" },
    { speaker: "Lera", text: "Hah.. Gangster is an outcast now", bg: "classroom" },
    { speaker: "Alexander", text: "What's going on? How do you all know..? Lera, did you tell everyone, you bitch?", bg: "classroom" },
    { speaker: "Class", text: "Go check the school's 'Overheard' page and you'll understand", bg: "classroom" },
    { speaker: "...", text: "Alexander checks the school's 'Overheard' page", bg: "classroom" },
    { speaker: "Alexander", text: "WHERE DID THIS RECORDING COME FROM? LERA, I'M GOING TO KILL YOU!", bg: "classroom" },
    { speaker: "...", text: "The principal walks into the classroom", bg: "classroom" },
    { speaker: "Principal", text: "Alexander, Snusar, and Lera - come to my office immediately!", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "(Damn, I even feel sorry for him...)", bg: "classroom" },
    { speaker: "...", text: "In the principal's office", bg: "director_cabinet" },
    { speaker: "Principal", text: "Alright, tell me everything one by one", bg: "director_cabinet" },
    { speaker: "Principal", text: "Alexander, who were you going to kill?", bg: "director_cabinet" },
    { speaker: "Principal", text: "Lera, Snusar, what's this bullying of the new student and where did this damn recording come from? You realize this is a criminal offense, right?", bg: "director_cabinet" },
    { speaker: "Alexander", text: "I don't give a damn, I'm not guilty! That damn Lera leaked my confession to the school's 'Overheard' page!", bg: "director_cabinet" },
    { speaker: "Snusar", text: "It wasn't Lera!", bg: "director_cabinet" },
    { speaker: "Principal", text: "Then who? Alexander? Alona?", bg: "director_cabinet" },
    { speaker: "Snusar", text: "Lera sent me the recording, and I leaked it to the 'Overheard' page", bg: "director_cabinet" },
    { speaker: "Principal", text: "And why did you do that?", bg: "director_cabinet" },
    { speaker: "Snusar", text: "So everyone could laugh at Alexander", bg: "director_cabinet" },
    { speaker: "Principal", text: "Alright, I don't want to listen to this kindergarten nonsense. Delete all the recordings immediately.", bg: "director_cabinet" },
    { speaker: "Principal", text: "And if there's even one more mockery of Alexander, I'll expel all of you from school immediately.", bg: "director_cabinet" },
    { speaker: "Principal", text: "And you, Alexander, watch your language!", bg: "director_cabinet" },
    { speaker: "...", text: "The kids return to the classroom", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "Sashenka, how did it go?", bg: "classroom" },
    { speaker: "Alexander", text: "Get lost, idiot", bg: "classroom" },
    { speaker: "...", text: "Lisa sadly goes back to her seat", bg: "classroom" },
    { speaker: "...", text: "The lesson went quietly, but no one talked to Alexander anymore", bg: "classroom" },
    { speaker: "...", text: "After school, on the way home", bg: "street" },
    { speaker: "...", text: "Lisa Mama Legend catches up to Alexander", bg: "street" },
    { speaker: "Lisa Mama Legend", text: "Sasha, wait!", bg: "street" },
    { speaker: "Alexander", text: "What do you want?", bg: "street" },
    { speaker: "Lisa Mama Legend", text: "Why are you pushing me away? What's wrong with you? Why are you so cold? Did I deserve this?", bg: "street" },
    { speaker: "...", text: "Lisa starts crying", bg: "street" },
    { speaker: "Alexander", text: "Do you really want to be around me?", bg: "street" },
    { speaker: "Lisa Mama Legend", text: "I think I've fallen in love with you", bg: "street" },
    { speaker: "...", text: "Sasha looks down", bg: "street" },
    { speaker: "...", text: "A few minutes later, Alexander makes out with Lisa Mama Legend", bg: "street" },
    { speaker: "...", text: "Lisa doesn't push Sasha away and they make out for about 3 minutes", bg: "street" },
    { speaker: "...", text: "Lisa pulls away from Sasha", bg: "street" },
    { speaker: "Lisa Mama Legend", text: "What are you doing? You like Snusar", bg: "street" },
    { speaker: "Alexander", text: "Sorry, it was impulsive", bg: "street" },
    { speaker: "Lisa Mama Legend", text: "Want to come to my place?)", bg: "street" },
    { speaker: "Alexander", text: "What? Why?", bg: "street" },
    { speaker: "Lisa Mama Legend", text: "Come on, come on, you'll find out later", bg: "street" },
    { speaker: "...", text: "They arrive at Lisa's house", bg: "liza_room" },
    { speaker: "Alexander", text: "So why did we come?", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Lie down on the bed, I want to see your 7 inches", bg: "liza_room" },
    { speaker: "Alexander", text: "WHAT?", bg: "liza_room" },
    { speaker: "...", text: "Mama Legend pushes Alexander onto the bed", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Shut up and close your eyes", bg: "liza_room" },
    { speaker: "...", text: "Lisa lies down at Sasha's feet and starts taking off his pants", bg: "liza_room" },
    { speaker: "...", text: "Sasha grabs Lisa's hand", bg: "liza_room" },
    { speaker: "Alexander", text: "Wait, we can't do this...", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "But why?", bg: "liza_room" },
    { speaker: "Alexander", text: "We're classmates, we've only known each other for two days, and besides, I like Snusar!", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "But you made out with me!", bg: "liza_room" },
    { speaker: "Alexander", text: "I told you, it was impulsive!", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Then make out with me again, just as impulsively ((", bg: "liza_room" },
    { speaker: "Alexander", text: "Fine, but make it quick", bg: "liza_room" },
    { speaker: "...", text: "Alexander and Lisa make out for about 2 minutes", bg: "liza_room" },
    { speaker: "Alexander", text: "Liz, sorry, but I have to go", bg: "liza_room" },
    { speaker: "...", text: "Alexander leaves hurriedly", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "What was that all about...", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Alright, I need to study", bg: "liza_room" },
    { speaker: "...", text: "Meanwhile, at Sasha's house", bg: "alexander_room" },
    { speaker: "Alexander", text: "Fuck, how do I win Snusar over...?", bg: "alexander_room" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "alexander_room" }
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