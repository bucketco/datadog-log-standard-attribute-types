# datadog-log-standard-attribute-types

This module exposes Typescript types for Datadog's default standard attribute list for structured logging.

Assembled from data from:
- https://docs.datadoghq.com/logs/log_collection/?tab=serverless#attributes-and-tags
- https://docs.datadoghq.com/logs/processing/attributes_naming_convention/#default-standard-attribute-list

## Installation

```
npm install --save-dev @heap-dk/datadog-log-standard-attribute-types
```

## Usage

```js
import { DD_META_STRUCTURE } from '@heap-dk/datadog-log-standard-attribute-types';

// See https://docs.datadoghq.com/logs/log_collection/?tab=host#logging-endpoints
const DD_API_URL = new URL(`https://http-intake.logs.datadoghq.eu/v1/input`);

function myDatadogLogger(message: string, context: DD_META_STRUCTURE) {
    fetch(API_URL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'DD-API-KEY': DD_API_KEY,
        },
        body: JSON.stringify({
            ...context,
            message,
        }),
  })
}
```

## LICENSE

[MIT](https://tldrlegal.com/license/mit-license)
