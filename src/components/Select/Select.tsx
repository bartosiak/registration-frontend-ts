import React, { ChangeEvent } from 'react';

interface SelectProps {
    values: [string, string][];
    onValueChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectedValue: string;
    id?: string
}

export const Select: React.FC<SelectProps> = ({ values, onValueChange, selectedValue, ...rest }) => {
    return (
        <select value={selectedValue} onChange={onValueChange} {...rest}>
            {values.map(([value, text]) => (
                <option key={value} value={value}>
                    {text}
                </option>
            ))}
        </select>
    );
};
