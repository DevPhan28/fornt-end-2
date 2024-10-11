import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Infro } from "../interface";
import { Link } from "react-router-dom";


type ProductCardProps = {
  product: Infro;
};

const ProductCardTwo: FC<ProductCardProps> = ({ product }) => {
  
  return (
    <Card sx={{ maxWidth: 345 , height: 350, width: 200}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={product.image}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product.price} $
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Link to={`/detail/${product._id}`}>
          <Button size="small">
            Detail
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCardTwo;