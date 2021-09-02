import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db
    .collection('movies')
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        res.status(201).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
