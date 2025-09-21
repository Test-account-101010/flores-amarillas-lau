// Configuración de audio
const musicConfig = {
    src: 'https://www.youtube.com/watch?v=gv63CGCx6vg', // URL de ejemplo
    autoplay: false,
    loop: true,
    volume: 0.5
};

let audio = null;
let isPlaying = false;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimation();
    initializeAudio();
    createFloatingPetals();
    addEventListeners();
});

// Configurar audio
// Configurar audio para usar un archivo local o alojado
function initializeAudio() {
    try {
        audio = new Audio();
        // Usar el archivo MP3 local o alojado
        audio.src = './romantic-music.mp3'; // Asegúrate de que el archivo esté en la misma carpeta que tu proyecto
        audio.loop = musicConfig.loop;
        audio.volume = musicConfig.volume;
    } catch (error) {
        console.log('Audio no disponible:', error);
    }
}

// Configurar animaciones iniciales
function initializeAnimation() {
    // Animar entrada de las flores emoji con efectos dorados
    const flowers = document.querySelectorAll('.emoji-flower');
    flowers.forEach((flower, index) => {
        flower.style.opacity = '0';
        flower.style.transform = 'translateY(50px) scale(0.5)';
        flower.style.filter = 'brightness(0.5) saturate(0.5)';
        
        setTimeout(() => {
            flower.style.transition = 'all 1.5s ease-out';
            flower.style.opacity = '1';
            flower.style.transform = 'translateY(0) scale(1)';
            flower.style.filter = 'brightness(1.2) saturate(1.4) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 235, 59, 0.6))';
            
            // Efecto de aparición con chispas
            setTimeout(() => {
                createSparkleEffect(flower);
            }, 500);
            
        }, index * 200);
    });

    // Animar entrada del mensaje
    const title = document.querySelector('.love-title');
    const subtitle = document.querySelector('.subtitle');
    const subtitle1 = document.querySelector('.subtitle');


    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        setTimeout(() => {
            title.style.transition = 'all 1.5s ease-out';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 1200);
    }
    
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            subtitle.style.transition = 'all 1.5s ease-out';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 1700);
        subtitle1.style.opacity = '0';
        subtitle1.style.transform = 'translateY(30px)';
        setTimeout(() => {
            subtitle1.style.transition = 'all 1.5s ease-out';
            subtitle1.style.opacity = '1';
            subtitle1.style.transform = 'translateY(0)';
        }, 1700);
    }

    // Animar entrada del botón
    const giftBtn = document.querySelector('.gift-button');
    if (giftBtn) {
        giftBtn.style.opacity = '0';
        giftBtn.style.transform = 'translateY(30px) scale(0.8)';
        setTimeout(() => {
            giftBtn.style.transition = 'all 1s ease-out';
            giftBtn.style.opacity = '1';
            giftBtn.style.transform = 'translateY(0) scale(1)';
        }, 2200);
    }
}

// Agregar event listeners
function addEventListeners() {
    const giftButton = document.getElementById('giftButton');
    const musicButton = document.getElementById('musicButton');
    const closeButton = document.getElementById('closeButton');
    const flowerLink = document.querySelector('.flower-link');

    if (giftButton) {
        giftButton.addEventListener('click', openLoveLetter);
    }

    if (musicButton) {
        musicButton.addEventListener('click', toggleMusic);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeLoveLetter);
    }

    if (flowerLink) {
        flowerLink.addEventListener('click', function(e) {
            // Crear efecto especial antes de ir al enlace
            createGoldenSparkles(this);
            
            // Pequeño delay para mostrar el efecto
            setTimeout(() => {
                // El enlace se abrirá normalmente
            }, 300);
        });
    }

    // Cerrar carta con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLoveLetter();
        }
    });

    // Cerrar carta haciendo clic fuera del contenido
    const loveLetter = document.getElementById('loveLetter');
    if (loveLetter) {
        loveLetter.addEventListener('click', function(e) {
            if (e.target === loveLetter) {
                closeLoveLetter();
            }
        });
    }
}

