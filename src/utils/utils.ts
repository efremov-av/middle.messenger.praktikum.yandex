import { sanitizeHTML } from './helpers';

export const getData = (form: any) => {
  var formData = new FormData(form);

  let object = Object.fromEntries(formData);

  for (const key in object) {
    if (typeof object[key] === 'string' && !key.toLowerCase().includes('password')) {
      object[key] = sanitizeHTML(object[key] as string);
    }
  }

  return object;
};

export const getErrorMessage = (data: any) => {
  let errorText = '';
  try {
    errorText = JSON.parse(data).reason;
  } catch {
    errorText = 'Unexpected error';
  }
  return errorText;
};
