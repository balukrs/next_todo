export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home", "/completed", "/archive", "/profile"],
};
