import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Shortener: NextPage = () => {
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host);
    }
  }, []);

  if (!host) return null;

  return (
    <iframe src={`https://notion-url-shortener-dom.vercel.app?host=${window.location.protocol
      }//${host}/l`} allow="clipboard-read; clipboard-write" style={{ width: '100%', height: '100vh' }} />
  );
};

export default Shortener;