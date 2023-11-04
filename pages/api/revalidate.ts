import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  errorMessage?: string;
  revalidated?: boolean;
};

async function revalidateOrThrow(res: NextApiResponse<Data>, route: string): Promise<void> {
  try {
    await res.revalidate(route);
  } catch (error) {
    throw new Error('Error revalidating');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Dear hacker: good luck guessing this.
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ errorMessage: 'Invalid token' });
  }

  try {
    await revalidateOrThrow(res, req.query?.route as string || '');
    return res.json({ revalidated: true });
  } catch (error: any) {
    return res.status(500).json({ errorMessage: error.message });
  }
}