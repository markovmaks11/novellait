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
    liza_room: "images/lizaroom.jpg",
    studio: "images/studio.jpg",
    classroom: "images/classroom2.jpg",
    director_cabinet: "images/dirrectorcabinet.jpg",
    toilet: "images/toiletschool.jpg",
    corridor: "images/corridor.jpg",
    cafeteria: "images/cafeteria.jpg"
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

// ========== RUSSIAN SCENES (Episode 4) ==========
const scenesRu = [
    { speaker: "...", text: "у лизы дома", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "саша мудак! надо записать на него дисс", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "придумаю сначала текст.", bg: "liza_room" },
    { speaker: "...", text: "спустя какое то время", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "фух, ну вроде все, что там получилось..", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "слушай, гангстер, если бы ты открыл страну, то у нее был бы ред флаг. твой член ищет дыру, как гору - рак", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ты бабник? да ты просто урод. ты гей, который хочет взять у снюсаря на рот", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ты гей поневоле - никто не дал, а ты хотел. ты сам - как твой секс: фальстарт и беспредел", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "неудачник - гангстер - оксюморон блять, ты купил пневмат, чтобы детвору пугать", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ты изгой в школе и это твой пик нахуй и предел, только ссунешься ко мне - отправлю тебя в отдел", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ты не в сериале, но на тебя завели очень странных дел", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ты думал, что твой ствол это статус? а твой статус - член: короткий, немытый и пугает лишь свой же ремень", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "ты мягче, чем моя эмо подушка. твоя жизнь - это слитая запись в подслушку", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "даже лера кинет тебя в бан, ты не гангстер, а геморрой на спине у обезьян", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "саша - изгой - не приговор, а диагноз, ты конченный мудень ну или просто air поц", bg: "liza_room" },
    { speaker: "Лиза мами легенда", text: "так ну вроде норм осталось только записать", bg: "liza_room" },
    { speaker: "...", text: "через какое то время на студии", bg: "studio" },
    { speaker: "...", text: "лиза записывает дисс", bg: "studio" },
    { speaker: "...", text: "еще через час", bg: "studio" },
    { speaker: "Лиза мами легенда", text: "фух ну вроде готово", bg: "studio" },
    { speaker: "...", text: "лиза выкладывает дисс в подслушано школы", bg: "studio" },
    { speaker: "...", text: "на следующий день в школе", bg: "classroom" },
    { speaker: "Алона Ведерникова", text: "хахахха гангстер, так ты не просто гей, а еще и обезьяний геморрой", bg: "classroom" },
    { speaker: "...", text: "александр яростно бежит к лизе и хватает ее за волосы", bg: "classroom" },
    { speaker: "Александр", text: "сучка тупая, еще вчера мне в любви признавалась, а после отказа на меня дисс записываешь", bg: "classroom" },
    { speaker: "...", text: "лиза вырывает волосы из руки саши", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "ты получил ровно то, что заслужил урод! а заигрывать будешь со снюсарем", bg: "classroom" },
    { speaker: "Александр", text: "ах ты ш - общительная, жди ответку", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "да с удовольствием!", bg: "classroom" },
    { speaker: "...", text: "на следующей перемене после урока в мужском туалете", bg: "toilet" },
    { speaker: "...", text: "саша курит свой вэйп", bg: "toilet" },
    { speaker: "Александр", text: "черт, мне надо придумать ответку..", bg: "toilet" },
    { speaker: "...", text: "в туалет заходит директор и видит, как саша курит вейп", bg: "toilet" },
    { speaker: "Директор", text: "чем ты тут занимаешься, негодник!", bg: "toilet" },
    { speaker: "Директор", text: "сегодня же тебя и твоих родителей жду у себя в кабинете!", bg: "toilet" },
    { speaker: "...", text: "директор отбирает у саши вейп и уходит", bg: "toilet" },
    { speaker: "...", text: "после этого случая, на следующей же перемене", bg: "classroom" },
    { speaker: "...", text: "александр подходит к лизе", bg: "classroom" },
    { speaker: "Александр", text: "лиза любимая, я понимаю, что мы с тобой в плохих отношениях, но мне нужна твоя помощь", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "и че ты дашь мне в замен?", bg: "classroom" },
    { speaker: "Александр", text: "в замен ты сможешь поиграть с моими 19 см..", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "не слишком заманчиво, но ладно, в чем заключается моя помощь?", bg: "classroom" },
    { speaker: "Александр", text: "директор спалил меня с вейпом и забрал его", bg: "classroom" },
    { speaker: "Александр", text: "он скорее всего лежит у него в кабинете", bg: "classroom" },
    { speaker: "Александр", text: "мне надо, чтобы ты отвлекла его, а я забрал свой вейп", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "ты совсем!? это же чистой воды безумие, я не буду этого делать", bg: "classroom" },
    { speaker: "Александр", text: "ну пожалуйста пожалуйста, я сделаю все что попросишь", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "ладно", bg: "classroom" },
    { speaker: "Александр", text: "господи я твой должник", bg: "classroom" },
    { speaker: "...", text: "они подошли к кабинету директора", bg: "corridor" },
    { speaker: "Лиза мами легенда", text: "с богом...", bg: "corridor" },
    { speaker: "...", text: "лиза стучит в кабинет директора", bg: "corridor" },
    { speaker: "Директор", text: "войдите", bg: "director_cabinet" },
    { speaker: "...", text: "в кабинете директора", bg: "director_cabinet" },
    { speaker: "Лиза мами легенда", text: "директор срочно, там песковская упала и сломала спину", bg: "director_cabinet" },
    { speaker: "Директор", text: "ЧТО? бежим скорее", bg: "director_cabinet" },
    { speaker: "...", text: "лиза и директор выбегают из кабинета", bg: "director_cabinet" },
    { speaker: "...", text: "саша незаметно проскальзывает вовнутрь", bg: "director_cabinet" },
    { speaker: "...", text: "саша открывает все ящики, вейпа нигде нет", bg: "director_cabinet" },
    { speaker: "...", text: "саша начинает осматривать шкаф", bg: "director_cabinet" },
    { speaker: "Александр", text: "боже, где же он", bg: "director_cabinet" },
    { speaker: "...", text: "саша поднимает какую то папку и там... ВЕЙП", bg: "director_cabinet" },
    { speaker: "Александр", text: "вот же он, мой родной", bg: "director_cabinet" },
    { speaker: "...", text: "вдруг из за двери слышны шаги", bg: "director_cabinet" },
    { speaker: "...", text: "саша быстро все закрывает и прячется в шкаф с одеждой", bg: "director_cabinet" },
    { speaker: "...", text: "в кабинет заходит директор", bg: "director_cabinet" },
    { speaker: "Директор", text: "боже опять их тупые шуточки", bg: "director_cabinet" },
    { speaker: "...", text: "саша пишет лизе", bg: "director_cabinet" },
    { speaker: "Александр", text: "лиза черт он вернулся раньше времени, придумай, что то", bg: "director_cabinet" },
    { speaker: "Лиза мами легенда", text: "черт саша я знаю, ты где?", bg: "director_cabinet" },
    { speaker: "Александр", text: "сижу у него в кабинете в шкафу с одеждой", bg: "director_cabinet" },
    { speaker: "Лиза мами легенда", text: "потерпи немного я что нибудь придумаю", bg: "director_cabinet" },
    { speaker: "...", text: "тем временем в столовке", bg: "cafeteria" },
    { speaker: "...", text: "песковская поскользнулась на разлитом компоте", bg: "cafeteria" },
    { speaker: "Песковская", text: "АУЧ СТОЛОВКА, СЛИШКОМ ЖЕСТКО", bg: "cafeteria" },
    { speaker: "Песковская", text: "я походу сломала спину", bg: "cafeteria" },
    { speaker: "...", text: "песковская видит лизу", bg: "cafeteria" },
    { speaker: "Песковская", text: "ЛИЗОНЬКА СРОЧНО СКАЖИ ДИРЕКТОРУ ЧТО Я УПАЛА И СЛОМАЛА СПИНУ", bg: "cafeteria" },
    { speaker: "Лиза мами легенда", text: "черт что мне делать..? он мне уже не поверит второй раз..", bg: "cafeteria" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "cafeteria" }
];

// ========== ENGLISH TRANSLATION (Episode 4) ==========
const scenesEn = [
    { speaker: "...", text: "At Lisa's house", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Sasha is an asshole! I need to record a diss track about him", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "I'll come up with the lyrics first.", bg: "liza_room" },
    { speaker: "...", text: "Some time later", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Phew, I think that's everything, let's see what I've got..", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Listen up, Gangster, if you opened a country, it'd have a red flag. Your dick is looking for a hole like a crab looking for a mountain.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "You a womanizer? No, you're just a freak. You're a gay who wants Snusar to blow him.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "You're gay by force - nobody gave it to you, but you wanted it. You're like your sex: a false start and chaos.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "A loser - a gangster - what a fucking oxymoron. You bought an air gun just to scare little kids.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "You're a school outcast, and that's your peak, your limit. If you come near me, I'll send you to the police station.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "You're not in a TV show, but they've opened some very strange cases on you.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "You thought your gun was a status symbol? Your status is your dick: short, unwashed, and only scares your own belt.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "You're softer than my emo pillow. Your life is a leaked recording on the school gossip page.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Even Lera would ban you. You're not a gangster, you're a hemorrhoid on a monkey's back.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Sasha the outcast - not a sentence, but a diagnosis. You're a complete dickhead, or just an air loser.", bg: "liza_room" },
    { speaker: "Lisa Mama Legend", text: "Okay, that seems good. All that's left is to record it.", bg: "liza_room" },
    { speaker: "...", text: "Some time later at the studio", bg: "studio" },
    { speaker: "...", text: "Lisa records the diss track", bg: "studio" },
    { speaker: "...", text: "Another hour later", bg: "studio" },
    { speaker: "Lisa Mama Legend", text: "Phew, I think it's ready", bg: "studio" },
    { speaker: "...", text: "Lisa posts the diss track to the school's 'Overheard' page", bg: "studio" },
    { speaker: "...", text: "The next day at school", bg: "classroom" },
    { speaker: "Alona Vedernikova", text: "Hahaha, Gangster, so you're not just gay, you're also a monkey's hemorrhoid", bg: "classroom" },
    { speaker: "...", text: "Alexander furiously runs to Lisa and grabs her by the hair", bg: "classroom" },
    { speaker: "Alexander", text: "You stupid bitch, you were confessing your love to me yesterday, and after I rejected you, you record a diss track about me", bg: "classroom" },
    { speaker: "...", text: "Lisa pulls her hair out of Sasha's hand", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "You got exactly what you deserve, you freak! Go flirt with Snusar", bg: "classroom" },
    { speaker: "Alexander", text: "Oh, you bitch, just wait for my response", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "I'd love that!", bg: "classroom" },
    { speaker: "...", text: "During the next break after class, in the boys' bathroom", bg: "toilet" },
    { speaker: "...", text: "Sasha is vaping", bg: "toilet" },
    { speaker: "Alexander", text: "Damn, I need to come up with a response..", bg: "toilet" },
    { speaker:"...", text: "The principal walks into the bathroom and sees Sasha vaping", bg: "toilet" },
    { speaker: "Principal", text: "What do you think you're doing, you little troublemaker!", bg: "toilet" },
    { speaker: "Principal", text: "I want to see you and your parents in my office today!", bg: "toilet" },
    { speaker: "...", text: "The principal takes Sasha's vape and leaves", bg: "toilet" },
    { speaker: "...", text: "After this incident, during the next break", bg: "classroom" },
    { speaker: "...", text: "Alexander approaches Lisa", bg: "classroom" },
    { speaker: "Alexander", text: "Lisa, my dear, I know we're on bad terms, but I need your help", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "And what will you give me in return?", bg: "classroom" },
    { speaker: "Alexander", text: "In return, you can play with my 7 inches..", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "Not very tempting, but fine. What do you need help with?", bg: "classroom" },
    { speaker: "Alexander", text: "The principal caught me vaping and took my vape", bg: "classroom" },
    { speaker: "Alexander", text: "It's probably in his office", bg: "classroom" },
    { speaker: "Alexander", text: "I need you to distract him while I get my vape back", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "Are you crazy!? That's pure insanity, I'm not doing that", bg: "classroom" },
    { speaker: "Alexander", text: "Please, please, I'll do anything you ask", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "Fine", bg: "classroom" },
    { speaker: "Alexander", text: "Oh my god, I owe you one", bg: "classroom" },
    { speaker: "...", text: "They approach the principal's office", bg: "corridor" },
    { speaker: "Lisa Mama Legend", text: "God help me...", bg: "corridor" },
    { speaker: "...", text: "Lisa knocks on the principal's office door", bg: "corridor" },
    { speaker: "Principal", text: "Come in", bg: "director_cabinet" },
    { speaker: "...", text: "In the principal's office", bg: "director_cabinet" },
    { speaker: "Lisa Mama Legend", text: "Principal, hurry, Peskovskaya fell and broke her back!", bg: "director_cabinet" },
    { speaker: "Principal", text: "WHAT? Let's go quickly!", bg: "director_cabinet" },
    { speaker: "...", text: "Lisa and the principal run out of the office", bg: "director_cabinet" },
    { speaker: "...", text: "Sasha sneaks inside unnoticed", bg: "director_cabinet" },
    { speaker: "...", text: "Sasha opens all the drawers, but the vape is nowhere to be found", bg: "director_cabinet" },
    { speaker: "...", text: "Sasha starts searching the closet", bg: "director_cabinet" },
    { speaker: "Alexander", text: "Oh god, where is it", bg: "director_cabinet" },
    { speaker: "...", text: "Sasha picks up a folder and there... THE VAPE", bg: "director_cabinet" },
    { speaker: "Alexander", text: "There it is, my darling", bg: "director_cabinet" },
    { speaker: "...", text: "Suddenly, footsteps are heard from outside the door", bg: "director_cabinet" },
    { speaker: "...", text: "Sasha quickly closes everything and hides in the clothing closet", bg: "director_cabinet" },
    { speaker: "...", text: "The principal walks back into the office", bg: "director_cabinet" },
    { speaker: "Principal", text: "God, their stupid jokes again", bg: "director_cabinet" },
    { speaker: "...", text: "Sasha texts Lisa", bg: "director_cabinet" },
    { speaker: "Alexander", text: "Lisa, damn, he came back early. Think of something", bg: "director_cabinet" },
    { speaker: "Lisa Mama Legend", text: "Damn, Sasha, I know, where are you?", bg: "director_cabinet" },
    { speaker: "Alexander", text: "I'm in his office, hiding in the clothing closet", bg: "director_cabinet" },
    { speaker: "Lisa Mama Legend", text: "Hold on a little, I'll think of something", bg: "director_cabinet" },
    { speaker: "...", text: "Meanwhile, in the cafeteria", bg: "cafeteria" },
    { speaker: "...", text: "Peskovskaya slips on spilled compote", bg: "cafeteria" },
    { speaker: "Peskovskaya", text: "OUCH, CAFETERIA, THAT'S TOO ROUGH", bg: "cafeteria" },
    { speaker: "Peskovskaya", text: "I think I broke my back", bg: "cafeteria" },
    { speaker: "...", text: "Peskovskaya sees Lisa", bg: "cafeteria" },
    { speaker: "Peskovskaya", text: "LIZA, QUICKLY, TELL THE PRINCIPAL THAT I FELL AND BROKE MY BACK", bg: "cafeteria" },
    { speaker: "Lisa Mama Legend", text: "Damn, what do I do..? He won't believe me a second time..", bg: "cafeteria" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "cafeteria" }
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
