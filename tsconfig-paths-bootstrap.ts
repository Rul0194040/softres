import * as path from 'path';
import * as moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@softres': path.resolve(__dirname + '/src'),
});
