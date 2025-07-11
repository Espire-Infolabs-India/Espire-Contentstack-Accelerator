import type { NextApiRequest, NextApiResponse } from 'next'
import {getEntryByUid,indexEntries} from '../../contentstack-sdk/index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Received a POST request to /api/pushtoalgolia',req.body?.data?.entry);
    var contentTypeUidResponse = await getEntryByUid(
      "blog_post",
      req.body?.data?.entry?.uid,
      req.body?.data?.entry?.locale
    );

    if(contentTypeUidResponse) {
      await indexEntries(contentTypeUidResponse);
      console.log('Entry indexed successfully:', contentTypeUidResponse);
       res.status(200).json({ message: 'Entry indexed successfully:', contentTypeUidResponse })
    }
    
     
  } else {
    
    // res.setHeader('Allow', ['GET'])
    // res.status(405).end(`Method ${req.method} Not Allowed`)
    

    //export async function getEntryByUid(contentTypeUid, entryUid, locales?: string) {
    console.log('Received a GET request to /api/pushtoalgolia',req.body?.data?.entry);
    // Here you can add your logic to handle the request, e.g., pushing data to Algolia
    // For now, we will just send a response back   
    res.status(400).json({ message: 'Hello from Next.js API!' })

  }
}