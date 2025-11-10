// Code Editor Module - Handles code editing and execution
// Supports multiple languages with syntax highlighting and execution

(function() {
    'use strict';

    let codeEditor = null;
    let currentLanguage = 'python';

    /**
     * Initialize the code editor
     */
    function initializeCodeEditor() {
        try {
            codeEditor = document.getElementById('codeEditor');
            const languageSelect = document.getElementById('languageSelect');
            const runButton = document.getElementById('runCode');
            const clearButton = document.getElementById('clearOutput');
            const closeButton = document.getElementById('closeEditor');
            const shareButton = document.getElementById('shareCode');

            if (!codeEditor) {
                console.warn('Code editor element not found');
                return;
            }

            // Set up language selector
            if (languageSelect && window.CONFIG?.EDITOR_CONFIG?.languages) {
                languageSelect.innerHTML = '';
                window.CONFIG.EDITOR_CONFIG.languages.forEach(lang => {
                    const option = document.createElement('option');
                    option.value = lang.value;
                    option.textContent = lang.label;
                    languageSelect.appendChild(option);
                });

                languageSelect.addEventListener('change', (e) => {
                    currentLanguage = e.target.value;
                    updateEditorLanguage(currentLanguage);
                });
            }

            // Set up run button
            if (runButton) {
                runButton.addEventListener('click', executeCode);
            }

            // Set up clear button
            if (clearButton) {
                clearButton.addEventListener('click', clearEditor);
            }

            // Set up close button
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    if (window.toggleCodeEditor) {
                        window.toggleCodeEditor(false);
                    }
                });
            }

            // Set up share button
            if (shareButton) {
                shareButton.addEventListener('click', async () => {
                    const code = getCode();
                    if (code && window.handleUserInput) {
                        await window.handleUserInput(`Here's my code:\n\`\`\`${currentLanguage}\n${code}\n\`\`\``);
                    }
                });
            }

            console.log('Code editor initialized');

        } catch (error) {
            console.error('Error initializing code editor:', error);
        }
    }

    /**
     * Update editor language
     * @param {string} language - Programming language
     */
    function updateEditorLanguage(language) {
        currentLanguage = language;
        
        if (window.updateState) {
            window.updateState({ currentLanguage: language });
        }

        if (window.updateStatus) {
            window.updateStatus(`Language changed to ${language}`, 'info');
        }
    }

    /**
     * Execute code in the editor
     */
    async function executeCode() {
        try {
            if (!codeEditor) {
                throw new Error('Code editor not initialized');
            }

            const code = codeEditor.value.trim();
            if (!code) {
                throw new Error('Please enter some code to execute');
            }

            // Update UI
            const outputElement = document.getElementById('codeOutput');
            const statusElement = document.getElementById('compilationStatus');

            if (statusElement) {
                statusElement.textContent = 'Running...';
                statusElement.className = 'status-info';
            }

            if (window.updateState) {
                window.updateState({ 
                    isExecuting: true,
                    currentCode: code 
                });
            }

            // Execute based on language
            let result;
            if (currentLanguage === 'python') {
                result = await executePython(code);
            } else if (currentLanguage === 'javascript') {
                result = await executeJavaScript(code);
            } else {
                result = {
                    success: false,
                    output: `Execution not supported for ${currentLanguage} yet. Only Python and JavaScript are supported.`
                };
            }

            // Display results
            if (outputElement) {
                outputElement.textContent = result.output;
                outputElement.className = result.success ? 'output-success' : 'output-error';
            }

            if (statusElement) {
                statusElement.textContent = result.success ? 'Success' : 'Error';
                statusElement.className = result.success ? 'status-success' : 'status-error';
            }

            if (window.updateState) {
                window.updateState({ 
                    isExecuting: false,
                    lastOutput: result.output
                });
            }

        } catch (error) {
            const errorMessage = window.utils ? window.utils.parseError(error) : error.message;
            
            const outputElement = document.getElementById('codeOutput');
            const statusElement = document.getElementById('compilationStatus');

            if (outputElement) {
                outputElement.textContent = `Error: ${errorMessage}`;
                outputElement.className = 'output-error';
            }

            if (statusElement) {
                statusElement.textContent = 'Error';
                statusElement.className = 'status-error';
            }

            if (window.updateState) {
                window.updateState({ isExecuting: false });
            }
        }
    }

    /**
     * Execute Python code (simulated)
     * @param {string} code - Python code to execute
     * @returns {Promise<Object>} Execution result
     */
    async function executePython(code) {
        try {
            // Check for basic syntax errors
            const syntaxErrors = checkPythonSyntax(code);
            if (syntaxErrors.length > 0) {
                return {
                    success: false,
                    output: '❌ Syntax Error:\n' + syntaxErrors.join('\n')
                };
            }

            // Check for random invalid statements (non-Python code)
            const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // Check if line looks like random characters (no valid Python keywords or syntax)
                const validPatterns = [
                    /^(import|from|def|class|if|elif|else|for|while|try|except|finally|with|return|break|continue|pass|raise|assert)\s/,
                    /^\w+\s*=\s*.+/,  // assignment
                    /^print\s*\(/,     // print statement
                    /^\w+\(.*\)/,      // function call
                    /^#/,              // comment
                    /^\s*$/            // empty line
                ];
                
                const isValid = validPatterns.some(pattern => pattern.test(line));
                if (!isValid && line.length > 0) {
                    return {
                        success: false,
                        output: `❌ Syntax Error:\nLine ${i + 1}: Invalid syntax - "${line}"\nNot valid Python code`
                    };
                }
            }

            let output = '';
            let hasOutput = false;
            const variables = {};

            // Process line by line to simulate execution
            const codeLines = code.split('\n');
            
            for (let line of codeLines) {
                line = line.trim();
                if (!line || line.startsWith('#')) continue;

                // Handle variable assignments (a=1, b=2, etc.)
                const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
                if (assignMatch) {
                    const varName = assignMatch[1];
                    const varValue = assignMatch[2].trim();
                    
                    try {
                        // Evaluate the expression (handle variables)
                        let evalValue = varValue;
                        // Replace variable names with their values
                        for (let [key, val] of Object.entries(variables)) {
                            evalValue = evalValue.replace(new RegExp(`\\b${key}\\b`, 'g'), val);
                        }
                        
                        // Evaluate simple arithmetic
                        const result = eval(evalValue);
                        variables[varName] = result;
                    } catch (e) {
                        variables[varName] = varValue;
                    }
                    continue;
                }

                // Handle print statements
                const printMatch = line.match(/^print\s*\(([^)]+)\)$/);
                if (printMatch) {
                    hasOutput = true;
                    let content = printMatch[1].trim();
                    
                    // Check if it's a variable
                    if (variables.hasOwnProperty(content)) {
                        output += variables[content] + '\n';
                    } else if (content.startsWith('"') || content.startsWith("'")) {
                        // String literal
                        output += content.slice(1, -1) + '\n';
                    } else {
                        // Try to evaluate expression with variables
                        try {
                            let evalExpr = content;
                            for (let [key, val] of Object.entries(variables)) {
                                evalExpr = evalExpr.replace(new RegExp(`\\b${key}\\b`, 'g'), val);
                            }
                            const result = eval(evalExpr);
                            output += result + '\n';
                        } catch {
                            output += content + '\n';
                        }
                    }
                }
            }

            // If we have variables but no print output
            if (Object.keys(variables).length > 0 && !hasOutput) {
                output = '✅ Code executed successfully\n';
                output += `${Object.keys(variables).length} variable(s) assigned:\n`;
                for (let [key, val] of Object.entries(variables)) {
                    output += `  ${key} = ${val}\n`;
                }
            }

            // If still no output, provide success message
            if (!output) {
                output = '✅ Code executed successfully';
            }

            return {
                success: true,
                output: output.trim()
            };

        } catch (error) {
            return {
                success: false,
                output: `❌ Runtime Error:\n${error.message}`
            };
        }
    }

    /**
     * Check Python code for basic syntax errors
     * @param {string} code - Python code to check
     * @returns {Array<string>} Array of syntax error messages
     */
    function checkPythonSyntax(code) {
        const errors = [];
        const lines = code.split('\n');

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            
            // Check for unmatched parentheses
            const openParens = (line.match(/\(/g) || []).length;
            const closeParens = (line.match(/\)/g) || []).length;
            if (openParens !== closeParens) {
                errors.push(`Line ${index + 1}: Unmatched parentheses`);
            }

            // Check for unmatched brackets
            const openBrackets = (line.match(/\[/g) || []).length;
            const closeBrackets = (line.match(/\]/g) || []).length;
            if (openBrackets !== closeBrackets) {
                errors.push(`Line ${index + 1}: Unmatched brackets`);
            }

            // Check for unmatched braces
            const openBraces = (line.match(/\{/g) || []).length;
            const closeBraces = (line.match(/\}/g) || []).length;
            if (openBraces !== closeBraces) {
                errors.push(`Line ${index + 1}: Unmatched braces`);
            }

            // Check for missing colons after control structures
            if (trimmed.match(/^(if|elif|else|for|while|def|class|try|except|finally|with)\s+.*[^:]$/)) {
                errors.push(`Line ${index + 1}: Missing colon after statement`);
            }
        });

        return errors;
    }

    /**
     * Execute JavaScript code
     * @param {string} code - JavaScript code to execute
     * @returns {Promise<Object>} Execution result
     */
    async function executeJavaScript(code) {
        try {
            // Check for basic syntax errors before execution
            try {
                new Function(code);
            } catch (syntaxError) {
                return {
                    success: false,
                    output: `❌ Syntax Error:\n${syntaxError.message}`
                };
            }

            // Capture console.log output
            let output = '';
            let hasConsoleOutput = false;
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = function(...args) {
                hasConsoleOutput = true;
                output += '📝 ' + args.map(arg => {
                    if (typeof arg === 'object') {
                        try {
                            return JSON.stringify(arg, null, 2);
                        } catch {
                            return String(arg);
                        }
                    }
                    return String(arg);
                }).join(' ') + '\n';
                originalLog.apply(console, args);
            };

            console.error = function(...args) {
                hasConsoleOutput = true;
                output += '❌ ' + args.join(' ') + '\n';
                originalError.apply(console, args);
            };

            console.warn = function(...args) {
                hasConsoleOutput = true;
                output += '⚠️ ' + args.join(' ') + '\n';
                originalWarn.apply(console, args);
            };

            // Execute code in a try-catch to capture runtime errors
            let result;
            try {
                result = eval(code);
            } catch (runtimeError) {
                // Restore console methods
                console.log = originalLog;
                console.error = originalError;
                console.warn = originalWarn;
                
                return {
                    success: false,
                    output: `❌ Runtime Error:\n${runtimeError.name}: ${runtimeError.message}\n${runtimeError.stack ? '\nStack trace:\n' + runtimeError.stack : ''}`
                };
            }

            // Restore console methods
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;

            // If there's a return value and no console output
            if (result !== undefined && !hasConsoleOutput) {
                if (typeof result === 'object') {
                    try {
                        output = '📤 Return value:\n' + JSON.stringify(result, null, 2);
                    } catch {
                        output = '📤 Return value: ' + String(result);
                    }
                } else {
                    output = '📤 Return value: ' + String(result);
                }
            }

            // If no output at all
            if (!output) {
                // Check if code has function definitions or variable assignments
                if (code.includes('function ') || code.includes('const ') || code.includes('let ') || code.includes('var ')) {
                    output = '✅ Code executed successfully\n(Function/variable definitions completed)';
                } else {
                    output = '✅ Code executed successfully';
                }
            }

            return {
                success: true,
                output: output.trim()
            };

        } catch (error) {
            return {
                success: false,
                output: `❌ Unexpected Error:\n${error.message}`
            };
        }
    }

    /**
     * Clear the editor
     */
    function clearEditor() {
        if (codeEditor) {
            codeEditor.value = '';
        }

        const outputElement = document.getElementById('codeOutput');
        const statusElement = document.getElementById('compilationStatus');

        if (outputElement) {
            outputElement.textContent = '';
            outputElement.className = '';
        }

        if (statusElement) {
            statusElement.textContent = '';
            statusElement.className = '';
        }

        if (window.updateState) {
            window.updateState({
                currentCode: '',
                lastOutput: ''
            });
        }

        if (window.updateStatus) {
            window.updateStatus('Editor cleared', 'info');
        }
    }

    /**
     * Get current code
     * @returns {string} Current code in editor
     */
    function getCode() {
        return codeEditor ? codeEditor.value : '';
    }

    /**
     * Set code in editor
     * @param {string} code - Code to set
     */
    function setCode(code) {
        if (codeEditor) {
            codeEditor.value = code;
            
            if (window.updateState) {
                window.updateState({ currentCode: code });
            }
        }
    }

    // Expose code editor functions globally
    window.initializeCodeEditor = initializeCodeEditor;
    window.executeCode = executeCode;
    window.clearEditor = clearEditor;
    window.getCode = getCode;
    window.setCode = setCode;
    window.updateEditorLanguage = updateEditorLanguage;

    console.log('Code editor module loaded');

})();
