import {
    Button,
    Container,
    IconButton,
    Stack,
    styled,
    Typography,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";;
  import { Link } from "react-router-dom";
import { useCart } from "../contexts/cart";
import { useProductCart } from "../hooks/useProductCart";
import Navhome from "./nav";
  
  const labels = ["Product", "Price", "Quantity", "Subtotal", ""];
  function Cart() {
    const { cart } = useCart();
    const { removeToCart } = useProductCart();
  
    return (
      <>
        {/* Tieu de */}
        <Navhome/>
        <Container>
          <Wrapper>
            <LabelWrapper
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              {labels.map((label, index) => (
                <Typography fontWeight={500} key={index}>
                  {label}
                </Typography>
              ))}
            </LabelWrapper>
            {/* Cart Item */}
            <Stack gap={3} mb={3}>
              {cart?.products.map((item, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"} alignItems={"center"} gap={4}>
                    <img src={item.product.image} width={"100px"} />
                    <Typography fontWeight={500}>
                      {item.product.name.substring(0, 10)}...
                    </Typography>
                  </Stack>
  
                  <Typography fontWeight={500}>{item.product.price}đ</Typography>
                  <Typography fontWeight={500}>{item.quantity}</Typography>
                  <Typography fontWeight={500}>{item.product.price*item.quantity}</Typography>
                  <IconButton onClick={() => removeToCart(item.product._id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Wrapper>
          <Stack alignItems={"center"}>
            <Link to="/checkout">
              <Button variant="contained" sx={{ mb: 10 }}>
                Checkout
              </Button>
            </Link>
          </Stack>
        </Container>
      </>
    );
  }
  
  export default Cart;
  
  const Wrapper = styled(Stack)({
    padding: 72,
  });
  
  const LabelWrapper = styled(Stack)(() => ({
    background: "#F9F1E7",
    height: 55,
  }));
  