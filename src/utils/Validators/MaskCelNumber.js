export const MaskCelNumber = (value) => {
  return value
      ? value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
      : '';
};

export const maskPhoneNumber = (value) => {
  return `${value.substr(0, 2)} ${value.substr(2, 5)}-${value.substr(7)}`;
};
