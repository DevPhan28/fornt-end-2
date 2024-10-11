import { Button, Container, Link, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { UsersLogin } from "../interface";
import Navhome from "./nav";
import { useNavigate } from "react-router-dom";
import { useProductCart } from "../hooks/useProductCart";

const Login = () => {
  const { getCartUser } = useProductCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersLogin>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UsersLogin> = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data);
      localStorage.setItem('token', res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user));
      getCartUser()
      alert('Đăng nhập thành công');
      navigate('/')
    } catch (error) {}
  };

  return (
    <>
      <Navhome />
      <Container>
        <Typography variant="h2" textAlign={"center"} mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
            <TextField
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password is min length 6 characters",
                },
              })}
              type="password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
        <Stack alignItems="flex-end" mt={2}>
          <Typography variant="body1" color="initial">
            Bạn chưa có tài khoản <Link href="/register">Đăng ký tài khoản</Link>
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
