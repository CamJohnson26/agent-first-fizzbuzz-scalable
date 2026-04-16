# Authentication

To use the FizzBuzz Scalable API, you must authenticate your requests using an API Key.

## Obtaining an API Key

You can generate an API Key from the **Web Dashboard** under the **Settings > API Keys** section.

## Using the API Key

Include your API Key in the `Authorization` header of your requests as a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/fizzbuzz?range=10
```

## Security Best Practices

- **Never share your API Key**: Keep it secret and never commit it to version control.
- **Rotate keys regularly**: Use the dashboard to rotate your keys every 90 days.
- **Use Environment Variables**: Store your keys in environment variables on your server.

## Rate Limiting

By default, Free Tier keys are limited to 1,000 requests per hour. Enterprise keys have unlimited throughput.
