// ========== СЦЕНАРИЙ 9 СЕРИИ ==========

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
    classroom: "images/classroom.jpg",
    alona: "images/alonavedernikova.jpg",
    peskovskaya: "images/teacher.jpg",
    rusina: "images/rusina.webp",
    alonamom: "images/alonamom.jpg",
    dashayakovenkoj: "images/dashayakovenko.jpg",
    schoolboy1: "images/schoolboy1.jpg",
    schoolboy2: "images/schoolboy2.jpg",
    schoolboy3: "images/schoolboy3.jpg",
    police: "images/policezone.jpg"
};

function getAvatar(speaker) {
    const name = speaker.toLowerCase();
    
    // СНАЧАЛА ПРОВЕРЯЕМ МАМУ АЛОНЫ (ЧТОБЫ НЕ ПЕРЕПУТАТЬ С АЛОНОЙ)
    if (name.includes("мама алоны") || name.includes("alonamom")) return avatars.alonamom;
    
    // ПОТОМ ОСТАЛЬНЫХ ПЕРСОНАЖЕЙ
    if (name.includes("александр") || name.includes("саша") || name.includes("гангстер") || name.includes("alexander") || name.includes("sasha") || name.includes("gangster")) return avatars.gangster;
    if (name.includes("лера") || name.includes("lera")) return avatars.lera;
    if (name.includes("лиза") || name.includes("мами легенда") || name.includes("liza") || name.includes("mama legend")) return avatars.liza;
    if (name.includes("учительница") || name.includes("песковская") || name.includes("teacher") || name.includes("peskovskaya")) return avatars.peskovskaya;
    if (name.includes("снюсарь") || name.includes("snusar")) return avatars.snusar;
    if (name.includes("директор") || name.includes("principal")) return avatars.director;
    if (name.includes("полина") || name.includes("polina")) return avatars.polina;
    if (name.includes("класс") || name.includes("вся школа") || name.includes("толпа") || name.includes("class") || name.includes("school") || name.includes("crowd")) return avatars.classroom;
    if (name.includes("алона") || name.includes("алон") || name.includes("ведерникова") || name.includes("alona") || name.includes("vedernikova")) return avatars.alona;
    if (name.includes("русина") || name.includes("rusina")) return avatars.rusina;
    if (name.includes("дарья") || name.includes("яковенко") || name.includes("dashayakovenkoj")) return avatars.dashayakovenkoj;
    if (name.includes("школьник 1") || name.includes("schoolboy1")) return avatars.schoolboy1;
    if (name.includes("школьник 2") || name.includes("schoolboy2")) return avatars.schoolboy2;
    if (name.includes("школьник 3") || name.includes("schoolboy3")) return avatars.schoolboy3;
    if (name.includes("участковый") || name.includes("police")) return avatars.police;
    
    return avatars.default;
}

// ФОНЫ
const backgrounds = {
    classroom: "images/classroom2.jpg",
    corridor: "images/corridor.jpg",
    director_cabinet: "images/dirrectorcabinet.jpg",
    policezone: "images/policezone.jpg",
    listovky: "images/listovky.jpg"
};

// ========== КАТСЦЕНЫ ==========
const cutscenes = {
    dictory: "images/dictory.jpg",
    listovky: "images/listovky.jpg",
    police: "images/police.jpg"
};

