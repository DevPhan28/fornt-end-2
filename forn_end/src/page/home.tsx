import Navhome from './nav';
import { Box, LinearProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Infro } from '../interface';
import ProductCard from './ProductTable';
import Banner from './banner';
import Foodter from './foodter';
import BannerMid from './bannerMid';
import ProductCardTwo from './ProductCardtwo';
import { useLoading } from '../contexts/loading';


function Home() {
  const [products, setProducts] = useState<Infro[]>([]);
  const { loading, setLoading } = useLoading();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <Navhome />
      <Banner />
      {loading && (
        <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
      )

      }
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={5}
        marginBottom={5}
      >
        {products.slice(0, 6).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Stack>
      <BannerMid/>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={5}
        marginBottom={5}
      >
        {products.slice(0, 12).map((product, index) => (
          <ProductCardTwo key={index} product={product} />
        ))}
      </Stack>
      <Foodter />
    </>
  );
}

export default Home;
