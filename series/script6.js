// ========== СЦЕНАРИЙ 6 СЕРИИ ==========

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

// BACKGROUNDS
const backgrounds = {
    classroom: "images/classroom2.jpg",
    street: "images/street.jpg",
    snusar_room: "images/snusarroom.jpg"
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

// ========== RUSSIAN SCENES (Episode 6) ==========
const scenesRu = [
    { speaker: "...", text: "на след день в школе", bg: "classroom" },
    { speaker: "Александр", text: "ну что Лиз, как тебе вчерашний вечер?)", bg: "classroom" },
    { speaker: "Лиза", text: "Саш, все было просто обалденно!", bg: "classroom" },
    { speaker: "Александр", text: "рад быть полезным, надеюсь я поквитался со своим должком?", bg: "classroom" },
    { speaker: "Лиза", text: "считай, что поквитался", bg: "classroom" },
    { speaker: "Алона Ведерникова", text: "ребята прикиньте, сегодня химии не будет", bg: "classroom" },
    { speaker: "Лера", text: "да ты че, не она же вчера спину сломала", bg: "classroom" },
    { speaker: "Алона Ведерникова", text: "да блин Лера, не будь занудой", bg: "classroom" },
    { speaker: "Снюсарь", text: "эй гангстер, сегодня после пар все в силе?", bg: "classroom" },
    { speaker: "Александр", text: "ну да", bg: "classroom" },
    { speaker: "...", text: "в кабинет зашла Русина", bg: "classroom" },
    { speaker: "Русина", text: "так ребят, начнём наш урок, открываем контурные карты", bg: "classroom" },
    { speaker: "Русина", text: "ваша задача найти на карте остров Эпштейна и отметить его на карте", bg: "classroom" },
    { speaker: "Алона Ведерникова", text: "сикс севен сикс севен, остров Эпштейна", bg: "classroom" },
    { speaker: "Полина", text: "не смешно, алона", bg: "classroom" },
    { speaker: "Алона Ведерникова", text: "блин а я думала будет смешно", bg: "classroom" },
    { speaker: "Лиза мами легенда", text: "в кабинете стало слишком душно, откройте окна", bg: "classroom" },
    { speaker: "Алона Ведерникова", text: "да, прекратите!", bg: "classroom" },
    { speaker: "Русина", text: "так тишина в классе, у вас вроде задание было, или что за разговорчики, я не поняла. уже все выполнили?", bg: "classroom" },
    { speaker: "...", text: "снюсарь достаёт телефон и начинает тайно снимать русину", bg: "classroom" },
    { speaker: "Русина", text: "так снюсарь, это что такое, быстро убрал видеосъёмку, пока я директора не позвала!", bg: "classroom" },
    { speaker: "Снюсарь", text: "да все-все убираю", bg: "classroom" },
    { speaker: "...", text: "после уроков по пути домой", bg: "street" },
    { speaker: "Снюсарь", text: "ну что сашок, как договаривались, ко мне?", bg: "street" },
    { speaker: "Александр", text: "идём", bg: "street" },
    { speaker: "...", text: "у снюсаря дома", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь неожиданно целует в губы Сашу", bg: "snusar_room" },
    { speaker: "Александр", text: "ты че творишь?", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "так ты же сам вчера просил доказать мои чувства, вот доказательства тебе", bg: "snusar_room" },
    { speaker: "Александр", text: "я думал мы просто все обговорим, но так даже лучше)", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "тогда продолжим?", bg: "snusar_room" },
    { speaker: "Александр", text: "стой, расскажи из за чего вы с Полиной расстались", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "эта дура меня бросила из за того, что я в столовой песковской помог, а потом она вообще меня мудаком назвала, представляешь", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "ну и в тот момент я подумал, что с парнями легче, вот и признался тебе", bg: "snusar_room" },
    { speaker: "Александр", text: "то есть ты со мной не по любви, а потому что «так легче»?", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "нет, нет, ты все не так понял, у меня правда есть к тебе чувства!", bg: "snusar_room" },
    { speaker: "Александр", text: "а откуда бы они появились, если ещё вчера ты был натуралом в отношениях с Полиной", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "да я не знаю, ещё после твоего признания я постоянно думал о тебе, но старался отгонять эти мысли", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "а щас я понял свою ориентацию и понял, что хочу быть с тобой", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "ну а ещё ты сильный, умный, красивый и я уверен, что в глубине души ты очень добрый", bg: "snusar_room" },
    { speaker: "Александр", text: "ну ладно, я тебе верю", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "а из за чего я тебе понравился?", bg: "snusar_room" },
    { speaker: "Александр", text: "не знаю если честно, просто вот понравился, я не волен своим чувствам и сердцу", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "давай тогда просто продолжим то, с чего начали?", bg: "snusar_room" },
    { speaker: "Александр", text: "давай", bg: "snusar_room" },
    { speaker: "...", text: "Александр и снюсарь жёстко целуются в засос", bg: "snusar_room" },
    { speaker: "...", text: "их языки сплетаются в страстном танце", bg: "snusar_room" },
    { speaker: "Александр", text: "снюсарь у тебя что ли встал?", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "как я чувствую у тебя тоже", bg: "snusar_room" },
    { speaker: "Александр", text: "давай тогда освободимся от одежды?", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "раздень меня", bg: "snusar_room" },
    { speaker: "...", text: "Александр раздевает снюсаря", bg: "snusar_room" },
    { speaker: "Александр", text: "теперь ты меня)", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь раздевает Сашу", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "у тебя такой большой член..", bg: "snusar_room" },
    { speaker: "Александр", text: "хочешь его попробовать", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "если честно, то мечтаю, но сначала назови меня как нибудь грязно", bg: "snusar_room" },
    { speaker: "...", text: "Саша наклоняется к уху снюсаря", bg: "snusar_room" },
    { speaker: "Александр", text: "(шепотом) пидорок мой", bg: "snusar_room" },
    { speaker: "...", text: "член снюсаря окончательно встал и оттуда потекла смазка", bg: "snusar_room" },
    { speaker: "Александр", text: "ого, не знал что тебя это так заводит", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "меня это очень сильно заводит", bg: "snusar_room" },
    { speaker: "Александр", text: "отсоси мне пожалуйста", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь аккуратно берёт огромный член Александра в рот", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь начинает сосать", bg: "snusar_room" },
    { speaker: "...", text: "александр берёт снюсаря за волосы и задаёт темп", bg: "snusar_room" },
    { speaker: "Александр", text: "рот шире открой и соси глубже", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь начинает давиться слюнями", bg: "snusar_room" },
    { speaker: "Александр", text: "не давись, шлюха", bg: "snusar_room" },
    { speaker: "...", text: "Саша оборачивает снюсаря к себе жопой", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "Саш, может сегодня без анала..?", bg: "snusar_room" },
    { speaker: "Александр", text: "нет уже поздно", bg: "snusar_room" },
    { speaker: "...", text: "Александр резко вошёл в снюсаря двумя пальцами", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "АУЧ", bg: "snusar_room" },
    { speaker: "Александр", text: "терпи давай, мне в тебя ещё хуй совать", bg: "snusar_room" },
    { speaker: "...", text: "Александр запихивает в снюсаря ещё два пальца", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "АУ", bg: "snusar_room" },
    { speaker: "Александр", text: "терпи я сказал и заткнись, пока кляп в рот не вставил", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь резко замолчал", bg: "snusar_room" },
    { speaker: "Александр", text: "мой послушный пёсик", bg: "snusar_room" },
    { speaker: "...", text: "Александр резко вошёл в снюсаря", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "аххх... ахххх, давай жестче, ещё жёстче", bg: "snusar_room" },
    { speaker: "...", text: "Александр долбит снюсаря", bg: "snusar_room" },
    { speaker: "...", text: "они одновременно кончают", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "это был лучший секс в моей жизни, спасибо тебе", bg: "snusar_room" },
    { speaker: "...", text: "Александр усмехнулся", bg: "snusar_room" },
    { speaker: "Александр", text: "ты будешь моим парнем, дурень?", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "конечно буду!", bg: "snusar_room" },
    { speaker: "Александр", text: "закрепим наши отношения поцелуем", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь и Александр снова засосались", bg: "snusar_room" },
    { speaker: "Александр", text: "извини, но мне пора идти, уже поздно", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "хорошо, любовь моя, напиши как дома будешь", bg: "snusar_room" },
    { speaker: "Александр", text: "ага, давай", bg: "snusar_room" },
    { speaker: "...", text: "Саша ушёл домой", bg: "snusar_room" },
    { speaker: "...", text: "снюсарь так и остался лежать голым в эйфории", bg: "snusar_room" },
    { speaker: "...", text: "ПРОДОЛЖЕНИЕ СЛЕДУЕТ...", bg: "snusar_room" }
];

// ========== ENGLISH TRANSLATION (Episode 6) ==========
const scenesEn = [
    { speaker: "...", text: "The next day at school", bg: "classroom" },
    { speaker: "Alexander", text: "So, Liz, how was last night?)", bg: "classroom" },
    { speaker: "Lisa", text: "Sash, it was absolutely amazing!", bg: "classroom" },
    { speaker: "Alexander", text: "Glad to be useful. I hope I've repaid my debt?", bg: "classroom" },
    { speaker: "Lisa", text: "Consider it repaid", bg: "classroom" },
    { speaker: "Alona Vedernikova", text: "Guys, guess what? No chemistry today!", bg: "classroom" },
    { speaker: "Lera", text: "What are you talking about? She broke her back yesterday, remember?", bg: "classroom" },
    { speaker: "Alona Vedernikova", text: "Oh come on, Lera, don't be such a downer", bg: "classroom" },
    { speaker: "Snusar", text: "Hey Gangster, after class today, still on?", bg: "classroom" },
    { speaker: "Alexander", text: "Yeah", bg: "classroom" },
    { speaker: "...", text: "Rusina walks into the classroom", bg: "classroom" },
    { speaker: "Rusina", text: "Alright everyone, let's start our lesson. Open your outline maps", bg: "classroom" },
    { speaker: "Rusina", text: "Your task is to find Epstein Island on the map and mark it", bg: "classroom" },
    { speaker: "Alona Vedernikova", text: "Six seven six seven, Epstein Island", bg: "classroom" },
    { speaker: "Polina", text: "Not funny, Alona", bg: "classroom" },
    { speaker: "Alona Vedernikova", text: "Damn, I thought it would be funny", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "It's too stuffy in here, open the windows", bg: "classroom" },
    { speaker: "Alona Vedernikova", text: "Yeah, stop it!", bg: "classroom" },
    { speaker: "Rusina", text: "Quiet in the classroom! You had an assignment, or am I not understanding something? Is everyone done already?", bg: "classroom" },
    { speaker: "...", text: "Snusar takes out his phone and starts secretly filming Rusina", bg: "classroom" },
    { speaker: "Rusina", text: "Snusar, what is this? Put the video away immediately, or I'll call the principal!", bg: "classroom" },
    { speaker: "Snusar", text: "Okay, okay, I'm putting it away", bg: "classroom" },
    { speaker: "...", text: "After school, on the way home", bg: "street" },
    { speaker: "Snusar", text: "So, Sash, as agreed, my place?", bg: "street" },
    { speaker: "Alexander", text: "Let's go", bg: "street" },
    { speaker: "...", text: "At Snusar's house", bg: "snusar_room" },
    { speaker: "...", text: "Snusar unexpectedly kisses Sasha on the lips", bg: "snusar_room" },
    { speaker: "Alexander", text: "What are you doing?", bg: "snusar_room" },
    { speaker: "Snusar", text: "You asked me to prove my feelings yesterday. Here's your proof", bg: "snusar_room" },
    { speaker: "Alexander", text: "I thought we'd just talk, but this is even better)", bg: "snusar_room" },
    { speaker: "Snusar", text: "Then shall we continue?", bg: "snusar_room" },
    { speaker: "Alexander", text: "Wait, tell me why you and Polina broke up", bg: "snusar_room" },
    { speaker: "Snusar", text: "That idiot dumped me because I helped Peskovskaya in the cafeteria. Then she called me a jerk, can you believe it?", bg: "snusar_room" },
    { speaker: "Snusar", text: "And at that moment, I thought it's easier with guys. So I confessed to you", bg: "snusar_room" },
    { speaker: "Alexander", text: "So you're with me not out of love, but because 'it's easier'?", bg: "snusar_room" },
    { speaker: "Snusar", text: "No, no, you got it all wrong. I really have feelings for you!", bg: "snusar_room" },
    { speaker: "Alexander", text: "Where would they come from if you were straight just yesterday, dating Polina?", bg: "snusar_room" },
    { speaker: "Snusar", text: "I don't know. Ever since your confession, I kept thinking about you, but I tried to push those thoughts away", bg: "snusar_room" },
    { speaker: "Snusar", text: "And now I've figured out my orientation and realized I want to be with you", bg: "snusar_room" },
    { speaker: "Snusar", text: "Plus, you're strong, smart, handsome, and I'm sure deep down you're very kind", bg: "snusar_room" },
    { speaker: "Alexander", text: "Alright, I believe you", bg: "snusar_room" },
    { speaker: "Snusar", text: "And why did you like me?", bg: "snusar_room" },
    { speaker: "Alexander", text: "Honestly, I don't know. I just liked you. I can't control my feelings and my heart.", bg: "snusar_room" },
    { speaker: "Snusar", text: "Then let's just continue what we started?", bg: "snusar_room" },
    { speaker: "Alexander", text: "Let's", bg: "snusar_room" },
    { speaker: "...", text: "Alexander and Snusar make out passionately", bg: "snusar_room" },
    { speaker: "...", text: "Their tongues intertwine in a passionate dance", bg: "snusar_room" },
    { speaker: "Alexander", text: "Snusar, are you hard?", bg: "snusar_room" },
    { speaker: "Snusar", text: "I feel like you are too", bg: "snusar_room" },
    { speaker: "Alexander", text: "Then let's get rid of our clothes?", bg: "snusar_room" },
    { speaker: "Snusar", text: "Undress me", bg: "snusar_room" },
    { speaker: "...", text: "Alexander undresses Snusar", bg: "snusar_room" },
    { speaker: "Alexander", text: "Now you undress me)", bg: "snusar_room" },
    { speaker: "...", text: "Snusar undresses Sasha", bg: "snusar_room" },
    { speaker: "Snusar", text: "You're so big..", bg: "snusar_room" },
    { speaker: "Alexander", text: "Want to try it?", bg: "snusar_room" },
    { speaker: "Snusar", text: "Honestly, I've been dreaming about it. But first, call me something dirty", bg: "snusar_room" },
    { speaker: "...", text: "Sasha leans close to Snusar's ear", bg: "snusar_room" },
    { speaker: "Alexander", text: "(whispering) my little faggot", bg: "snusar_room" },
    { speaker: "...", text: "Snusar's cock gets completely hard and precum starts leaking", bg: "snusar_room" },
    { speaker: "Alexander", text: "Wow, I didn't know that turned you on so much", bg: "snusar_room" },
    { speaker: "Snusar", text: "It turns me on a lot", bg: "snusar_room" },
    { speaker: "Alexander", text: "Suck me off, please", bg: "snusar_room" },
    { speaker: "...", text: "Snusar carefully takes Alexander's huge cock into his mouth", bg: "snusar_room" },
    { speaker: "...", text: "Snusar starts sucking", bg: "snusar_room" },
    { speaker: "...", text: "Alexander grabs Snusar by the hair and sets the pace", bg: "snusar_room" },
    { speaker: "Alexander", text: "Open your mouth wider and suck deeper", bg: "snusar_room" },
    { speaker: "...", text: "Snusar starts choking on saliva", bg: "snusar_room" },
    { speaker: "Alexander", text: "Don't choke, whore", bg: "snusar_room" },
    { speaker: "...", text: "Sasha turns Snusar around, ass facing him", bg: "snusar_room" },
    { speaker: "Snusar", text: "Sash, maybe no anal today..?", bg: "snusar_room" },
    { speaker: "Alexander", text: "No, it's too late", bg: "snusar_room" },
    { speaker: "...", text: "Alexander forcefully inserts two fingers into Snusar", bg: "snusar_room" },
    { speaker: "Snusar", text: "OUCH", bg: "snusar_room" },
    { speaker: "Alexander", text: "Just bear with it, I still have to put my dick in you", bg: "snusar_room" },
    { speaker: "...", text: "Alexander shoves two more fingers into Snusar", bg: "snusar_room" },
    { speaker: "Snusar", text: "OW", bg: "snusar_room" },
    { speaker: "Alexander", text: "I said bear with it and shut up, or I'll put a gag in your mouth", bg: "snusar_room" },
    { speaker: "...", text: "Snusar suddenly goes silent", bg: "snusar_room" },
    { speaker: "Alexander", text: "My obedient little puppy", bg: "snusar_room" },
    { speaker: "...", text: "Alexander forcefully enters Snusar", bg: "snusar_room" },
    { speaker: "Snusar", text: "Ahhh... ahhhh, harder, even harder", bg: "snusar_room" },
    { speaker: "...", text: "Alexander pounds Snusar", bg: "snusar_room" },
    { speaker: "...", text: "They cum at the same time", bg: "snusar_room" },
    { speaker: "Snusar", text: "That was the best sex of my life, thank you", bg: "snusar_room" },
    { speaker: "...", text: "Alexander smirks", bg: "snusar_room" },
    { speaker: "Alexander", text: "Will you be my boyfriend, you fool?", bg: "snusar_room" },
    { speaker: "Snusar", text: "Of course I will!", bg: "snusar_room" },
    { speaker: "Alexander", text: "Let's seal our relationship with a kiss", bg: "snusar_room" },
    { speaker: "...", text: "Snusar and Alexander start making out again", bg: "snusar_room" },
    { speaker: "Alexander", text: "Sorry, but I have to go, it's late", bg: "snusar_room" },
    { speaker: "Snusar", text: "Okay, my love, text me when you get home", bg: "snusar_room" },
    { speaker: "Alexander", text: "Yeah, sure", bg: "snusar_room" },
    { speaker: "...", text: "Sasha leaves", bg: "snusar_room" },
    { speaker: "...", text: "Snusar remains lying naked in euphoria", bg: "snusar_room" },
    { speaker: "...", text: "TO BE CONTINUED...", bg: "snusar_room" }
];

// ВЫБИРАЕМ ЯЗЫК
let scenes = isEnglish ? scenesEn : scenesRu;

// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    if (scenes.length > 0) {
        const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
        localStorage.setItem(`progress_6`, percent);
    }
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_6`);
    if (saved) {
        console.log(`Сохранённый прогресс 6 серии: ${saved}%`);
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
            statusBadge.textContent = "EPISODE 6: LOVE AND PASSION";
        } else {
            statusBadge.textContent = "СЕРИЯ 6: ЛЮБОВЬ И СТРАСТЬ";
        }
    }
}

function showScene(index) {
    if (index >= scenes.length) {
        if (speakerName) speakerName.innerText = isEnglish ? "END OF EPISODE" : "КОНЕЦ СЕРИИ";
        if (dialogueText) dialogueText.innerText = isEnglish ? "The story continues..." : "Продолжение следует...";
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
        if (speakerName) speakerName.innerText = isEnglish ? "THE END OF EPISODE 6" : "КОНЕЦ 6 СЕРИИ";
        if (dialogueText) dialogueText.innerText = isEnglish ? "To be continued..." : "Продолжение следует...";
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

// ЕДИНСТВЕННАЯ ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЯЗЫКА
function setLanguage(enabled) {
    isEnglish = enabled;
    localStorage.setItem('language', enabled ? 'en' : 'ru');
    
    // ПЕРЕКЛЮЧАЕМ МАССИВ СЦЕН
    scenes = isEnglish ? scenesEn : scenesRu;
    
    // ОБНОВЛЯЕМ ТЕКУЩУЮ СЦЕНУ
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
}

// НАСТРОЙКИ МУЗЫКИ
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