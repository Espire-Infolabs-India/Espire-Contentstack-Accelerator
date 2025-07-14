import type { NextApiRequest, NextApiResponse } from 'next'
import {getEntryByUid,indexEntries} from '../../contentstack-sdk/index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Received a POST request to /api/pushtoalgolia',req.body?.data?.entry); 
    var contentTypeUidResponse = await getEntryByUid(
      req.body?.data?.content_type?.uid,
      req.body?.data?.entry?.uid,
      req.body?.data?.entry?.locale
    );
    if(contentTypeUidResponse) {
      const response = await indexEntries(contentTypeUidResponse,req.body?.data?.content_type?.uid);

       if (response?.length) {
        res.status(200).json({
        message: 'Entry indexed successfully',
        objectIDs: response,
      });
      } else {
        res.status(500).json({ message: 'Failed to index entry', response });
      }
    }
  } else {
    res.status(402).json({ message: 'Not allowed' })
  }
}