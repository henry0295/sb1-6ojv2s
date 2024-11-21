interface QAScore {
  callId: string;
  agentId: string;
  evaluatorId: string;
  categories: {
    greeting: number;
    communication: number;
    problemSolving: number;
    closing: number;
    compliance: number;
  };
  notes: string;
  totalScore: number;
}

class QAService {
  async scoreCall(score: QAScore) {
    try {
      // Save score to database
      const result = await fetch('/api/qa/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(score),
      });
      return await result.json();
    } catch (error) {
      console.error('QA scoring failed:', error);
      return { success: false, error };
    }
  }

  async getAgentScores(agentId: string, dateRange: { start: Date; end: Date }) {
    try {
      const result = await fetch(
        `/api/qa/scores/agent/${agentId}?start=${dateRange.start.toISOString()}&end=${dateRange.end.toISOString()}`
      );
      return await result.json();
    } catch (error) {
      console.error('Failed to fetch agent scores:', error);
      return { success: false, error };
    }
  }
}

export const qaService = new QAService();