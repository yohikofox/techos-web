## app/ Static to Dynamic Error

In this case, my problem was that certain requests were made in `revalidate=0` or in `no-store`. The heart of the problem was the `ConfigManager`.