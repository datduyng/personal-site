import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  errorMessage?: string;
  revalidated?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Dear hacker: good luck guessing this.
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ errorMessage: 'Invalid token' })
  }

  try {
    await res.revalidate(req.query?.route as string || '')
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ errorMessage: 'Error revalidating' })
  }
}
