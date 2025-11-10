// Interview Module - Handles interview-specific functionality
// Manages different interview types and question flows

(function() {
    'use strict';

    // Interview prompts are loaded from interview-prompts.js
    // Access via window.INTERVIEW_PROMPTS

    let currentQuestionIndex = 0;
    let interviewTimer = null;
    let currentInterviewType = null;

    /**
     * Start an interview of specified type
     * @param {string} type - Interview type (technical, behavioral, coding, system)
     */
    async function startInterview(type) {
        try {
            const INTERVIEW_PROMPTS = window.INTERVIEW_PROMPTS;
            if (!INTERVIEW_PROMPTS || !INTERVIEW_PROMPTS[type]) {
                throw new Error(`Invalid interview type: ${type}`);
            }

            currentInterviewType = type;

            // Update state
            if (window.updateState) {
                window.updateState({
                    isInterviewActive: true,
                    currentInterviewType: type,
                    questionCount: 0,
                    hasAskedIntro: false
                });
            }

            // Show/hide UI elements
            const beginBtn = document.getElementById('beginInterview');
            const stopBtn = document.getElementById('stopInterview');
            const answerControl = document.getElementById('answerControl');
            const interviewStats = document.getElementById('interview-stats');
            const interviewTypeValue = document.getElementById('interviewTypeValue');
            
            if (beginBtn) beginBtn.style.display = 'none';
            if (stopBtn) stopBtn.style.display = 'inline-flex';
            if (answerControl) answerControl.style.display = 'block';
            if (interviewStats) interviewStats.style.display = 'flex';
            if (interviewTypeValue) {
                interviewTypeValue.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            }

            // Start timer
            if (window.startInterviewTimer) {
                window.startInterviewTimer();
            }

            // Clear previous conversation
            if (window.clearChatHistory) {
                window.clearChatHistory();
            }

            // Update UI
            if (window.updateStatus) {
                window.updateStatus(`Starting ${type} interview...`, 'info');
            }

            // Reset question index
            currentQuestionIndex = 0;

            // Ask first question (intro)
            await askNextQuestion();
            
            // For coding interviews, show the code editor
            if (type === 'coding') {
                const codeEditorToggle = document.getElementById('toggleCodeEditor');
                if (codeEditorToggle && window.toggleCodeEditor) {
                    // Auto-open code editor for coding interviews
                    setTimeout(() => {
                        window.toggleCodeEditor();
                    }, 2000);
                }
            }

        } catch (error) {
            console.error('Error starting interview:', error);
            if (window.showError) {
                window.showError('Failed to start interview');
            }
        }
    }

    /**
     * Stop the current interview
     */
    function stopInterview() {
        const state = window.getState ? window.getState() : {};
        const type = state.currentInterviewType;

        // Update state
        if (window.updateState) {
            window.updateState({
                isInterviewActive: false,
                currentInterviewType: null
            });
        }

        // Show/hide UI elements
        const beginBtn = document.getElementById('beginInterview');
        const stopBtn = document.getElementById('stopInterview');
        const answerControl = document.getElementById('answerControl');
        const interviewStats = document.getElementById('interview-stats');
        
        if (beginBtn) beginBtn.style.display = 'inline-flex';
        if (stopBtn) stopBtn.style.display = 'none';
        if (answerControl) answerControl.style.display = 'none';
        if (interviewStats) interviewStats.style.display = 'none';

        // Stop speaking
        if (window.stopSpeaking) {
            window.stopSpeaking();
        }

        // Update status
        if (window.updateStatus) {
            window.updateStatus('Interview ended', 'info');
        }

        // Add summary message
        if (window.addMessage) {
            window.addMessage(
                `Interview complete! You answered ${state.questionCount} questions in ${window.formatDuration ? window.formatDuration(state.interviewDuration) : 'some time'}. Great job!`,
                'system'
            );
        }

        currentQuestionIndex = 0;
    }

    /**
     * Ask the next question in the interview
     */
    async function askNextQuestion() {
        try {
            const INTERVIEW_PROMPTS = window.INTERVIEW_PROMPTS;
            const state = window.getState ? window.getState() : {};
            const type = state.currentInterviewType;

            if (!type || !INTERVIEW_PROMPTS || !INTERVIEW_PROMPTS[type]) {
                throw new Error('No active interview');
            }

            // Special handling for coding interviews
            if (type === 'coding') {
                await askCodingQuestion();
                return;
            }

            const questions = INTERVIEW_PROMPTS[type].questions;

            // Check if we have more questions
            if (currentQuestionIndex >= questions.length) {
                if (window.addMessage) {
                    window.addMessage(
                        "We've covered all the planned questions. Would you like to discuss anything else, or shall we wrap up?",
                        'assistant'
                    );
                }
                return;
            }

            // Get next question
            const question = questions[currentQuestionIndex];
            currentQuestionIndex++;

            // Update question count
            if (window.updateState) {
                window.updateState({
                    questionCount: currentQuestionIndex,
                    hasAskedIntro: currentQuestionIndex > 0
                });
            }

            // Update UI - responses value
            const responsesElement = document.getElementById('responsesValue');
            if (responsesElement) {
                responsesElement.textContent = currentQuestionIndex;
            }

            // Display and speak question
            if (window.addMessage) {
                window.addMessage(question, 'assistant');
            }

            if (window.speakText) {
                await window.speakText(question);
            }

            if (window.updateStatus) {
                window.updateStatus('Waiting for your answer...', 'info');
            }

        } catch (error) {
            console.error('Error asking question:', error);
            if (window.showError) {
                window.showError('Failed to ask question');
            }
        }
    }

    /**
     * Ask a LeetCode coding question
     */
    async function askCodingQuestion() {
        try {
            const state = window.getState ? window.getState() : {};
            const LEETCODE_QUESTIONS = window.LEETCODE_EASY_QUESTIONS;

            if (!LEETCODE_QUESTIONS || LEETCODE_QUESTIONS.length === 0) {
                throw new Error('LeetCode questions not loaded');
            }

            // For first question, just introduce and present the problem
            if (!state.hasAskedIntro) {
                // Select a random LeetCode problem
                const randomIndex = Math.floor(Math.random() * LEETCODE_QUESTIONS.length);
                const problem = LEETCODE_QUESTIONS[randomIndex];

                // Store the current problem in state
                if (window.updateState) {
                    window.updateState({
                        currentLeetCodeProblem: problem,
                        questionCount: 1,
                        hasAskedIntro: true,
                        codingPhase: 'problem' // Tracks: problem -> approach -> complexity -> code -> review
                    });
                }

                // Format the problem presentation
                let problemText = `Great! Let me give you a LeetCode problem to solve.\n\n`;
                problemText += `**Problem ${problem.id}: ${problem.title}** (${problem.difficulty})\n\n`;
                problemText += `${problem.description}\n\n`;
                
                if (problem.examples && problem.examples.length > 0) {
                    problemText += `**Examples:**\n`;
                    problem.examples.forEach((ex, i) => {
                        problemText += `\nExample ${i + 1}:\n`;
                        problemText += `Input: ${ex.input}\n`;
                        problemText += `Output: ${ex.output}\n`;
                        if (ex.explanation) {
                            problemText += `Explanation: ${ex.explanation}\n`;
                        }
                    });
                }
                
                if (problem.constraints && problem.constraints.length > 0) {
                    problemText += `\n**Constraints:**\n`;
                    problem.constraints.forEach(c => {
                        problemText += `• ${c}\n`;
                    });
                }

                problemText += `\n\nDo you have any clarifying questions about the problem?`;

                // Display and speak
                if (window.addMessage) {
                    window.addMessage(problemText, 'assistant');
                }

                if (window.speakText) {
                    const spokenText = `Great! Let me give you a LeetCode problem to solve. Problem ${problem.id}: ${problem.title}. ${problem.description.substring(0, 200)}... I've shared the full problem details in the chat. Do you have any clarifying questions about the problem?`;
                    await window.speakText(spokenText);
                }

                // Auto-open code editor
                setTimeout(() => {
                    if (window.toggleCodeEditor) {
                        const codePanel = document.getElementById('codeEditorPanel');
                        if (codePanel && !codePanel.classList.contains('active')) {
                            window.toggleCodeEditor();
                        }
                    }
                }, 2000);

            } else {
                // Subsequent interactions - guide through phases
                const phase = state.codingPhase || 'approach';
                
                if (phase === 'approach') {
                    const question = "Before you start coding, can you walk me through your approach to solving this problem?";
                    
                    if (window.addMessage) {
                        window.addMessage(question, 'assistant');
                    }
                    if (window.speakText) {
                        await window.speakText(question);
                    }
                    
                    if (window.updateState) {
                        window.updateState({ codingPhase: 'complexity' });
                    }
                    
                } else if (phase === 'complexity') {
                    const question = "Great explanation! Now, what would be the time and space complexity of your approach?";
                    
                    if (window.addMessage) {
                        window.addMessage(question, 'assistant');
                    }
                    if (window.speakText) {
                        await window.speakText(question);
                    }
                    
                    if (window.updateState) {
                        window.updateState({ codingPhase: 'code' });
                    }
                    
                } else if (phase === 'code') {
                    const question = "Excellent! Now please implement your solution in the code editor below and click 'Share with Edith' when you're ready.";
                    
                    if (window.addMessage) {
                        window.addMessage(question, 'assistant');
                    }
                    if (window.speakText) {
                        await window.speakText(question);
                    }
                    
                    if (window.updateState) {
                        window.updateState({ codingPhase: 'review' });
                    }
                }
            }

            // Update UI
            const responsesElement = document.getElementById('responsesValue');
            if (responsesElement) {
                responsesElement.textContent = state.questionCount || 1;
            }

            if (window.updateStatus) {
                window.updateStatus('Waiting for your answer...', 'info');
            }

        } catch (error) {
            console.error('Error asking coding question:', error);
            if (window.showError) {
                window.showError('Failed to ask coding question');
            }
        }
    }

    /**
     * Handle user's answer to interview question
     * @param {string} answer - User's answer
     */
    async function handleAnswer(answer) {
        try {
            console.log('📝 handleAnswer called with:', answer?.substring(0, 50));
            
            if (!answer || !answer.trim()) {
                throw new Error('Please provide an answer');
            }

            const INTERVIEW_PROMPTS = window.INTERVIEW_PROMPTS;
            const state = window.getState ? window.getState() : {};
            const type = state.currentInterviewType;

            console.log('📊 Interview state:', { type, hasPrompts: !!INTERVIEW_PROMPTS });

            if (!type) {
                throw new Error('No active interview session');
            }

            if (!INTERVIEW_PROMPTS || !INTERVIEW_PROMPTS[type]) {
                console.warn('⚠️ Interview prompts not loaded, using fallback');
            }

            // Add user's answer
            if (window.addMessage) {
                window.addMessage(answer, 'user');
            }

            if (window.updateStatus) {
                window.updateStatus('Processing your answer...', 'info');
            }

            // Get AI feedback using the interview system prompt
            const systemPrompt = INTERVIEW_PROMPTS?.[type]?.systemPrompt || 
                `You are Edith, conducting a ${type} interview. Provide helpful feedback.`;
            
            // Special handling for coding interviews
            let feedbackPrompt;
            if (type === 'coding') {
                const phase = state.codingPhase || 'approach';
                const problem = state.currentLeetCodeProblem;
                
                if (phase === 'complexity') {
                    // They just explained their approach
                    feedbackPrompt = `The candidate explained their approach: "${answer}"\n\nProvide brief feedback on their approach (is it correct? any issues?) and then ask them about time and space complexity.`;
                    
                } else if (phase === 'code') {
                    // They just explained complexity
                    feedbackPrompt = `The candidate explained complexity: "${answer}"\n\nProvide brief feedback on whether their complexity analysis is correct, then ask them to implement the solution in the code editor.`;
                    
                } else if (phase === 'review') {
                    // They submitted code or are discussing code
                    if (answer.includes('```') || answer.includes('function') || answer.includes('def ') || answer.includes('class ') || answer.length > 100) {
                        feedbackPrompt = `LeetCode Problem: ${problem?.title || 'Unknown'}\n\nThe candidate submitted this code:\n${answer}\n\nProvide thorough code review:\n1. Is it correct?\n2. Time and space complexity\n3. Edge cases handled?\n4. Code quality and improvements\n5. Ask if they want to discuss optimizations or move to another problem\n\nBe encouraging but thorough.`;
                    } else {
                        feedbackPrompt = `The candidate said: "${answer}"\n\nRespond naturally and guide them back to coding their solution if they haven't shared code yet.`;
                    }
                } else {
                    // Initial clarifying questions or general discussion
                    feedbackPrompt = `The candidate asked: "${answer}"\n\nAnswer their question clearly and then guide them to explain their approach to solving the problem.`;
                }
                
            } else {
                // Non-coding interviews
                feedbackPrompt = `The candidate answered: "${answer}"\n\nProvide brief, encouraging feedback (2-3 sentences) and ask one relevant follow-up question to continue the interview.`;
            }
            
            console.log('🤖 Sending to AI:', feedbackPrompt.substring(0, 100));
            
            // Check if sendMessage is available
            if (!window.sendMessage) {
                throw new Error('Conversation module not loaded');
            }
            
            const feedback = await window.sendMessage(feedbackPrompt, systemPrompt);
            
            console.log('✅ Received feedback:', feedback?.substring(0, 50));

            // Display feedback
            if (window.addMessage) {
                window.addMessage(feedback, 'assistant');
            }

            if (window.speakText) {
                await window.speakText(feedback, true); // Use cache
            }

            if (window.updateStatus) {
                window.updateStatus('Interview in progress...', 'success');
            }

            // Increment question count
            if (window.updateState) {
                const currentCount = state.questionCount || 0;
                window.updateState({ questionCount: currentCount + 1 });
            }

            // For coding interviews, don't auto-advance - wait for their responses
            if (type === 'coding') {
                // Don't call askNextQuestion - let the flow be conversational
                console.log('💬 Coding interview - waiting for next user response');
            } else {
                // For other interviews, continue with next question after feedback
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('➡️ Moving to next question');
                await askNextQuestion();
            }

        } catch (error) {
            console.error('❌ Error handling answer:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
            
            if (window.showError) {
                window.showError(`Failed to process answer: ${error.message}`);
            }
            
            if (window.updateStatus) {
                window.updateStatus('Error processing answer', 'error');
            }
        }
    }

    /**
     * Get interview statistics
     * @returns {Object} Interview stats
     */
    function getInterviewStats() {
        const state = window.getState ? window.getState() : {};
        return {
            type: state.currentInterviewType,
            questionsAsked: state.questionCount,
            duration: state.interviewDuration,
            isActive: state.isInterviewActive
        };
    }

    // Expose interview functions globally
    window.startInterview = startInterview;
    window.stopInterview = stopInterview;
    window.askNextQuestion = askNextQuestion;
    window.askCodingQuestion = askCodingQuestion;
    window.handleAnswer = handleAnswer;
    window.getInterviewStats = getInterviewStats;

    console.log('Interview module loaded');

})();