function showCutscene(cutsceneName) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('cutsceneOverlay');
        const img = document.getElementById('cutsceneImg');
        const closeBtn = document.getElementById('cutsceneClose');
        
        img.src = cutscenes[cutsceneName];
        overlay.classList.add('active');
        
        const onClose = () => {
            overlay.classList.remove('active');
            closeBtn.removeEventListener('click', onClose);
            overlay.removeEventListener('click', onOverlayClick);
            resolve();
        };
        
        const onOverlayClick = (e) => {
            if (e.target === overlay) {
                onClose();
            }
        };
        
        closeBtn.addEventListener('click', onClose);
        overlay.addEventListener('click', onOverlayClick);
    });
}

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
        if (!waitingForChoice && !autoReadPaused && !waitingForCutscene) {
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
    if (autoReadEnabled && !waitingForCutscene) {
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

// ========== МУЗЫКА ==========
let bgMusic = null;
let musicEnabled = true;
let musicVolume = 0.5;

if (localStorage.getItem('musicEnabled') !== null) {
    musicEnabled = localStorage.getItem('musicEnabled') === 'true';
}
if (localStorage.getItem('musicVolume') !== null) {
    musicVolume = parseFloat(localStorage.getItem('musicVolume')) / 100;
}

const MUSIC_URL = '../series/music/alena.mp3';

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

// ========== РУССКИЕ СЦЕНЫ ==========
const scenesRu = [
    { speaker: "...", text: "на следующий день", bg: "classroom" },
    { speaker: "...", text: "незадолго до уроков", bg: "classroom" },
    { speaker: "...", text: "александр и снюсарь собрались вместе", bg: "classroom" },
    { speaker: "Александр", text: "смотри, что у меня есть", bg: "classroom" },
    { speaker: "...", text: "александр показывает тот самый листочек с личного дневника алоны", bg: "classroom" },
    { speaker: "cutscene", text: "dictory", bg: "classroom" },
    { speaker: "Снюсарь", text: "откуда это у тебя?", bg: "classroom" },
    { speaker: "Александр", text: "вырвал вчера незаметно", bg: "classroom" },
    { speaker: "Снюсарь", text: "любимый, но это же не правильно", bg: "classroom" },
    { speaker: "Александр", text: "кому не похуй на эту изгойку, лучше послушай, что я придумал", bg: "classroom" },
    { speaker: "Снюсарь", text: "ну и что же?", bg: "classroom" },
    { speaker: "Александр", text: "я хочу подшутить над алоной", bg: "classroom" },
    { speaker: "Александр", text: "до урока же еще 40 минут", bg: "classroom" },
    { speaker: "Александр", text: "давай зайдем в копирку и распечатаем этот листок в 100 копий", bg: "classroom" },
    { speaker: "Александр", text: "и развесим все листочки по всей школе", bg: "classroom" },
    { speaker: "Снюсарь", text: "бред какой-то, нам что заняться нечем?", bg: "classroom" },
    { speaker: "Александр", text: "да ладно тебе весело будет", bg: "classroom" },
    { speaker: "Снюсарь", text: "ладно, но всю ответственность в случае чего, ты берешь на себя", bg: "classroom" },
    { speaker: "Александр", text: "по рукам, погнали", bg: "classroom" },
    { speaker: "...", text: "александр и снюсарь в копирке распечатали 100 экземпляров листовок.", bg: "classroom" },
    { speaker: "...", text: "александр и снюсарь дошли вместе до школы", bg: "corridor" },
    { speaker: "...", text: "10 минут до урока", bg: "corridor" },
    { speaker: "Александр", text: "ну что расклеиваем по школе", bg: "corridor" },
    { speaker: "Снюсарь", text: "ну давай", bg: "corridor" },
    { speaker: "...", text: "через минут 10 все листовки были расклеены и разбросаны по коридору", bg: "corridor" },
    { speaker: "Александр", text: "ну вот и все", bg: "corridor" },
    { speaker: "cutscene", text: "listovky", bg: "listovky" },
    { speaker: "Александр", text: "АХАХАХАХ КАКИЕ МЫ КРУТЫЕ", bg: "corridor" },
    { speaker: "...", text: "потихоньку в школе начал собираться народ и все поднимали листовки.", bg: "corridor" },
    { speaker: "Школьник 1", text: "...я чувствую себя грязной...", bg: "corridor" },
    { speaker: "Школьник 2", text: "...у меня депрессия...", bg: "corridor" },
    { speaker: "Школьник 3", text: "...зачем я это сделала", bg: "corridor" },
    { speaker: "Лера", text: "о боже, кто это сделал.. это же листочек алоны", bg: "corridor" },
    { speaker: "Лиза мами легенда", text: "господи, что здесь твориться", bg: "corridor" },
    { speaker: "...", text: "появилась алона", bg: "corridor" },
    { speaker: "...", text: "все начали косо смотреть на алону и шушукаться", bg: "corridor" },
    { speaker: "Алона", text: "что это все значит? кто это сделал?", bg: "corridor" },
    { speaker: "...", text: "алона начала собирать листовки и убирать их", bg: "corridor" },
    { speaker: "Алона", text: "вы совсем все больные?", bg: "corridor" },
    { speaker: "...", text: "алона начала плакать и позвонила маме", bg: "corridor" },
    { speaker: "Алона", text: "мам пожалуйста приди в школу здесь ужас", bg: "corridor" },
    { speaker: "...", text: "через 15 минут пришла мама алоны", bg: "corridor" },
    { speaker: "...", text: "в кабинете директора", bg: "director_cabinet" },
    { speaker: "Мама Алоны", text: "ВЫ КАК ЗА ДЕТЬМИ СЛЕДИТЕ!?", bg: "director_cabinet" },
    { speaker: "Мама Алоны", text: "мою дочь травят, а вы ничего не делаете", bg: "director_cabinet" },
    { speaker: "Мама Алоны", text: "я забираю документы с этой чертовой школы и мы переводимся", bg: "director_cabinet" },
    { speaker: "Директор", text: "извините нас, это недоразумение,я поговорю с детьми", bg: "director_cabinet" },
    { speaker: "Мама Алоны", text: "просто поговорите!? тут надо всех родителей собирать, это уже за все рамки!", bg: "director_cabinet" },
    { speaker: "Мама Алоны", text: "отдайте нам наши документы и мы пойдем!", bg: "director_cabinet" },
    { speaker: "...", text: "директор отдал маме алоны их документы", bg: "director_cabinet" },
    { speaker: "Мама Алоны", text: "пойдем доченька, мы больше никогда не вернемся в этот ад", bg: "director_cabinet" },
    { speaker: "...", text: "алона с мамой ушли из школы", bg: "director_cabinet" },
    { speaker: "...", text: "в это же время в полицейском участке", bg: "policezone" },
    { speaker: "Песковская", text: "участковый, я пришла написать заявление", bg: "policezone" },
    { speaker: "Участковый", text: "присаживайтесь дамочка, расскажите, что случилось", bg: "policezone" },
    { speaker: "Песковская", text: "мой муж оказался педофилом и насильником", bg: "policezone" },
    { speaker: "Участковый", text: "у вас есть доказательства?", bg: "policezone" },
    { speaker: "Песковская", text: "да у меня есть видеозапись", bg: "policezone" },
    { speaker: "Участковый", text: "вот вам акт заявления, составьте его и скиньте видео мне на почту", bg: "policezone" },
    { speaker: "...", text: "песковская написала заявление", bg: "policezone" },
    { speaker: "Песковская", text: "пожалуйста займитесь этим поскорее", bg: "policezone" },
    { speaker: "Участковый", text: "да мы уже берем ваше дело в расследование, не переживайте", bg: "policezone" },
    { speaker: "...", text: "песковская ушла домой", bg: "policezone" },
    { speaker: "...", text: "в то же время в школе", bg: "classroom" },
    { speaker: "Директор", text: "дети, я хочу вам представить вашу новенькую", bg: "classroom" },
    { speaker: "Директор", text: "поприветствуйте...", bg: "classroom" },
    { speaker: "Директор", text: "Дарья Яковенко!", bg: "classroom" },
    { speaker: "Дарья Яковенко", text: "всем привет, теперь я учусь с вами", bg: "classroom" },
    { speaker: "Александр", text: "еп твою налево, что эта курица здесь забыла", bg: "classroom" },
    { speaker: "Снюсарь", text: "дорогой ты ее знаешь?", bg: "classroom" },
    { speaker: "Александр", text: "это моя бывшая", bg: "classroom" },
    { speaker: "...", text: "дарья садится сзади саши", bg: "classroom" },
    { speaker: "Дарья Яковенко", text: "сашенька, скучал?)", bg: "classroom" },
    { speaker: "Снюсарь", text: "отвали от него!", bg: "classroom" },
    { speaker: "Дарья Яковенко", text: "а ты кто такой, уродец?", bg: "classroom" },
    { speaker: "Снюсарь", text: "я его новый бойфренд!", bg: "classroom" },
    { speaker: "Дарья Яковенко", text: "ой, сашенька, ты что воды в рот набрал? скажи же, что нибудь", bg: "classroom" },
    { speaker: "Дарья Яковенко", text: "не волнуйся мальчик, это ненадолго, я верну своего сашку", bg: "classroom" },
    { speaker: "Снюсарь", text: "даже не смей курица, он с тобой даже разговаривать не хочет", bg: "classroom" },
    { speaker: "...", text: "какой то шум прерывает их", bg: "classroom" },
    { speaker: "...", text: "в кабинет врывается амон и повязывает директора", bg: "classroom" },
    { speaker: "cutscene", text: "police", bg: "policezone" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "classroom" }
];

// ========== АНГЛИЙСКИЙ ПЕРЕВОД ==========
const scenesEn = [
    { speaker: "...", text: "the next day", bg: "classroom" },
    { speaker: "...", text: "shortly before classes", bg: "classroom" },
    { speaker: "...", text: "Alexander and Snusar got together", bg: "classroom" },
    { speaker: "Alexander", text: "look what I have", bg: "classroom" },
    { speaker: "...", text: "Alexander shows that piece of paper from Alona's personal diary", bg: "classroom" },
    { speaker: "cutscene", text: "dictory", bg: "classroom" },
    { speaker: "Snusar", text: "where did you get that?", bg: "classroom" },
    { speaker: "Alexander", text: "I secretly tore it out yesterday", bg: "classroom" },
    { speaker: "Snusar", text: "baby, that's not right", bg: "classroom" },
    { speaker: "Alexander", text: "who gives a fuck about that outcast? listen to what I came up with", bg: "classroom" },
    { speaker: "Snusar", text: "well, what is it?", bg: "classroom" },
    { speaker: "Alexander", text: "I want to prank Alona", bg: "classroom" },
    { speaker: "Alexander", text: "we still have 40 minutes before class", bg: "classroom" },
    { speaker: "Alexander", text: "let's go to the copy room and print 100 copies of this sheet", bg: "classroom" },
    { speaker: "Alexander", text: "and hang all the papers all over the school", bg: "classroom" },
    { speaker: "Snusar", text: "that's nonsense, don't we have anything better to do?", bg: "classroom" },
    { speaker: "Alexander", text: "come on, it'll be fun", bg: "classroom" },
    { speaker: "Snusar", text: "fine, but if something happens, you take full responsibility", bg: "classroom" },
    { speaker: "Alexander", text: "deal, let's go", bg: "classroom" },
    { speaker: "...", text: "Alexander and Snusar printed 100 copies of the flyers in the copy room", bg: "classroom" },
    { speaker: "...", text: "Alexander and Snusar walked to school together", bg: "corridor" },
    { speaker: "...", text: "10 minutes before class", bg: "corridor" },
    { speaker: "Alexander", text: "so, do we post them around the school?", bg: "corridor" },
    { speaker: "Snusar", text: "yeah, let's do it", bg: "corridor" },
    { speaker: "...", text: "within 10 minutes, all the flyers were posted and scattered around the hallway", bg: "corridor" },
    { speaker: "Alexander", text: "well, that's it", bg: "corridor" },
    { speaker: "cutscene", text: "listovky", bg: "listovky" },
    { speaker: "Alexander", text: "HAHAHAHA WE'RE SO COOL", bg: "corridor" },
    { speaker: "...", text: "people slowly started gathering at school, everyone picking up the flyers", bg: "corridor" },
    { speaker: "Schoolboy 1", text: "...I feel dirty...", bg: "corridor" },
    { speaker: "Schoolboy 2", text: "...I'm depressed...", bg: "corridor" },
    { speaker: "Schoolboy 3", text: "...why did I do this", bg: "corridor" },
    { speaker: "Lera", text: "oh my god, who did this.. this is Alona's page", bg: "corridor" },
    { speaker: "Lisa Mama Legend", text: "god, what's going on here", bg: "corridor" },
    { speaker: "...", text: "Alona appears", bg: "corridor" },
    { speaker: "...", text: "everyone starts staring at Alona and whispering", bg: "corridor" },
    { speaker: "Alona", text: "what does all this mean? who did this?", bg: "corridor" },
    { speaker: "...", text: "Alona starts picking up the flyers", bg: "corridor" },
    { speaker: "Alona", text: "are you all crazy?", bg: "corridor" },
    { speaker: "...", text: "Alona starts crying and calls her mom", bg: "corridor" },
    { speaker: "Alona", text: "mom, please come to school, it's terrible here", bg: "corridor" },
    { speaker: "...", text: "15 minutes later, Alona's mom arrives", bg: "corridor" },
    { speaker: "...", text: "in the principal's office", bg: "director_cabinet" },
    { speaker: "Alona's Mom", text: "HOW DO YOU WATCH OVER THE CHILDREN!?", bg: "director_cabinet" },
    { speaker: "Alona's Mom", text: "my daughter is being bullied and you do nothing", bg: "director_cabinet" },
    { speaker: "Alona's Mom", text: "I'm taking her documents from this damn school and we're transferring", bg: "director_cabinet" },
    { speaker: "Principal", text: "I'm sorry, it's a misunderstanding, I'll talk to the children", bg: "director_cabinet" },
    { speaker: "Alona's Mom", text: "just talk!? you need to gather all the parents, this is beyond all limits!", bg: "director_cabinet" },
    { speaker: "Alona's Mom", text: "give us our documents and we'll leave!", bg: "director_cabinet" },
    { speaker: "...", text: "the principal gives Alona's mom their documents", bg: "director_cabinet" },
    { speaker: "Alona's Mom", text: "let's go, daughter, we're never coming back to this hell", bg: "director_cabinet" },
    { speaker: "...", text: "Alona and her mom leave school", bg: "director_cabinet" },
    { speaker: "...", text: "at the same time at the police station", bg: "policezone" },
    { speaker: "Peskovskaya", text: "officer, I've come to file a report", bg: "policezone" },
    { speaker: "Officer", text: "have a seat, ma'am, tell me what happened", bg: "policezone" },
    { speaker: "Peskovskaya", text: "my husband turned out to be a pedophile and a rapist", bg: "policezone" },
    { speaker: "Officer", text: "do you have evidence?", bg: "policezone" },
    { speaker: "Peskovskaya", text: "yes, I have a video recording", bg: "policezone" },
    { speaker: "Officer", text: "here's a statement form, fill it out and send the video to my email", bg: "policezone" },
    { speaker: "...", text: "Peskovskaya fills out the statement", bg: "policezone" },
    { speaker: "Peskovskaya", text: "please take care of this as soon as possible", bg: "policezone" },
    { speaker: "Officer", text: "we're already starting the investigation, don't worry", bg: "policezone" },
    { speaker: "...", text: "Peskovskaya goes home", bg: "policezone" },
    { speaker: "...", text: "at the same time at school", bg: "classroom" },
    { speaker: "Principal", text: "children, I want to introduce your new classmate", bg: "classroom" },
    { speaker: "Principal", text: "welcome...", bg: "classroom" },
    { speaker: "Principal", text: "Darya Yakovenko!", bg: "classroom" },
    { speaker: "Darya Yakovenko", text: "hello everyone, I'm studying with you now", bg: "classroom" },
    { speaker: "Alexander", text: "what the fuck, what is this chicken doing here", bg: "classroom" },
    { speaker: "Snusar", text: "darling, do you know her?", bg: "classroom" },
    { speaker: "Alexander", text: "she's my ex", bg: "classroom" },
    { speaker: "...", text: "Darya sits behind Sasha", bg: "classroom" },
    { speaker: "Darya Yakovenko", text: "Sashenka, did you miss me?)", bg: "classroom" },
    { speaker: "Snusar", text: "back off him!", bg: "classroom" },
    { speaker: "Darya Yakovenko", text: "who are you, you freak?", bg: "classroom" },
    { speaker: "Snusar", text: "I'm his new boyfriend!", bg: "classroom" },
    { speaker: "Darya Yakovenko", text: "oh, Sashenka, did you swallow your tongue? say something", bg: "classroom" },
    { speaker: "Darya Yakovenko", text: "don't worry, boy, it won't last long, I'll get my Sasha back", bg: "classroom" },
    { speaker: "Snusar", text: "don't you dare, chicken, he doesn't even want to talk to you", bg: "classroom" },
    { speaker: "...", text: "some noise interrupts them", bg: "classroom" },
    { speaker: "...", text: "a police officer bursts into the classroom and handcuffs the principal", bg: "classroom" },
    { speaker: "cutscene", text: "police", bg: "policezone" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "classroom" }
];

// ВЫБИРАЕМ ЯЗЫК
let scenes = isEnglish ? scenesEn : scenesRu;

// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    if (scenes.length > 0) {
        const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
        localStorage.setItem(`progress_9`, percent);
    }
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_9`);
    if (saved) {
        console.log(`Сохранённый прогресс 9 серии: ${saved}%`);
    }
}

// ========== КОД ДЛЯ РАБОТЫ НОВЕЛЛЫ ==========
let currentSceneIndex = 0;
let waitingForChoice = false;
let waitingForCutscene = false;

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
    if (avatarImg && speaker !== "cutscene") {
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
            statusBadge.textContent = "EPISODE 9: PAYBACK";
        } else {
            statusBadge.textContent = "СЕРИЯ 9: РАСПЛАТА";
        }
    }
}

async function showScene(index) {
    if (index >= scenes.length) {
        if (speakerName) speakerName.innerText = isEnglish ? "END OF EPISODE" : "КОНЕЦ СЕРИИ";
        if (dialogueText) dialogueText.innerText = isEnglish ? "To be continued..." : "Продолжение следует...";
        return;
    }
    
    const scene = scenes[index];
    
    if (scene.speaker === "cutscene") {
        waitingForCutscene = true;
        await showCutscene(scene.text);
        waitingForCutscene = false;
        currentSceneIndex++;
        showScene(currentSceneIndex);
        return;
    }
    
    if (speakerName) speakerName.innerText = scene.speaker;
    if (dialogueText) dialogueText.innerText = scene.text;
    setBackground(scene.bg);
    updateAvatar(scene.speaker);
    updateProgress();
}

function goToNextScene() {
    if (waitingForChoice || waitingForCutscene) return;
    if (currentSceneIndex < scenes.length - 1) {
        currentSceneIndex++;
        showScene(currentSceneIndex);
    } else {
        if (dialogueBox) dialogueBox.style.cursor = "default";
        if (speakerName) speakerName.innerText = isEnglish ? "THE END OF EPISODE 9" : "КОНЕЦ 9 СЕРИИ";
        if (dialogueText) dialogueText.innerText = isEnglish ? "To be continued..." : "Продолжение следует...";
    }
}

document.addEventListener('click', (e) => {
    if (waitingForChoice || waitingForCutscene) return;
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
    if (currentScene && currentScene.speaker !== "cutscene") {
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
}

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

updateUIText();
showScene(0);
if (choicesPanel) choicesPanel.classList.remove('active');
waitingForChoice = false;
loadProgress();