// Game State
const gameState = {
    currentScene: 'intro',
    actions: 10,
    year: 2024,
    crisisLevel: 0,
    aiProgress: 0,
    decisions: [],
    achievements: new Set(),
    playerStats: {
        influence: 50,
        trust: 50,
        innovation: 50,
        sustainability: 50
    }
};

// Crisis Events
const crisisEvents = {
    aiBreakthrough: {
        title: "Unexpected AI Breakthrough!",
        trigger: (state) => state.aiProgress >= 75 && state.playerStats.innovation >= 70,
        text: "A major AI lab announces an unexpected breakthrough that surpasses current safety protocols.",
        options: [
            {
                text: "Implement emergency regulations",
                effect: { trust: 10, innovation: -15, sustainability: 5 }
            },
            {
                text: "Adapt and accelerate our programs",
                effect: { innovation: 15, trust: -20, sustainability: -10 }
            }
        ]
    },
    publicBacklash: {
        title: "Public Trust Crisis",
        trigger: (state) => state.playerStats.trust < 30,
        text: "Mass protests erupt against AI development. The public demands accountability.",
        options: [
            {
                text: "Launch transparency initiative",
                effect: { trust: 20, innovation: -10, influence: 5 }
            },
            {
                text: "Continue with minimal disclosure",
                effect: { innovation: 5, trust: -15, influence: -10 }
            }
        ]
    }
};
// Game Content
const gameContent = {
    scenes: {
        intro: {
            text: "As the newly appointed AI Governance Architect, you face unprecedented challenges. Recent breakthroughs have accelerated AI development beyond expectations. The world watches your every move.",
            options: [
                {
                    text: "Prioritize global cooperation",
                    nextScene: "cooperation",
                    effect: {
                        influence: 10,
                        trust: 5,
                        aiProgress: 5
                    },
                    consequence: "Your call for cooperation resonates globally."
                },
                {
                    text: "Focus on national interests",
                    nextScene: "national",
                    effect: {
                        innovation: 15,
                        trust: -5,
                        aiProgress: 10
                    },
                    consequence: "Your nation's AI capabilities grow rapidly."
                },
                {
                    text: "Emphasize safety protocols",
                    nextScene: "safety",
                    effect: {
                        trust: 15,
                        innovation: -5,
                        sustainability: 10
                    },
                    consequence: "Safety researchers worldwide support your stance."
                }
            ]
        },
        cooperation: {
            text: "Your emphasis on cooperation gains international attention. How will you structure this global initiative?",
            options: [
                {
                    text: "Create a democratic framework",
                    nextScene: "democratic",
                    effect: {
                        trust: 15,
                        influence: 10,
                        aiProgress: -5
                    },
                    consequence: "Nations begin aligning their AI policies."
                },
                {
                    text: "Form an expert council",
                    nextScene: "expert",
                    effect: {
                        innovation: 10,
                        trust: -5,
                        aiProgress: 10
                    },
                    consequence: "Leading AI labs join your initiative."
                }
            ]
        },
        national: {
            text: "Your focus on national development accelerates progress but raises international concerns.",
            options: [
                {
                    text: "Share selective breakthroughs",
                    nextScene: "sharing",
                    effect: {
                        trust: 10,
                        influence: 5,
                        innovation: -5
                    },
                    consequence: "International tensions begin to ease."
                },
                {
                    text: "Maintain competitive advantage",
                    nextScene: "competitive",
                    effect: {
                        innovation: 15,
                        trust: -10,
                        influence: -5
                    },
                    consequence: "Your nation leads in AI, but others grow wary."
                }
            ]
        }
    }
};
safety: {
            text: "Your commitment to safety earns public trust, but some worry about falling behind.",
            options: [
                {
                    text: "Maintain strict safety standards",
                    nextScene: "safety_success",
                    effect: {
                        trust: 15,
                        sustainability: 10,
                        innovation: -10
                    }, // <---- Added the missing comma here!
                    consequence: "A robust safety framework emerges."
                },
                {
                    text: "Balance safety with progress",
                    nextScene: "balance",
                    effect: {
                        innovation: 5,
                        trust: 5,
                        sustainability: 5
                    },
                    consequence: "You find a workable compromise."
                }
            ]
        },
        democratic: {
            text: "The democratic framework takes shape, though coordination proves challenging.",
            options: [
                {
                    text: "Strengthen international bonds",
                    nextScene: "global_success",
                    effect: {
                        influence: 15,
                        trust: 10,
                        sustainability: 5
                    },
                    consequence: "A new era of global cooperation begins."
                },
                {
                    text: "Streamline for efficiency",
                    nextScene: "compromise",
                    effect: {
                        innovation: 10,
                        influence: -5,
                        trust: -5
                    },
                    consequence: "Progress accelerates but tensions emerge."
                }
            ]
        },
        expert: {
            text: "The expert council drives innovation but faces public scrutiny over representation.",
            options: [
                {
                    text: "Expand council membership",
                    nextScene: "inclusive",
                    effect: {
                        trust: 10,
                        influence: 5,
                        innovation: -5
                    },
                    consequence: "The council gains legitimacy."
                },
                {
                    text: "Maintain elite focus",
                    nextScene: "exclusive",
                    effect: {
                        innovation: 15,
                        trust: -10,
                        sustainability: -5
                    },
                    consequence: "Rapid progress continues amid controversy."
                }
            ]
        },
        sharing: {
            text: "Your openness to sharing developments helps rebuild international trust.",
            options: [
                {
                    text: "Expand sharing initiatives",
                    nextScene: "global_success",
                    effect: {
                        trust: 15,
                        influence: 10,
                        innovation: -5
                    },
                    consequence: "Global cooperation flourishes."
                },
                {
                    text: "Maintain selective sharing",
                    nextScene: "compromise",
                    effect: {
                        innovation: 5,
                        trust: 5,
                        influence: 5
                    },
                    consequence: "A balanced approach emerges."
                }
            ]
        }
