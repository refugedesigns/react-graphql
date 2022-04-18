import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import Header from "./header.component";

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const HeaderContainer = () => {
  const {
    loading,
    data: { cartHidden },
    error,
  } = useQuery(GET_CART_HIDDEN);
  return <Header hidden={cartHidden} />;
};

export default HeaderContainer;
