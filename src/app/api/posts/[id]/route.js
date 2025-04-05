import { NextResponse } from "next/server";
import Posts from "../../../../models/posts";


export async function DELETE(request, { params }) {
  try {
    const postId = params.id;

    const deletedPost = await Posts.destroy({
      where: { id: postId },
    });
    if (!deletedPost) {
      return NextResponse.json({ error: 'Пост не знайдено' }, { status: 404 });
    }
    return NextResponse.json('Пост успішно видалено' , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




