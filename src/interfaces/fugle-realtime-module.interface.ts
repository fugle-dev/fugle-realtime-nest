import { ModuleMetadata, Type } from '@nestjs/common';
import { ClientOptions } from '@fugle/realtime';

export interface FugleRealtimeModuleOptions extends ClientOptions {}

export interface FugleRealtimeModuleOptionsFactory {
  createFugleRealtimeOptions(): Promise<FugleRealtimeModuleOptions> | FugleRealtimeModuleOptions;
}

export interface FugleRealtimeModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<FugleRealtimeModuleOptionsFactory>;
  useClass?: Type<FugleRealtimeModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<FugleRealtimeModuleOptions> | FugleRealtimeModuleOptions;
  inject?: any[];
}
