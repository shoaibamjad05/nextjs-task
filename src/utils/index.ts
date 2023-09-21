export const imageSize = [
  { value: "small", name: "Small" },
  { value: "medium", name: "Medium" },
  { value: "large", name: "Large" },
];

const smallImage = 250;
const mediumImage = 450;
const largeImage = 800;

export const imageTags = [
  { value: "new", text: "New" },
  { value: "best", text: "Best" },
  { value: "lucky", text: "Lucky" },
];

export const selectedSize = {
  smallImage,
  mediumImage,
  largeImage,
};

export const encodeToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      resolve(base64Image);
      reader.onerror = reject;
    };
  });
};

const download = (filename: string, content: string) => {
  const element = document.createElement("a");
  element.setAttribute("href", content);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const handleDownload = async (image: string) => {
  try {
    const result = await fetch(image);
    const blob = await result.blob();
    const url = URL.createObjectURL(blob);
    download("image" + Date(), url);
  } catch (error) {
    console.error(error);
  }
};
