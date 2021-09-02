import dbConnect from '../../util/dbConnect';

dbConnect();

export default async (req, res) => {
  return res.json({ test: 'test' });
};
