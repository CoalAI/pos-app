import { Store } from '@/store';// path to store file
import { Socket } from 'socket.io-client';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
    $socket: Socket
  }
}