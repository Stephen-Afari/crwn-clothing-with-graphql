import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import {gql, useQuery, useMutation} from '@apollo/client';
import { CategoriesContext } from '../../contexts/categories.context';
import Spinner from '../../components/spinner/spinner.component';
import { CategoryContainer, Title } from './category.styles';

const GET_CATEGORY = gql `
query($title: String!) {
  getCollectionsByTitle(title: $title) {
    id
    title
    items {
      name
      id
			imageUrl
    }
  }
}

`

// const SET_CATEGORY = gql`
// mutation ($category: category!){
//   addCategory(category: $category){
//     id
//     title
//     items {
//       name
//       id 
// 			imageUrl
//   }
// }
// `
const Category = () => {
  const { category } = useParams();

  const {loading, error, data}= useQuery(GET_CATEGORY, {
    variables: {
      title: category
    }
  })

  //const [addCategory, {loading, error, data}] = useMutation(SET_CATEGORY)

  //addCategory({variables: {category: categoryObj}})
  console.log(data)

  useEffect(()=>{
if(data){
  const {getCollectionsByTitle : {items}} = data
  setProducts(items)
}
  }, [category,data])
  //const { categoriesMap, loading} = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);

  return (
    <Fragment>
      {
      loading ? <Spinner/> :
      (<Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
      </Fragment>)
      }
    </Fragment>
  );
};

export default Category;
