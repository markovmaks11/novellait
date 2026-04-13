// ========== СЦЕНАРИЙ 10 СЕРИИ (ФИНАЛ СЕЗОНА) ==========

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
    dashayakovenko: "images/dashayakovenko.jpg",
    schoolboy1: "images/schoolboy1.jpg",
    schoolboy2: "images/schoolboy2.jpg",
    schoolboy3: "images/schoolboy3.jpg",
    police: "images/police.jpg"
};

function getAvatar(speaker) {
    const name = speaker.toLowerCase();
    
    // СНАЧАЛА ПРОВЕРЯЕМ МАМУ АЛОНЫ
    if (name.includes("мама алоны") || name.includes("alonamom")) return avatars.alonamom;
    
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
    if (name.includes("дарья") || name.includes("яковенко") || name.includes("dashayakovenko")) return avatars.dashayakovenko;
    if (name.includes("школьник 1") || name.includes("schoolboy1")) return avatars.schoolboy1;
    if (name.includes("школьник 2") || name.includes("schoolboy2")) return avatars.schoolboy2;
    if (name.includes("школьник 3") || name.includes("schoolboy3")) return avatars.schoolboy3;
    if (name.includes("участковый") || name.includes("police")) return avatars.police;
    
    return avatars.default;
}

// ФОНЫ
const backgrounds = {
    classroom2: "images/classroom2.jpg",
    street: "images/street.jpg",
    snusarroom: "images/snusarroom.jpg",
    snusarclosed: "images/snusarcosled.jpg"
};

