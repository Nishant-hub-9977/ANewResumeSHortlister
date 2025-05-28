import toast from 'react-hot-toast';

interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
}

export const sendAnalyticsEvent = async (event: AnalyticsEvent) => {
  try {
    const viewId = import.meta.env.VITE_GOOGLE_ANALYTICS_VIEW_ID;
    
    if (!viewId) {
      console.warn('Google Analytics View ID not configured');
      return;
    }

    const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${viewId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 'client_id',
        events: [event],
      }),
    });

    if (!response.ok) {
      throw new Error(`Analytics request failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to send analytics event:', error);
    toast.error('Failed to send analytics event');
  }
};

export const verifyAnalyticsSetup = async (): Promise<boolean> => {
  try {
    await sendAnalyticsEvent({
      name: 'test_event',
      params: {
        test_param: 'test_value'
      }
    });
    return true;
  } catch {
    return false;
  }
};