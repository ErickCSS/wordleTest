import { useEffect, useState } from "react";

export function useDictionary() {
  const [word, setWord] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const validate = (word: string) => data.includes(word);

  const update = (words?: Array<string>) => {
    const seed = Math.floor(Math.random() * (words ?? data).length);
    const wo = (words ?? data)[seed];

    setWord(wo);
  };

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/words.txt")
      .then((r) => r.text())
      .then((t) => {
        const words = t
          .split("\n")
          .filter((w) => w)
          .filter((word) => word.length === 5)
          .map((word) => word.toUpperCase());

        setData(words);
        update(words);
        setLoading(false);
      });
  }, []);

  return {
    word,
    update,
    validate,
    loading,
  };
}
