// speech.js - Text-to-speech functionality using OpenAI API

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';

let currentAudio = null;
let audioContext = null;
let audioCache = new Map(); // Cache for frequently used audio

// Initialize audio context (required for some browsers)
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume audio context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function stopSpeaking() {
    console.log('⏹️ Stopping speech');
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    if (window.avatarState) {
        window.avatarState.isSpeaking = false;
    }
}

async function speakText(text, useCache = true) {
    console.log('🎙️ speakText called with:', text.substring(0, 50) + '...');
    
    // Initialize audio context
    initAudioContext();
    
    // Stop any current speech
    if (currentAudio) {
        console.log('⏹️ Stopping previous speech');
        stopSpeaking();
        await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
    }
    
    try {
        let audioUrl;
        const cacheKey = text.substring(0, 100); // Use first 100 chars as cache key
        
        // Check cache first for faster playback
        if (useCache && audioCache.has(cacheKey)) {
            console.log('⚡ Using cached audio - instant playback!');
            audioUrl = audioCache.get(cacheKey);
        } else {
            console.log('🌐 Calling OpenAI TTS API (tts-1-hd for better quality)...');
            
            // Call OpenAI Text-to-Speech API with HD model
            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'tts-1', // Use tts-1 for faster generation
                    input: text,
                    voice: 'nova',
                    speed: 1.0, // Normal speed for more natural flow
                    response_format: 'mp3' // MP3 for smaller file size
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
            }
            
            console.log('✅ Received audio from OpenAI');
            
            // Convert response to audio blob
            const audioBlob = await response.blob();
            audioUrl = URL.createObjectURL(audioBlob);
            
            // Cache for future use
            if (useCache) {
                audioCache.set(cacheKey, audioUrl);
                console.log('💾 Audio cached for future use');
            }
        }
        
        // Create and play audio
        return new Promise((resolve, reject) => {
            const audio = new Audio(audioUrl);
            currentAudio = audio;
            
            audio.onloadedmetadata = () => {
                console.log(`🎵 Audio ready, duration: ${audio.duration.toFixed(2)}s`);
            };
            
            audio.onplay = () => {
                console.log('▶️ STARTED SPEAKING!');
                if (window.avatarState) {
                    window.avatarState.isSpeaking = true;
                    console.log('✅ Set isSpeaking to true');
                }
            };
            
            audio.onended = () => {
                console.log('⏹️ FINISHED SPEAKING');
                if (window.avatarState) {
                    window.avatarState.isSpeaking = false;
                    console.log('✅ Set isSpeaking to false');
                }
                // Don't revoke cached URLs
                if (!audioCache.has(cacheKey)) {
                    URL.revokeObjectURL(audioUrl);
                }
                currentAudio = null;
                resolve();
            };
            
            audio.onerror = (event) => {
                console.error('❌ Audio playback error:', event);
                if (window.avatarState) {
                    window.avatarState.isSpeaking = false;
                }
                if (!audioCache.has(cacheKey)) {
                    URL.revokeObjectURL(audioUrl);
                }
                currentAudio = null;
                reject(new Error('Audio playback failed'));
            };
            
            // Start playback immediately
            console.log('🚀 Starting audio playback');
            audio.play().catch(error => {
                console.error('❌ Play failed:', error);
                if (window.avatarState) {
                    window.avatarState.isSpeaking = false;
                }
                reject(error);
            });
        });
        
    } catch (error) {
        console.error('❌ Speech synthesis error:', error);
        if (window.avatarState) {
            window.avatarState.isSpeaking = false;
        }
        throw error;
    }
}

// Voice Recognition for user input
let recognition = null;
let isListening = false;

function initVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('⚠️ Speech recognition not supported');
        return null;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
        isListening = true;
        console.log('🎤 Listening...');
        if (window.updateStatus) {
            window.updateStatus('Listening...');
        }
    };
    
    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        
        console.log('📝 Recognized (interim):', transcript);
        
        if (event.results[0].isFinal) {
            console.log('✅ Final transcript:', transcript);
            
            // Automatically stop listening
            if (recognition) {
                try {
                    recognition.stop();
                } catch (e) {
                    console.log('Recognition already stopped');
                }
            }
            
            // Check if we're in an interview or general conversation
            const state = window.getState ? window.getState() : {};
            
            if (state.isInterviewActive) {
                // During interview - send to interview handler
                console.log('📋 Interview active - sending to handleAnswer:', transcript);
                if (window.handleAnswer) {
                    // Add a small delay to ensure state is updated
                    setTimeout(() => {
                        window.handleAnswer(transcript);
                    }, 100);
                } else {
                    console.error('❌ handleAnswer not available');
                }
            } else {
                // General conversation - send to general handler
                console.log('💬 General chat - sending to handleUserInput:', transcript);
                if (window.handleUserInput) {
                    setTimeout(() => {
                        window.handleUserInput(transcript);
                    }, 100);
                } else {
                    console.error('❌ handleUserInput not available');
                }
            }
        }
    };
    
    recognition.onerror = (event) => {
        console.error('❌ Recognition error:', event.error);
        isListening = false;
        if (window.updateStatus) {
            window.updateStatus('Ready');
        }
    };
    
    recognition.onend = () => {
        isListening = false;
        console.log('🎤 Stopped listening');
        
        // Update voice button UI
        const voiceBtn = document.getElementById('voiceInput');
        if (voiceBtn) {
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        }
        
        if (window.updateStatus) {
            window.updateStatus('Ready');
        }
    };
    
    return recognition;
}

function startListening() {
    if (!recognition) {
        recognition = initVoiceRecognition();
    }
    
    if (recognition && !isListening) {
        try {
            recognition.start();
            return true;
        } catch (error) {
            console.error('❌ Failed to start recognition:', error);
            return false;
        }
    }
    return false;
}

function stopListening() {
    if (recognition && isListening) {
        recognition.stop();
    }
}

// Export functions globally
window.speakText = speakText;
window.stopSpeaking = stopSpeaking;
window.startListening = startListening;
window.stopListening = stopListening;

console.log('✅ OpenAI Speech module loaded with voice recognition');
