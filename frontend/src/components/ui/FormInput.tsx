import { FormInputProps } from '../../types/FormInputProps';

export const FormInput = ({ label, id, type, value, handleChange, disabled, options }: FormInputProps) => {
    let styles:string = "";
    switch (type) {
        case "submit":
            styles = "bg-dark-blue dark:bg-light-green text-white dark:text-dark-green font-black text-lg py-2 lg:w-1/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple leading-loose rounded-full hover:cursor-pointer";
            break;
        default:
            styles = "bg-tan dark:bg-purple pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-white leading-normal py-2 rounded";
    }
    return (
        <div className="flex flex-col justify-center">
            {label && 
                <label htmlFor={id} className="text-md md:text-lg w-auto">{label}</label>
            }
            {type === "radio" ?
                options?.map((option, index) => {
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                onChange={handleChange}
                                value={option}
                                name="radio"
                                className="mr-2"
                                type={type}
                                id={id}
                                disabled={disabled}
                            />
                            <label htmlFor={id}>{option}</label>
                        </div>
                    )
                })
                :
                <input
                    onChange={handleChange}
                    value={value}
                    className={styles}
                    type={type}
                    id={id}
                    disabled={disabled}
                />
            }
                
            
        </div>
    )
};