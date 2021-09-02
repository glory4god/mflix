import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { db } = connectToDatabase();
    const { name } = req.body;

    const response = db
      .collection('test')
      .insert({ _id: new ObjectId(), name: 'hayoung' });

    res.json(response);
  } else {
    return res.json({ success: false });
  }
};
