import { Module, DynamicModule, Provider } from '@nestjs/common';
import { HttpClient, WebSocketClient } from '@fugle/realtime';
import { FugleRealtimeModuleOptions, FugleRealtimeModuleAsyncOptions, FugleRealtimeModuleOptionsFactory } from './interfaces';
import { FUGLE_REALTIME_HTTP_CLIENT, FUGLE_REALTIME_WEBSOCKET_CLIENT, FUGLE_REALTIME_CLIENT_OPTIONS } from './fugle-realtime.constants';

@Module({})
export class FugleRealtimeModule {
  static register(options: FugleRealtimeModuleOptions): DynamicModule {
    return {
      module: FugleRealtimeModule,
      providers: [
        {
          provide: FUGLE_REALTIME_HTTP_CLIENT,
          useValue: new HttpClient(options),
        },
        {
          provide: FUGLE_REALTIME_WEBSOCKET_CLIENT,
          useValue: new WebSocketClient(options),
        },
      ],
      exports: [
        FUGLE_REALTIME_HTTP_CLIENT,
        FUGLE_REALTIME_WEBSOCKET_CLIENT,
      ],
    };
  }

  static registerAsync(options: FugleRealtimeModuleAsyncOptions): DynamicModule {
    return {
      module: FugleRealtimeModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: FUGLE_REALTIME_HTTP_CLIENT,
          useFactory: (options: FugleRealtimeModuleOptions) => new HttpClient(options),
          inject: [FUGLE_REALTIME_CLIENT_OPTIONS],
        },
        {
          provide: FUGLE_REALTIME_WEBSOCKET_CLIENT,
          useFactory: (options: FugleRealtimeModuleOptions) => new WebSocketClient(options),
          inject: [FUGLE_REALTIME_CLIENT_OPTIONS],
        },
      ],
      exports: [
        FUGLE_REALTIME_HTTP_CLIENT,
        FUGLE_REALTIME_WEBSOCKET_CLIENT,
      ],
    };
  }

  private static createAsyncProviders(options: FugleRealtimeModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: FugleRealtimeModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: FUGLE_REALTIME_CLIENT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: FUGLE_REALTIME_CLIENT_OPTIONS,
      useFactory: async (optionsFactory: FugleRealtimeModuleOptionsFactory) =>
        optionsFactory.createFugleRealtimeOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
