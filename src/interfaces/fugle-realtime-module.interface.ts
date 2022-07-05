import { ModuleMetadata, Type } from '@nestjs/common';

export interface FugleRealtimeModuleOptions {
  apiToken: string;
}

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
