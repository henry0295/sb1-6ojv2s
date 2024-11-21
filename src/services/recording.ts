import AWS from 'aws-sdk';
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} from '@aws-sdk/client-transcribe-streaming';

class RecordingService {
  private s3: AWS.S3;
  private transcribeClient: TranscribeStreamingClient;

  constructor() {
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      region: process.env.AWS_REGION,
    });

    this.transcribeClient = new TranscribeStreamingClient({
      region: process.env.AWS_REGION,
    });
  }

  async startRecording(callId: string) {
    // Implementation depends on your telephony system
    // This is a placeholder for the actual recording logic
    return { recordingId: `rec_${callId}` };
  }

  async stopRecording(recordingId: string) {
    // Stop recording and save to S3
    return { success: true };
  }

  async uploadRecording(recordingId: string, audioBlob: Blob) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `recordings/${recordingId}.wav`,
      Body: audioBlob,
      ContentType: 'audio/wav',
    };

    try {
      await this.s3.upload(params).promise();
      return { success: true };
    } catch (error) {
      console.error('Recording upload failed:', error);
      return { success: false, error };
    }
  }

  async transcribeAudio(audioStream: ReadableStream) {
    try {
      const command = new StartStreamTranscriptionCommand({
        LanguageCode: 'en-US',
        MediaEncoding: 'pcm',
        MediaSampleRateHertz: 16000,
      });

      const response = await this.transcribeClient.send(command);
      return response;
    } catch (error) {
      console.error('Transcription failed:', error);
      return { success: false, error };
    }
  }
}

export const recordingService = new RecordingService();