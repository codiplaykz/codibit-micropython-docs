import React, { useMemo } from 'react';
import styles from './styles.module.css';
import type { ImagePreviewProps } from './types';

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageString,
  size = 5,
  className = '',
}) => {
  const pixels = useMemo(() => {
    const lines = imageString.split(':');
    const result: number[][] = [];

    for (let i = 0; i < Math.min(lines.length, size); i++) {
      const line = lines[i];
      const row: number[] = [];

      for (let j = 0; j < Math.min(line.length, size); j++) {
        const char = line[j];
        if (char === ' ' || char === '0') {
          row.push(0);
        } else {
          try {
            const value = parseInt(char, 10);
            row.push(isNaN(value) ? 0 : value);
          } catch {
            row.push(0);
          }
        }
      }

      // 행이 size보다 짧으면 0으로 채움
      while (row.length < size) {
        row.push(0);
      }

      result.push(row);
    }

    // 행이 size보다 적으면 0으로 채워진 행 추가
    while (result.length < size) {
      result.push(new Array(size).fill(0));
    }

    return result;
  }, [imageString, size]);

  const getPixelColor = (level: number): string => {
    return level > 0 ? '#393A35' : 'transparent';
  };

  return (
    <div
      className={`${styles.imagePreview} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${size}, 5px)`,
        gridTemplateRows: `repeat(${size}, 5px)`,
      }}
      role="img"
      aria-label={`Pixel art image: ${imageString}`}
    >
      {pixels.map((row, rowIndex) =>
        row.map((pixel, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${styles.pixel} ${
              pixel > 0 ? styles.pixelFilled : styles.pixelEmpty
            }`}
            style={{
              backgroundColor: getPixelColor(pixel),
            }}
          />
        ))
      )}
    </div>
  );
};

export default ImagePreview;