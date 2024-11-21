interface IVRMenu {
  id: string;
  name: string;
  prompt: string;
  options: {
    digit: string;
    action: 'transfer' | 'submenu' | 'voicemail' | 'custom';
    destination: string;
  }[];
}

class IVRService {
  async createMenu(menu: Omit<IVRMenu, 'id'>) {
    try {
      const result = await fetch('/api/ivr/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menu),
      });
      return await result.json();
    } catch (error) {
      console.error('Failed to create IVR menu:', error);
      return { success: false, error };
    }
  }

  async handleDTMF(callId: string, digit: string) {
    try {
      const result = await fetch('/api/ivr/handle-dtmf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, digit }),
      });
      return await result.json();
    } catch (error) {
      console.error('Failed to handle DTMF:', error);
      return { success: false, error };
    }
  }

  async processVoiceCommand(callId: string, audioStream: ReadableStream) {
    try {
      // First, transcribe the audio
      const transcription = await recordingService.transcribeAudio(audioStream);
      
      // Then process the transcribed text
      const result = await fetch('/api/ivr/process-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, text: transcription }),
      });
      return await result.json();
    } catch (error) {
      console.error('Failed to process voice command:', error);
      return { success: false, error };
    }
  }
}

export const ivrService = new IVRService();