export type FormInputProps = {
    label?: string;
    id: string;
    type: string;
    value: string;
    disabled?: boolean;
    handleChange?: (e: any) => void;
};