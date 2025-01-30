'use client'

import { useState } from 'react';
import JsBarcode from 'jsbarcode';

export default function Page() {
  const [text, setText] = useState<string>(''); // Store barcode text
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Store the image source

  const generateBarcode = () => {
    if (text.trim() !== '') {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, text, {
        format: "CODE128",
        displayValue: true,
        font: "Quicksand",
        fontOptions: "bold",
        textAlign: "center",
      });

      // Convert canvas to image (PNG or JPG)
      const imageUrl = canvas.toDataURL("image/png", 1); // Change to "image/png" for PNG
      setImageSrc(imageUrl); // Set the generated image source
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value); // Update text
    setImageSrc(null); // Reset the image when input changes
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      generateBarcode(); // Generate the barcode when Enter is pressed
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Barcode Generator</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add keydown event listener
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <div style={{ marginTop: '20px' }}>
        {imageSrc && <img src={imageSrc} alt="Generated Barcode" style={{ maxWidth: '100%' }} />}
      </div>
    </div>
  );
}
