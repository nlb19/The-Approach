import { useState } from "react";
import { FormWrapper } from "../../../components/ui/FormWrapper";
import { FormInput } from "../../../components/ui/FormInput";
import { useInitializeProfile } from "../hooks/useInitializeProfile";


export const ProfileInitForm = () => {
    const { initProfile, isLoading, error } = useInitializeProfile();

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
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        await initProfile(input);
    };
    return (
        <FormWrapper error={error} handleSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold leading-none">Personal Info<br></br><span className="text-sm text-gray-500 leading-tight">All of this information is optional and can be edited on your profile page at a later time</span></h1>
            <FormInput label="Date of Birth" id="dob" type="date" handleChange={handleChange} />
            <FormInput label="Location" id="location" type="text" handleChange={handleChange} />
            <FormInput label="Favorite Discipline" id="discipline" type="radio" options={disciplineOptions} handleChange={handleChange}/>
            {input.discipline === "Other" && <FormInput label="Other Discipline" id="otherDiscipline" type="text" />}
            <FormInput value="Confirm Information"  type="submit" id="loginSubmit" disabled={isLoading}/>
            {error && <p className="text-red-500">{error}</p>}
        </FormWrapper>
    )
}