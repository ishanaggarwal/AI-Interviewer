// State Module - Manages application state
// Centralized state management for the entire application

(function() {
    'use strict';

    // Application State
    const appState = {
        // Interview state
        isInterviewActive: false,
        currentInterviewType: null,
        interviewStartTime: null,
        interviewDuration: 0,
        questionCount: 0,
        hasAskedIntro: false,

        // Speech state
        isListening: false,
        isSpeaking: false,
        currentTranscript: '',
        finalTranscript: '',

        // Avatar state
        hasWelcomedUser: false,
        lastSpokenMessage: null,
        wasInterrupted: false,

        // Code editor state
        currentLanguage: 'python',
        currentCode: '',
        lastOutput: '',
        isExecuting: false,

        // Conversation history
        messages: [],
        currentResponse: '',

        // UI state
        isInitialized: false,
        lastError: null
    };

    /**
     * Get the current state
     * @returns {Object} A copy of the current state
     */
    function getState() {
        return { ...appState };
    }

    /**
     * Update state with new values
     * @param {Object} updates - Object containing state updates
     */
    function updateState(updates) {
        Object.assign(appState, updates);
        console.log('State updated:', updates);
    }

    /**
     * Reset interview state
     */
    function resetInterviewState() {
        updateState({
            isInterviewActive: false,
            currentInterviewType: null,
            interviewStartTime: null,
            interviewDuration: 0,
            questionCount: 0,
            hasAskedIntro: false
        });
    }

    /**
     * Reset speech state
     */
    function resetSpeechState() {
        updateState({
            isListening: false,
            isSpeaking: false,
            currentTranscript: '',
            finalTranscript: ''
        });
    }

    /**
     * Reset avatar state
     */
    function resetAvatarState() {
        updateState({
            hasWelcomedUser: false,
            lastSpokenMessage: null,
            wasInterrupted: false
        });
    }

    /**
     * Reset code editor state
     */
    function resetEditorState() {
        updateState({
            currentLanguage: 'python',
            currentCode: '',
            lastOutput: '',
            isExecuting: false
        });
    }

    /**
     * Reset all state
     */
    function resetAllState() {
        resetInterviewState();
        resetSpeechState();
        resetEditorState();
        updateState({
            messages: [],
            currentResponse: '',
            lastError: null
        });
    }

    /**
     * Add a message to conversation history
     * @param {string} role - The role of the message sender
     * @param {string} content - The message content
     */
    function addMessageToHistory(role, content) {
        appState.messages.push({
            role: role,
            content: content,
            timestamp: Date.now()
        });

        // Limit message history to prevent memory issues
        const maxMessages = window.CONFIG?.UI_CONFIG?.maxChatHistory || 100;
        if (appState.messages.length > maxMessages) {
            appState.messages = appState.messages.slice(-maxMessages);
        }
    }

    /**
     * Get conversation history for API calls
     * @returns {Array} Array of messages in API format
     */
    function getConversationHistory() {
        return appState.messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    }

    /**
     * Start interview timer
     */
    function startInterviewTimer() {
        if (appState.interviewStartTime) return;

        appState.interviewStartTime = Date.now();
        
        // Update duration every second
        const timerInterval = setInterval(() => {
            if (!appState.isInterviewActive) {
                clearInterval(timerInterval);
                return;
            }

            appState.interviewDuration = Date.now() - appState.interviewStartTime;
            
            // Update duration display
            const durationElement = document.getElementById('durationValue');
            if (durationElement) {
                durationElement.textContent = formatDuration(appState.interviewDuration);
            }
        }, 1000);
    }

    /**
     * Format duration in milliseconds to readable string
     * @param {number} ms - Duration in milliseconds
     * @returns {string} Formatted duration string
     */
    function formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        } else if (minutes > 0) {
            const remainingSeconds = seconds % 60;
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    // Expose state functions globally
    window.appState = appState;
    window.getState = getState;
    window.updateState = updateState;
    window.resetInterviewState = resetInterviewState;
    window.resetSpeechState = resetSpeechState;
    window.resetAvatarState = resetAvatarState;
    window.resetEditorState = resetEditorState;
    window.resetAllState = resetAllState;
    window.addMessageToHistory = addMessageToHistory;
    window.getConversationHistory = getConversationHistory;
    window.startInterviewTimer = startInterviewTimer;
    window.formatDuration = formatDuration;

    // Alias for avatar.js compatibility
    window.avatarState = appState;

    console.log('State module loaded');

})();
