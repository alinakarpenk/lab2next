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
            attributes: ['id', 'title', 'text', 'userId'],
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error); 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    
}

export async function PATCH(request, { params }) {
    try {
      const postId = params.id;
      const body = await request.json();
        if (!body || (Object.keys(body).length === 0)) {
        return NextResponse.json({ error: "Немає даних для оновлення" }, { status: 400 });
      }
        const [updatedCount] = await Posts.update(body, {
        where: { id: postId },
      });
      if (updatedCount === 0) {
        return NextResponse.json({ error: "Пост не знайдено або нічого не оновлено" }, { status: 404 });
      }
      return NextResponse.json({ message: "Пост оновлено успішно" }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


