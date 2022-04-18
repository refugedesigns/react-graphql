import { gql } from "apollo-boost";

import { addItemToCart, getCartItemsCount } from "./cart.utils";

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CART_ITEMS_COUNT = gql`
    {
        cartItemsCount @client
    }
`

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_, _args, { cache }, _info) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },
    addItemToCart: (_, _args, _context, _info) => {
      const { item } = _args;
      const { cache } = _context;

      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
          query: GET_CART_ITEMS_COUNT,
          data: { cartItemsCount: getCartItemsCount(newCartItems)}
      })

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },
  },
};
