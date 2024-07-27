import slugify from 'slugify';
import xss from 'xss';

export const filterXSS = (content: string) => xss(content);

export const createSlug = (title: string) =>
  slugify(title, {
    replacement: '_',
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    trim: true,
  });
