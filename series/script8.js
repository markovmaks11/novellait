// ========== СЦЕНАРИЙ 8 СЕРИИ ==========

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
    director_room: "images/dirrectorroom.jpg",
    classroom: "images/classroom2.jpg",
    director_cabinet: "images/dirrectorcabinet.jpg",
    corridor: "images/corridor.jpg",
    alonealona: "images/alonealona.jpg",
    dictory: "images/dictory.jpg"
};

// ========== КАТСЦЕНЫ ==========
const cutscenes = {
    alonealona: "images/alonealona.jpg",
    dictory: "images/dictory.jpg"
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
    { speaker: "...", text: "в спальне директора вечером того же дня", bg: "director_room" },
    { speaker: "...", text: "песковская лежит и залипает в рилсы", bg: "director_room" },
    { speaker: "Директор", text: "любимая я отойду в душ", bg: "director_room" },
    { speaker: "Песковская", text: "да конечно любимый, иди купайся", bg: "director_room" },
    { speaker: "...", text: "директор поцеловал песковскую в щеку и ушел в душ", bg: "director_room" },
    { speaker: "Песковская", text: "блин надо перекинуть себе денег с его телефона, надо себе мазь купить, а денег сейчас нет", bg: "director_room" },
    { speaker: "...", text: "песковская берет телефон директор", bg: "director_room" },
    { speaker: "Песковская", text: "О ГОСПОДИ ЧТО ЭТО!?", bg: "director_room" },
    { speaker: "...", text: "в телефоне директора она увидела видео с его изменой", bg: "director_room" },
    { speaker: "Песковская", text: "он мне изменил еще и с школьницей?", bg: "director_room" },
    { speaker: "Песковская", text: "он козел, так еще и педофил", bg: "director_room" },
    { speaker: "Песковская", text: "ладно, надо сделать вид, что ничего не видела, просто переведу себе денег", bg: "director_room" },
    { speaker: "...", text: "песковская перевела себе денег, пока директор в душе", bg: "director_room" },
    { speaker: "Песковская", text: "черт, но я не могу оставить это просто так, надо будет пойти в участок и сдать его..", bg: "director_room" },
    { speaker: "Песковская", text: "черт, черт", bg: "director_room" },
    { speaker: "...", text: "песковская быстро записывает на свой телефон видео с его изменой", bg: "director_room" },
    { speaker: "...", text: "директор входит в спальню", bg: "director_room" },
    { speaker: "Директор", text: "милая, все хорошо? ты какая то не знаю, побелевшая вся", bg: "director_room" },
    { speaker: "Песковская", text: "да милый, все хорошо", bg: "director_room" },
    { speaker: "...", text: "директор берет в руки телефон", bg: "director_room" },
    { speaker: "Директор", text: "ты что брала мой телефон?", bg: "director_room" },
    { speaker: "Песковская", text: "ну да", bg: "director_room" },
    { speaker: "Директор", text: "а зачем?", bg: "director_room" },
    { speaker: "Песковская", text: "да я мазь себе нашла, купить захотела и взяла твой телефон, чтобы денег перевести", bg: "director_room" },
    { speaker: "Директор", text: "ты ничего не видела?", bg: "director_room" },
    { speaker: "Песковская", text: "а тебе есть что скрывать?", bg: "director_room" },
    { speaker: "Директор", text: "да нет", bg: "director_room" },
    { speaker: "Песковская", text: "а зачем спрашиваешь тогда?", bg: "director_room" },
    { speaker: "Директор", text: "извини, завал на работе", bg: "director_room" },
    { speaker: "Песковская", text: "люблю тебя, мой милый, хочешь помогу стресс снять?", bg: "director_room" },
    { speaker: "Директор", text: "и я тебя люблю, давай", bg: "director_room" },
    { speaker: "...", text: "директор и песковская занялись любовью", bg: "director_room" },
    { speaker: "...", text: "на следующий день в школе", bg: "classroom" },
    { speaker: "...", text: "алона сидит одна на последней парте в капюшоне", bg: "classroom" },
    { speaker: "cutscene", text: "alonealona", bg: "alonealona" },
    { speaker: "Алона", text: "меня унизили...", bg: "alonealona" },
    { speaker: "...", text: "алона достала личный дневник", bg: "alonealona" },
    { speaker: "Алона", text: "мой любимый дневник, только тебе я могу выговориться", bg: "alonealona" },
    { speaker: "Алона", text: "дорогой дневник, я больше не справляюсь..", bg: "alonealona" },
    { speaker: "Алона", text: "я ощущаю себя грязной", bg: "alonealona" },
    { speaker: "Алона", text: "и что мне делать, если мне некому об этом рассказать, это очень унизительно...", bg: "alonealona" },
    { speaker: "Алона", text: "какая же я дура...", bg: "alonealona" },
    { speaker: "Алона", text: "мне надо записаться к терапевту, мне кажется у меня депрессия", bg: "alonealona" },
    { speaker: "Алона", text: "зачем я вообще это сделала...", bg: "alonealona" },
    { speaker: "cutscene", text: "dictory", bg: "dictory" },
    { speaker: "...", text: "александр замечает дневник", bg: "classroom" },
    { speaker: "Александр", text: "эй алона че ты там калякаешь, покажи нам", bg: "classroom" },
    { speaker: "Алона", text: "отвали от меня", bg: "classroom" },
    { speaker: "...", text: "александр отбирает дневник у алоны", bg: "classroom" },
    { speaker: "...", text: "александр начинает громко зачитывать текст", bg: "classroom" },
    { speaker: "Александр", text: "ДОРОГОЙ ДНЕВНИК, Я ЧУВСТВУЮ СЕБЯ ГРЯЗНОЙ, МНЕ КАЖЕТСЯ У МЕНЯ ДЕПРЕССИЯ, ЧТО Я НАДЕЛАЛА", bg: "classroom" },
    { speaker: "Александр", text: "алона, расскажи всем, что ты сделала", bg: "classroom" },
    { speaker: "Алона", text: "отдай сюда мудак", bg: "classroom" },
    { speaker: "Алона", text: "это не ваших умов дело!", bg: "classroom" },
    { speaker: "...", text: "алона вырывает дневник и убегает в слезах", bg: "classroom" },
    { speaker: "...", text: "через 3 минуты в класс заходит русина", bg: "classroom" },
    { speaker: "Русина", text: "так ребят все сделали домашнее задание? сдаем мне на стол", bg: "classroom" },
    { speaker: "...", text: "после урока", bg: "classroom" },
    { speaker: "Лера", text: "алон поделись со мной, что случилось, я за тебя правда переживаю", bg: "classroom" },
    { speaker: "Алона", text: "тебе какое дело, это личное!", bg: "classroom" },
    { speaker: "Лера", text: "я как лучше хотела, но как хочешь, я пошла", bg: "classroom" },
    { speaker: "Алона", text: "ага, иди уже", bg: "classroom" },
    { speaker: "...", text: "лера пошла в кабинет директора", bg: "corridor" },
    { speaker: "...", text: "в кабинете директора", bg: "director_cabinet" },
    { speaker: "Лера", text: "директор, здравствуйте, можно с вами поговорить?", bg: "director_cabinet" },
    { speaker: "Директор", text: "да, лер, привет, проходи, садись", bg: "director_cabinet" },
    { speaker: "Лера", text: "вы не знаете, что с алоной случилось?", bg: "director_cabinet" },
    { speaker: "Директор", text: "хм, нет, а что случилось?", bg: "director_cabinet" },
    { speaker: "Лера", text: "она сегодня весь день убитая и она писала в свой дневник, что сделала, что то мерзкое и чувствует себя грязной", bg: "director_cabinet" },
    { speaker: "Директор", text: "извини, лер, но я не осведомлен об этом", bg: "director_cabinet" },
    { speaker: "Лера", text: "поговорите с ней пожалуйста, может записать ее к школьному психологу?", bg: "director_cabinet" },
    { speaker: "Директор", text: "спасибо, что сообщила я поговорю с ней, можешь идти", bg: "director_cabinet" },
    { speaker: "Лера", text: "спасибо вам, я тогда пошла, до свидания", bg: "director_cabinet" },
    { speaker: "Директор", text: "до свидания, лера", bg: "director_cabinet" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "director_cabinet" }
];

