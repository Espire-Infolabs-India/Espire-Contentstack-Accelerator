import type { NextApiRequest, NextApiResponse } from 'next'
import {getEntryByUid,indexEntries,updateQuery} from '../../contentstack-sdk/index'
import { getAllEntries, getPageRes } from "../../helper";
import { AllEntries } from "../../model/entries.model";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') { 

     const entryPaths: AllEntries = await getAllEntries("_technical_solution");
     const entriesArray = Array.isArray(entryPaths) ? entryPaths : Object.values(entryPaths);

     for (const entry of entriesArray) {
        console.log('Processing entry:', entry?.uid);
          // const response1 = await updateQuery(entry?.uid);
           // const response = await indexEntries(entry?.uid,"page");
       }

     
  } else {
    res.status(402).json({ message: 'Not allowed' })
  }
}