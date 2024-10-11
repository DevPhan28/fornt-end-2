import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Field, Form } from "react-final-form";
import { useMemo } from "react";
import { useLoading } from "../contexts/loading";
import { useCart } from "../contexts/cart";
import { useUser } from "../contexts/user";
import { useProductCart } from "../hooks/useProductCart";
import Navhome from "./nav";
import { InputText } from "../component/InputText";

type CheckoutFormParams = {
  name: string;
  phone: string;
  address: string;
  payment: string;
};

function Checkout() {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const { cart } = useCart();
  const { user } = useUser();
  const { getCartUser } = useProductCart();

  const totalPrice = useMemo(
    () =>
      cart
        ? cart.products.reduce(
            (total, { product, quantity }) => total + product.price * quantity,
            0
          )
        : 0,
    [cart]
  );

  const onSubmit = async (values: CheckoutFormParams) => {
    if (!user || !cart || !cart.products.length) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/orders", {
        ...values,
        products: cart.products,
        user: user._id,
        totalPrice,
      });
      await getCartUser();
      alert("Checkout successful");
      nav("/");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navhome />
      <Typography variant="h3" color="red" textAlign={"center"} mt={2}>
        Total Price: {totalPrice} VND
      </Typography>
      <Container sx={{ mb: 10 }}>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            payment: "COD",
          }}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Stack gap={3}>
                <Field
                  name="name"
                  validate={(value) => (value ? undefined : "Name is required")}
                >
                  {({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Name"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field
                  name="phone"
                  validate={(value) => (value ? undefined : "Phone is required")}
                >
                  {({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Phone"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field
                  name="address"
                  validate={(value) => (value ? undefined : "Address is required")}
                >
                  {({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Address"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="payment">
                  {({ input, meta }) => (
                    <FormControl>
                      <FormLabel>Payment</FormLabel>
                      <RadioGroup {...input} aria-label="Payment">
                        <FormControlLabel
                          value="COD"
                          control={<Radio />}
                          label="COD"
                        />
                        <FormControlLabel
                          value="BANK"
                          control={<Radio />}
                          label="BANK"
                        />
                      </RadioGroup>
                      {meta.touched && meta.error && (
                        <Typography color="error">{meta.error}</Typography>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || pristine}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          )}
        />
      </Container>
    </>
  );
}

export default Checkout;
