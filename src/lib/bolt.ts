import toast from 'react-hot-toast';

class BoltClient {
  private apiKey: string;
  private deviceId: string;
  private baseUrl = 'https://cloud.boltiot.com/remote';

  constructor(apiKey: string, deviceId: string) {
    this.apiKey = apiKey;
    this.deviceId = deviceId;
  }

  async sendCommand(command: string, pin: string, value: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${command}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          device_id: this.deviceId,
          pin,
          value
        }),
      });

      if (!response.ok) {
        throw new Error(`Bolt request failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Failed to send Bolt command:', error);
      toast.error('Failed to send Bolt command');
      throw error;
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      const response = await this.sendCommand('digitalRead', '0', '');
      return response.success === 1;
    } catch {
      return false;
    }
  }
}

export const createBoltClient = (apiKey: string, deviceId: string) => {
  return new BoltClient(apiKey, deviceId);
};