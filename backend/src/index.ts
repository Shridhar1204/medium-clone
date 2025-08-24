import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";






const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

const allowedOrigins = [
  "http://localhost:5173",
  "https://medium-clone-mu-nine.vercel.app"
];

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return "*"; // server-to-server
      if (allowedOrigins.includes(origin)) return origin;
      return "http://localhost:5173"; // fallback
    },
    credentials: true,
  })
);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);




export default app;
