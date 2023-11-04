import { NextPage } from 'next';

const Shortener: NextPage = () => {
  if (typeof window === 'undefined') return null;

  // only run on client side
  const host = typeof window !== 'undefined' ? window.location.host : '';
  return (
    <iframe src={`https://notion-url-shortener-dom.vercel.app?host=${window.location.protocol
      }//${host}/l`} allow="clipboard-read; clipboard-write" style={{ width: '100%', height: '100vh' }} />
  );
};

export default Shortener;
