// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type {LakesResponse, Lake} from "../../common/types";
import { Client } from 'pg';
import { credentials } from '../../common/creds';



export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<LakesResponse>
) {
  const client = new Client(credentials);
  await client.connect();

  const data = await client.query(`
      select * from public.lakes
  `);

  const rows: Lake[] = data.rows;

  console.log(data);
  res.status(200).json({ data: rows });
}
