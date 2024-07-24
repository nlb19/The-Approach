import { 
    TextInputProps, 
    SubmitInputProps, 
    RadioInputProps, 
    RangeInputProps 
} from '../../types/FormProps';

export const TextInput = ({ label, id, value, handleChange,type, disabled, inputStyles, labelStyles = "" }: TextInputProps) => {
    const styles:string = "bg-tan dark:bg-purple pl-2  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-white leading-normal py-2 rounded ";

    return (
        <div className="flex flex-col justify-center">
            {label && 
                <label htmlFor={id} className={labelStyles ?  labelStyles : "text-md md:text-lg w-auto "}>{label}</label>
            }
            <input
                onChange={handleChange}
                value={value}
                className={styles + " " + inputStyles}
                type={type ? type : "text"}
                id={id}
                disabled={disabled}
            />
        </div>
    )
};

export const SubmitInput = ({ label, id, value,  disabled, inputStyles = "" }: SubmitInputProps) => {
    const styles:string = "bg-dark-blue dark:bg-light-green text-white hover:text-charcoal dark:text-dark-green hover:dark:text-white pl-2 focus-visible:outline-none  leading-normal py-4 px-4 rounded-full hover:bg-light-blue dark:hover:bg-dark-green hover:cursor-pointer transition-colors ease-in-out duration-500";

    return (
        <div className="flex flex-col justify-center w-1/4 min-w-64 mt-4">
            {label && 
                <label htmlFor={id} className="text-md md:text-lg w-auto">{label}</label>
            }
            <input
                value={value}
                className={styles + " " + inputStyles}
                type="submit"
                id={id}
                disabled={disabled}
            />
        </div>
    )
};

export const RadioInput = ({ label, id, value, disabled, inputStyles = "", options, handleChange, name, selected }: RadioInputProps) => {
    const styles:string = "mr-2";

    return (
        <div className="flex flex-col justify-center w-1/4 min-w-64">
            {label && 
                <label htmlFor={id} className="text-md md:text-lg w-auto">{label}</label>
            }
            {
                options.map((option) => {
                    return (
                        <div key={option} className="flex flex-row w-full">
                            <label htmlFor={option} className="text-md text-sm md:text-md w-full flex items-center mx-2 leading-loose">
                            <input
                                value={option}
                                className={styles + " " + inputStyles}
                                type="radio"
                                id={id}
                                disabled={disabled}
                                name={name}
                                onChange={handleChange}
                            />
                            {option}</label>
                        </div>
                    )
                })
            }
            { selected==="Other" && <TextInput label="Please Specify" id={id + "--other"} type="text" handleChange={handleChange} labelStyles="text-sm md:text-md"/>}
        </div>
    )
};

export const RangeInput = ({ label, id, handleChange,type, inputStyles, labelStyles = "", min, max, step, currentValueString, currentValue, subLabel }: RangeInputProps) => {
    const styles:string = "w-full";

    return (
        <div className="flex flex-col justify-center">
            {label && 
                <label htmlFor={id} className={labelStyles ?  labelStyles : "text-md md:text-lg w-auto "}>{label}<br></br><span className="text-sm text-gray-500 leading-tight">{subLabel}</span></label>
            }
            <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-4 items-end md:items-center mt-1">
                <input
                    onChange={handleChange}
                    className={styles + " " + inputStyles}
                    type={type ? type : "range"}
                    value={currentValue}
                    id={id}
                    min={min}
                    max={max}
                    step={step}
                />
                <div className="text-center">{currentValueString }</div>
            </div>
        </div>
    )
};