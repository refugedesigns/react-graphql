import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  const { loading, data, error } = useQuery(GET_COLLECTIONS);
  
  if (loading) return <Spinner />;
  
  return <CollectionsOverview collections={data.collections} />;
};

export default CollectionsOverviewContainer;
