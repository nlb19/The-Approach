import { FormInputProps } from '../../types/FormInputProps';

export const FormInput = ({ label, id, type, value, handleChange, disabled }: FormInputProps) => {
    let styles:string = "";
    switch (type) {
        case "email":
            styles = "bg-tan dark:bg-purple h-8 pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple leading-tight";
            break;
        case "password":
            styles = "bg-tan dark:bg-purple h-8 pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple leading-tight";
            break;
        case "submit":
            styles = "bg-dark-blue dark:bg-light-green text-white dark:text-dark-green h-8 pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple leading-loose";
            break;
        default:
            styles = "bg-tan dark:bg-purple h-8 pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple";
    }
    return (
        <div className="flex flex-col justify-center gap-1">
            {label && 
                <label htmlFor={id} className="text-lg md:text-xl">{label}</label>
            }
            <input
                onChange={handleChange}
                value={value}
                className={styles}
                type={type}
                id={id}
                disabled={disabled}
            />
        </div>
    )
};