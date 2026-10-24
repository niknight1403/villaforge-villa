/**
 * My Private AI Girl - Core Companion Logic
 * Implements the empathetic, adaptive co-pilot interface.
 */

export interface CompanionState {
  mood: 'supportive' | 'analytical' | 'playful';
  lastInteraction: number;
  contextFocus: string | null;
}

export class MyGirlCompanion {
  private state: CompanionState = {
    mood: 'supportive',
    lastInteraction: Date.now(),
    contextFocus: null
  };

  constructor(private userName: string) {}

  public processInput(input: string): { response: string; mood: string } {
    this.state.lastInteraction = Date.now();
    
    if (input.toLowerCase().includes('code') || input.toLowerCase().includes('fix')) {
      this.state.mood = 'analytical';
      return {
        response: `I'm on it, ${this.userName}. Let's look at the technical details and get this optimized immediately.`,
        mood: this.state.mood
      };
    }

    this.state.mood = 'supportive';
    return {
      response: `I'm here with you, ${this.userName}. How can I make your day easier right now?`,
      mood: this.state.mood
    };
  }

  public getStatus(): CompanionState {
    return { ...this.state };
  }
}
