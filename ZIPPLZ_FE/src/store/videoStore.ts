import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  Subscriber,
} from 'openvidu-browser';
import { create } from 'zustand';

interface VideoStore {
  session: OVSession | null;
  sessionId: string;
  subscriber: Subscriber | null;
  publisher: Publisher | null;
  OV: OpenVidu | null;
  setSession: (session: OVSession | null) => void;
  setSessionId: (sessionId: string) => void;
  setSubscriber: (subscriber: Subscriber | null) => void;
  setPublisher: (publisher: Publisher | null) => void;
  setOV: (OV: OpenVidu | null) => void;
  reset: () => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  session: null,
  sessionId: '',
  subscriber: null,
  publisher: null,
  OV: null,
  setSession: (session) => set({ session }),
  setSessionId: (sessionId) => set({ sessionId }),
  setSubscriber: (subscriber) => set({ subscriber }),
  setPublisher: (publisher) => set({ publisher }),
  setOV: (OV) => set({ OV }),
  reset: () =>
    set({
      session: null,
      sessionId: '',
      subscriber: null,
      publisher: null,
      OV: null,
    }),
}));
