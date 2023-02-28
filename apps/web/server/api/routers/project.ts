import { prisma } from "@server/db";
import { TRPCError } from "@trpc/server";
import { ProjectModel } from "prisma/zod";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const optionalTextAreaSchema = z
  .string()
  .trim()
  .optional()
  .describe("Text: // Text...");

export const textAreaSchema = z
  .string()
  .trim()
  .min(1, { message: "Text must not be empty." })
  .describe("Text: // Text...");

export const fileInputSchema = z.string();

export const createPostSchema = z.object({
  title: z
    .string({ required_error: "Required." })
    .trim()
    .min(1, { message: "title must not be empty." })
    .describe("Title: // Title..."),
  description: textAreaSchema.optional(),
  image: fileInputSchema.optional(),
  nsfw: z.boolean({ required_error: "Required." }).describe("NSFW: "),
  subName: z
    .string({ required_error: "Required." })
    .trim()
    .min(1, { message: "sub name must not be empty." })
    .describe("Community: // Community..."),
});

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(ProjectModel)
    .mutation(async ({ ctx, input }) => {
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

      const positions = await prisma.position.createMany({
        data: positionsInput,
      });

      const project = await prisma.project.create({
        data: {
          ...projectInput,
          files: [""],
          category: "",
          image: image.secure_url,
        },
      });

      return project;
    }),
  getProjects: publicProcedure.query(async ({ ctx }) => {
    try {
      return prisma.project.findMany({
        include: {
          positions: true,
        },
      });
    } catch (e) {}
  }),
});
