import { Badge, Button, Stack, styled, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMemo } from "react";
import { useCart } from "../contexts/cart";
import Banner from "./banner";

const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Shop",
    link: "/shop",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const Navhome = () => {
  const { cart } = useCart();

  const cartQuantity = useMemo(
    () =>
      cart
        ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
        : 0,
    [cart]
  );

  const isLoggedIn = localStorage.getItem("token") !== null;

  const LogOut =() =>{
    if (confirm('you confirm logout')) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    location.reload()
    }
    return
  }
  return (
    <Wrapper
      sx={{ padding: "0 50px", backgroundColor: '#f5f5f5' }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant="h3">PHAN</Typography>
      <Stack direction={"row"} gap={"75px"}>
        {/* menu */}
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index} style={{ textDecoration: 'none', color: 'black', }}>
            <Typography fontWeight={"500"} sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>{menu.label}</Typography>
          </Link>
        ))}
      </Stack>
      <Stack gap={"45px"} direction={"row"}>
        {!isLoggedIn ? (
          <Link to={"/login"}>
            <Typography fontWeight={"500"} sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>
              Login
            </Typography>
          </Link>
        ) : (
          <Button onClick={LogOut}
          >
              <img src="/user.svg" alt="user" />
          </Button>
        )}
        <SearchIcon />
        <FavoriteBorderIcon />
        <Link to={"/cart"}>
          <Badge badgeContent={cartQuantity} color="secondary">
            <img src="/cart.svg" alt="cart" />
          </Badge>
        </Link>
      </Stack>
    </Wrapper>
  );
};

export default Navhome;

const Wrapper = styled(Stack)({
  height: 100,
  padding: "0 50px",
});
