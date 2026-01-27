import React from 'react';
import Cube3D from '../Cube3D';
import { Factor } from '../factorSlider/FactorSlider';
import { CUBE_FACE_COLORS } from '@/constants';


/* eslint-disable-next-line */
export interface VisualizationProps {
  factors: Factor[];
}

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
              background: CUBE_FACE_COLORS[idx],
              color: '#ffffff',
              borderRadius: 20,
              padding: '6px 12px',
              fontWeight: 700,
              fontSize: 'small',
              lineHeight: 'normal',
              minWidth: 60,
              width: 220, // Fixed width for pill
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
