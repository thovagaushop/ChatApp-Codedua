import axios from "axios";
import jwt from "jsonwebtoken";
import EnvConstant from "./common/constant/env.constant.js";

const main = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN1YiI6IjY1MjEwZDQyMzY0MzZkNjYxZjg2NzU2MyIsInVzZXJuYW1lIjoidnUgZGVwIHRyYWkiLCJhdmF0YXIiOiJodHRwczovL3BuZy5wbmd0cmVlLmNvbS9lbGVtZW50X291ci8yMDIwMDYxMC9vdXJtaWQvcG5ndHJlZS1jaGFyYWN0ZXItZGVmYXVsdC1hdmF0YXItaW1hZ2VfMjIzNzIwMy5qcGcifSwiaWF0IjoxNjk5NzYxNDYxLCJleHAiOjE2OTk3NjE3NjF9.vKOTQ8IHeazt5723GsB-IR8YQ5pmWIWJI1Alfghov-w";
  const credentials = jwt.verify(token, EnvConstant.JWT_SECRET);

  console.log(credentials);
};

main();
