import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from "./cart-icon.component";
import { cartItemsCount } from "../../graphql/cart.utils";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS_COUNT = gql`
  {
    cartItemsCount @client
  }
`;

const CartIconContainer = () => {
  const [toggleCartHidden] =
    useMutation(TOGGLE_CART_HIDDEN);

  const {
    loading,
    data: { cartItemsCount },
    error,
  } = useQuery(GET_CART_ITEMS_COUNT);


  return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={cartItemsCount} />;
};

export default CartIconContainer;
