export type FormInputProps = {
    label?: string;
    id: string;
    type: string;
    value?: string;
    disabled?: boolean;
    options?: string[];
    handleChange?: (e: any) => void;
};