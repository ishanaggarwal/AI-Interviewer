// Conversation Module - Handles OpenAI API interactions
// Manages conversation flow and AI responses

(function() {
    'use strict';

    /**
     * Send message to OpenAI API
     * @param {string} userMessage - The user's message
     * @param {string} systemPrompt - Optional system prompt to add context
     * @returns {Promise<string>} AI response
     */
    async function sendMessage(userMessage, systemPrompt = null) {
        try {
            const config = window.CONFIG;
            if (!config || !config.OPENAI_API_KEY) {
                throw new Error('OpenAI API key not configured');
            }

            // Build messages array
            const messages = [];
            
            // Add system prompt if provided
            if (systemPrompt) {
                messages.push({
                    role: 'system',
                    content: systemPrompt
                });
            }

            // Add conversation history
            const history = window.getConversationHistory ? window.getConversationHistory() : [];
            messages.push(...history);

            // Add current user message
            messages.push({
                role: 'user',
                content: userMessage
            });

            // Make API request
            const response = await fetch(config.OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: config.OPENAI_MODEL,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'API request failed');
            }

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content || 'No response received';

            // Add messages to history
            if (window.addMessageToHistory) {
                window.addMessageToHistory('user', userMessage);
                window.addMessageToHistory('assistant', aiResponse);
            }

            return aiResponse;

        } catch (error) {
            console.error('Error sending message to OpenAI:', error);
            throw error;
        }
    }

    /**
     * Handle user input and get AI response
     * @param {string} userInput - User's input text
     * @param {string} context - Optional context for the conversation
     */
    async function handleUserInput(userInput, context = null) {
        try {
            if (!userInput || !userInput.trim()) {
                throw new Error('Please provide a message');
            }

            // Update UI
            if (window.addMessage) {
                window.addMessage(userInput, 'user');
            }

            if (window.updateStatus) {
                window.updateStatus('Thinking...', 'info');
            }

            // Get AI response
            const response = await sendMessage(userInput, context);

            // Update UI with response
            if (window.addMessage) {
                window.addMessage(response, 'assistant');
            }

            if (window.updateStatus) {
                window.updateStatus('Ready', 'success');
            }

            // Speak the response
            if (window.speakText) {
                await window.speakText(response);
            }

            return response;

        } catch (error) {
            const errorMessage = window.utils ? window.utils.parseError(error) : error.message;
            
            if (window.showError) {
                window.showError(`Error: ${errorMessage}`);
            }

            if (window.addMessage) {
                window.addMessage(`Error: ${errorMessage}`, 'system');
            }

            throw error;
        }
    }

    /**
     * Start a general conversation
     */
    async function startConversation() {
        try {
            if (window.updateStatus) {
                window.updateStatus('Starting conversation...', 'info');
            }

            const greeting = window.CONFIG?.EDITH_INTRO || 
                "Hello! I'm Edith, your Personal Interview Agent. How can I help you today?";

            if (window.addMessage) {
                window.addMessage(greeting, 'assistant');
            }

            if (window.speakText) {
                await window.speakText(greeting);
            }

            if (window.updateStatus) {
                window.updateStatus('Ready to chat', 'success');
            }

        } catch (error) {
            console.error('Error starting conversation:', error);
            if (window.showError) {
                window.showError('Failed to start conversation');
            }
        }
    }

    /**
     * Clear conversation history
     */
    function clearConversation() {
        if (window.resetAllState) {
            window.resetAllState();
        }

        if (window.clearChatHistory) {
            window.clearChatHistory();
        }

        if (window.updateStatus) {
            window.updateStatus('Conversation cleared', 'info');
        }
    }

    /**
     * Get a quick response for simple queries
     * @param {string} query - Simple query
     * @returns {Promise<string>} AI response
     */
    async function quickResponse(query) {
        try {
            const response = await fetch(window.CONFIG.OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.CONFIG.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: window.CONFIG.OPENAI_MODEL,
                    messages: [{ role: 'user', content: query }],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || 'No response';

        } catch (error) {
            console.error('Quick response error:', error);
            return 'I apologize, but I encountered an error processing your request.';
        }
    }

    // Expose conversation functions globally
    window.sendMessage = sendMessage;
    window.handleUserInput = handleUserInput;
    window.startConversation = startConversation;
    window.clearConversation = clearConversation;
    window.quickResponse = quickResponse;

    console.log('Conversation module loaded');

})();
