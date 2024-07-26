export type TextInputProps = {
    label?: string;
    id: string;
    type?: string;
    disabled?: boolean;
    handleChange?: (e: any) => void;
    inputStyles?: string;
    currentValue?: any;
    labelStyles?: string;
};

export type SubmitInputProps = {
    label?: string;
    id: string;
    value?: string;
    disabled?: boolean;
    inputStyles?: string;
};
export type RadioInputProps = {
    label?: string;
    id: string;
    value?: string;
    disabled?: boolean;
    inputStyles?: string;
    options: string[];
    handleChange?: (e: any) => void;
    name: string;
    currentValue?: string;
    selected?: string;
};

export type RangeInputProps = {
    label?: string;
    id: string;
    value?: number;
    type?: string;
    disabled?: boolean;
    handleChange?: (e: any) => void;
    inputStyles?: string;
    labelStyles?: string;
    min: number;
    max: number;
    step: number;
    currentValueString?: string;
    currentValue?: number;
    subLabel?: string;
};