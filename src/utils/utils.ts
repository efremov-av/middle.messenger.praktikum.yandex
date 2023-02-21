export const getData = (form: any) => {
  var formData = new FormData(form);

  return Object.fromEntries(formData);
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
