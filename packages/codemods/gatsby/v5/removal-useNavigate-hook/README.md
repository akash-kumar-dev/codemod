## Removal of useNavigate Hook

This codemod updates your codebase by replacing the deprecated `useNavigate` hook from `@gatsbyjs/reach-router` with the `navigate` function from `gatsby`. This change is necessary for compatibility with React 18 and ensures that your application leverages the latest advancements in Gatsby.

## Example

### Before

```ts
import { useNavigate } from "@gatsbyjs/reach-router";
```

### After

```ts
import { navigate } from "gatsby";
```
,

### Before

```ts
import React from "react";
import { useNavigate } from "@gatsbyjs/reach-router";

export default function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  };

  return < button onClick = { handleClick } > Go to About Page < /button>;
}
```

### After

```ts
import React from "react";
import { navigate } from "gatsby";

export default function MyComponent() {
  const handleClick = () => {
    navigate('/about');
  };

  return < button onClick = { handleClick } > Go to About Page < /button>;
}
```

