import { NextResponse } from "next/server";
import Posts from "../../../models/posts";
import User from '../../../models/user'

export async function GET(request) {
    try {
        const posts = await Posts.findAndCountAll({
            include: [
                {
                    model: User,
                    attributes: ['login'],
                },
            ],
            attributes: ['title', 'text', 'userId'],
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error); 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
