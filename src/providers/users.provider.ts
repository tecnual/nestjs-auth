import { Connection } from 'mongoose';
import { UserSchema } from '../../users/user.schema';


export const usersProviders = [
  {
    provide: 'USER_MODEL',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION']
  }
];