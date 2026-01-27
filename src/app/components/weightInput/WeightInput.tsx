import { InputNumber } from 'primereact/inputnumber';
import { Factor } from '../factorSlider/FactorSlider';
import React from 'react';

export interface WeightInputProps {
  factor: Factor;
  onChange: (value: number) => void;
}

const WeightInput: React.FC<WeightInputProps> = ({ factor, onChange }) => {
  return (
    <div className="weight-input">
      <h4>{factor.name} Weight</h4>
      <InputNumber mode="decimal" value={factor.weight} onValueChange={(e) => onChange(e.value as number)} min={0} max={1} step={0.01}
        minFractionDigits={1}
        maxFractionDigits={1}
      />
    </div>
  );
}

export default WeightInput;
