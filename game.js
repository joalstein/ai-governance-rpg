// Game State
const gameState = {
    currentScene: 'intro',
    actions: 10,
    year: 2024,
    playerStats: {
        influence: 50,
        trust: 50,
        innovation: 50,
        sustainability: 50
    }
};

// Game Content
const gameContent = {
    scenes: {
        intro: {
            text: "As a newly appointed AI Governance Architect, you stand at the crossroads of humanity's future. Your decisions will shape how AI development proceeds globally.",
            options: [
                {
                    text: "Prioritize international cooperation",
                    nextScene: "cooperation",
                    effect: {
                        influence: 10,
                        trust: 5
                    }
                },
                {
                    text: "Focus on national development",
                    nextScene: "national",
                    effect: {
                        innovation: 15,
                        trust: -5
                    }
                }
            ]
        },
        cooperation: {
            text: "You choose to emphasize international cooperation. Other nations show interest in your approach, but coordination challenges emerge.",
            options: [
                {
                    text: "Create a democratic framework",
                    nextScene: "democratic",
                    effect: {
                        trust: 10,
                        influence: 5
                    }
                },
                {
                    text: "Establish an expert council",
                    nextScene: "expert",
                    effect: {
                        innovation: 10,
                        trust: -5
                    }
                }
            ]
        },
        national: {
            text: "Your focus on national interests accelerates development but raises international concerns.",
            options: [
                {
                    text: "Share selected breakthroughs",
                    nextScene: "sharing",
                    effect: {
                        trust: 5,
                        innovation: -5
                    }
                },
                {
                    text: "Maintain independence",
                    nextScene: "independent",
                    effect: {
                        innovation: 15,
                        influence: -10
                    }
                }
            ]
        },
        democratic: {
            text: "Your democratic approach gains widespread support, though progress is slower.",
            options: [
                {
                    text: "Maintain the course",
                    nextScene: "success",
                    effect: {
                        trust: 15,
                        innovation: -5
                    }
                },
                {
                    text: "Streamline the process",
                    nextScene: "compromise",
                    effect: {
                        innovation: 10,
                        trust: -5
                    }
                }
            ]
        },
        expert: {
            text: "The expert council makes rapid progress but faces public scrutiny.",
            options: [
                {
                    text: "Address public concerns",
                    nextScene: "success",
                    effect: {
                        trust: 10,
                        innovation: -5
                    }
                },
                {
                    text: "Maintain focus on progress",
                    nextScene: "compromise",
                    effect: {
                        innovation: 15,
                        trust: -10
                    }
                }
            ]
        },
        success: {
            text: "Your balanced approach leads to sustainable progress. The future looks promising.",
            options: [
                {
                    text: "Start New Game",
                    nextScene: "intro"
                }
            ]
        },
        compromise: {
            text: "You find a workable balance, though some opportunities are missed.",
            options: [
                {
                    text: "Start New Game",
                    nextScene: "intro"
                }
            ]
        }
    }
};

// Game Manager Class
class GameManager {
    constructor() {
        // DOM Elements
        this.elements = {
            startScreen: document.getElementById('start-screen'),
            startButton: document.getElementById('start-button'),
            story: document.getElementById('story'),
            options: document.getElementById('options'),
            stats: document.getElementById('stats'),
            year: document.getElementById('year'),
            actions: document.getElementById('actions')
        };

        // Verify all elements exist
        const missingElements = Object.entries(this.elements)
            .filter(([key, element]) => !element)
            .map(([key]) => key);

        if (missingElements.length > 0) {
            console.error('Missing DOM elements:', missingElements);
            throw new Error('Required DOM elements not found');
        }

        // Bind methods
        this.startGame = this.startGame.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.loadScene = this.loadScene.bind(this);

        // Initialize event listeners
        this.elements.startButton.addEventListener('click', this.startGame);
    }

    updateStats() {
        this.elements.stats.innerHTML = '';
        Object.entries(gameState.playerStats).forEach(([stat, value]) => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `
                <div class="stat-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
                <div class="stat-bar">
                    <div class="stat-progress" style="width: ${value}%"></div>
                </div>
                <div class="stat-value">${value}%</div>
            `;
            this.elements.stats.appendChild(statItem);
        });
    }

    updateWorld() {
        this.elements.year.textContent = `Year: ${gameState.year}`;
        this.elements.actions.textContent = `Actions: ${gameState.actions}`;
    }

    handleOption(option) {
        // Update stats based on choice
        if (option.effect) {
            Object.entries(option.effect).forEach(([stat, change]) => {
                gameState.playerStats[stat] = Math.max(0, Math.min(100, 
                    gameState.playerStats[stat] + change));
            });
        }

        // Update game state
        if (option.nextScene !== 'intro') {
            gameState.actions--;
            gameState.year++;
        }
        gameState.currentScene = option.nextScene;

        if (option.nextScene === 'intro') {
            this.startGame();
        } else {
            this.loadScene();
        }
    }

    createOptionButton(option) {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.onclick = () => this.handleOption(option);
        return button;
    }

    loadScene() {
        const scene = gameContent.scenes[gameState.currentScene];
        
        // Update story
        this.elements.story.textContent = scene.text;
        
        // Update options
        this.elements.options.innerHTML = '';
        scene.options?.forEach(option => {
            this.elements.options.appendChild(this.createOptionButton(option));
        });

        // Update UI
        this.updateStats();
        this.updateWorld();
    }

    startGame() {
        // Reset game state
        gameState.currentScene = 'intro';
        gameState.actions = 10;
        gameState.year = 2024;
        gameState.playerStats = {
            influence: 50,
            trust: 50,
            innovation: 50,
            sustainability: 50
        };

        // Hide start screen
        this.elements.startScreen.classList.add('hidden');
        
        // Load first scene
        this.loadScene();
    }
}

// Initialize game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.game = new GameManager();
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
});

