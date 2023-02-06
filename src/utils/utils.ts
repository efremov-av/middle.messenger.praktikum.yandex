export const getData = (form: any) => {
  var formData = new FormData(form);

  return Object.fromEntries(formData);
};
