import React from 'react';
import Cube3D from '../Cube3D';
import { Factor } from '../factorSlider/FactorSlider';


/* eslint-disable-next-line */
export interface VisualizationProps {
  factors: Factor[];
}

// const faceColors = ['#F7E84F', '#4F8EF7', '#F74F8E', '#4FF78E', '#F78E4F', '#8E4FF7'];
const faceColors = [
  '#4C628D', // Muted blue (readable, brand-aligned)
  '#6EA8D9', // Lighter blue (accent)
  '#34B3A0', // Teal/aqua (fresh, vibrant)
  '#F2F5FA', // Light gray (excellent for dark text)
  '#E6B646', // Gold accent (contrasts with dark text)
  '#9AB8C8'  // Light slate blue (soft, modern)
];

const Visualization: React.FC<VisualizationProps> = ({ factors }) => {
  // Limit to 6 factors for the cube
  const limitedFactors = factors.slice(0, 6);
  while (limitedFactors.length < 6) {
    limitedFactors.push({ name: '', score: 0, weight: 1 });
  }

  return (
    <div className="visualization" style={{ width: '100%' }}>
      {/* Pills for each face's score */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '16px 0' }}>
        {limitedFactors.map((factor, idx) => (
          <div
            key={idx}
            style={{
              background: faceColors[idx],
              color: '#222',
              borderRadius: 20,
              padding: '6px 12px',
              fontWeight: 700,
              fontSize: 'small',
              lineHeight: 'normal',
              minWidth: 60,
              width: 200, // Fixed width for pill
              textAlign: 'center',
              boxShadow: '0 1px 6px #0002',
              border: '2px solid #fff',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>{factor.name || `Face ${idx + 1}`}</span>
            <span className="score-label" style={{ fontWeight: 700 }}>{factor.score.toFixed(1)}</span>
          </div>
        ))}
      </div>
      <Cube3D factors={factors} />
    </div>
  );
}

export default Visualization;
