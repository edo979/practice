import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  const path = req.query.path
  if (typeof path !== 'string')
    return res.status(500).send({ message: 'Error revalidating' })

  try {
    await res.revalidate(path)
    return res.json({ message: 'Revalidate success' })
  } catch {
    return res.status(500).send({ message: 'Error revalidating' })
  }
}
