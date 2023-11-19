import { User } from '@prisma/client';
import { Request } from 'express';

export type SessionRequest = Request & { user: User };