competitive: {
            text: "Your nation's AI capabilities surge ahead, but isolation increases.",
            options: [
                {
                    text: "Begin diplomatic outreach",
                    nextScene: "compromise",
                    effect: {
                        influence: 10,
                        trust: 5,
                        innovation: -5
                    },
                    consequence: "Relations begin to thaw."
                },
                {
                    text: "Double down on advancement",
                    nextScene: "exclusive",
                    effect: {
                        innovation: 20,
                        trust: -15,
                        influence: -10
                    },
                    consequence: "Your technological lead grows, but at a cost."
                }
            ]
        },
        balance: {
            text: "Your balanced approach shows promise, though challenges remain.",
            options: [
                {
                    text: "Lean into success",
                    nextScene: "global_success",
                    effect: {
                        trust: 10,
                        sustainability: 10,
                        innovation: 5
                    },
                    consequence: "Your approach becomes a global model."
                },
                {
                    text: "Adjust the balance",
                    nextScene: "compromise",
                    effect: {
                        innovation: 10,
                        trust: 5,
                        sustainability: -5
                    },
                    consequence: "Progress continues steadily."
                }
            ]
        },
        inclusive: {
            text: "The expanded council brings new perspectives and challenges.",
            options: [
                {
                    text: "Embrace diversity of thought",
                    nextScene: "global_success",
                    effect: {
                        trust: 15,
                        influence: 10,
                        sustainability: 10
                    },
                    consequence: "A truly global consensus emerges."
                },
                {
                    text: "Guide the discussion",
                    nextScene: "compromise",
                    effect: {
                        innovation: 10,
                        influence: 5,
                        trust: -5
                    },
                    consequence: "Progress continues with some tension."
                }
            ]
        },
        exclusive: {
            text: "The focused approach yields results but faces growing opposition.",
            options: [
                {
                    text: "Address concerns",
                    nextScene: "compromise",
                    effect: {
                        trust: 10,
                        innovation: -5,
                        influence: 5
                    },
                    consequence: "Some bridges are rebuilt."
                },
                {
                    text: "Stay the course",
                    nextScene: "negative_ending",
                    effect: {
                        innovation: 15,
                        trust: -15,
                        influence: -10
                    },
                    consequence: "Isolation becomes entrenched."
                }
            ]
        },
        // Ending scenes
        global_success: {
            text: "Your leadership has fostered a new era of global cooperation in AI governance. While challenges remain, the future looks bright.",
            options: [
                {
                    text: "Begin New Game",
                    nextScene: "intro"
                }
            ],
            final: true
        },
        compromise: {
            text: "You've found a workable balance, though perfect solutions remain elusive. The path forward is stable, if not ideal.",
            options: [
                {
                    text: "Begin New Game",
                    nextScene: "intro"
                }
            ],
            final: true
        },
        negative_ending: {
            text: "Your choices have led to technological advancement but at the cost of global cooperation. The future remains uncertain.",
            options: [
                {
                    text: "Begin New Game",
                    nextScene: "intro"
                }
            ],
            final: true
        },
        safety_success: {
            text: "Your unwavering commitment to safety has set new global standards. Progress is slower but more secure.",
            options: [
                {
                    text: "Begin New Game",
                    nextScene: "intro"
                }
            ],
            final: true
        }
    } // This closes the scenes object
}; // This closes the gameContent object

Here's Part 5 - Beginning of the GameManager class:
javascriptCopy// Game Manager Class
class GameManager {
    constructor() {
        // Initialize DOM elements
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
        this.validateElements();
        
        // Bind methods to maintain context
        this.startGame = this.startGame.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.loadScene = this.loadScene.bind(this);

        // Initialize event listeners
        this.elements.startButton.addEventListener('click', this.startGame);
        
        // Start crisis check system
        this.initializeCrisisSystem();
    }

    validateElements() {
        const missingElements = Object.entries(this.elements)
            .filter(([key, element]) => !element)
            .map(([key]) => key);

        if (missingElements.length > 0) {
            console.error('Missing DOM elements:', missingElements);
            throw new Error('Required DOM elements not found');
        }
    }

    initializeCrisisSystem() {
        setInterval(() => this.checkCrisisEvents(), 2000);
    }