// ========== АНГЛИЙСКИЙ ПЕРЕВОД ==========
const scenesEn = [
    { speaker: "...", text: "in the director's bedroom later that evening", bg: "director_room" },
    { speaker: "...", text: "Peskovskaya is lying down scrolling through reels", bg: "director_room" },
    { speaker: "Principal", text: "honey, I'm going to take a shower", bg: "director_room" },
    { speaker: "Peskovskaya", text: "of course, darling, go ahead", bg: "director_room" },
    { speaker: "...", text: "the principal kisses Peskovskaya on the cheek and leaves for the shower", bg: "director_room" },
    { speaker: "Peskovskaya", text: "damn, I need to transfer some money from his phone. I need to buy ointment, but I have no money right now", bg: "director_room" },
    { speaker: "...", text: "Peskovskaya takes the principal's phone", bg: "director_room" },
    { speaker: "Peskovskaya", text: "OH MY GOD, WHAT IS THIS!?", bg: "director_room" },
    { speaker: "...", text: "she sees a video of his cheating on the phone", bg: "director_room" },
    { speaker: "Peskovskaya", text: "he cheated on me with a schoolgirl?", bg: "director_room" },
    { speaker: "Peskovskaya", text: "he's a bastard, and a pedophile too", bg: "director_room" },
    { speaker: "Peskovskaya", text: "okay, I need to act like I didn't see anything, I'll just transfer the money", bg: "director_room" },
    { speaker: "...", text: "Peskovskaya transfers the money while the principal is in the shower", bg: "director_room" },
    { speaker: "Peskovskaya", text: "damn, but I can't just leave this. I need to go to the police station and turn him in..", bg: "director_room" },
    { speaker: "Peskovskaya", text: "damn, damn", bg: "director_room" },
    { speaker: "...", text: "Peskovskaya quickly records the cheating video on her phone", bg: "director_room" },
    { speaker: "...", text: "the principal enters the bedroom", bg: "director_room" },
    { speaker: "Principal", text: "honey, are you okay? you look pale", bg: "director_room" },
    { speaker: "Peskovskaya", text: "yes, darling, everything's fine", bg: "director_room" },
    { speaker: "...", text: "the principal picks up his phone", bg: "director_room" },
    { speaker: "Principal", text: "did you take my phone?", bg: "director_room" },
    { speaker: "Peskovskaya", text: "yes", bg: "director_room" },
    { speaker: "Principal", text: "why?", bg: "director_room" },
    { speaker: "Peskovskaya", text: "I found some ointment I wanted to buy, so I took your phone to transfer money", bg: "director_room" },
    { speaker: "Principal", text: "did you see anything?", bg: "director_room" },
    { speaker: "Peskovskaya", text: "do you have something to hide?", bg: "director_room" },
    { speaker: "Principal", text: "no", bg: "director_room" },
    { speaker: "Peskovskaya", text: "then why are you asking?", bg: "director_room" },
    { speaker: "Principal", text: "sorry, I'm stressed from work", bg: "director_room" },
    { speaker: "Peskovskaya", text: "I love you, my darling. want me to help relieve your stress?", bg: "director_room" },
    { speaker: "Principal", text: "I love you too. let's", bg: "director_room" },
    { speaker: "...", text: "the principal and Peskovskaya make love", bg: "director_room" },
    { speaker: "...", text: "the next day at school", bg: "classroom" },
    { speaker: "...", text: "Alona sits alone at the last desk in a hoodie", bg: "classroom" },
    { speaker: "cutscene", text: "alonealona", bg: "alonealona" },
    { speaker: "Alona", text: "they humiliated me...", bg: "alonealona" },
    { speaker: "...", text: "Alona takes out her personal diary", bg: "alonealona" },
    { speaker: "Alona", text: "my dear diary, only to you I can vent", bg: "alonealona" },
    { speaker: "Alona", text: "dear diary, I can't cope anymore..", bg: "alonealona" },
    { speaker: "Alona", text: "I feel dirty", bg: "alonealona" },
    { speaker: "Alona", text: "what do I do if I have no one to tell this to? it's so humiliating...", bg: "alonealona" },
    { speaker: "Alona", text: "what a fool I am...", bg: "alonealona" },
    { speaker: "Alona", text: "I need to see a therapist, I think I'm depressed", bg: "alonealona" },
    { speaker: "Alona", text: "why did I even do that...", bg: "alonealona" },
    { speaker: "cutscene", text: "dictory", bg: "dictory" },
    { speaker: "...", text: "Alexander notices the diary", bg: "classroom" },
    { speaker: "Alexander", text: "hey Alona, what are you scribbling there? show us", bg: "classroom" },
    { speaker: "Alona", text: "leave me alone", bg: "classroom" },
    { speaker: "...", text: "Alexander takes the diary from Alona", bg: "classroom" },
    { speaker: "...", text: "Alexander starts reading the text out loud", bg: "classroom" },
    { speaker: "Alexander", text: "DEAR DIARY, I FEEL DIRTY, I THINK I'M DEPRESSED, WHAT HAVE I DONE", bg: "classroom" },
    { speaker: "Alexander", text: "Alona, tell everyone what you did", bg: "classroom" },
    { speaker: "Alona", text: "give it back, you bastard", bg: "classroom" },
    { speaker: "Alona", text: "it's none of your business!", bg: "classroom" },
    { speaker: "...", text: "Alona snatches the diary and runs away in tears", bg: "classroom" },
    { speaker: "...", text: "3 minutes later, Rusina enters the classroom", bg: "classroom" },
    { speaker: "Rusina", text: "so everyone, did you do your homework? hand it in on my desk", bg: "classroom" },
    { speaker: "...", text: "after class", bg: "classroom" },
    { speaker: "Lera", text: "Alona, share with me, what happened? I'm really worried about you", bg: "classroom" },
    { speaker: "Alona", text: "what's it to you? it's personal!", bg: "classroom" },
    { speaker: "Lera", text: "I was trying to help, but fine, I'm leaving", bg: "classroom" },
    { speaker: "Alona", text: "yeah, go already", bg: "classroom" },
    { speaker: "...", text: "Lera goes to the principal's office", bg: "corridor" },
    { speaker: "...", text: "in the principal's office", bg: "director_cabinet" },
    { speaker: "Lera", text: "hello, principal, can I talk to you?", bg: "director_cabinet" },
    { speaker: "Principal", text: "yes, Lera, hello, come in, sit down", bg: "director_cabinet" },
    { speaker: "Lera", text: "do you know what happened to Alona?", bg: "director_cabinet" },
    { speaker: "Principal", text: "hmm, no, what happened?", bg: "director_cabinet" },
    { speaker: "Lera", text: "she's been down all day, and she wrote in her diary that she did something disgusting and feels dirty", bg: "director_cabinet" },
    { speaker: "Principal", text: "sorry, Lera, but I'm not aware of that", bg: "director_cabinet" },
    { speaker: "Lera", text: "please talk to her, maybe refer her to the school psychologist?", bg: "director_cabinet" },
    { speaker: "Principal", text: "thank you for letting me know, I'll talk to her, you can go", bg: "director_cabinet" },
    { speaker: "Lera", text: "thank you, I'll go then, goodbye", bg: "director_cabinet" },
    { speaker: "Principal", text: "goodbye, Lera", bg: "director_cabinet" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "director_cabinet" }
];

// ВЫБИРАЕМ ЯЗЫК
let scenes = isEnglish ? scenesEn : scenesRu;

// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    if (scenes.length > 0) {
        const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
        localStorage.setItem(`progress_8`, percent);
    }
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_8`);
    if (saved) {
        console.log(`Сохранённый прогресс 8 серии: ${saved}%`);
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
            statusBadge.textContent = "EPISODE 8: SECRETS";
        } else {
            statusBadge.textContent = "СЕРИЯ 8: ТАЙНЫ";
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
        if (speakerName) speakerName.innerText = isEnglish ? "THE END OF EPISODE 8" : "КОНЕЦ 8 СЕРИИ";
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