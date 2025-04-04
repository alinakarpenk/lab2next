import { NextResponse } from "next/server";
import User from '../../../models/user'

export async function POST(request) {
    try{
        const body = await request.json();

        const {login, password, password_repeat} = body
        if(!login || !password || !password_repeat){
            console.log('empty input')
            return NextResponse.json('empty input', {status: 400})
        }
        if(password !== password_repeat){
            console.log('Incorrect password')
            return NextResponse.json('Incorrect password', {status: 400})

        }
        const addUser = await User.create({
            login: login,
            password: password
        });

        console.log('add user successful')
        return NextResponse.json(
            { message: "Користувача додано до БД", user: addUser },
            { status: 201 }
          );
        

    } catch(error) {
        console.error("Error add user:", error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}