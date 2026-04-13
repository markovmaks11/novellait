const startBtn = document.getElementById('startGameBtn');
const episodesBtn = document.getElementById('episodesBtn');
const episodesPanel = document.getElementById('episodesPanel');
const closeEpisodesBtn = document.getElementById('closeEpisodesBtn');
const episodesList = document.getElementById('episodesList');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const musicToggle = document.getElementById('musicToggle');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const languageToggle = document.getElementById('languageToggle');
const themeSelect = document.getElementById('themeSelect');

// ========== ТЕМЫ ==========
function setTheme(theme) {
    document.body.classList.remove('theme-rose', 'theme-gold', 'theme-blue');
    if (theme !== 'dark') {
        document.body.classList.add(`theme-${theme}`);
    }
    localStorage.setItem('theme', theme);
    if (themeSelect) themeSelect.value = theme;
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        e.stopPropagation();
        setTheme(e.target.value);
    });
}

// ========== ЦИТАТА ДНЯ ==========
const quotes = [
    "«Эй йоу лузеры, моя кликуха — гангстер»",
    "«Я ГАНГСТЕР! ЗАПОМНИ РАЗ И НАВСЕГДА»",
    "«Гангстер теперь изгой»",
    "«МОЙ БЫВШИЙ!?»",
    "«Саша — изгой — не приговор, а диагноз»",
    "«Ты не гангстер, а геморрой на спине у обезьян»",
    "«Сейчас ты будешь получать ПИЗДЫЫ»",
    "«Я бишечка!»",
    "«В снюсаря!»",
    "«Это было импульсивно»",
    "«Ты будешь моим парнем, дурень?»",
    "«Конечно буду!»"
];

function showRandomQuote() {
    const quoteElement = document.getElementById('quoteOfDay');
    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }
}

// ========== ЯЗЫК ==========
let isEnglish = localStorage.getItem('language') === 'en';

function setLanguage(enabled) {
    isEnglish = enabled;
    localStorage.setItem('language', enabled ? 'en' : 'ru');
    updateUIText();
    if (episodesPanel && episodesPanel.classList.contains('active')) {
        generateEpisodesList();
    }
}

function updateUIText() {
    const musicLabel = document.getElementById('musicLabel');
    const volumeLabel = document.getElementById('volumeLabel');
    const languageLabel = document.getElementById('languageLabel');
    const themeLabel = document.getElementById('themeLabel');
    const settingsTitle = document.querySelector('.settings-title');
    const startBtnText = document.querySelector('.btn-text');
    const episodesBtnText = document.querySelector('.episodes-btn-text');
    
    if (isEnglish) {
        if (musicLabel) musicLabel.textContent = 'Background music';
        if (volumeLabel) volumeLabel.textContent = 'Volume';
        if (languageLabel) languageLabel.textContent = 'Language';
        if (themeLabel) themeLabel.textContent = 'Theme';
        if (settingsTitle) settingsTitle.textContent = '⚙️ SETTINGS';
        if (startBtnText) startBtnText.textContent = '▶ START';
        if (episodesBtnText) episodesBtnText.textContent = '📜 EPISODES';
    } else {
        if (musicLabel) musicLabel.textContent = 'Фоновая музыка';
        if (volumeLabel) volumeLabel.textContent = 'Громкость';
        if (languageLabel) languageLabel.textContent = 'Язык / Language';
        if (themeLabel) themeLabel.textContent = 'Тема';
        if (settingsTitle) settingsTitle.textContent = '⚙️ НАСТРОЙКИ';
        if (startBtnText) startBtnText.textContent = '▶ НАЧАТЬ';
        if (episodesBtnText) episodesBtnText.textContent = '📜 СПИСОК СЕРИЙ';
    }
}

