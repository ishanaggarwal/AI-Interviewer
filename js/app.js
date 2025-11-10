// Main Application Module - Initializes and coordinates all modules
// Entry point for the application

(function() {
    'use strict';

    /**
     * Initialize the application
     */
    async function initializeApp() {
        try {
            console.log('Initializing Edith - Personal Interview Agent...');

            // Check if all required modules are loaded
            if (!window.CONFIG) {
                throw new Error('Configuration module not loaded');
            }

            // Initialize UI
            if (window.initializeUI) {
                window.initializeUI();
            }

            // Initialize Avatar
            if (window.initializeAvatar) {
                window.initializeAvatar();
            }

            // Initialize Code Editor
            if (window.initializeCodeEditor) {
                window.initializeCodeEditor();
            }

            // Set up event listeners
            setupEventListeners();

            // Set up speech recognition
            setupSpeechRecognition();

            // Update state
            if (window.updateState) {
                window.updateState({ isInitialized: true });
            }

            // Show welcome message
            if (window.updateStatus) {
                window.updateStatus('Ready', 'success');
            }

            console.log('Application initialized successfully');

        } catch (error) {
            console.error('Error initializing application:', error);
            alert(`Failed to initialize application: ${error.message}`);
        }
    }

    /**
     * Set up event listeners for UI elements
     */
    function setupEventListeners() {
        // Interview type selection
        const interviewTypes = ['technical', 'behavioral', 'coding', 'system'];
        interviewTypes.forEach(type => {
            const button = document.getElementById(`${type}Interview`);
            if (button) {
                button.addEventListener('click', () => handleInterviewTypeSelection(type));
            }
        });

        // Interview control buttons
        const beginBtn = document.getElementById('beginInterview');
        if (beginBtn) {
            beginBtn.addEventListener('click', handleBeginInterview);
        }

        const stopBtn = document.getElementById('stopInterview');
        if (stopBtn) {
            stopBtn.addEventListener('click', handleStopInterview);
        }

        const speakBtn = document.getElementById('speakAnswer');
        if (speakBtn) {
            speakBtn.addEventListener('click', handleSpeakAnswer);
        }

        // Text input
        const textInput = document.getElementById('textInput');
        const sendBtn = document.getElementById('sendText');
        const voiceBtn = document.getElementById('voiceInput');
        
        if (textInput && sendBtn) {
            sendBtn.addEventListener('click', handleTextInput);
            textInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleTextInput();
                }
            });
        }
        
        // Voice input button
        if (voiceBtn) {
            voiceBtn.addEventListener('click', toggleVoiceInput);
        }

        // Clear transcript button
        const clearTranscriptBtn = document.getElementById('clearTranscriptBtn');
        if (clearTranscriptBtn) {
            clearTranscriptBtn.addEventListener('click', () => {
                if (window.clearTranscript) {
                    window.clearTranscript();
                }
            });
        }

        // Clear chat button
        const clearChatBtn = document.getElementById('clearChat');
        if (clearChatBtn) {
            clearChatBtn.addEventListener('click', () => {
                if (window.clearChatHistory) {
                    window.clearChatHistory();
                }
            });
        }

        // Toggle code editor button
        const toggleCodeEditorBtn = document.getElementById('toggleCodeEditor');
        if (toggleCodeEditorBtn) {
            toggleCodeEditorBtn.addEventListener('click', () => {
                const panel = document.getElementById('codeEditorPanel');
                if (panel) {
                    const isVisible = panel.style.display !== 'none';
                    panel.style.display = isVisible ? 'none' : 'block';
                    toggleCodeEditorBtn.innerHTML = isVisible 
                        ? '<i class="fas fa-code"></i><span>Open Code Editor</span>'
                        : '<i class="fas fa-times"></i><span>Close Code Editor</span>';
                }
            });
        }

        // Settings toggle
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsPanel = document.getElementById('settingsPanel');
        const closeSettings = document.getElementById('closeSettings');
        
        if (settingsBtn && settingsPanel) {
            settingsBtn.addEventListener('click', () => {
                settingsPanel.classList.toggle('active');
            });
        }
        
        if (closeSettings && settingsPanel) {
            closeSettings.addEventListener('click', () => {
                settingsPanel.classList.remove('active');
            });
        }

        // Theme toggle (Light/Dark Mode)
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            // Check for saved theme preference or default to dark
            const savedTheme = localStorage.getItem('theme') || 'dark';
            if (savedTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.checked = true;
            }
            
            themeToggle.addEventListener('change', () => {
                if (themeToggle.checked) {
                    // Switch to light mode
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    console.log('🌞 Switched to light mode');
                } else {
                    // Switch to dark mode
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'dark');
                    console.log('🌙 Switched to dark mode');
                }
            });
        }

        // Voice toggle
        const voiceToggle = document.getElementById('voiceToggle');
        if (voiceToggle) {
            voiceToggle.addEventListener('change', () => {
                const enabled = voiceToggle.checked;
                console.log('🔊 Voice ' + (enabled ? 'enabled' : 'disabled'));
                // Store preference
                localStorage.setItem('voiceEnabled', enabled);
            });
        }

        // Speech speed control
        const voiceSpeed = document.getElementById('voiceSpeed');
        if (voiceSpeed) {
            voiceSpeed.addEventListener('input', () => {
                const speed = parseFloat(voiceSpeed.value);
                console.log('⚡ Speech speed:', speed);
                // Store preference
                localStorage.setItem('speechSpeed', speed);
            });
        }

        console.log('Event listeners set up');
    }

    /**
     * Set up speech recognition
     */
    function setupSpeechRecognition() {
        try {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                console.warn('Speech recognition not supported');
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            const config = window.CONFIG?.RECOGNITION_CONFIG || {};
            recognition.continuous = config.continuous !== false;
            recognition.interimResults = config.interimResults !== false;
            recognition.lang = config.lang || 'en-US';
            recognition.maxAlternatives = config.maxAlternatives || 1;

            recognition.onstart = () => {
                if (window.updateState) {
                    window.updateState({ isListening: true });
                }
                if (window.updateStatus) {
                    window.updateStatus('Listening...', 'info');
                }
            };

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                // Update transcript display
                if (window.updateTranscript) {
                    window.updateTranscript(interimTranscript || finalTranscript);
                }

                // Handle final transcript
                if (finalTranscript) {
                    if (window.updateState) {
                        window.updateState({ finalTranscript: finalTranscript });
                    }
                    handleSpeechInput(finalTranscript);
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                if (window.updateState) {
                    window.updateState({ isListening: false });
                }
            };

            recognition.onend = () => {
                const state = window.getState ? window.getState() : {};
                if (state.isListening) {
                    // Auto-restart if still in listening mode
                    recognition.start();
                } else {
                    if (window.updateStatus) {
                        window.updateStatus('Stopped listening', 'info');
                    }
                }
            };

            // Store recognition globally
            window.speechRecognition = recognition;

            console.log('Speech recognition set up');

        } catch (error) {
            console.error('Error setting up speech recognition:', error);
        }
    }

    /**
     * Handle interview type selection
     * @param {string} type - Interview type
     */
    function handleInterviewTypeSelection(type) {
        // Update selected type in UI
        const buttons = document.querySelectorAll('.interview-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        
        const selectedBtn = document.getElementById(`${type}Interview`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }

        if (window.updateState) {
            window.updateState({ currentInterviewType: type });
        }

        if (window.updateStatus) {
            const typeName = type.charAt(0).toUpperCase() + type.slice(1);
            window.updateStatus(`${typeName} interview selected`, 'info');
        }
    }

    /**
     * Handle begin interview button
     */
    async function handleBeginInterview() {
        try {
            const state = window.getState ? window.getState() : {};
            const type = state.currentInterviewType;

            if (!type) {
                if (window.showError) {
                    window.showError('Please select an interview type first');
                }
                return;
            }

            if (window.startInterview) {
                await window.startInterview(type);
            }

            // Start speech recognition
            if (window.speechRecognition) {
                window.speechRecognition.start();
            }

        } catch (error) {
            console.error('Error beginning interview:', error);
            if (window.showError) {
                window.showError('Failed to start interview');
            }
        }
    }

    /**
     * Handle stop interview button
     */
    function handleStopInterview() {
        // Stop speech recognition
        if (window.speechRecognition) {
            if (window.updateState) {
                window.updateState({ isListening: false });
            }
            window.speechRecognition.stop();
        }

        // Stop interview
        if (window.stopInterview) {
            window.stopInterview();
        }

        // Clear transcript
        if (window.clearTranscript) {
            window.clearTranscript();
        }
    }

    /**
     * Handle speak answer button
     */
    async function handleSpeakAnswer() {
        try {
            const speakBtn = document.getElementById('speakAnswer');
            const state = window.getState ? window.getState() : {};
            
            // Toggle active state
            if (state.isListening) {
                // Currently listening - turn off (purple)
                if (speakBtn) {
                    speakBtn.classList.remove('active', 'listening');
                }
                
                // Stop listening while processing
                if (window.speechRecognition) {
                    if (window.updateState) {
                        window.updateState({ isListening: false });
                    }
                    window.speechRecognition.stop();
                }
                
                const answer = state.finalTranscript;

                if (!answer || !answer.trim()) {
                    if (window.showError) {
                        window.showError('Please speak your answer first');
                    }
                    return;
                }

                // Clear transcript
                if (window.clearTranscript) {
                    window.clearTranscript();
                }

                if (window.updateState) {
                    window.updateState({ finalTranscript: '' });
                }

                // Handle answer
                if (window.handleAnswer) {
                    await window.handleAnswer(answer);
                }
            } else {
                // Not listening - turn on (green)
                if (speakBtn) {
                    speakBtn.classList.add('active', 'listening');
                }
                
                // Resume listening
                if (window.speechRecognition) {
                    if (window.updateState) {
                        window.updateState({ isListening: true });
                    }
                    window.speechRecognition.start();
                }
            }

        } catch (error) {
            console.error('Error handling answer:', error);
            if (window.showError) {
                window.showError('Failed to process answer');
            }
            // Remove active class on error
            const speakBtn = document.getElementById('speakAnswer');
            if (speakBtn) {
                speakBtn.classList.remove('active', 'listening');
            }
        }
    }

    /**
     * Handle text input
     */
    async function handleTextInput() {
        try {
            const textInput = document.getElementById('textInput');
            if (!textInput) return;

            const text = textInput.value.trim();
            if (!text) return;

            // Clear input
            textInput.value = '';

            const state = window.getState ? window.getState() : {};

            if (state.isInterviewActive) {
                // Handle as interview answer
                if (window.handleAnswer) {
                    await window.handleAnswer(text);
                }
            } else {
                // Handle as general conversation
                if (window.handleUserInput) {
                    await window.handleUserInput(text);
                }
            }

        } catch (error) {
            console.error('Error handling text input:', error);
            if (window.showError) {
                window.showError('Failed to process input');
            }
        }
    }

    /**
     * Handle speech input
     * @param {string} transcript - Speech transcript
     */
    async function handleSpeechInput(transcript) {
        try {
            if (!transcript || !transcript.trim()) return;

            const state = window.getState ? window.getState() : {};

            // Just update the transcript - user will click "Speak Answer" button
            console.log('Speech recognized:', transcript);

        } catch (error) {
            console.error('Error handling speech input:', error);
        }
    }

    /**
     * Toggle voice input on/off
     */
    function toggleVoiceInput() {
        const voiceBtn = document.getElementById('voiceInput');
        if (!voiceBtn) return;
        
        const isListening = voiceBtn.classList.contains('listening');
        
        if (isListening) {
            // Stop listening
            if (window.stopListening) {
                window.stopListening();
            }
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            if (window.updateStatus) {
                window.updateStatus('Ready');
            }
        } else {
            // Start listening
            if (window.startListening) {
                const started = window.startListening();
                if (started) {
                    voiceBtn.classList.add('listening');
                    voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                    if (window.updateStatus) {
                        window.updateStatus('Listening... Speak now');
                    }
                } else {
                    alert('Voice recognition not supported or permission denied');
                }
            } else {
                alert('Voice recognition not available');
            }
        }
    }

    /**
     * Handle user input from voice or text
     * @param {string} text - User's input text
     */
    async function handleUserInput(text) {
        try {
            if (!text || !text.trim()) return;
            
            console.log('📝 User input:', text);
            
            // Add user message to chat
            if (window.addMessage) {
                window.addMessage(text, 'user');
            }
            
            // Stop any current speaking
            if (window.stopSpeaking) {
                window.stopSpeaking();
            }
            
            // Get AI response
            if (window.sendMessage) {
                const response = await window.sendMessage(text);
                
                // Add AI response to chat
                if (window.addMessage) {
                    window.addMessage(response, 'assistant');
                }
                
                // Speak the response with caching
                if (window.speakText) {
                    await window.speakText(response, true);
                }
            }
            
        } catch (error) {
            console.error('Error handling user input:', error);
            if (window.showError) {
                window.showError('Failed to process your message');
            }
        }
    }

    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

    // Expose app functions globally
    window.handleUserInput = handleUserInput;
    window.initializeApp = initializeApp;

    console.log('Application module loaded');

})();
