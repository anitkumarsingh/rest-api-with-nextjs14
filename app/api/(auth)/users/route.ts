
import connect from '@/app/lib/db';
import user from '@/app/lib/models/users';
import {NextResponse} from 'next/server';

export const GET = async()=>{
    try {
        await connect();
        const users = await user.find();
        return new NextResponse(JSON.stringify({users,message:'Users fetched successfully!'}),{status:200})
        
    } catch (error:any) {
      return new NextResponse('Error in fetching users',error.message);  
    }
}