// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type {FriendsResponse, Friend} from "../../common/types";
import { Client } from 'pg';
import { credentials } from '../../common/creds';



export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FriendsResponse>
) {
  const client = new Client(credentials);
  await client.connect();

  const data = await client.query(`
      select * from public.friends
  `);

  const rows: Friend[] = data.rows;

  console.log(data);
  res.status(200).json({ data: rows });
}