// ========== КАТСЦЕНЫ ==========
const cutscenes = {
    alonawithsandwich: "images/alonawithsandwich.jpg",
    snusarcosled: "images/snusarclosed.jpg"
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
    { speaker: "...", text: "директора уводят омоновцы.", bg: "classroom2" },
    { speaker: "Лиза мами легенда", text: "что здесь происходит?", bg: "classroom2" },
    { speaker: "Лера", text: "это не школа, а проклятие", bg: "classroom2" },
    { speaker: "Лера", text: "сначала песковская ломает спину, потом отчисляется алона, теперь уводят директора", bg: "classroom2" },
    { speaker: "Снюсарь", text: "да согласен, так себе местечко, может тоже перевестись", bg: "classroom2" },
    { speaker: "Александр", text: "если ты переводишься, то я с тобой", bg: "classroom2" },
    { speaker: "Дарья Яковенко", text: "саша, малыш, останься здесь со мной, я все таки новенькая", bg: "classroom2" },
    { speaker: "Александр", text: "блять, ты дура нихуя не попутала? мы расстались год назад, потому что ты мне изменила, что ты сейчас от меня хочешь?", bg: "classroom2" },
    { speaker: "Дарья", text: "саш, я осознала все свои ошибки и теперь хочу вернуть наши очень нишевые отношения", bg: "classroom2" },
    { speaker: "Снюсарь", text: "по моему тебе саша уже все ясно сказал", bg: "classroom2" },
    { speaker: "Снюсарь", text: "еще одно слово в его сторону и ты пожалеешь.", bg: "classroom2" },
    { speaker: "Дарья", text: "да ладно, не кипишуй ты так", bg: "classroom2" },
    { speaker: "...", text: "в класс заходит песковская", bg: "classroom2" },
    { speaker: "Песковская", text: "всем привет, мои любимые, давно не виделись", bg: "classroom2" },
    { speaker: "Песковская", text: "у меня есть для вас пара новостей", bg: "classroom2" },
    { speaker: "Песковская", text: "первая: я не буду оглашать причину его задержания, но теперь некоторое время пост директора занимаю - я.", bg: "classroom2" },
    { speaker: "Песковская", text: "вторая новость: на сегодня вы можете быть свободны, школа закрывается, но завтра все в штатном режиме", bg: "classroom2" },
    { speaker: "Песковская", text: "всем спасибо за внимание и до свидание", bg: "classroom2" },
    { speaker: "Класс", text: "УРААА", bg: "classroom2" },
    { speaker: "...", text: "все разошлись по домам", bg: "street" },
    { speaker: "...", text: "дома у снюсаря", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "как думаешь из за чего повязали директора", bg: "snusar_room" },
    { speaker: "Александр", text: "у меня есть одна теория, но мне кажется, что это бред", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "все равно расскажи", bg: "snusar_room" },
    { speaker: "Александр", text: "может это связано с алоной?", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "почему ты так думаешь?", bg: "snusar_room" },
    { speaker: "Александр", text: "не знаю, тайминги странные, сначала алона пишет в дневнике о нечто ужасном, потом сразу забирают директора", bg: "snusar_room" },
    { speaker: "Снюсарь", text: "давай пойдем погулять с лизой, лерой и полиной и все с ними обсудим", bg: "snusar_room" },
    { speaker: "Александр", text: "хорошая идея давай", bg: "snusar_room" },
    { speaker: "...", text: "через какое то время на улице, когда все собрались", bg: "street" },
    { speaker: "Александр", text: "привет девочки", bg: "street" },
    { speaker: "Снюсарь", text: "привет всем", bg: "street" },
    { speaker: "Лера", text: "и вам привет голубки", bg: "street" },
    { speaker: "Лиза", text: "прив прив", bg: "street" },
    { speaker: "Полина", text: "ку", bg: "street" },
    { speaker: "Александр", text: "мы со снюсарем хотели с вами обсудить одну теорию", bg: "street" },
    { speaker: "Лиза", text: "какую?", bg: "street" },
    { speaker: "Александр", text: "мы думаем, что странное поведение алоны и то что директора повязали - это связанно", bg: "street" },
    { speaker: "Лиза", text: "по моему бред и ничего не связано здесь", bg: "street" },
    { speaker: "Лера", text: "а знаете в этом есть смысл", bg: "street" },
    { speaker: "Снюсарь", text: "ты что то знаешь?", bg: "street" },
    { speaker: "Лера", text: "ну не то чтобы...", bg: "street" },
    { speaker: "Лера", text: "короче в тот день, когда саша прочитал всем алонину записку, я пошла к директору и попросила его поговорить с алоной", bg: "street" },
    { speaker: "Лера", text: "спросила, не знает ли он, что с ней случилось и почему она убитая и тд", bg: "street" },
    { speaker: "Лера", text: "он ответил, что ничего не знает и спешно выпроводил меня", bg: "street" },
    { speaker: "Лера", text: "но мне показалось, что он растерялся или даже напрягся будто", bg: "street" },
    { speaker: "Полина", text: "блин а это уже странно", bg: "street" },
    { speaker: "Лиза", text: "может выманить алону на улицу и уговорить ее все нам рассказать?", bg: "street" },
    { speaker: "Александр", text: "и как ты собираешься это сделать", bg: "street" },
    { speaker: "Лиза", text: "у меня есть идея, но для этого нам нужно сходить в ленту", bg: "street" },
    { speaker: "Полина", text: "зачем нам в ленту?", bg: "street" },
    { speaker: "Лиза", text: "алона же любит покушать, вот мы и сдобрим ее сэндвичем", bg: "street" },
    { speaker: "Снюсарь", text: "а поэтому это идиотская идея", bg: "street" },
    { speaker: "Лиза", text: "не нравится - предлагай", bg: "street" },
    { speaker: "Снюсарь", text: "ладно, идей все равно нет, поэтому хотя бы так попробуем", bg: "street" },
    { speaker: "...", text: "ребята сходили в ленту, купили сэндвич и вернулись", bg: "street" },
    { speaker: "Лиза", text: "щас я позвоню алоне", bg: "street" },
    { speaker: "Полина", text: "стой, мне кажется саше и снюсарю лучше уйти", bg: "street" },
    { speaker: "Снюсарь", text: "что? почему?", bg: "street" },
    { speaker: "Полина", text: "вообще то это вы развесили те листовки по школе", bg: "street" },
    { speaker: "Полина", text: "алона сразу подумает, что мы хотим опять посмеяться над ней и уйдет", bg: "street" },
    { speaker: "Александр", text: "ладно мы пошли тогда", bg: "street" },
    { speaker: "Снюсарь", text: "как закончите, сообщите нам", bg: "street" },
    { speaker: "Полина", text: "хорошо, хорошо", bg: "street" },
    { speaker: "...", text: "лиза позвала алону и они встретились", bg: "street" },
    { speaker: "Алона", text: "что вы от меня хотели?", bg: "street" },
    { speaker: "Лера", text: "алона пожалуйста не убегай, мы правда за тебя переживаем...", bg: "street" },
    { speaker: "Лиза", text: "вот я даже принесла тебе твой любимый сэндвич", bg: "street" },
    { speaker: "cutscene", text: "alonawithsandwich", bg: "street" },
    { speaker: "Алона", text: "ладно я вам верю, так что вы хотите?", bg: "street" },
    { speaker: "Лиза", text: "у нас есть теория, что та твоя запись с дневника как то связана с тем, что сегодня директора повязали", bg: "street" },
    { speaker: "Алона", text: "ЕГО ПОВЯЗАЛИ?", bg: "street" },
    { speaker: "Лера", text: "ну да, а почему ты так удивляешься?", bg: "street" },
    { speaker: "Полина", text: "или тебе все таки есть, что нам рассказать?", bg: "street" },
    { speaker: "Алона", text: "только пообещайте, что никому больше об этом не рассказывать", bg: "street" },
    { speaker: "Лиза", text: "клянусь, ни единой душе не расскажу", bg: "street" },
    { speaker: "Лера", text: "обещаю", bg: "street" },
    { speaker: "Полина", text: "ты знаешь, я - могила", bg: "street" },
    { speaker: "Алона", text: "короче меня изнасиловал директор..", bg: "street" },
    { speaker: "Полина", text: "ЧЕГО?", bg: "street" },
    { speaker: "Лера", text: "КАК?", bg: "street" },
    { speaker: "Лиза", text: "ЗАЧЕМ?", bg: "street" },
    { speaker: "Алона", text: "с помощью шантажа...", bg: "street" },
    { speaker: "Лиза", text: "а чем он шантажировал..?", bg: "street" },
    { speaker: "Алона", text: "обещай, что не осудишь меня...", bg: "street" },
    { speaker: "Лиза", text: "клянусь, никогда", bg: "street" },
    { speaker: "Алона", text: "короче, лиз, ты мне нравишься", bg: "street" },
    { speaker: "Алона", text: "в тот день я нарисовала на листочке твой портрет, но потом мне показалось это безумно глупо и я выбросила его", bg: "street" },
    { speaker: "Алона", text: "но оказывается, что директор следил за мной, а потом подобрал с мусорки мой рисунок", bg: "street" },
    { speaker: "Алона", text: "а после уроков позвал к себе", bg: "street" },
    { speaker: "Алона", text: "и сказал, что если я не сделаю это, то он все покажет тебе...", bg: "street" },
    { speaker: "Лиза", text: "алона ну ты глупышка..(", bg: "street" },
    { speaker: "Лиза", text: "тебе надо было сразу мне рассказать и ничего бы не случилось", bg: "street" },
    { speaker: "Алона", text: "то есть ты меня не осуждаешь?", bg: "street" },
    { speaker: "Лиза", text: "конечно нет, мы же бывшие подруги и хорошие одноклассницы", bg: "street" },
    { speaker: "Лиза", text: "я бы никогда не осудила человека за чувства", bg: "street" },
    { speaker: "Алона", text: "какая же я дура..", bg: "street" },
    { speaker: "Лиза", text: "не кори себя, ты же не знала", bg: "street" },
    { speaker: "Полина", text: "а вообще хорошо все, что хорошо заканчивается", bg: "street" },
    { speaker: "Лера", text: "вот видишь, директора повязали, а мы тебя сейчас не бросили, а поддерживаем", bg: "street" },
    { speaker: "Лиза", text: "иди ко мне, я тебя обниму", bg: "street" },
    { speaker: "Лера", text: "давайте лучше совместные обнимашки", bg: "street" },
    { speaker: "...", text: "все девочки обнялись", bg: "street" },
    { speaker: "Алона", text: "спасибо вам за поддержку, я пошла тогда", bg: "street" },
    { speaker: "Лиза", text: "удачи тебе!", bg: "street" },
    { speaker: "Полина", text: "пока алонка", bg: "street" },
    { speaker: "Лера", text: "пока!", bg: "street" },
    { speaker: "...", text: "девочки обратно встретились со снюсарем и сашей", bg: "street" },
    { speaker: "Александр", text: "ну что там? есть новости?", bg: "street" },
    { speaker: "Лиза", text: "вообще есть, ты был прав, алона и директор связаны", bg: "street" },
    { speaker: "Лера", text: "но к сожалению мы не можем рассказать подробности, так как поклялись молчать", bg: "street" },
    { speaker: "Снюсарь", text: "понятно", bg: "street" },
    { speaker: "Полина", text: "ладно уже поздно, давайте по домам", bg: "street" },
    { speaker: "Лиза", text: "всем до завтра!", bg: "street" },
    { speaker: "...", text: "ребята разошлись", bg: "street" },
    { speaker: "...", text: "снюсарь почти подошел к подъезду и тут..", bg: "street" },
    { speaker: "...", text: "из черной машины на него вылетела группа людей и увезла его", bg: "street" },
    { speaker: "Снюсарь", text: "что вы делаете, твари?", bg: "street" },
    { speaker: "cutscene", text: "snusarcosled", bg: "snusarcosled" },
    { speaker: "...", text: "КОНЕЦ ПЕРВОГО СЕЗОНА! встретимся во втором", bg: "snusarcosled" },
    { speaker: "...", text: "продолжение следует...", bg: "snusarcosled" }
];

