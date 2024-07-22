import { useState } from "react";
import { FormWrapper } from "../../../components/ui/FormWrapper";
import { FormInput } from "../../../components/ui/FormInput";


export const ProfileInitForm = () => {
   
    const error = null;
    const disciplineOptions = ["Bouldering", "Sport Climbing", "Trad Climbing", "Ice Climbing", "Other"];

    type ProfileOptionsInput = {
        dob: string;
        location: string;
        discipline: string;
    }
    const [input, setInput] = useState<ProfileOptionsInput>({
        dob: "",
        location: "",
        discipline: "",
      });
    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = async () => {

    };
    return (
        <FormWrapper error={error} handleSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold leading-none">Personal Info<br></br><span className="text-sm text-gray-500 leading-tight">All of this information is optional and can be edited on your profile page at a later time</span></h1>
            <FormInput label="Date of Birth" id="dob" type="date" />
            <FormInput label="Location" id="location" type="text" />
            <FormInput label="Favorite Discipline" id="discipline" type="radio" options={disciplineOptions} handleChange={handleChange}/>
            {input.discipline === "Other" && <FormInput label="Other Discipline" id="otherDiscipline" type="text" />}
        </FormWrapper>
    )
}