if (languageToggle) {
    languageToggle.checked = isEnglish;
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

const MUSIC_URL = 'series/music/alena.mp3';

function getBackgroundMusic() {
    if (!bgMusic) {
        bgMusic = new Audio(MUSIC_URL);
        bgMusic.loop = true;
        bgMusic.volume = musicVolume;
    }
    return bgMusic;
}

function updateMusicState() {
    if (musicEnabled) {
        const music = getBackgroundMusic();
        music.play().catch(e => console.log("Click anywhere to start music"));
    } else {
        if (bgMusic) {
            bgMusic.pause();
        }
    }
}

function updateMusicVolume(volume) {
    musicVolume = volume;
    if (bgMusic) {
        bgMusic.volume = volume;
    }
    localStorage.setItem('musicVolume', Math.round(volume * 100));
}

function updateMusicEnabled(enabled) {
    musicEnabled = enabled;
    localStorage.setItem('musicEnabled', enabled);
    if (enabled) {
        const music = getBackgroundMusic();
        music.play().catch(e => console.log("Не удалось запустить музыку"));
    } else {
        if (bgMusic) {
            bgMusic.pause();
        }
    }
}

document.addEventListener('click', function startMusicOnFirstClick() {
    if (musicEnabled && (!bgMusic || bgMusic.paused)) {
        const music = getBackgroundMusic();
        music.play().catch(e => console.log("Music didn't start"));
    }
    document.removeEventListener('click', startMusicOnFirstClick);
}, { once: false });

// ========== НАСТРОЙКИ UI ==========
if (musicToggle) {
    musicToggle.checked = musicEnabled;
}
if (volumeSlider) {
    volumeSlider.value = musicVolume * 100;
}
if (volumeValue) {
    volumeValue.textContent = Math.round(musicVolume * 100) + '%';
}

if (settingsBtn) {
    settingsBtn.onclick = (e) => {
        e.stopPropagation();
        if (settingsPanel) settingsPanel.classList.add('active');
    };
}

if (closeSettingsBtn) {
    closeSettingsBtn.onclick = (e) => {
        e.stopPropagation();
        if (settingsPanel) settingsPanel.classList.remove('active');
    };
}

if (settingsPanel) {
    settingsPanel.onclick = (e) => {
        if (e.target === settingsPanel) {
            settingsPanel.classList.remove('active');
        }
    };
}

if (musicToggle) {
    musicToggle.addEventListener('change', (e) => {
        e.stopPropagation();
        updateMusicEnabled(e.target.checked);
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        const volume = parseFloat(e.target.value) / 100;
        updateMusicVolume(volume);
        if (volumeValue) volumeValue.textContent = Math.round(volume * 100) + '%';
    });
}

if (languageToggle) {
    languageToggle.addEventListener('change', (e) => {
        e.stopPropagation();
        setLanguage(e.target.checked);
    });
}

// ========== СПИСОК СЕРИЙ ==========
const seriesList = [
    { number: 1, titleRu: "НОВЕНЬКИЙ", titleEn: "THE NEWBIE", file: "series/episode1.html", progress: 0 },
    { number: 2, titleRu: "ПРИЗНАНИЕ", titleEn: "CONFESSION", file: "series/episode2.html", progress: 0 },
    { number: 3, titleRu: "ПОСЛЕДСТВИЯ", titleEn: "CONSEQUENCES", file: "series/episode3.html", progress: 0 },
    { number: 4, titleRu: "ДИСС НА ГАНГСТЕРА", titleEn: "DISS ON GANGSTER", file: "series/episode4.html", progress: 0 },
    { number: 5, titleRu: "ВЗАИМНОСТЬ", titleEn: "RECIPROCITY", file: "series/episode5.html", progress: 0 },
    { number: 6, titleRu: "ЛЮБОВЬ И СТРАСТЬ", titleEn: "LOVE AND PASSION", file: "series/episode6.html", progress: 0 },
    { number: 7, titleRu: "ШКОЛЬНЫЙ КОШМАР", titleEn: "SCHOOL NIGHTMARE", file: "series/episode7.html", progress: 0 },
    { number: 8, titleRu: "ТАЙНЫ", titleEn: "SECRETS", file: "series/episode8.html", progress: 0 },
    { number: 9, titleRu: "РАСПЛАТА", titleEn: "PAYBACK", file: "series/episode9.html", progress: 0 },
    { number: 10, titleRu: "ФИНАЛ СЕЗОНА", titleEn: "SEASON FINAL", file: "series/episode10.html", progress: 0 }
];

function loadProgress() {
    for (let i = 0; i < seriesList.length; i++) {
        const saved = localStorage.getItem(`progress_${i+1}`);
        if (saved) {
            seriesList[i].progress = parseInt(saved);
        }
    }
}

function saveProgress(episodeNumber, percent) {
    localStorage.setItem(`progress_${episodeNumber}`, percent);
    seriesList[episodeNumber-1].progress = percent;
}

function generateEpisodesList() {
    if (!episodesList) return;
    episodesList.innerHTML = '';
    loadProgress();
    
    seriesList.forEach(series => {
        const card = document.createElement('div');
        card.className = 'series-card';
        
        if (series.comingSoon) {
            card.style.opacity = '0.5';
            card.style.cursor = 'not-allowed';
        }
        
        const title = isEnglish ? series.titleEn : series.titleRu;
        const availableText = isEnglish ? '▶ AVAILABLE' : '▶ ДОСТУПНО';
        const soonText = isEnglish ? '⚠️ SOON' : '⚠️ СКОРО';
        const episodeText = isEnglish ? 'EPISODE' : 'СЕРИЯ';
        
        const progressHtml = !series.comingSoon && series.progress > 0 
            ? `<div class="series-progress"><div class="series-progress-bar" style="width: ${series.progress}%"></div><span class="series-progress-text">${series.progress}%</span></div>`
            : '';
        
        card.innerHTML = `
            <div class="series-number">${episodeText} ${series.number}</div>
            <div class="series-title">${title}</div>
            ${progressHtml}
            <div class="series-badge">${series.comingSoon ? soonText : availableText}</div>
        `;
        
        if (!series.comingSoon) {
            card.onclick = () => {
                window.location.href = series.file + (isEnglish ? '?lang=en' : '');
            };
        }
        
        episodesList.appendChild(card);
    });
}

if (episodesBtn) {
    episodesBtn.onclick = (e) => {
        e.stopPropagation();
        generateEpisodesList();
        if (episodesPanel) episodesPanel.classList.add('active');
    };
}

if (closeEpisodesBtn) {
    closeEpisodesBtn.onclick = (e) => {
        e.stopPropagation();
        if (episodesPanel) episodesPanel.classList.remove('active');
    };
}

if (episodesPanel) {
    episodesPanel.onclick = (e) => {
        if (e.target === episodesPanel) {
            episodesPanel.classList.remove('active');
        }
    };
}

if (startBtn) {
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'white';
        flash.style.opacity = '0.8';
        flash.style.zIndex = '9999';
        flash.style.transition = 'opacity 0.2s';
        document.body.appendChild(flash);
        
        const cylinderDiv = document.querySelector('.cylinder');
        if (cylinderDiv) {
            cylinderDiv.style.transform = 'scale(0.9) rotate(20deg)';
            setTimeout(() => {
                cylinderDiv.style.transform = '';
            }, 150);
        }
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                flash.remove();
                window.location.href = "series/episode1.html" + (isEnglish ? '?lang=en' : '');
            }, 200);
        }, 100);
    });
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.settings-panel')) return;
    if (e.target.closest('.settings-btn')) return;
    if (e.target.closest('.close-settings')) return;
    if (e.target.closest('.toggle-switch')) return;
    if (e.target.closest('.volume-control')) return;
    if (e.target.closest('input[type="range"]')) return;
    if (e.target.closest('select')) return;
});

setTimeout(() => {
    if (musicEnabled && (!bgMusic || bgMusic.paused)) {
        const music = getBackgroundMusic();
        music.play().catch(e => console.log("Click anywhere to start music"));
    }
}, 1000);

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.2s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
    updateUIText();
    showRandomQuote();
});

document.addEventListener('contextmenu', (e) => e.preventDefault());