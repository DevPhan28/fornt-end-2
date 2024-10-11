import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  TextField,
  IconButton,
  Stack, 
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Infro } from '../interface';
import axios from 'axios';
import Navhome from './nav';
import Foodter from './foodter';
import { useProductCart } from '../hooks/useProductCart';
import Loading from '../component/Loading';

const SingleProduct = () => {
  const { addToCart } = useProductCart();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [card, setCard] = useState<Infro | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate()

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setCard(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleAddToCart = (product: Infro) => {
   if (!localStorage.getItem('user')) {
    alert('bạn chưa đăng nhập')
    navigate('/login')
   }
    if (quantity <= 0) return;
   addToCart({ product, quantity });
  };

  return (
    <>
      <Navhome />
      {loading && <Loading isShow />} 
      {!loading && (
        <Container sx={{ paddingBottom: 13 }}>
          <Box my={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <img src={card?.image} width="500px" height="400px" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                  {card?.name}
                </Typography>
                <table>
                  <tbody>
                    <tr>
                      {[...Array(5)].map((_, index) => (
                        <td key={index}>
                          <StarIcon sx={{ color: 'yellow' }} />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <Typography variant="h5" color="primary" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                  ${card?.price}
                </Typography>
                <Box my={2}>
                  <Typography>{card?.desc}</Typography>
                </Box>
                <Box my={3} display="flex" alignItems="center">
                  <Stack direction="row" gap={2} alignItems="center">
                    <Typography>Quantity: </Typography>
                    <IconButton
                      onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      label="quantity"
                      variant="outlined"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <IconButton onClick={() => setQuantity(quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Stack>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddToCart(card)}
                  >
                    Add to cart
                  </Button>
                </Box>
                <Box my={2}>
                  <Typography variant="body2">
                    Buy this bundle and get <span style={{ color: 'red' }}>25%</span> off all prices.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box my={5}></Box>
        </Container>
      )}
      <Foodter />
    </>
  );
};

export default SingleProduct;
