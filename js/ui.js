// UI Module - Handles user interface updates and interactions
// Manages chat history, status updates, and UI state

(function() {
    'use strict';

    // DOM element references
    let chatHistoryElement = null;
    let statusElement = null;
    let transcriptElement = null;

    /**
     * Initialize UI module
     */
    function initializeUI() {
        // Get DOM elements
        chatHistoryElement = document.getElementById('chatHistory');
        statusElement = document.getElementById('status');
        transcriptElement = document.getElementById('transcript');

        console.log('UI module initialized');
    }

    /**
     * Add a message to the chat history
     * @param {string} text - The message text
     * @param {string} role - The role/sender of the message ('user', 'assistant', or 'system')
     */
    function addMessage(text, role = 'system') {
        if (!chatHistoryElement) {
            console.warn('Chat history element not found');
            return;
        }

        // Determine the appropriate role class
        let roleClass = 'system-message';
        let senderName = 'System';
        
        if (role === 'user') {
            roleClass = 'user-message';
            senderName = 'You';
        } else if (role === 'assistant' || role === 'bot') {
            roleClass = 'assistant-message';
            senderName = 'Edith';
        }

        // Create message container
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${roleClass}`;
        
        // Create message header with sender and timestamp
        const headerDiv = document.createElement('div');
        headerDiv.className = 'message-header';
        
        const senderSpan = document.createElement('span');
        senderSpan.className = 'sender';
        senderSpan.textContent = senderName;
        
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'timestamp';
        const now = new Date();
        timestampSpan.textContent = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        headerDiv.appendChild(senderSpan);
        headerDiv.appendChild(timestampSpan);
        
        // Create message content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        // Assemble the message
        messageDiv.appendChild(headerDiv);
        messageDiv.appendChild(contentDiv);
        
        chatHistoryElement.appendChild(messageDiv);
        
        // Auto-scroll to bottom smoothly
        setTimeout(() => {
            chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
        }, 100);
    }

    /**
     * Update the status indicator
     * @param {string} status - The status message to display
     * @param {string} type - The type of status ('info', 'success', 'error', 'warning')
     */
    function updateStatus(status, type = 'info') {
        if (!statusElement) {
            console.warn('Status element not found');
            return;
        }

        statusElement.textContent = status;
        
        // Remove all type classes
        statusElement.classList.remove('status-info', 'status-success', 'status-error', 'status-warning');
        
        // Add new type class
        statusElement.classList.add(`status-${type}`);
    }

    /**
     * Update the transcript display
     * @param {string} text - The transcript text
     */
    function updateTranscript(text) {
        if (!transcriptElement) {
            console.warn('Transcript element not found');
            return;
        }

        if (text && text.trim()) {
            // Remove placeholder
            const placeholder = transcriptElement.querySelector('.transcript-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Update with new text
            transcriptElement.textContent = text;
            transcriptElement.classList.add('transcript-active');
        } else {
            // Show placeholder if empty
            transcriptElement.innerHTML = '<p class="transcript-placeholder">Your speech will appear here...</p>';
            transcriptElement.classList.remove('transcript-active');
        }
    }

    /**
     * Clear the chat history
     */
    function clearChatHistory() {
        if (!chatHistoryElement) {
            console.warn('Chat history element not found');
            return;
        }

        // Clear all messages
        chatHistoryElement.innerHTML = '';
        
        // Add a subtle separator message
        const separatorDiv = document.createElement('div');
        separatorDiv.className = 'conversation-separator';
        separatorDiv.innerHTML = '<span>New Interview Session Started</span>';
        separatorDiv.style.cssText = `
            text-align: center;
            padding: 1rem;
            margin: 1rem 0;
            color: var(--text-tertiary);
            font-size: 0.875rem;
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
        `;
        
        chatHistoryElement.appendChild(separatorDiv);
        
        console.log('✅ Chat history cleared for new interview');
    }

    /**
     * Clear the transcript
     */
    function clearTranscript() {
        if (!transcriptElement) {
            console.warn('Transcript element not found');
            return;
        }

        transcriptElement.textContent = '';
    }

    /**
     * Show/hide the code editor panel
     * @param {boolean} show - Whether to show the panel
     */
    function toggleCodeEditor(show) {
        const editorPanel = document.getElementById('codeEditorPanel');
        if (editorPanel) {
            editorPanel.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Show/hide the interview panel
     * @param {boolean} show - Whether to show the panel
     */
    function toggleInterviewPanel(show) {
        const interviewPanel = document.getElementById('interviewPanel');
        if (interviewPanel) {
            interviewPanel.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Update button states based on current state
     * @param {Object} state - The current application state
     */
    function updateButtonStates(state) {
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const speakBtn = document.getElementById('speakBtn');

        if (startBtn) {
            startBtn.disabled = state.isListening || state.isInterviewActive;
        }

        if (stopBtn) {
            stopBtn.disabled = !state.isListening && !state.isInterviewActive;
        }

        if (speakBtn) {
            speakBtn.disabled = !state.isInterviewActive;
        }
    }

    /**
     * Show an error message
     * @param {string} message - The error message
     */
    function showError(message) {
        updateStatus(message, 'error');
        console.error(message);
    }

    /**
     * Show a success message
     * @param {string} message - The success message
     */
    function showSuccess(message) {
        updateStatus(message, 'success');
    }

    /**
     * Show an info message
     * @param {string} message - The info message
     */
    function showInfo(message) {
        updateStatus(message, 'info');
    }

    /**
     * Show a warning message
     * @param {string} message - The warning message
     */
    function showWarning(message) {
        updateStatus(message, 'warning');
    }

    // Expose UI functions globally
    window.initializeUI = initializeUI;
    window.addMessage = addMessage;
    window.updateStatus = updateStatus;
    window.updateTranscript = updateTranscript;
    window.clearChatHistory = clearChatHistory;
    window.clearTranscript = clearTranscript;
    window.toggleCodeEditor = toggleCodeEditor;
    window.toggleInterviewPanel = toggleInterviewPanel;
    window.updateButtonStates = updateButtonStates;
    window.showError = showError;
    window.showSuccess = showSuccess;
    window.showInfo = showInfo;
    window.showWarning = showWarning;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUI);
    } else {
        initializeUI();
    }

})();
