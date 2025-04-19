import { prisma } from "@/db/prisma";
import { getUser } from "@/utils/getUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
      return NextResponse.json({ message, success });
    }
    const url = new URL(req.url);
    const id = url.searchParams.get("projectId");

    if (!id) {
      return NextResponse.json({
        message: "Project Id is required to fetch data",
        success: false,
      });
    }

    const findProject = await prisma.projects.findUnique({
      where:{
        id,
        userId:user.id
      }
    })

    if (!findProject) {
      return NextResponse.json({
        message: "Invalid Project id",
        success: false,
      });
    }

    const tasks = await prisma.tasks.findMany({
      where: {
        projectId:findProject.id,
        userId:user.id
      },
    });

  
    return NextResponse.json({
      message: "Tasks details successfully fetched" ,
      data: tasks || [],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong! can't fetch Tasks details details",
      success: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { success, message, user } = await getUser();

    if (!user || !success) {
      return NextResponse.json({ message, success });
    }

    const {
      name,
      description,
      type,
      status,
      reviewer,
      taskId,
      projectId,
    } = await req.json();

    const findProject = await prisma.projects.findUnique({
      where:{
        id:projectId,
        userId:user.id
      }
    })

    if(!findProject){
      return NextResponse.json({
        message:"Project Not found Invalid Id",
        success:false
      })
    }
    const fixStatus = status == "In Progress" ? "InProgress" : status; 

    if(taskId){
      await prisma.tasks.update({
        where:{
          id:taskId,
          userId:user.id
        },
        data:{
          name,
          description,
          typeOfUpdate:type,
          status:fixStatus,
          reviewer
        }
      })

      return NextResponse.json({
        message:"Task updated Successfully",
        success:true
      })
    }
   const created =  await prisma.tasks.create({
      data:{
        name,
        status:fixStatus,
        description,
        projectId,
        typeOfUpdate:type,
        reviewer,
        userId:user.id
      }
    })

    return NextResponse.json({
      message: "Tasks successfully created",
      data: created,
      success: "false",
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Something went wrong! can't create new Tasks now",
      success: false,
    });
  }
}
