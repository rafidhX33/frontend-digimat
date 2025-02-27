import { Injectable } from '@angular/core';

const MTProto = require('@mtproto/core/envs/browser');

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  botToken: any;
  chatId: any;
  mtProto: any;

  constructor() {
    this.mtProto = MTProto({
      api_id: 1252209321,
      api_hash: '6987924690:AAHJkGjUixfbX-rL39tFE9mV0WrU_r9jq7U',
      test: false
    });
   }

  async call(method: any, params:{} = {}, options:{} = {}): Promise<any> {
    try {
      return await this.mtProto.call(method, params, options);
    } catch (error) {
      console.log(`${method} error:`, error)
      return Promise.reject(error);
    }
  }

}
