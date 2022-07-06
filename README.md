# @fugle/realtime-nest

[![NPM version][npm-image]][npm-url]

> A Nest module wrapper for [@fugle/realtime](https://github.com/fugle-dev/fugle-realtime-node)

## Installation

To begin using it, we first install the required dependency.

```bash
$ npm install --save @fugle/realtime-nest @fugle/realtime
```

## Getting started

Once the installation is complete, to use the `HttpClient` or `WebSocketClient`, first import `FugleRealtimeModule` and pass the options with `apiToken` to the `register()` method.

```typescript
import { Module } from '@nestjs/common';
import { FugleRealtimeModule } from '@fugle/realtime-nest';

@Module({
  imports: [
    FugleRealtimeModule.register({
      apiToken: 'demo',
    }),
  ],
})
export class IntradayModule {}
```

Next, inject the `HttpClient` instance using the `@InjectHttpClient()` decorator.

```typescript
constructor(@InjectHttpClient() private readonly client: HttpClient) {}
```

The `@InjectWebSocketClient()` decorator is used for the `WebSocketClient` instance injection.

```typescript
constructor(@InjectWebSocketClient() private readonly client: WebSocketClient) {}
```

## Async configuration

When you need to pass module options asynchronously instead of statically, use the `registerAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
FugleRealtimeModule.registerAsync({
  useFactory: () => ({
    apiToken: 'demo',
  }),
});
```

Like other factory providers, our factory function can be [async](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory) and can inject dependencies through `inject`.

```typescript
FugleRealtimeModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    apiToken: configService.get('FUGLE_REALTIME_API_TOKEN'),
  }),
  inject: [ConfigService],
});
```

Alternatively, you can configure the `FugleRealtimeModule` using a class instead of a factory, as shown below.

```typescript
FugleRealtimeModule.registerAsync({
  useClass: FugleRealtimeConfigService,
});
```

The construction above instantiates `FugleRealtimeConfigService` inside `FugleRealtimeModule`, using it to create an options object. Note that in this example, the `FugleRealtimeConfigService` has to implement `FugleRealtimeModuleOptionsFactory` interface as shown below. The `FugleRealtimeModule` will call the `createFugleRealtimeOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class FugleRealtimeConfigService implements FugleRealtimeModuleOptionsFactory {
  createFugleRealtimeOptions(): FugleRealtimeModuleOptions {
    return {
      apiToken: 'demo',
    };
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `FugleRealtimeModule`, use the `useExisting` syntax.

```typescript
FugleRealtimeModule.registerAsync({
  imports: [ConfigModule],
  useExisting: FugleRealtimeConfigService,
});
```

## Reference

- [fugle-realtime-node](https://github.com/fugle-dev/fugle-realtime-node)
- [富果股市 API](https://developer.fugle.tw)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fugle/realtime-nest.svg
[npm-url]: https://npmjs.com/package/@fugle/realtime-nest
