import { NextPage } from 'next';

const Shortener: NextPage = () => {
  const host = typeof window !== 'undefined' ? window.location.host : '';
  return (
    <iframe src={`https://notion-url-shortener-dom.vercel.app?host=https://${host}/l`} allow="clipboard-read; clipboard-write" style={{ width: '100%', height: '100vh' }} />
  );
};

export default Shortener;
