import { FC, useEffect, useState } from "react";

type Props = { timeInSeconds?: number };

export const Counter: FC<Props> = (props) => {
  const { timeInSeconds = 300 } = props;
  const [count, setCount] = useState(timeInSeconds);

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const ONE_SECOND = 1_000;

    const interval = setInterval(() => {
      const over = count <= 0;

      setCount(over ? timeInSeconds : count - 1);
    }, ONE_SECOND);

    const minutes = Math.floor(count / 60);
    const seconds = Math.floor((count / 60 - minutes) * 60);

    setCountdown(`${minutes}:${seconds}`);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <h6>{countdown} </h6>
    </>
  );
};
