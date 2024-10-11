import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { UsersLogin } from "../interface";
import Navhome from "./nav";
import { useNavigate } from "react-router-dom";

interface RegisterForm extends UsersLogin {
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const { confirmPassword, ...formData } = data;
      await axios.post("http://localhost:3000/auth/register", formData);
      alert('Đăng ký thành công');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const password = watch("password");

  return (
    <>
      <Navhome />
      <Container>
        <Typography variant="h2" textAlign={"center"} mb={2}>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <TextField
              label="Username"
              {...register("username", {
                required: "Username is required",
              })}
              error={!!errors?.username?.message}
              helperText={errors?.username?.message}
            />
            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
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
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <TextField
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Không trùng với mật khẩu bạn đã nhập ở trên",
              })}
              type="password"
              error={!!errors?.confirmPassword?.message}
              helperText={errors?.confirmPassword?.message}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default Register;
