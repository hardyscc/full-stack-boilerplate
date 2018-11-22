import * as argon from 'argon2';
import { MutationResolvers } from '../../../types';
import { User } from '../../../entity/User';
import { registerSchema } from '@boilerplate/common';
import { formatYupError } from '../../../utils/formatYupErrors';

const createErrorsResponse = (path: string, message: string) => ({
  errors: [{ path, message }]
});

const resolvers: MutationResolvers.Resolvers = {
  register: async (_, { input }) => {
    try {
      await registerSchema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        errors: formatYupError(err)
      };
    }

    const { email, username, password } = input;

    const hashedPassword = await argon.hash(password);

    try {
      await User.create({
        username,
        email,
        password: hashedPassword
      }).save();
    } catch (err) {
      const { detail } = err;

      if (detail.includes('already exists.')) {
        if (detail.includes('email')) {
          return createErrorsResponse('email', 'email already in use');
        } else if (detail.includes('username')) {
          return createErrorsResponse('username', 'username already taken');
        }
      }
    }

    return { errors: [] };
  }
};

export default { Mutation: resolvers };
