import { Inject } from '@nestjs/common';
import { FUGLE_REALTIME_WEBSOCKET_CLIENT } from '../fugle-realtime.constants';

export const InjectWebSocketClient = (): ParameterDecorator => {
  return Inject(FUGLE_REALTIME_WEBSOCKET_CLIENT);
};
