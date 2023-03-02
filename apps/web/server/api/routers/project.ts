import { Project } from "@prisma/client";
import { prisma } from "@server/db";
import { TRPCError } from "@trpc/server";
import { ProjectModel } from "prisma/zod";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const GetProjectModel = z.object({ id: z.string() });

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(ProjectModel)
    .mutation(async ({ ctx, input }) => {
      console.log("input: ", input);
      let files = undefined;
      let image;
      try {
        console.log("input ", input);
        image = await ctx.cloudinary.uploadFile(input.image);

        if (input.files) {
          files = input.files.map(
            async (file) => (await ctx.cloudinary.uploadFile(file)).secure_url
          );
        }
      } catch (e) {
        console.log("e: ", e);
        throw new TRPCError({
          message: "Photo not uploaded => Post not created",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      const { positions: positionsInput, ...projectInput } = input;

      const project: Project = await prisma.project.create({
        data: {
          ...projectInput,
          files: [""],
          category: "",
          image: image.secure_url,
          authorId: ctx.session.user.id,
        },
      });

      await prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          memberships: {
            connect: {
              projectId_userId: {
                projectId: project.id,
                userId: ctx.session.user.id,
              },
            },
          },
        },
      });

      const newPostions = positionsInput.map((pos) => ({
        ...pos,
        projectId: project.id,
      }));

      await prisma.position.createMany({
        data: newPostions,
      });

      return project;
    }),
  getProjects: publicProcedure.query(async ({ ctx }) => {
    try {
      return prisma.project.findMany({
        include: {
          positions: true,
          author: true,
        },
      });
    } catch (e) {}
  }),
  getProject: publicProcedure
    .input(GetProjectModel)
    .query(async ({ ctx, input }) => {
      try {
        return prisma.project.findUnique({
          where: {
            id: input.id,
          },
          include: {
            positions: true,
            author: true,
            memberships: {
              include: {
                user: {
                  select: {
                    name: true,
                    role: true,
                    email: true,
                    id: true,
                    image: true,
                  },
                },
              },
            },
          },
        });
      } catch (e) {}
    }),
});
