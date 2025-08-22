import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@shridhar1284/medium-zod";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Auth middleware
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id as string);
      await next();
      return;
    }
  } catch (e) {
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }

  c.status(403);
  return c.json({ message: "You are not logged in" });
});

// Create blog
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId),
    },
  });

  return c.json({ id: blog.id });
});

// Update blog
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: { id: Number(body.id) },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ blog });
});

// Get all blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({ blogs });
});

blogRouter.get("/my-blogs", async (c) => {
  const userId = c.get("userId");

  if (!userId) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    where: { authorId: Number(userId) },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return c.json({ blogs });
});

// Get single blog
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id"); // GET should use query params
  if (!id) {
    c.status(400);
    return c.json({ message: "Blog id is required" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching blog post" });
  }
});

// Delete blog
blogRouter.delete("/:id", async (c) => {
  const id = c.req.param("id"); // get blog id from URL
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const deletedBlog = await prisma.blog.delete({
      where: { id: Number(id) },
    });

    return c.json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    c.status(404);
    return c.json({ message: "Blog not found" });
  }
});