    updateStats() {
        this.elements.stats.innerHTML = '';
        Object.entries(gameState.playerStats).forEach(([stat, value]) => {
            const statItem = document.createElement('div');
            statItem.className = `stat-item ${stat}`;
            statItem.innerHTML = `
                <div class="stat-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
                <div class="stat-bar">
                    <div class="stat-progress" style="width: ${value}%"></div>
                </div>
                <div class="stat-value">${value}%</div>
            `;
            this.elements.stats.appendChild(statItem);
        });
    }Here's Part 6 - More GameManager class methods:
javascriptCopy    updateWorld() {
        this.elements.year.textContent = `Year: ${gameState.year}`;
        this.elements.actions.textContent = `Actions: ${gameState.actions}`;
    }

    handleOption(option) {
        // Record decision
        gameState.decisions.push({
            scene: gameState.currentScene,
            choice: option.text,
            year: gameState.year
        });

        // Apply effects
        if (option.effect) {
            this.applyEffectsWithAnimation(option.effect);
        }

        // Show consequence
        if (option.consequence) {
            this.showConsequence(option.consequence);
        }

        // Update game state
        if (!gameContent.scenes[gameState.currentScene].final) {
            gameState.actions--;
            gameState.year++;
        }

        // Check for game over or scene transition
        if (gameState.actions <= 0 && !gameContent.scenes[option.nextScene].final) {
            gameState.currentScene = 'negative_ending';
        } else {
            gameState.currentScene = option.nextScene;
        }

        // Handle new game or load next scene
        if (gameState.currentScene === 'intro') {
            this.startGame();
        } else {
            this.loadScene();
        }

        // Check achievements
        this.checkAchievements();
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
        
        if (!scene) {
            console.error('Scene not found:', gameState.currentScene);
            return;
        }

        this.elements.story.textContent = scene.text;
        this.elements.options.innerHTML = '';
        
        if (scene.options) {
            scene.options.forEach(option => {
                this.elements.options.appendChild(this.createOptionButton(option));
            });
        }

        this.updateStats();
        this.updateWorld();
    }
startGame() {
        // Reset game state
        gameState.currentScene = 'intro';
        gameState.actions = 10;
        gameState.year = 2024;
        gameState.crisisLevel = 0;
        gameState.aiProgress = 0;
        gameState.decisions = [];
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

    checkCrisisEvents() {
        Object.entries(crisisEvents).forEach(([eventName, event]) => {
            if (event.trigger(gameState) && !gameState.decisions.includes(eventName)) {
                this.triggerCrisisEvent(eventName, event);
            }
        });
    }

    triggerCrisisEvent(eventName, event) {
        const crisisElement = document.createElement('div');
        crisisElement.className = 'crisis-event';
        crisisElement.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.text}</p>
            <div class="crisis-options"></div>
        `;

        event.options.forEach(option => {
            const button = this.createOptionButton(option);
            crisisElement.querySelector('.crisis-options').appendChild(button);
        });

        this.elements.story.appendChild(crisisElement);
        gameState.decisions.push(eventName);
    }

    applyEffectsWithAnimation(effects) {
        Object.entries(effects).forEach(([stat, change]) => {
            if (gameState.playerStats[stat] !== undefined) {
                gameState.playerStats[stat] = Math.max(0, Math.min(100, gameState.playerStats[stat] + change));
                
                const statElement = document.querySelector(`.stat-item.${stat}`);
                if (statElement) {
                    statElement.classList.add(change > 0 ? 'increase' : 'decrease');
                    setTimeout(() => statElement.classList.remove('increase', 'decrease'), 1000);
                }
            }
            if (stat === 'aiProgress') {
                gameState.aiProgress = Math.max(0, Math.min(100, gameState.aiProgress + change));
            }
        });
    }

    showConsequence(consequence) {
        const consequenceElement = document.createElement('div');
        consequenceElement.className = 'consequence-notification';
        consequenceElement.textContent = consequence;
        document.body.appendChild(consequenceElement);
        setTimeout(() => consequenceElement.remove(), 5000);
    }

    checkAchievements() {
        const achievements = {
            globalUnifier: {
                condition: (state) => state.playerStats.influence >= 80,
                text: "Global Unifier: Achieved exceptional international cooperation"
            },
            innovator: {
                condition: (state) => state.playerStats.innovation >= 80,
                text: "Master Innovator: Led breakthrough developments in AI"
            },
            trustBuilder: {
                condition: (state) => state.playerStats.trust >= 80,
                text: "Trust Builder: Established unprecedented public confidence"
            }
        };

        Object.entries(achievements).forEach(([name, achievement]) => {
            if (achievement.condition(gameState) && !gameState.achievements.has(name)) {
                gameState.achievements.add(name);
                this.showAchievement(achievement.text);
            }
        });
    }

    showAchievement(text) {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement-notification';
        achievementElement.innerHTML = `
            <h4>Achievement Unlocked!</h4>
            <p>${text}</p>
        `;
        document.body.appendChild(achievementElement);
        setTimeout(() => achievementElement.remove(), 3000);
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
