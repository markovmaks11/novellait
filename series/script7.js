// ========== СЦЕНАРИЙ 7 СЕРИИ ==========

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
    rusina: "images/rusina.webp"
};

function getAvatar(speaker) {
    const name = speaker.toLowerCase();
    
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
    
    return avatars.default;
}

// ФОНЫ
const backgrounds = {
    classroom: "images/classroom2.jpg",
    corridor: "images/corridor.jpg",
    street: "images/street.jpg",
    director_cabinet: "images/dirrectorcabinet.jpg",
    razdevalka: "images/razdevalka.jpg"
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

// ========== КАТСЦЕНЫ ==========
const cutscenes = {
    photoliza: "images/photoliza.png",
    deletephotoliza: "images/deletephotoliza.png",
    alonacry: "images/alonacry.png"
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

// ========== РУССКИЕ СЦЕНЫ ==========
const scenesRu = [
    { speaker: "...", text: "день в школе проходил как обычно.", bg: "classroom" },
    { speaker: "Русина", text: "дети записывайте домашку и можете идти", bg: "classroom" },
    { speaker: "Класс", text: "все записали домашку", bg: "classroom" },
    { speaker: "...", text: "где то в коридоре после уроков", bg: "corridor" },
    { speaker: "...", text: "алона сидит и рисует на листочке портрет лизы мами легенды", bg: "corridor" },
    { speaker: "Алона Ведерникова", text: "такс почти дорисовала, блин она такая красивая", bg: "corridor" },
    { speaker: "Алона Ведерникова", text: "блин а как к ней подкатить", bg: "corridor" },
    { speaker: "Алона Ведерникова", text: "интересно, а ей нравятся девушки?", bg: "corridor" },
    { speaker: "cutscene", text: "photoliza", bg: "corridor" },
    { speaker: "Алона Ведерникова", text: "или зря все это? наверное да", bg: "corridor" },
    { speaker: "Алона Ведерникова", text: "блин ладно позову, но наверное не буду даже намекать", bg: "corridor" },
    { speaker: "...", text: "алона выбросила рисунок в урну", bg: "corridor" },
    { speaker: "cutscene", text: "deletephotoliza", bg: "corridor" },
    { speaker: "Алона Ведерникова", text: "ладно пойду на урок", bg: "corridor" },
    { speaker: "...", text: "в это время директор который наблюдал за алоной за стенкой", bg: "corridor" },
    { speaker: "Директор", text: "так посмотрим что там", bg: "corridor" },
    { speaker: "...", text: "директор достал рисунок лизы из мусорки", bg: "corridor" },
    { speaker: "Директор", text: "хм интересно, алона влюбилась в лизу?) сохраню рисунок себе", bg: "corridor" },
    { speaker: "...", text: "после уроков на улице", bg: "street" },
    { speaker: "Снюсарь", text: "ну что саш, ко мне?", bg: "street" },
    { speaker: "Александр", text: "конечно, идем дорогой", bg: "street" },
    { speaker: "...", text: "в это время в школе", bg: "classroom" },
    { speaker: "...", text: "в школьной раздевалке", bg: "razdevalka" },
    { speaker: "Директор", text: "алона вот ты где, я тебя заискался", bg: "razdevalka" },
    { speaker: "Алона Ведерникова", text: "да, что то хотели?", bg: "razdevalka" },
    { speaker: "Директор", text: "зайди прям щас ко мне в кабинет, разговор есть", bg: "razdevalka" },
    { speaker: "Алона Ведерникова", text: "хорошо, идемте", bg: "razdevalka" },
    { speaker: "...", text: "в кабинете директора", bg: "director_cabinet" },
    { speaker: "Директор", text: "алона, у меня к тебе разговор, точнее вопрос, можно?", bg: "director_cabinet" },
    { speaker: "Алона Ведерникова", text: "спрашивайте конечно", bg: "director_cabinet" },
    { speaker: "...", text: "директор показывает алоне рисунок", bg: "director_cabinet" },
    { speaker: "Директор", text: "алон, не узнаешь этот рисунок?", bg: "director_cabinet" },
    { speaker: "Алона Ведерникова", text: "откуда он у вас?", bg: "director_cabinet" },
    { speaker: "Директор", text: "в мусорке нашел, так что скажешь?", bg: "director_cabinet" },
    { speaker: "Алона Ведерникова", text: "скажу, что не понимаю зачем вы лазиете по мусоркам", bg: "director_cabinet" },
    { speaker: "Директор", text: "не хами мне", bg: "director_cabinet" },
    { speaker: "Директор", text: "короче ты хочешь, чтобы этот рисунок увидела лиза", bg: "director_cabinet" },
    { speaker: "Алона", text: "(сука)", bg: "director_cabinet" },
    { speaker: "Алона", text: "не хочу, если честно", bg: "director_cabinet" },
    { speaker: "Директор", text: "тогда у меня будет к тебе деликатная просьба", bg: "director_cabinet" },
    { speaker: "Алона", text: "какая?", bg: "director_cabinet" },
    { speaker: "Директор", text: "отсоси мне и никто ни о чем не узнает", bg: "director_cabinet" },
    { speaker: "Алона", text: "вы шутите же?", bg: "director_cabinet" },
    { speaker: "Директор", text: "нет, девочка моя, на колени садись", bg: "director_cabinet" },
    { speaker: "Алона", text: "я не буду этого делать", bg: "director_cabinet" },
    { speaker: "Директор", text: "быстро, я сказал! иначе я прям щас скину этот рисунок лизе", bg: "director_cabinet" },
    { speaker: "Алона", text: "пожалуйста не надо...", bg: "director_cabinet" },
    { speaker: "...", text: "директор достал телефон и начал фоткать рисунок", bg: "director_cabinet" },
    { speaker: "Алона", text: "пожалуйста не надо...", bg: "director_cabinet" },
    { speaker: "Директор", text: "тогда садись и делай, что я сказал", bg: "director_cabinet" },
    { speaker: "...", text: "у алоны потекли слезы", bg: "director_cabinet" },
    { speaker: "Директор", text: "слезами делу не поможешь, садись на колени и делай, что велено", bg: "director_cabinet" },
    { speaker: "Директор", text: "иначе ты сама знаешь последствия", bg: "director_cabinet" },
    { speaker: "Алона", text: "ладно ладно, я все сделаю", bg: "director_cabinet" },
    { speaker: "cutscene", text: "alonacry", bg: "director_cabinet" },
    { speaker: "...", text: "алона начинает сосать директору", bg: "director_cabinet" },
    { speaker: "Директор", text: "одаа крошка, делай это", bg: "director_cabinet" },
    { speaker: "Директор", text: "ох, глубже, еще глубже", bg: "director_cabinet" },
    { speaker: "Директор", text: "моя ты плохая девочка", bg: "director_cabinet" },
    { speaker: "Директор", text: "ода, я сейчас кончу", bg: "director_cabinet" },
    { speaker: "...", text: "алона убирает голову и директор кончает", bg: "director_cabinet" },
    { speaker: "Директор", text: "умница моя", bg: "director_cabinet" },
    { speaker: "Алона", text: "можно я заберу рисунок и удалите фотку", bg: "director_cabinet" },
    { speaker: "Директор", text: "забирай свой рисунок", bg: "director_cabinet" },
    { speaker: "...", text: "директор удаляет фотку", bg: "director_cabinet" },
    { speaker: "Директор", text: "можешь идти только слезы вытри", bg: "director_cabinet" },
    { speaker: "...", text: "алона выбегает из кабинета", bg: "director_cabinet" },
    { speaker: "Директор", text: "хорошо, что она не знает, что я все время снимал ее минет на видео", bg: "director_cabinet" },
    { speaker: "...", text: "директор пересматривает видео", bg: "director_cabinet" },
    { speaker: "Директор", text: "ода это было божественно", bg: "director_cabinet" },
    { speaker: "...", text: "тем временем в раздевалке", bg: "razdevalka" },
    { speaker: "Алона", text: "дорогой дневник, меня только что изнасиловал мой директор, я не знаю, что мне делать...", bg: "razdevalka" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "razdevalka" }
];

// ========== АНГЛИЙСКИЙ ПЕРЕВОД ==========
const scenesEn = [
    { speaker: "...", text: "The day at school was pretty rouine.", bg: "classroom" },
    { speaker: "Rusina", text: "Kids, write down your homework and then you are dismissed", bg: "classroom" },
    { speaker: "Class", text: "Everyone's got the homework down.", bg: "classroom" },
    { speaker: "...", text: "Somewhere in the hallway after class", bg: "corridor" },
    { speaker: "...", text: "Alona is sitting and drawing a portrait of Lisa Mama Legend", bg: "corridor" },
    { speaker: "Alona Vedernikova", text: "Almost done, damn, she's so beautiful", bg: "corridor" },
    { speaker: "Alona Vedernikova", text: "Damn, how do I make a move on her?", bg: "corridor" },
    { speaker: "Alona Vedernikova", text: "I wonder, does she like girls?", bg: "corridor" },
    { speaker: "cutscene", text: "photoliza", bg: "corridor" },
    { speaker: "Alona Vedernikova", text: "Or is this all in vain? Probably yes", bg: "corridor" },
    { speaker: "Alona Vedernikova", text: "Damn, okay, I'll call her, but I probably won't even hint", bg: "corridor" },
    { speaker: "...", text: "Alona threw the drawing in the trash", bg: "corridor" },
    { speaker: "cutscene", text: "deletephotoliza", bg: "corridor" },
    { speaker: "Alona Vedernikova", text: "Alright, I'll go to class", bg: "corridor" },
    { speaker: "...", text: "Meanwhile, the principal, who was watching Alona from behind the wall", bg: "corridor" },
    { speaker: "Principal", text: "Let's see what's there", bg: "corridor" },
    { speaker: "...", text: "The principal took Lisa's drawing out of the trash", bg: "corridor" },
    { speaker: "Principal", text: "Hmm interesting, did Alona fall in love with Lisa?) I'll keep this drawing", bg: "corridor" },
    { speaker: "...", text: "After school on the street", bg: "street" },
    { speaker: "Snusar", text: "So, Sash, my place?", bg: "street" },
    { speaker: "Alexander", text: "Of course, let's go, darling", bg: "street" },
    { speaker: "...", text: "Meanwhile at school", bg: "classroom" },
    { speaker: "...", text: "In the school locker room", bg: "razdevalka" },
    { speaker: "Principal", text: "Alona, there you are, I've been looking for you", bg: "razdevalka" },
    { speaker: "Alona Vedernikova", text: "Yes, did you want something?", bg: "razdevalka" },
    { speaker: "Principal", text: "Come to my office right now, we need to talk", bg: "razdevalka" },
    { speaker: "Alona Vedernikova", text: "Okay, let's go", bg: "razdevalka" },
    { speaker: "...", text: "In the principal's office", bg: "director_cabinet" },
    { speaker: "Principal", text: "Alona, I need to talk to you, actually ask you something, okay?", bg: "director_cabinet" },
    { speaker: "Alona Vedernikova", text: "Of course, ask", bg: "director_cabinet" },
    { speaker: "...", text: "The principal shows Alona the drawing", bg: "director_cabinet" },
    { speaker: "Principal", text: "Alona, do you recognize this drawing?", bg: "director_cabinet" },
    { speaker: "Alona Vedernikova", text: "Where did you get it?", bg: "director_cabinet" },
    { speaker: "Principal", text: "Found it in the trash. So, what do you say?", bg: "director_cabinet" },
    { speaker: "Alona Vedernikova", text: "I say I don't understand why you're digging through trash cans", bg: "director_cabinet" },
    { speaker: "Principal", text: "Don't be rude to me", bg: "director_cabinet" },
    { speaker: "Principal", text: "Basically, do you want Lisa to see this drawing?", bg: "director_cabinet" },
    { speaker: "Alona", text: "(bitch)", bg: "director_cabinet" },
    { speaker: "Alona", text: "Honestly, no", bg: "director_cabinet" },
    { speaker: "Principal", text: "Then I have a delicate request for you", bg: "director_cabinet" },
    { speaker: "Alona", text: "What?", bg: "director_cabinet" },
    { speaker: "Principal", text: "Give me a blowjob and no one will find out about anything", bg: "director_cabinet" },
    { speaker: "Alona", text: "You're joking, right?", bg: "director_cabinet" },
    { speaker: "Principal", text: "No, my girl, get on your knees", bg: "director_cabinet" },
    { speaker: "Alona", text: "I won't do that", bg: "director_cabinet" },
    { speaker: "Principal", text: "Quickly, I said! Otherwise I'll send this drawing to Lisa right now", bg: "director_cabinet" },
    { speaker: "Alona", text: "Please don't...", bg: "director_cabinet" },
    { speaker: "...", text: "The principal took out his phone and started taking pictures of the drawing", bg: "director_cabinet" },
    { speaker: "Alona", text: "Please don't...", bg: "director_cabinet" },
    { speaker: "Principal", text: "Then get on your knees and do as I said", bg: "director_cabinet" },
    { speaker: "...", text: "Tears started flowing from Alona's eyes", bg: "director_cabinet" },
    { speaker: "Principal", text: "Tears won't help. Get on your knees and do as you're told", bg: "director_cabinet" },
    { speaker: "Principal", text: "Otherwise you know the consequences", bg: "director_cabinet" },
    { speaker: "Alona", text: "Okay, okay, I'll do everything", bg: "director_cabinet" },
    { speaker: "cutscene", text: "alonacry", bg: "director_cabinet" },
    { speaker: "...", text: "Alona starts sucking the principal off", bg: "director_cabinet" },
    { speaker: "Principal", text: "Oh yeah baby, do it", bg: "director_cabinet" },
    { speaker: "Principal", text: "Oh, deeper, even deeper", bg: "director_cabinet" },
    { speaker: "Principal", text: "My bad girl", bg: "director_cabinet" },
    { speaker: "Principal", text: "Oh, I'm about to cum", bg: "director_cabinet" },
    { speaker: "...", text: "Alona pulls her head away and the principal cums", bg: "director_cabinet" },
    { speaker: "Principal", text: "Good girl", bg: "director_cabinet" },
    { speaker: "Alona", text: "Can I take the drawing and delete the photo?", bg: "director_cabinet" },
    { speaker: "Principal", text: "Take your drawing", bg: "director_cabinet" },
    { speaker: "...", text: "The principal deletes the photo", bg: "director_cabinet" },
    { speaker: "Principal", text: "You can go, just wipe your tears", bg: "director_cabinet" },
    { speaker: "...", text: "Alona runs out of the office", bg: "director_cabinet" },
    { speaker: "Principal", text: "Good thing she doesn't know I was filming her blowjob the whole time", bg: "director_cabinet" },
    { speaker: "...", text: "The principal rewatching the video", bg: "director_cabinet" },
    { speaker: "Principal", text: "Oh, that was divine", bg: "director_cabinet" },
    { speaker: "...", text: "Meanwhile in the locker room", bg: "razdevalka" },
    { speaker: "Alona", text: "Dear diary, I was just raped by my principal, I don't know what to do...", bg: "razdevalka" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "razdevalka" }
];

// ВЫБИРАЕМ ЯЗЫК
let scenes = isEnglish ? scenesEn : scenesRu;

// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    if (scenes.length > 0) {
        const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
        localStorage.setItem(`progress_7`, percent);
    }
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_7`);
    if (saved) {
        console.log(`Сохранённый прогресс 7 серии: ${saved}%`);
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
            statusBadge.textContent = "EPISODE 7: SCHOOL NIGHTMARE";
        } else {
            statusBadge.textContent = "СЕРИЯ 7: КОШМАР В ШКОЛЕ";
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
        if (speakerName) speakerName.innerText = isEnglish ? "THE END OF EPISODE 7" : "КОНЕЦ 7 СЕРИИ";
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