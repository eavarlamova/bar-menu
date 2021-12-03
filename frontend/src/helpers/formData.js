export const getFormData = (payload) => {
  const formData = new FormData();
  const productInfo = { ...payload };
  delete productInfo.file;
  formData.append('product', JSON.stringify(productInfo))
  if (payload.photo && typeof (payload.photo) !== 'string') {
    formData.append('photo', payload.photo)
  }
  return formData;
}