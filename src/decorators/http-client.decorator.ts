import { Inject } from '@nestjs/common';
import { FUGLE_REALTIME_HTTP_CLIENT } from '../fugle-realtime.constants';

export const InjectHttpClient = (): ParameterDecorator => {
  return Inject(FUGLE_REALTIME_HTTP_CLIENT);
};
