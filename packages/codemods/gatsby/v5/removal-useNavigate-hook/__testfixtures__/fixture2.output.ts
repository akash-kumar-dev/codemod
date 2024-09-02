import React from "react";
import { navigate } from "gatsby";

export default function MyComponent() {
  const handleClick = () => {
    navigate('/about');
  };

  return < button onClick = { handleClick } > Go to About Page < /button>;
}