// Abrir carta de amor con animaciones
function openLoveLetter() {
    const giftButton = document.getElementById('giftButton');
    const loveLetter = document.getElementById('loveLetter');
    
    if (!loveLetter) return;

    // Animación del botón
    giftButton.classList.add('clicked');
    
    // Crear explosión de flores
    createFlowerExplosion();
    
    // Abrir carta después de un delay
    setTimeout(() => {
        loveLetter.classList.add('show');
        
        // Iniciar música automáticamente
        if (audio && !isPlaying) {
            playMusic();
        }
        
        // Crear pétalos flotantes
        createFloatingPetals();
        
        // Animar contenido de la carta
        animateLetterContent();
        
    }, 800);

    // Remover clase clicked después de la animación
    setTimeout(() => {
        giftButton.classList.remove('clicked');
    }, 1000);
}

// Cerrar carta de amor
function closeLoveLetter() {
    const loveLetter = document.getElementById('loveLetter');
    if (loveLetter) {
        loveLetter.classList.remove('show');
        
        // Parar pétalos flotantes
        const floatingPetals = document.querySelector('.floating-petals');
        if (floatingPetals) {
            floatingPetals.innerHTML = '';
        }
    }
}

// Crear explosión de flores cuando se hace clic en el regalo
function createFlowerExplosion() {
    const container = document.querySelector('.container');
    const colors = ['🌻', '🌼', '🌷', '🌺', '🌸'];
    
    for (let i = 0; i < 20; i++) {
        const flower = document.createElement('div');
        flower.style.position = 'fixed';
        flower.style.fontSize = '2rem';
        flower.style.pointerEvents = 'none';
        flower.style.zIndex = '999';
        flower.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        // Posición inicial en el centro
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        flower.style.left = centerX + 'px';
        flower.style.top = centerY + 'px';
        
        container.appendChild(flower);
        
        // Animación de explosión
        const angle = (i / 20) * 2 * Math.PI;
        const distance = 150 + Math.random() * 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        flower.animate([
            { 
                left: centerX + 'px', 
                top: centerY + 'px', 
                transform: 'scale(0.5) rotate(0deg)',
                opacity: 1 
            },
            { 
                left: endX + 'px', 
                top: endY + 'px', 
                transform: 'scale(1.5) rotate(360deg)',
                opacity: 0 
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            flower.remove();
        };
    }
}

// Crear pétalos flotantes
function createFloatingPetals() {
    const floatingPetals = document.querySelector('.floating-petals');
    if (!floatingPetals) return;

    // Limpiar pétalos existentes
    floatingPetals.innerHTML = '';
    
    const petalEmojis = ['🌻', '🌼', '💛', '✨'];
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal-float';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        
        floatingPetals.appendChild(petal);
        
        // Remover pétalo después de la animación
        setTimeout(() => {
            if (petal.parentNode) {
                petal.remove();
            }
        }, 8000);
    }
    
    // Crear pétalos periódicamente
    const petalInterval = setInterval(createPetal, 800);
    
    // Limpiar intervalo después de 30 segundos
    setTimeout(() => {
        clearInterval(petalInterval);
    }, 30000);
}

// Animar contenido de la carta
function animateLetterContent() {
    const letterElements = document.querySelectorAll('.letter-content h2, .letter-content p, .love-quote, .signature');
    
    letterElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Control de música
function toggleMusic() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                updateMusicButton();
            }).catch(error => {
                console.log('Error reproduciendo música:', error);
                // Crear tonos de navegador como alternativa
                playBrowserTones();
            });
        }
    } else {
        // Crear tonos de navegador como alternativa
        playBrowserTones();
    }
}

function pauseMusic() {
    if (audio && isPlaying) {
        audio.pause();
        isPlaying = false;
        updateMusicButton();
    }
    stopBrowserTones();
}

function updateMusicButton() {
    const musicButton = document.getElementById('musicButton');
    if (musicButton) {
        musicButton.innerHTML = isPlaying ? '🔇' : '🎵';
        musicButton.title = isPlaying ? 'Pausar música' : 'Reproducir música';
        
        if (isPlaying) {
            musicButton.classList.add('playing');
        } else {
            musicButton.classList.remove('playing');
        }
    }
}

