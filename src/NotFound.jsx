import React from 'react'
import {Helmet} from "react-helmet";

export default function NotFound() {
  return(
  <Helmet>
    <script>
      location.href = "/"
    </script>
  </Helmet>
  );
}