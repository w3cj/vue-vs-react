import Product from '../components/Product';
import products from '../data/products';

function Products() {
  return products.map((product) => (
    <Product key={product.id} product={product} />
  ));
}

export default Products;