// Alternativa con tonos del navegador usando Web Audio API
let audioContext;
let oscillator;

function playBrowserTones() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear una melodía romántica simple
        const melody = [
            { freq: 261.63, duration: 0.5 }, // C4
            { freq: 293.66, duration: 0.5 }, // D4
            { freq: 329.63, duration: 0.5 }, // E4
            { freq: 349.23, duration: 0.5 }, // F4
            { freq: 392.00, duration: 1.0 }, // G4
            { freq: 349.23, duration: 0.5 }, // F4
            { freq: 329.63, duration: 0.5 }, // E4
            { freq: 293.66, duration: 1.0 }, // D4
            { freq: 261.63, duration: 1.0 }  // C4
        ];
        
        let currentTime = audioContext.currentTime;
        
        melody.forEach(note => {
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(note.freq, currentTime);
            osc.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
            
            osc.start(currentTime);
            osc.stop(currentTime + note.duration);
            
            currentTime += note.duration;
        });
        
        isPlaying = true;
        updateMusicButton();
        
        // Repetir la melodía
        setTimeout(() => {
            if (isPlaying) {
                playBrowserTones();
            }
        }, currentTime * 1000);
        
    } catch (error) {
        console.log('Error con Web Audio API:', error);
    }
}

function stopBrowserTones() {
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    isPlaying = false;
    updateMusicButton();
}

// Crear chispas doradas para el enlace especial
function createGoldenSparkles(element) {
    const colors = ['🌻', '⭐', '✨', '💛', '🌟'];
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animación de explosión dorada
        const angle = (i / 12) * 2 * Math.PI;
        const distance = 80 + Math.random() * 60;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                left: centerX + 'px', 
                top: centerY + 'px', 
                transform: 'scale(0.3) rotate(0deg)',
                opacity: 1 
            },
            { 
                left: endX + 'px', 
                top: endY + 'px', 
                transform: 'scale(1.2) rotate(360deg)',
                opacity: 0 
            }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Efectos especiales adicionales
function addSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { 
                transform: 'translateY(0) scale(0)', 
                opacity: 1 
            },
            { 
                transform: 'translateY(-50px) scale(1.5)', 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Función simplificada para crear chispas en las flores
function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💛'];
    
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '0.8rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '100';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + rect.width / 2) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(sparkle);
        
        const angle = (i / 3) * 2 * Math.PI;
        const distance = 30;
        const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
        const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                left: (rect.left + rect.width / 2) + 'px',
                top: (rect.top + rect.height / 2) + 'px',
                transform: 'scale(0)', 
                opacity: 1 
            },
            { 
                left: endX + 'px',
                top: endY + 'px',
                transform: 'scale(1)', 
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Agregar efecto de brillo a las flores emoji
function addFlowerGlow() {
    const flowers = document.querySelectorAll('.emoji-flower');
    flowers.forEach(flower => {
        flower.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.filter = 'brightness(1.6) saturate(2) drop-shadow(0 0 30px rgba(255, 215, 0, 1)) drop-shadow(0 0 60px rgba(255, 235, 59, 0.9))';
            addSparkleEffect(this);
        });
        
        flower.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1.2) saturate(1.4) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 235, 59, 0.6))';
        });
    });
}

// Inicializar efectos adicionales cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addFlowerGlow();
    }, 2500);
});

// Detectar clic en las flores para efectos especiales
document.addEventListener('click', function(e) {
    if (e.target.closest('.emoji-flower')) {
        const flower = e.target.closest('.emoji-flower');
        addSparkleEffect(flower);
        
        // Animación de pulso
        flower.style.transform = 'scale(1.4)';
        setTimeout(() => {
            flower.style.transform = 'scale(1)';
        }, 200);
    }
});

// Función para ajustar el volumen de la música
function adjustVolume(volume) {
    if (audio) {
        audio.volume = Math.max(0, Math.min(1, volume));
    }
}

// Exportar funciones para uso global si es necesario
window.openLoveLetter = openLoveLetter;
window.closeLoveLetter = closeLoveLetter;
window.toggleMusic = toggleMusic;
window.adjustVolume = adjustVolume;
