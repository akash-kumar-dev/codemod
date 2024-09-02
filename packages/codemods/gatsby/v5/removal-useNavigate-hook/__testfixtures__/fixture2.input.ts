import React from "react";
import { useNavigate } from "@gatsbyjs/reach-router";

export default function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  };

  return < button onClick = { handleClick } > Go to About Page < /button>;
}