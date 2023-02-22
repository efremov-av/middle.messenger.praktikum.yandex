import { sanitizeHTML } from './helpers';

export const getData = (form: any, sanitize: boolean = false) => {
  var formData = new FormData(form);

  let object = Object.fromEntries(formData);

  if (sanitize) {
    for (const key in object) {
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
