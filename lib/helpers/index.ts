const normalize = (str: string) =>
  str.toUpperCase().replace(/\s+/g, "-").replace(/[^A-Z0-9-]/g, "");

export const generateSKU = ({
  category,
  productName,
  attr,
}: {
  category: string;
  productName: string;
  attr: string;
}) => {
  const cat = normalize(category).slice(0, 3);
  const prod = normalize(productName).slice(0, 4);
  const suffix = Math.floor(100 + Math.random() * 900);
  return `${cat}-${prod}-${normalize(attr)}-${suffix}`;
};