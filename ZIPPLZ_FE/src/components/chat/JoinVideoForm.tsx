import React from 'react';

import { useVideoStore } from '@stores/videoStore';

interface FormProps {
  joinSession: () => void;
}

export default function JoinVideoForm({ joinSession }: FormProps) {
  const { sessionId, setSessionId } = useVideoStore();

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    joinSession();
  };

  const sessionIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionId(event.target.value);
  };

  return (
    <>
      <h1>비디오 세션 열기</h1>
      <form onSubmit={onSubmitHandler}>
        <p>
          <input
            type="text"
            value={sessionId}
            onChange={sessionIdChangeHandler}
            minLength={8}
            maxLength={20}
            required
          />
        </p>
        <p>
          <input type="submit" value="생성하기" />
        </p>
      </form>
    </>
  );
}
