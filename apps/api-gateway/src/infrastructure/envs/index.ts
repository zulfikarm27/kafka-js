import { IsDefined } from 'class-validator';

class Envs {
  @IsDefined({ message: 'port is required' })
  port!: string;
}

export const envsConfig = (): Envs => {
  return {
    port: process.env.API_GATEWAY_PORT!,
  };
};
