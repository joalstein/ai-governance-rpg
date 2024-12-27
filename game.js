// Enhanced game state with more dynamic elements
const gameData = {
    currentScene: 'intro',
    actions: 10,
    worldState: {
        year: 2024,
        crisisLevel: 0,
        aiProgress: 0
    },
    framework: {
        governance: [],    // Collected governance principles
        infrastructure: [] // Built technical infrastructure
    },
    relationships: {       // Dynamic relationship tracking
        international: new Map(),
        corporate: new Map(),
        public: new Map()
    },
    playerStats: {
        influence: 50,
        trust: 50,
        innovation: 50,
        sustainability: 50
    },
    history: [],          // Track previous decisions
    achievements: new Set(),
    
    // Enhanced game mechanics
    mechanics: {
        // Crisis event system
        crisisEvents: {
            aiAccident: {
                trigger: (state) => state.aiProgress > 70 && state.worldState.crisisLevel < 3,
                effect: (state) => {
                    state.worldState.crisisLevel++;
                    return "An AI system malfunction has caused public concern...";
                }
            },
            publicBacklash: {
                trigger: (state) => state.playerStats.trust < 30,
                effect: (state) => {
                    state.playerStats.influence -= 10;
                    return "Public protests against AI development are growing...";
                }
            }
        },

        // Relationship system
        updateRelationships(decision) {
            this.relationships.forEach((value, key) => {
                value.trust += decision.effects[key] || 0;
                value.alignment += decision.effects.alignment || 0;
            });
        },

        // Framework building system
        addToFramework(component) {
            if (component.type === 'governance') {
                this.framework.governance.push(component);
            } else {
                this.framework.infrastructure.push(component);
            }
        }
    },

    scenes: {
        intro: {
            story: (state) => `Year ${state.worldState.year}: As AI capabilities advance rapidly, you must shape its trajectory. Your previous decisions have ${
                state.history.length > 0 ? 'led to ' + summarizeImpacts(state.history) : 'yet to make their mark'
            }.`,
            options: [
                {
                    text: "Propose a new AI governance framework",
                    nextScene: (state) => state.playerStats.influence > 60 ? 'framework_strong' : 'framework_weak',
                    effects: {
                        influence: +5,
                        trust: +10
                    },
                    requires: null,
                    consequences: {
                        immediate: "Other nations show interest in your proposal",
                        longTerm: (state) => {
                            state.framework.governance.push('Constitutional AI Principles');
                            return "Your framework becomes a foundation for future decisions";
                        }
                    }
                },
                {
                    text: "Focus on technical infrastructure first",
                    nextScene: 'technical_path',
                    effects: {
                        innovation: +15,
                        sustainability: -5
                    },
                    consequences: {
                        immediate: "Development accelerates but raises concerns",
                        longTerm: (state) => {
                            state.aiProgress += 20;
                            return "Your technical foundation shapes future possibilities";
                        }
                    }
                }
            ]
        },
        
        framework_strong: {
            story: (state) => {
                const pastChoices = analyzePastChoices(state.history);
                return `Your strong international influence helps your framework gain traction. ${
                    pastChoices.includes('technical') ? 
                    'Your technical expertise adds credibility.' : 
                    'Some question the technical feasibility.'
                }`;
            },
            options: [
                {
                    text: "Push for immediate adoption",
                    consequence: (state) => {
                        if (state.relationships.international.get('trust') > 70) {
                            return "success_rapid";
                        }
                        return "resistance_strong";
                    }
                },
                {
                    text: "Build consensus gradually",
                    consequence: (state) => {
                        state.framework.governance.push('Collaborative Decision Protocol');
                        return "consensus_path";
                    }
                }
            ]
        }
        // Additional scenes following similar pattern...
    }
};

// Enhanced game mechanics
class GameMechanics {
    constructor(gameState) {
        this.state = gameState;
        this.eventSystem = new EventSystem();
        this.relationshipManager = new RelationshipManager();
    }

    processDecision(decision) {
        // Update basic stats
        this.state.updateStats(decision.effects);
        
        // Process deeper consequences
        if (decision.consequences) {
            this.processConsequences(decision.consequences);
        }

        // Check for and trigger events
        this.eventSystem.checkEvents(this.state);

        // Update relationships
        this.relationshipManager.updateRelationships(decision);

        // Add to history
        this.state.history.push({
            decision: decision,
            worldState: {...this.state.worldState},
            timestamp: new Date()
        });
    }

    processConsequences(consequences) {
        const immediate = consequences.immediate(this.state);
        this.eventSystem.queueEvent(immediate);

        if (consequences.longTerm) {
            this.eventSystem.scheduleFutureEvent(consequences.longTerm, 2);
        }
    }
}

class EventSystem {
    constructor() {
        this.eventQueue = [];
        this.scheduledEvents = [];
    }

    checkEvents(gameState) {
        Object.values(gameState.mechanics.crisisEvents).forEach(event => {
            if (event.trigger(gameState)) {
                this.queueEvent(event.effect(gameState));
            }
        });
    }

    queueEvent(event) {
        this.eventQueue.push(event);
    }

    scheduleFutureEvent(event, turnsLater) {
        this.scheduledEvents.push({event, triggersIn: turnsLater});
    }
}

class RelationshipManager {
    constructor() {
        this.relationships = new Map();
    }

    updateRelationships(decision) {
        this.relationships.forEach((relationship, entity) => {
            if (decision.effects[entity]) {
                relationship.trust += decision.effects[entity].trust || 0;
                relationship.alignment += decision.effects[entity].alignment || 0;
                this.checkRelationshipThresholds(entity, relationship);
            }
        });
    }

    checkRelationshipThresholds(entity, relationship) {
        if (relationship.trust < 20) {
            this.triggerRelationshipCrisis(entity);
        } else if (relationship.trust > 80) {
            this.unlockNewOpportunities(entity);
        }
    }
}
