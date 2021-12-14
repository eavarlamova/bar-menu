export const getFormData = (payload, type = 'product') => {
  const formData = new FormData();
  const payloadInfo = { ...payload };
  delete payloadInfo.photo;
  formData.append(type, JSON.stringify(payloadInfo))
  if (payload.photo && typeof (payload.photo) !== 'string') {
    formData.append('photo', payload.photo)
  }
  return formData;
}