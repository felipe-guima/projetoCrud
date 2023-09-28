import { NextApiRequest, NextApiResponse } from "next";

// tipogem de API Back

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    console.log(request.headers);
    response.status(200).json({ message: "API - Olá mundo no back API " });
}
