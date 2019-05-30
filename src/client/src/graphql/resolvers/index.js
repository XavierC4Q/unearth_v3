import { merge } from 'lodash';
import AuthResolvers from './authResolvers';

const Resolvers = [ AuthResolvers ];

export default merge({}, ...Resolvers);
