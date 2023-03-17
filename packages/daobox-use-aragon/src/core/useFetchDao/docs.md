---
title: useFetchDao
---

# useFetchDao

> `useFetchDao` is a custom React hook that fetches the details of a DAO using its address or ENS name.

<br/>

## Usage

First, import the hook:

```javascript
import { useFetchDao } from "@daobox/use-aragon";
```

Then, use the hook with the DAO address or ENS name:

```typescript
const { data: dao, isLoading, error } = useFetchDao(daoAddressOrEns);
```

<br/>

# Parameters

- **daoAddressOrEns**: `string` | `undefined`
  The DAO address or ENS name. If it's not provided, the hook will be disabled.

- **options**: `UseFetchDaoOptions` | `undefined`
  An optional object containing the options for the react-query hook. For more information on the available options, refer to the react-query documentation.

<br/>

## Return values

The hook returns an object with the following properties:

- **`data`**: The fetched `DaoDetails` object or `null` if not found. The `DaoDetails` type has the following structure:

```typescript
{
address: string;
ensDomain: string;
metadata: {
  name: string;
  description: string;
  avatar?: string;
  links: {
    name: string;
    url: string;
  }[];
};
creationDate: Date;
plugins: {
  id: string;
  instanceAddress: string;
  version: string;
}[];
}
```

- `isLoading`: A boolean indicating whether the data is being fetched.

- `error`: An error object if an error occurred while fetching the data, otherwise null.

For more information on the return values, refer to the [`react-query` documentation](https://react-query.tanstack.com/reference/useQuery#_top)

<br/>

# Example

```typescript
import React from "react";
import { useFetchDao } from "@daobox/use-aragon";

function DaoDetails({ daoAddressOrEns }) {
  const { data, isLoading, error } = useFetchDao(daoAddressOrEns);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No DAO found</div>;
  }

  return (
    <div>
      <h2>{data.metadata.name}</h2>
      <p>{data.metadata.description}</p>
      <p>Address: {data.address}</p>
      <p>ENS Domain: {data.ensDomain}</p>
      <p>Creation Date: {data.creationDate.toLocaleString()}</p>
      <h3>Plugins</h3>
      <ul>
        {data.plugins.map((plugin) => (
          <li key={plugin.id}>
            {plugin.id} - {plugin.instanceAddress} ({plugin.version})
          </li>
        ))}
      </ul>
    </div>
  );
}
```
