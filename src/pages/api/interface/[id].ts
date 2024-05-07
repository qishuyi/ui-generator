import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


// Guidance from https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes/src

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const postId = req.query.id;

    switch (req.method) {
    case "DELETE":
        return handleDELETE(postId, res);

    default:
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}

// DELETE /api/post/:id
async function handleDELETE(
    userInterfaceId: unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res: NextApiResponse<any>
) {
    const userInterface = await prisma.interface.delete({
        where: { id: String(userInterfaceId) },
    });
    return res.json(userInterface);
}
