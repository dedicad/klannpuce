// This file should be much more secure, it needs to be transformed into environment variable, or pulled from a secure vault.

import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
    secret: '7LTKL09)q]tH6vZh+Si)YW,0g~WO[N'
};

export const IS_PUBLIC_KEY = 'SFECUBnjR=%ao]Uw-MY1]=cf.}4T*<';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