// ========== АНГЛИЙСКИЙ ПЕРЕВОД ==========
const scenesEn = [
    { speaker: "...", text: "the police are taking the principal away", bg: "classroom" },
    { speaker: "Lisa Mama Legend", text: "what's going on here?", bg: "classroom" },
    { speaker: "Lera", text: "this school is cursed", bg: "classroom" },
    { speaker: "Lera", text: "first Peskovskaya breaks her back, then Alona gets expelled, now they're taking the principal away", bg: "classroom" },
    { speaker: "Snusar", text: "yeah, not a great place, maybe I should transfer too", bg: "classroom" },
    { speaker: "Alexander", text: "if you transfer, I'm going with you", bg: "classroom" },
    { speaker: "Darya Yakovenko", text: "sasha, baby, stay here with me, I'm the new girl after all", bg: "classroom" },
    { speaker: "Alexander", text: "fuck, are you crazy? we broke up a year ago because you cheated on me, what do you want from me now?", bg: "classroom" },
    { speaker: "Darya", text: "sash, I realized all my mistakes and now I want to get back our very niche relationship", bg: "classroom" },
    { speaker: "Snusar", text: "I think Sasha already made himself clear", bg: "classroom" },
    { speaker: "Snusar", text: "one more word about him and you'll regret it", bg: "classroom" },
    { speaker: "Darya", text: "okay, don't freak out so much", bg: "classroom" },
    { speaker: "...", text: "Peskovskaya enters the classroom", bg: "classroom" },
    { speaker: "Peskovskaya", text: "hello, my darlings, long time no see", bg: "classroom" },
    { speaker: "Peskovskaya", text: "I have a couple of news for you", bg: "classroom" },
    { speaker: "Peskovskaya", text: "first: I won't disclose the reason for his detention, but for now I'm taking over as principal", bg: "classroom" },
    { speaker: "Peskovskaya", text: "second: you can be free today, school is closing, but tomorrow everything will be back to normal", bg: "classroom" },
    { speaker: "Peskovskaya", text: "thank you all for your attention and goodbye", bg: "classroom" },
    { speaker: "Class", text: "HURRAY", bg: "classroom" },
    { speaker: "...", text: "everyone goes home", bg: "street" },
    { speaker: "...", text: "at Snusar's house", bg: "snusar_room" },
    { speaker: "Snusar", text: "why do you think they arrested the principal?", bg: "snusar_room" },
    { speaker: "Alexander", text: "I have a theory, but I think it's crazy", bg: "snusar_room" },
    { speaker: "Snusar", text: "tell me anyway", bg: "snusar_room" },
    { speaker: "Alexander", text: "maybe it's connected to Alona?", bg: "snusar_room" },
    { speaker: "Snusar", text: "why do you think that?", bg: "snusar_room" },
    { speaker: "Alexander", text: "I don't know, the timing is strange, first Alona writes about something terrible in her diary, then they immediately take the principal away", bg: "snusar_room" },
    { speaker: "Snusar", text: "let's go for a walk with Lisa, Lera and Polina and discuss it with them", bg: "snusar_room" },
    { speaker: "Alexander", text: "good idea, let's go", bg: "snusar_room" },
    { speaker: "...", text: "some time later on the street, when everyone has gathered", bg: "street" },
    { speaker: "Alexander", text: "hello girls", bg: "street" },
    { speaker: "Snusar", text: "hello everyone", bg: "street" },
    { speaker: "Lera", text: "hello lovebirds", bg: "street" },
    { speaker: "Lisa", text: "hi hi", bg: "street" },
    { speaker: "Polina", text: "hey", bg: "street" },
    { speaker: "Alexander", text: "Snusar and I wanted to discuss a theory with you", bg: "street" },
    { speaker: "Lisa", text: "what theory?", bg: "street" },
    { speaker: "Alexander", text: "we think Alona's strange behavior and the principal's arrest might be connected", bg: "street" },
    { speaker: "Lisa", text: "I think that's nonsense, nothing is connected", bg: "street" },
    { speaker: "Lera", text: "actually, there might be something to it", bg: "street" },
    { speaker: "Snusar", text: "do you know something?", bg: "street" },
    { speaker: "Lera", text: "well, not really...", bg: "street" },
    { speaker: "Lera", text: "basically, the day Sasha read Alona's note to everyone, I went to the principal and asked him to talk to Alona", bg: "street" },
    { speaker: "Lera", text: "I asked if he knew what happened to her and why she was so down", bg: "street" },
    { speaker: "Lera", text: "he said he didn't know anything and quickly dismissed me", bg: "street" },
    { speaker: "Lera", text: "but I thought he seemed confused or even tense", bg: "street" },
    { speaker: "Polina", text: "damn, that is weird", bg: "street" },
    { speaker: "Lisa", text: "maybe we should lure Alona out and convince her to tell us everything?", bg: "street" },
    { speaker: "Alexander", text: "and how do you plan to do that?", bg: "street" },
    { speaker: "Lisa", text: "I have an idea, but we need to go to the store", bg: "street" },
    { speaker: "Polina", text: "why do we need to go to the store?", bg: "street" },
    { speaker: "Lisa", text: "Alona loves to eat, so we'll bribe her with a sandwich", bg: "street" },
    { speaker: "Snusar", text: "that's a stupid idea", bg: "street" },
    { speaker: "Lisa", text: "don't like it? suggest something else", bg: "street" },
    { speaker: "Snusar", text: "fine, I don't have any other ideas anyway, so let's try this", bg: "street" },
    { speaker: "...", text: "the guys went to the store, bought a sandwich and came back", bg: "street" },
    { speaker: "Lisa", text: "I'll call Alona now", bg: "street" },
    { speaker: "Polina", text: "wait, I think Sasha and Snusar should leave", bg: "street" },
    { speaker: "Snusar", text: "what? why?", bg: "street" },
    { speaker: "Polina", text: "you two were the ones who posted those flyers around school", bg: "street" },
    { speaker: "Polina", text: "Alona will immediately think we want to make fun of her again and she'll leave", bg: "street" },
    { speaker: "Alexander", text: "okay, we'll go then", bg: "street" },
    { speaker: "Snusar", text: "let us know when you're done", bg: "street" },
    { speaker: "Polina", text: "okay, okay", bg: "street" },
    { speaker: "...", text: "Lisa calls Alona and they meet", bg: "street" },
    { speaker: "Alona", text: "what do you want from me?", bg: "street" },
    { speaker: "Lera", text: "Alona, please don't run away, we're really worried about you...", bg: "street" },
    { speaker: "Lisa", text: "I even brought you your favorite sandwich", bg: "street" },
    { speaker: "cutscene", text: "alonawithsandwich", bg: "street" },
    { speaker: "Alona", text: "okay, I believe you, so what do you want?", bg: "street" },
    { speaker: "Lisa", text: "we have a theory that your diary entry might be connected to the principal's arrest today", bg: "street" },
    { speaker: "Alona", text: "THEY ARRESTED HIM?", bg: "street" },
    { speaker: "Lera", text: "yes, why are you so surprised?", bg: "street" },
    { speaker: "Polina", text: "or do you have something to tell us after all?", bg: "street" },
    { speaker: "Alona", text: "just promise you won't tell anyone else", bg: "street" },
    { speaker: "Lisa", text: "I swear, I won't tell a soul", bg: "street" },
    { speaker: "Lera", text: "I promise", bg: "street" },
    { speaker: "Polina", text: "you know me, I'm a vault", bg: "street" },
    { speaker: "Alona", text: "basically... the principal raped me..", bg: "street" },
    { speaker: "Polina", text: "WHAT?", bg: "street" },
    { speaker: "Lera", text: "HOW?", bg: "street" },
    { speaker: "Lisa", text: "WHY?", bg: "street" },
    { speaker: "Alona", text: "through blackmail...", bg: "street" },
    { speaker: "Lisa", text: "what did he blackmail you with..?", bg: "street" },
    { speaker: "Alona", text: "promise you won't judge me...", bg: "street" },
    { speaker: "Lisa", text: "I swear, never", bg: "street" },
    { speaker: "Alona", text: "basically, Lisa... I like you", bg: "street" },
    { speaker: "Alona", text: "that day I drew your portrait on a piece of paper, but then I thought it was incredibly stupid and threw it away", bg: "street" },
    { speaker: "Alona", text: "but it turns out the principal was watching me, then picked my drawing out of the trash", bg: "street" },
    { speaker: "Alona", text: "and after class, he called me to his office", bg: "street" },
    { speaker: "Alona", text: "and said that if I didn't do it, he would show it to you...", bg: "street" },
    { speaker: "Lisa", text: "Alona, you silly girl..(", bg: "street" },
    { speaker: "Lisa", text: "you should have told me right away and nothing would have happened", bg: "street" },
    { speaker: "Alona", text: "so you don't judge me?", bg: "street" },
    { speaker: "Lisa", text: "of course not, we were friends and we're still good classmates", bg: "street" },
    { speaker: "Lisa", text: "I would never judge someone for their feelings", bg: "street" },
    { speaker: "Alona", text: "what a fool I am..", bg: "street" },
    { speaker: "Lisa", text: "don't blame yourself, you didn't know", bg: "street" },
    { speaker: "Polina", text: "well, all's well that ends well", bg: "street" },
    { speaker: "Lera", text: "see, they arrested the principal, and we didn't abandon you, we supported you", bg: "street" },
    { speaker: "Lisa", text: "come here, let me hug you", bg: "street" },
    { speaker: "Lera", text: "let's have a group hug", bg: "street" },
    { speaker: "...", text: "all the girls hug", bg: "street" },
    { speaker: "Alona", text: "thank you for your support, I'll go now", bg: "street" },
    { speaker: "Lisa", text: "good luck to you!", bg: "street" },
    { speaker: "Polina", text: "bye Alona", bg: "street" },
    { speaker: "Lera", text: "bye!", bg: "street" },
    { speaker: "...", text: "the girls meet back up with Snusar and Sasha", bg: "street" },
    { speaker: "Alexander", text: "so? any news?", bg: "street" },
    { speaker: "Lisa", text: "actually yes, you were right, Alona and the principal are connected", bg: "street" },
    { speaker: "Lera", text: "but unfortunately we can't give details, we swore to keep quiet", bg: "street" },
    { speaker: "Snusar", text: "got it", bg: "street" },
    { speaker: "Polina", text: "okay, it's late, let's go home", bg: "street" },
    { speaker: "Lisa", text: "see you tomorrow!", bg: "street" },
    { speaker: "...", text: "everyone goes home", bg: "street" },
    { speaker: "...", text: "Snusar is almost at his entrance when suddenly..", bg: "street" },
    { speaker: "...", text: "a group of people jump out of a black car and take him away", bg: "street" },
    { speaker: "Snusar", text: "what are you doing, you bastards?", bg: "street" },
    { speaker: "cutscene", text: "snusarcosled", bg: "snusarcosled" },
    { speaker: "...", text: "END OF SEASON ONE! see you in season two", bg: "snusarcosled" },
    { speaker: "...", text: "to be continued...", bg: "snusarcosled" }
];

// ВЫБИРАЕМ ЯЗЫК
let scenes = isEnglish ? scenesEn : scenesRu;

// ========== СОХРАНЕНИЕ ПРОГРЕССА ==========
function saveProgress() {
    if (scenes.length > 0) {
        const percent = Math.round((currentSceneIndex / (scenes.length - 1)) * 100);
        localStorage.setItem(`progress_10`, percent);
    }
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_10`);
    if (saved) {
        console.log(`Сохранённый прогресс 10 серии: ${saved}%`);
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
            statusBadge.textContent = "EPISODE 10: SEASON FINALE";
        } else {
            statusBadge.textContent = "СЕРИЯ 10: ФИНАЛ СЕЗОНА";
        }
    }
}

async function showScene(index) {
    if (index >= scenes.length) {
        if (speakerName) speakerName.innerText = isEnglish ? "END OF SEASON ONE" : "КОНЕЦ ПЕРВОГО СЕЗОНА";
        if (dialogueText) dialogueText.innerText = isEnglish ? "See you in season two!" : "Встретимся во втором сезоне!";
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